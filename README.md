# Saima Biva portfolio

Static site (HTML, CSS, vanilla JS). No build step, no server code. Works on GitHub Pages.

## Architecture
Two separate pages for a real bilingual site: Bangla at `/` and English at `/en/`. Each is independently indexable, with canonical and hreflang tags. The language button on every page links to the equivalent section of the other language and the choice is remembered (localStorage). Articles, travel and audio are data files, shared by both languages.

## Deploy
1. Move the old `resources/` files into place (same filenames):
   - `profile.jpg`, `cover.jpg`, `gallery-1..4.jpg`, `award-1..3.jpg` go to `assets/images/`
   - `voice-news.mp3`, `voice-ad.mp3`, `voice-ivr.mp3`, `voice-poem.mp3` go to `assets/audio/`
2. Push everything to the GitHub repository root. Keep the custom domain (`CNAME` file) if you have one.
3. 404 page: `404.html` uses root-relative paths (`/assets/...`). That is correct for the custom domain `saimabiva.pro.bd`. If you ever host under `user.github.io/repo/`, change those paths.
4. `cover.jpg` is the social share image (Facebook, LinkedIn, WhatsApp, X). Use 1200 x 630 px.

## Add a new article
Open `data/articles.json` and copy an object. Minimum fields: `id`, `url`, `publication`, `publication_bn`, `category`.
Then fill title, date, image and excerpt automatically (Node 18+ on your computer):

    node scripts/fetch-article-meta.js
    node scripts/fetch-article-meta.js --download-images   (saves images into assets/images/articles/)

Review the result. Fields the page does not provide stay `null`. Add `title_en` / `excerpt_en` by hand if you want an English headline or summary (otherwise the original Bangla title is shown). Set `"featured": true` on one article to make it the lead story. Categories: lifestyle, travel, features, culture, personal.

Until titles are filled in, cards show "Published on Jago News" instead of a headline.

## Add voice samples
1. Upload the file (mp3, m4a, wav, ogg) into `assets/audio/`.
2. Update the list, either way:
   - Automatic: push to GitHub. The workflow in `.github/workflows/audio-manifest.yml` runs the script and commits `data/samples.json`.
   - Manual: `node scripts/generate-samples.js`, then commit `data/samples.json`.
3. Open `data/samples.json` to edit the Bangla/English title and description of the new sample. Your edits are kept on later runs. Use `order` to change the sequence.

The script refuses to run on an empty audio folder, and files that are deleted disappear from the list (use `--keep-missing` to keep them). A missing file shows as unavailable on the page; an empty list shows a friendly message.

## Update text
- Biography, hero, experience, quotes, contact: edit both `index.html` (Bangla) and `en/index.html` (English). Search for the heading text.
- Travel destinations: `data/travel.json` (add `image`, `text_bn`, `text_en` whenever you like).
- Platform links: search for the URL in both HTML files, and in the JSON-LD block near the top.
- Contact email: search for `freeedu.bd@gmail.com` in both HTML files.

## SEO
Titles, descriptions, Open Graph and Twitter tags are in the `<head>` of each page. The structured data (Person, WebSite, ProfilePage) is in the `ld+json` block. After changing page content, update `lastmod` in `sitemap.xml`, and submit `https://saimabiva.pro.bd/sitemap.xml` in Google Search Console.
