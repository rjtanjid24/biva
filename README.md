# Saima Biva Personal Portfolio

Static editorial portfolio for Saima Biva (https://saimabiva.pro.bd/), built with HTML5, Tailwind CSS, custom CSS, and vanilla JavaScript for GitHub Pages.

## Project Structure
- `index.html` - Main bilingual (Bangla | English) portfolio page with Schema.org JSON-LD.
- `404.html` - Custom not-found page for GitHub Pages.
- `css/style.css` - Editorial colors, typography rules, reduced-motion support, and audio progress styles.
- `js/app.js` - Bilingual switcher (`localStorage`), article rendering and category filtering, and dynamic audio player.
- `data/articles.json` - Published stories data (Dhaka Mail item omitted as requested).
- `assets/audio/samples.json` - Audio manifest read dynamically by `js/app.js`.
- `scripts/generate_audio_manifest.py` - Python helper to scan `assets/audio/` and refresh `assets/audio/samples.json`.
- `robots.txt`, `sitemap.xml`, `manifest.json` - Static SEO and web app files.

## How to Deploy on GitHub Pages
1. Upload the project files to the GitHub repository used for `saimabiva.pro.bd`.
2. Ensure existing media folders (`resources/` or `assets/`) are present so images and audio files load cleanly.
3. In repository Settings -> Pages, serve from the main branch root (`/`).

## How to Update Content
- **Biography & UI text**: Edit `UI_STRINGS` in `js/app.js` or the text blocks in `index.html`.
- **Add new articles**: Append an entry to `data/articles.json` with `title_bn`, `title_en`, `publication`, `publication_date`, `category`, `category_bn`, `category_en`, `url`, `image`, `excerpt_bn`, and `excerpt_en`.
- **Add new photographs**: Place images in `assets/images/` or `resources/` and update paths in `index.html` or `data/articles.json`.
- **Add audio samples & regenerate manifest**: Drop `.mp3`, `.wav`, `.ogg`, or `.m4a` files into `assets/audio/` and run `python scripts/generate_audio_manifest.py`, then review titles/descriptions in `assets/audio/samples.json`.
- **Update SEO metadata**: Update `<title>`, `<meta name="description">`, Open Graph/Twitter tags, and JSON-LD in `index.html`, plus `sitemap.xml`.
