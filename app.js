const SOUND_DIR = "sounds/";

const board = document.getElementById("board");
const masterVolume = document.getElementById("master-volume");
const stopAllButton = document.getElementById("stop-all");

// Web Audio gives near-instant playback, which matters on phones.
const ctx = new AudioContext();
const master = ctx.createGain();
master.gain.value = masterVolume.value;
master.connect(ctx.destination);

// file -> Promise<AudioBuffer | null>
const buffers = new Map();
// One-shot sounds currently playing, so "Stop all" can silence them.
const playing = new Set();
// id -> { button, gain, source } for looping ambient sounds.
const loops = new Map();
// keyboard key -> button
const shortcuts = new Map();

function load(file) {
  if (!buffers.has(file)) {
    buffers.set(file, fetch(SOUND_DIR + file)
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject()))
      .then((data) => ctx.decodeAudioData(data))
      .catch(() => {
        buffers.delete(file); // retry on the next tap, e.g. after a network hiccup
        return null;
      }));
  }
  return buffers.get(file);
}

function pick(files) {
  return files[Math.floor(Math.random() * files.length)];
}

async function checkFiles(sound, button, preload) {
  const missing = [];
  for (const file of sound.files) {
    const ok = preload
      ? await load(file)
      : await fetch(SOUND_DIR + file, { method: "HEAD" }).then((r) => r.ok, () => false);
    if (!ok) missing.push(file);
  }
  if (missing.length) {
    button.classList.add("missing");
    button.title = `Missing file(s) in sounds/: ${missing.join(", ")}`;
  }
}

async function playOnce(sound, button) {
  ctx.resume();
  button.classList.remove("flash");
  void button.offsetWidth; // restart the animation
  button.classList.add("flash");

  const buffer = await load(pick(sound.files));
  if (!buffer) return;
  button.classList.remove("missing");
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(master);
  source.onended = () => playing.delete(source);
  playing.add(source);
  source.start();
}

async function toggleLoop(sound) {
  ctx.resume();
  const entry = loops.get(sound.id);
  if (entry.source) {
    stopLoop(entry);
    return;
  }
  entry.button.classList.add("active", "loading");
  const buffer = await load(pick(sound.files));
  entry.button.classList.remove("loading");
  // Bail out if it failed to load or was switched off while loading.
  if (!buffer || !entry.button.classList.contains("active")) {
    entry.button.classList.remove("active");
    return;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(entry.gain);
  source.start();
  entry.source = source;
}

function stopLoop(entry) {
  if (entry.source) entry.source.stop();
  entry.source = null;
  entry.button.classList.remove("active");
}

function stopAll() {
  for (const source of playing) source.stop();
  playing.clear();
  for (const entry of loops.values()) stopLoop(entry);
}

function createButton(sound) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "sound";
  button.innerHTML = `
    <span class="icon" aria-hidden="true">${sound.icon}</span>
    <span class="label">${sound.label}</span>
    ${sound.key ? `<kbd class="desktop-only">${sound.key.toUpperCase()}</kbd>` : ""}
  `;
  if (sound.key) shortcuts.set(sound.key.toLowerCase(), button);
  return button;
}

function createLoopCell(sound, button) {
  const cell = document.createElement("div");
  cell.className = "loop-cell";

  const gain = ctx.createGain();
  gain.gain.value = 0.6;
  gain.connect(master);

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 1;
  slider.step = 0.05;
  slider.value = gain.gain.value;
  slider.setAttribute("aria-label", `${sound.label} volume`);
  slider.addEventListener("input", () => { gain.gain.value = slider.value; });

  loops.set(sound.id, { button, gain, source: null });
  button.addEventListener("click", () => toggleLoop(sound));
  cell.append(button, slider);
  return cell;
}

function render() {
  for (const section of SOUND_SECTIONS) {
    const wrapper = document.createElement("section");
    wrapper.className = "section" + (section.loop ? " ambient" : "");
    wrapper.innerHTML = `<h2>${section.title}</h2>`;
    const grid = document.createElement("div");
    grid.className = "grid";

    for (const sound of section.sounds) {
      const button = createButton(sound);
      if (section.loop) {
        grid.append(createLoopCell(sound, button));
        // Long ambient tracks are only decoded when first played, to save memory.
        if (navigator.onLine) checkFiles(sound, button, false);
      } else {
        button.addEventListener("click", () => playOnce(sound, button));
        grid.append(button);
        checkFiles(sound, button, true);
      }
    }

    wrapper.append(grid);
    board.append(wrapper);
  }
}

masterVolume.addEventListener("input", () => {
  master.gain.value = masterVolume.value;
});

stopAllButton.addEventListener("click", stopAll);

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.target.tagName === "INPUT") return;
  if (event.key === "Escape" || event.key === " ") {
    event.preventDefault();
    stopAll();
    return;
  }
  const button = shortcuts.get(event.key.toLowerCase());
  if (button) {
    event.preventDefault();
    button.click();
  }
});

render();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
