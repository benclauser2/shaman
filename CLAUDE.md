# CBD American Shaman — Product Finder Quizzes

Static page (HTML/CSS/vanilla JS, no build step, no dependencies) with 5 product-recommendation quizzes for CBD American Shaman.

## Main site / design reference

**https://cbdamericanshaman.com/** is the source of truth for design. Header, footer, fonts, colors, spacing, button style, product names, product URLs and product images all come from it. When in doubt about how something should look or be worded, check the live site first (fetch it, or inspect computed styles with Playwright) and match it.

## Files

- `index.html`: page shell. Holds the header/footer markup (copied from the live site), hero, quiz picker `<ul id="quiz-grid">` and quiz stage `<section id="quiz-stage">`.
- `js/data.js`: **edit here for content.** `PRODUCTS` (catalog) and `QUIZZES` (all 5 quiz definitions).
- `js/app.js`: quiz engine (render, scoring, results, share). Generic: it knows nothing about specific quizzes.
- `js/icons.js`: inline SVG line icons (`ICONS` map + `createIcon(name, { size })`). Lucide-derived, 24×24 stroke.
- `js/header.js`: header menus (mobile toggle, submenu toggles, account dropdown, Escape/outside-click close).
- `css/styles.css`: one stylesheet. Sections are marked with `/* ---------- name ---------- */`.
- `assets/img/`: logo, `products/`, `categories/` (category bar), `find-store.png`. All downloaded from the live site.

Scripts are classic `defer` scripts (not ES modules) so the page also works when opened via `file://`. Load order matters: `header.js` → `icons.js` → `data.js` → `app.js`. They share globals: `PRODUCTS`, `QUIZZES`, `ICONS`, `createIcon`.

## Quiz data schema (`js/data.js`)

Quiz object: `id` (also the URL hash, e.g. `#strain-finder`), `title`, `tagline`, `mechanic` (card label), `icon` (key in `ICONS`), `minutes`, optional `image` (picker card art, 4:3; omit → striped placeholder), optional `ageGate: true` (21+ checkbox), optional `gamified: true` + `reward: { code, label, minXp }`, `result`, `questions`.

Question `type`:
- `choice`: radio cards. `options: [{ label, icon, scores }]`
- `duel`: exactly 2 options, a click picks one and advances
- `sliders`: `sliders: [{ id, label, minLabel, maxLabel, weights }]`. The 0–10 value is multiplied by each weight (weights may be negative).
- `trivia`: `options: [{ label, correct? }]`, `fact`. Awards XP only and never affects scoring.

`scores` / `weights` map an **outcome id** to points. The outcome id is a `PRODUCTS` key, or an archetype key for archetype quizzes.

`result.type`:
- `product`: top-scoring product plus 2 runners-up. Candidates are only the ids that appear in that quiz's scores.
- `bundle`: `slots: [{ label, icon, pool: [productIds] }]`. Best product per slot, with no duplicates across slots.
- `archetype`: `archetypes: { key: { name, icon, desc, products: [ids] } }`

When adding icons, add the shape to `ICONS` in `icons.js`. Unknown names silently render nothing. Quick check that every referenced icon exists:
`node -e "global.document={};eval(require('fs').readFileSync('js/icons.js','utf8')+require('fs').readFileSync('js/data.js','utf8')+';const u=new Set();QUIZZES.forEach(q=>{u.add(q.icon);(q.result.slots||[]).forEach(s=>u.add(s.icon));Object.values(q.result.archetypes||{}).forEach(a=>u.add(a.icon));q.questions.forEach(x=>(x.options||[]).forEach(o=>o.icon&&u.add(o.icon)))});console.log([...u].filter(n=>!ICONS[n]))')"`

## Rules that are easy to break

- **No `innerHTML`.** All DOM is built with the `el(tag, props, ...children)` helper in `app.js` (textContent/setAttribute). Keep it that way.
- **CSP meta tag in `index.html`** allows only `script-src 'self'`, Google Fonts styles and fonts, `img-src 'self' data:`, and `form-action 'self' https://cbdamericanshaman.com`. Consequences:
  - no inline scripts, no `style="..."` attributes (use classes; `el.style.setProperty` via CSSOM is fine)
  - no CDN scripts or remote images. Download assets into `assets/` instead, or update the CSP deliberately.
- **No emojis** anywhere in the UI. Use `createIcon`. The user explicitly asked for a design that does not look AI-generated: no gradients, confetti, pill chips, fake "% match" numbers or emoji. Keep it flat, bordered and close to the live site.
- **Copy / compliance:** no medical claims ("treat", "cure", "relieves pain"…). Use soft wording ("wind down", "routine"). Keep the FDA disclaimer and the ".3% THC" line in the footer. Hemp flower / THCP outcomes stay behind `ageGate`.
- **localStorage** is only used for "completed" badges (`shaman-quiz-completed`), always wrapped in try/catch. Don't store anything that matters there.
- Accessibility: choice answers are real radios inside `fieldset/legend`. Focus moves to the `[data-focus]` heading on each screen, and trivia feedback goes through the `#announcer` live region. Hover styles live inside `@media (hover: hover)`.

## Design tokens (match the live site)

Font Poppins. Plum `--plum #411a31` (headings, primary buttons), tan `--tan #b59d7c` / `--tan-dark` (icon rings, labels; same as the category bar circles), light bg `--bg-alt #f6f6f6`, radius 4–6px. Header/footer values (red promo bar `#f00`, menu text `#292929`, hover `#ac916c`, footer `#f6f6f6` / `#707070`) were measured from the live site's computed styles. Re-measure with Playwright on https://cbdamericanshaman.com if they need updating.

## Placeholders still in place

- `QUEST10` reward code in `shaman-quest` (not a real code)
- Quiz picker card images (`image` omitted on all quizzes → striped placeholder)
- Cart count fixed at `0` (static page has no cart access)
- Hero product photos are real product images, not final art

## Running / testing

- Serve: `python -m http.server 8791 --directory .` (port 8765 is used by another local project). Or open `index.html` directly.
- Verify in a browser with Playwright: run each quiz end to end, check console errors, and check the 375px width for horizontal overflow. Python's server sends no cache headers, so disable cache (CDP `Network.setCacheDisabled`) or CSS/JS changes may appear stale.
- Product images from the live site's `/images/products/*.avif` URLs are actually JPEGs. Save them as `.jpg`.
