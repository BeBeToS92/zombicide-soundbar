# Zombicide Soundbar

A simple sound effects board for playing **Zombicide: Black Plague**. It's plain HTML/CSS/JS with no build step, so it can be hosted for free on GitHub Pages.

Live demo here: https://bebetos92.github.io/zombicide-soundbar/

- Tap a button to play a sound effect. The same sound can overlap with itself.
- Ambient sounds loop until you tap them again, and each has its own volume slider.
- There's a master volume control and a **Stop all** button (on desktop, **Esc** or **Space** also stops everything).
- On desktop, each button has a keyboard shortcut, shown in its corner.
- It works offline after the first visit, and you can add it to your phone's home screen.

## Sounds

The app comes with a set of free CC0 (public domain) sounds. [sounds/CREDITS.md](sounds/CREDITS.md) lists where each one came from.

To replace or add sounds:

1. Put your audio files (`.mp3`, `.ogg`, `.wav` or `.m4a`) in the [`sounds/`](sounds/) folder.
2. Make sure the file names match the ones in [`sounds.js`](sounds.js), or edit `sounds.js` to use your names. You can also add, remove or rename buttons and sections there.
3. To get a random variation each time, list several files: `files: ["walker1.mp3", "walker2.mp3", "walker3.mp3"]`.

A button is faded out when its file is missing. Hover over it to see which file it expects.

Some free sources for sounds: [freesound.org](https://freesound.org), [pixabay.com/sound-effects](https://pixabay.com/sound-effects/), [opengameart.org](https://opengameart.org). Check each sound's license.

## Running locally

Opening `index.html` directly from disk won't work, because browsers block loading sound files that way. Start a local web server in this folder instead:

```sh
npx serve -l 8000
```

Then open http://localhost:8000.

You can also use `python -m http.server 8000`, but it sometimes drops a file when many load at once. If a button is faded, tap it and it will retry.

## Publishing on GitHub Pages

1. Create a repository on GitHub and push this folder to it.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then choose your branch (`master`) and the `/ (root)` folder. Click **Save**.
4. After a minute or so, the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Notes

- **iPhone/iPad:** if the ring/silent switch is set to silent, you won't hear any sound.
- **Offline use:** open the page once while you're online. It downloads all the sounds so it keeps working without a connection at the table.
- **File sizes:** GitHub Pages allows up to 1 GB per site. Keep ambient tracks as reasonably compressed MP3s (128 kbps is plenty).
