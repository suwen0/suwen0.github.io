# Wen Su — Academic Homepage

This repository contains the GitHub Pages edition of Wen Su's academic homepage.

## Publish on GitHub Pages

1. Create a public GitHub repository. For the clean address `https://suwen0.github.io`, name it exactly `suwen0.github.io`.
2. Extract the downloaded ZIP and upload **all extracted files and folders** to the repository root. Do not upload the ZIP itself.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and wait for the `Deploy academic homepage to GitHub Pages` workflow to finish.

Every later push to the `main` branch automatically rebuilds and republishes the site.

## Edit content

Most academic content is stored in:

- `content/config.toml` — name, affiliation, navigation, and links
- `content/about.toml` — profile and home-page sections
- `content/publications.bib` — publications and working papers
- `content/*.md` and `content/*.toml` — page content
- `content_zh/` — Chinese-language content

## Local preview

Node.js 22 or newer is recommended.

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm ci
npm run build
```

The static website is generated in `out/`.
