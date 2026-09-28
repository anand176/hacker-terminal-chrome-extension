# Terminal New Tab

Replaces every new tab with a fake hacker terminal: matrix rain background,
a typed boot sequence, and an interactive prompt that responds to a handful
of jokey commands. Purely for fun — there is no real shell, no file access,
and the extension requests zero permissions.

## Load it in Chrome

1. Unzip this folder somewhere permanent.
2. Open `chrome://extensions`.
3. Turn on **Developer mode** (top right toggle).
4. Click **Load unpacked** and select the unzipped `hacker-terminal` folder.
5. Open a new tab — the terminal boots automatically

## Commands you can type

- `help` — list all commands
- `whoami` — check your (fake) clearance level
- `date` — current date/time
- `ls` — list fake files
- `cat <file>` — read one, e.g. `cat secrets.txt`
- `hack` — dramatic fake progress bar, does nothing real
- `matrix` — speeds up the background rain
- `sudo <anything>` — joke response
- `clear` — clear the screen
- `exit` — joke response (there's no escaping a new tab)

Anything else returns a classic `command not found`

## Publishing

This extension needs **zero permissions**, which makes review usually
faster than permission-heavy extensions. The only thing to fill out
carefully in the Chrome Web Store listing is a screenshot of the terminal
in action, plus a short description making clear it's a novelty/aesthetic
new-tab replacement (not a real terminal) — that avoids any confusion
during review or from users.

## Customizing

- Edit `script.js`'s `bootLines`, `helpText`, and `fakeFiles` to change the
  boot sequence, command list, and joke files.
- Edit the green color (`#39ff6a`) in `style.css` if you want a different
  terminal color scheme (amber, blue, etc.).
