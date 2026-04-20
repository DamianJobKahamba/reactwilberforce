# Wilberforce Technologies — React Website

Built with **React 18 + Vite + React Router**. Dark editorial design with gold accents.

---

## Project Structure

```
wilberforce-tech/
├── public/
│   ├── logo.jpeg          ← Company logo
│   └── headshot.jpeg      ← Founder photo
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── QMSChatbot.jsx
│   │   └── TeamTracker.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Run Locally

**Prerequisites:** Node.js 18+ installed ([nodejs.org](https://nodejs.org))

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server (with hot reload)
npm run dev

# Visit http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
# Output goes to /dist folder

# Preview the production build locally
npm run preview
```

---

## 🌐 Deploy to GitHub Pages

### Option 1 — Manual (simple)

1. In `vite.config.js`, set `base` to your repo name:
   ```js
   base: '/your-repo-name/',
   ```
2. Build the project: `npm run build`
3. Push the `/dist` folder contents to your `gh-pages` branch
4. In GitHub repo Settings → Pages → set source to `gh-pages` branch

### Option 2 — GitHub Actions (automatic, recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install & Build
        run: |
          npm install
          npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Every `git push` to `main` will auto-build and deploy.

---

## ✏️ Customizing Content

| What to change | Where |
|---|---|
| Hero text / tagline | `src/pages/Home.jsx` — Hero section |
| About / founder bio | `src/pages/Home.jsx` — About section |
| Product cards | `src/pages/Home.jsx` — Products section |
| Contact email | `src/pages/Home.jsx` + `src/components/Footer.jsx` |
| QMS Chatbot details | `src/pages/QMSChatbot.jsx` |
| Team Tracker details | `src/pages/TeamTracker.jsx` |
| Colors / fonts | `src/index.css` — `:root` CSS variables |
| Logo / headshot | `public/logo.jpeg`, `public/headshot.jpeg` |

---

## 🎨 Design System (CSS Variables)

```css
--coal: #0e0e0e          /* Page background */
--surface: #1c1c1c       /* Card backgrounds */
--gold: #c9933a          /* Primary accent */
--gold-light: #e8b55a    /* Hover gold */
--cream: #faf4eb         /* Primary text */
--cream-dim: rgba(250,244,235,0.7)   /* Body text */
--font-display: 'Cormorant Garamond' /* Headings */
--font-body: 'Outfit'                /* Body text */
```

---

© 2026 Wilberforce Technologies
