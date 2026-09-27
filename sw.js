// Network-first service worker: always tries to get the latest files,
// falls back to the cached copy when offline (e.g. no signal at the game table).
const CACHE = "zombicide-soundbar";

importScripts("sounds.js");

const APP_FILES = ["./", "index.html", "credits.html", "style.css", "app.js", "sounds.js", "manifest.json", "icon.svg"];
const SOUND_FILES = SOUND_SECTIONS.flatMap((section) =>
  section.sounds.flatMap((sound) => sound.files.map((file) => "sounds/" + file)));

self.addEventListener("install", (event) => {
  self.skipWaiting();
  // Download everything up front so it all works offline.
  // allSettled: a missing sound file must not break the install.
  event.waitUntil(caches.open(CACHE).then((cache) =>
    Promise.allSettled([...APP_FILES, ...SOUND_FILES].map((url) => cache.add(url)))));
});

self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
