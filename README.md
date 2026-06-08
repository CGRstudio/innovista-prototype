# InnoVista Strategies — Product UI Prototype

High-fidelity, interactive prototype for **InnoVista Strategies**, an AI-powered lead-capture and automation platform for home-service (HVAC) businesses.

Three screens, presented on a Figma-style canvas:

1. **Landing page** — desktop + mobile marketing site
2. **AI chatbot** — mobile SMS-style booking assistant (click-to-open launcher → qualifying conversation → booking confirmation)
3. **Client pipeline** — desktop Kanban dashboard with drag-and-drop lead cards, search, and service filtering

There is also a built-in **Present mode** (button top-right) — a full-screen, click-through walkthrough designed for showing the screens to a client.

---

## Quick start

This is a static site. No build step, no install — just serve the folder.

```bash
# any static server works; for example:
npx serve .
# then open the printed http://localhost:3000 URL
```

Or simply open `InnoVista Screens.html` in a browser.
(Some browsers block local `file://` script loading — if screens don't render, use a local server as above.)

### Live demo (GitHub Pages)

1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Source → Deploy from branch → `main` / root**.
3. Your demo goes live at `https://<you>.github.io/<repo>/InnoVista%20Screens.html`.

For a single-file version you can email or drop anywhere, use **`InnoVista Screens (Figma import).html`** — every asset is inlined, so it works offline with no server.

---

## File structure

| File | What it is |
|---|---|
| `InnoVista Screens.html` | **Entry point.** Loads fonts, theme tokens, and all component scripts. |
| `app.jsx` | Canvas shell, zoom, Tweaks panel, and **Present** (client walkthrough) mode. |
| `landing.jsx` | Screen 1 — landing page (`<Landing variant="desktop" \| "mobile" />`). |
| `chatbot.jsx` | Screen 2 — chat launcher + scripted SMS booking flow. |
| `dashboard.jsx` | Screen 3 — pipeline Kanban (drag/drop, search, filter). |
| `icons.jsx` | Inline SVG icon set + `Logo` mark. |
| `browser-window.jsx` | Desktop browser-chrome frame (presentational). |
| `ios-frame.jsx` | iPhone device frame (presentational). |
| `tweaks-panel.jsx` | In-prototype controls (font pairing, canvas, labels). |
| `InnoVista Screens (Figma import).html` | Self-contained single-file build (for offline/Figma import). |

---

## Tech notes for the developer

This is a **prototype**, optimized for fidelity and fast iteration — not a production codebase. Read this before estimating.

- **React 18** via UMD + **Babel Standalone** (in-browser JSX transpile). Great for a no-build prototype; for production you'd move to a real toolchain (Vite/Next) and precompile.
- **Styling is inline style objects**, not a CSS framework. The design system lives in one place: the `window.IV` token object in `InnoVista Screens.html` (`<script>` near the top) — colors, surfaces, lines, text shades. Port these to CSS variables / your theme system.
- **Typography:** three Google Font pairings, switchable via Tweaks. Defaults: `Space Grotesk` (display) + `Hanken Grotesk` (body).
- **Components share scope via `window`** (each Babel script assigns to `window.X`). In a real build these become normal ES module imports.

### What's real vs. mocked

| Behavior | Status |
|---|---|
| Landing layout, responsive desktop/mobile | Real, presentational |
| Chatbot conversation | **Scripted** (linear flow in `SCRIPT` array in `chatbot.jsx`) — no real NLP/SMS backend |
| Pipeline drag-and-drop between columns | Real (local state, HTML5 drag) |
| Pipeline search + service filter | Real (client-side) |
| Lead data | **Seed array** (`SEED` in `dashboard.jsx`) — no API |
| Present mode walkthrough | Real |

### Obvious next steps for production
- Wire the chatbot to a real conversation engine + SMS provider (e.g. Twilio).
- Back the pipeline with an API; persist column moves.
- Replace Babel-in-browser with a compiled build (Vite/Next).
- Extract `window.IV` tokens into a theme layer; lift inline styles into CSS/Tailwind.
- Swap the image placeholder on the chatbot launcher for real photography.

---

© 2026 InnoVista Strategies. Prototype for evaluation and developer handoff.
