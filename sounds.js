// Sound configuration — edit this file to add, remove or rename sounds.
//
// Each sound:
//   id     unique name (no spaces)
//   label  text shown on the button
//   icon   an emoji shown on the button
//   files  one or more files inside the /sounds folder.
//          With several files, one is picked at random each time.
//   key    (optional) keyboard shortcut on desktop
//
// Loops (in the "Ambient" section) play continuously until toggled off.

const SOUND_SECTIONS = [
  {
    title: "Zombies",
    sounds: [
      { id: "walker",      label: "Walker",      icon: "🧟", files: ["walker-1.mp3", "walker-2.mp3", "walker-3.mp3", "walker-4.mp3", "walker-5.mp3", "walker-6.mp3"],      key: "1" },
      { id: "runner",      label: "Runner",      icon: "🏃", files: ["runner-1.mp3", "runner-2.mp3", "runner-3.mp3"],      key: "2" },
      { id: "fatty",       label: "Fatty",       icon: "🐗", files: ["fatty-1.mp3", "fatty-2.mp3", "fatty-3.mp3", "fatty-4.mp3"],       key: "3" },
      { id: "abomination", label: "Abomination", icon: "👹", files: ["abomination-1.mp3", "abomination-2.mp3", "abomination-3.mp3"], key: "4" },
      { id: "necromancer", label: "Necromancer", icon: "💀", files: ["necromancer.mp3"], key: "5" },
    ],
  },
  {
    title: "Combat",
    sounds: [
      { id: "sword",    label: "Sword",       icon: "🗡️", files: ["sword-1.mp3", "sword-2.mp3", "sword-3.mp3"],    key: "q" },
      { id: "axe",      label: "Axe",         icon: "🪓", files: ["axe-1.mp3", "axe-2.mp3"],      key: "w" },
      { id: "bow",      label: "Bow",         icon: "🏹", files: ["bow-1.mp3", "bow-2.mp3"],      key: "e" },
      { id: "crossbow", label: "Crossbow",    icon: "🎯", files: ["crossbow-1.mp3", "crossbow-2.mp3"], key: "r" },
      { id: "spell",    label: "Spell",       icon: "✨", files: ["spell-1.mp3", "spell-2.mp3"],    key: "t" },
      { id: "fire",     label: "Dragon Fire", icon: "🔥", files: ["fire-1.mp3", "fire-2.mp3", "fire-3.mp3"],     key: "y" },
      { id: "miss",     label: "Miss",        icon: "💨", files: ["miss-1.mp3", "miss-2.mp3"],     key: "u" },
    ],
  },
  {
    title: "Game Events",
    sounds: [
      { id: "door",     label: "Open Door",   icon: "🚪", files: ["door-1.mp3", "door-2.mp3"],     key: "a" },
      { id: "spawn",    label: "Spawn",       icon: "⚠️", files: ["spawn.mp3"],    key: "s" },
      { id: "noise",    label: "Noise",       icon: "📢", files: ["noise.mp3"],    key: "d" },
      { id: "objective",label: "Objective",   icon: "⭐", files: ["objective.mp3"],key: "f" },
      { id: "levelup",  label: "Level Up",    icon: "⬆️", files: ["levelup.mp3"],  key: "g" },
      { id: "wound",    label: "Wounded",     icon: "🩸", files: ["wound-1.mp3", "wound-2.mp3", "wound-3.mp3"],    key: "h" },
      { id: "death",    label: "Survivor Dies", icon: "⚰️", files: ["death.mp3"],  key: "j" },
      { id: "victory",  label: "Victory",     icon: "🏆", files: ["victory.mp3"],  key: "k" },
    ],
  },
  {
    title: "Ambient",
    loop: true,
    sounds: [
      { id: "music",   label: "Music",   icon: "🎵", files: ["music.mp3"],   key: "z" },
      { id: "battle",  label: "Battle",  icon: "⚔️", files: ["battle.mp3"],  key: "b" },
      { id: "rain",    label: "Rain",    icon: "🌧️", files: ["rain.mp3"],    key: "x" },
      { id: "crypt",   label: "Crypt",   icon: "🕯️", files: ["crypt.mp3"],   key: "c" },
      { id: "village", label: "Village", icon: "🏚️", files: ["village.mp3"], key: "v" },
    ],
  },
];
