<div align="center">

# ▣ MeiMind · GPT Image 2 Prompts Gallery

**The Loudest Library of GPT Image 2 Prompts with Neo-Brutalism Aesthetics.**

16,000+ upstream image & video prompts · 541 cases in this snapshot · 13 categories · 1-click copy

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
[![Content License: CC-BY-4.0](https://img.shields.io/badge/Content-CC--BY--4.0-red.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Vanilla JS](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-F5F0E8?logo=javascript&logoColor=black)](#-tech-stack)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](vercel.json)

---

![MeiMind Prompt Gallery Hero Banner](docs/images/hero-preview.png)

</div>

---

## 🌟 Key Highlights

- 🎨 **Neo-Brutalism Design Language** — Sharp borders, hard drop shadows, monospace typography, and a raw editorial aesthetic.
- ⚡ **Zero Build, Zero Framework, Blazing Fast** — Built with vanilla HTML5, modern CSS custom properties, and native ES6+ JavaScript. Loads in milliseconds.
- 🗂 **13 Curated Categories** — UI & Interfaces, Photography, Infographics, Posters, Products, Characters, Documents, Scenes, History, and more.
- 🔍 **Instant Real-Time Search & Filtering** — Sub-millisecond keyword search across titles, tags, models, and aspect ratios with live category counters.
- 📋 **Structured Prompt Inspector & 1-Click Copy** — Deep-dive modal view with formatted JSON/natural language prompts, parameter chips, and native clipboard integration.
- 📱 **Fully Responsive Layout** — Seamless user experience from 4K ultrawide monitors to mobile viewports.

---

## 📸 Product Preview & Screenshots

### 1. Gallery Explorer & Filter Bar
> Real-time search bar, category pill selector with dynamic counts, sorting options, and responsive prompt card grid.

![Gallery Explorer Preview](docs/images/gallery-preview.png)

---

### 2. Prompt Detail Modal & Inspector
> Click any prompt card to view model parameters, aspect ratios, source attribution, full prompt text, and copy directly to clipboard.

![Modal Detail Inspector](docs/images/modal-detail.png)

---

### 3. Trending Prompts Section
> Highlighted community-curated prompts driving top engagement and creative remixing.

![Trending Section Preview](docs/images/trending-preview.png)

---

## 📂 Project Structure

```text
lab-prompt-gallery/
├── index.html                  # Semantic HTML5 single-page structure
├── style.css                   # Neo-Brutalism design system & tokens
├── app.js                      # Vanilla JS state manager, filter engine & modal
├── package.json                # Root scripts for dev, verify, and capture
├── vercel.json                 # Vercel static routing & asset caching rules
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT Open Source License
├── data/
│   └── cases.json              # Synced upstream case database & taxonomy
├── assets/
│   └── favicon.svg             # Vector site mark
├── docs/
│   └── images/                 # High-resolution documentation preview assets
└── scripts/
    ├── capture-screenshots.mjs # Automated screenshot tool via Chrome DevTools Protocol
    └── verify.mjs              # Data, markup, and deployment contract checks
```

---

## 🚀 Quick Start (Local Development)

The gallery is intentionally static. Use the root npm scripts or any local static HTTP server:

### Option 1: Python HTTP Server (Recommended)

```bash
# Clone the repository
git clone https://github.com/sandbaseai/lab-prompt-gallery.git
cd lab-prompt-gallery

# Start a lightweight local server
npm run dev
```
Visit `http://localhost:3000` in your browser.

### Option 2: Node.js / npx serve

```bash
npx serve .
```

### Option 3: VS Code Live Server
Open the directory in VS Code, right-click `index.html`, and select **"Open with Live Server"**.

---

## 🛠 Tech Stack

- **Markup & Layout**: Semantic HTML5, CSS Grid & Flexbox, Container-query friendly structures.
- **Styling**: Vanilla CSS3 with `:root` CSS Design Tokens, Neo-Brutalism hard shadows (`--shadow-hard: 4px 4px 0 #1A1A1A`), dark mode accents, and custom monospace typography.
- **Logic & State**: Native ES6+ JavaScript, Fetch API, Debounced input handler, Keyboard navigation (Escape to close modal), and modern Clipboard API.
- **Data Layer**: Directly synced `data/cases.json` metadata with upstream image assets served from the source repository.

---

## 🌐 Deployment

### Deploy to Vercel
The project includes a ready-to-use [`vercel.json`](vercel.json) configured for static asset caching:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or deploy via the Vercel CLI (use the SandBase team scope when the project exists there):
```bash
npx vercel --scope sandbase
```

### Deploy to GitHub Pages
1. Navigate to your repository **Settings** -> **Pages**;
2. Under **Build and deployment**, set Source to `Deploy from a branch`;
3. Select branch `main` and folder `/ (root)`, then click **Save**.

---

## 🤝 Contributing

Contributions, prompt submissions, and feature ideas are welcome!

1. Fork this repository.
2. Add or update cases upstream, then run `npm run sync:upstream` and verify the image paths.
3. Commit your changes: `git commit -m "feat: add new UI design prompts"`
4. Push to your branch and open a Pull Request.

---

## 📄 License

- **Code & Design**: Licensed under the [MIT License](LICENSE).
- **Prompt Content & Metadata**: Follows the upstream community licenses ([CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)).

---

<div align="center">
  <sub>POWERED BY <a href="https://sandbase.ai">SANDBASE</a> · Crafted with Neo-Brutalism by <a href="https://github.com/pepedesigner">@pepedesigner</a></sub>
</div>
