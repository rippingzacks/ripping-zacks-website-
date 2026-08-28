# Descent TCG — project scratchpad

Static trading-card shop site. **Brand: Descent TCG** (formerly Ripping Zacks — legacy alias
kept on About page + Organization schema `alternateName`). Physical shop: 5205 33rd St E,
Bradenton, FL 34203. Phone: (941) 739-0220. Contact email: sales@rippingzacks.com (mail still lives on the old
domain's M365 — do not move it).

## Stack & pipeline

- Plain HTML/CSS/JS, no framework. Repo root is the site.
- **Repo**: `sutika-capital/ripping-zacks-website-` (GitHub org). Push to `main` auto-deploys
  via Vercel git integration. Local clone: `~/ripping-zacks` (pushes auth as
  ryanhanley13 via keychain).
- **Vercel**: team `sutika-capital`, project `descenttcg`. `vercel.json` runs
  `npm run build` → `scripts/prerender.js` (Node + jsdom) → serves `dist/`.
- **Prerender**: the Lorcana/Slab/Sealed vault pages render inventory client-side from data
  files; the build executes them in jsdom and emits static HTML + ItemList/Product JSON-LD
  (unique `#item-` product URLs; offers carry image/availability/itemCondition/seller).
  The build FAILS if a vault page yields 0 items (broken-data-file guard).
  `fort-knox-vault.html` is a content-wrapped Collectr iframe with NO JSON-LD (2026-08-26 —
  the old Collectr-export data was truncated garbage). `fortknox.js` is unused legacy.
  `AGENTS.md` + dotfiles are excluded from `dist/` (AGENTS.md was publicly served until
  2026-08-26). Photos were moved to `assets/photos/` files (2026-08-25) — prerendered
  pages are now 36–108KB.
- **Forms**: `api/offer.js` + `api/contact.js` (Vercel serverless, CommonJS, zero deps) send
  via Resend (`api/_mail.js`). Env vars in Vercel: `RESEND_API_KEY`, `MAIL_FROM`
  (`Ripping Zacks <forms@descenttcg.com>`), `MAIL_TO` (`sales@rippingzacks.com`).
  Honeypot field: `bot-field`.
- **DNS** (Cloudflare): descenttcg.com A → 76.76.21.21 + CNAME www → cname.vercel-dns.com
  (both DNS-only; www 301s to apex at Vercel). rippingzacks.com + www point at the same
  Vercel project and 301 → descenttcg.com (path-preserving). Mail/M365 records on
  rippingzacks.com untouched — never modify them.
- **Clean URLs** (2026-08-26): `cleanUrls: true` in vercel.json — pages serve without
  .html; /x.html 308s to /x automatically. All internal links,
  canonicals, og:urls, sitemap, llms.txt use clean paths.
- **Lorcana Vault slug** (2026-08-26): `/collection` → `/lorcana-vault`; page file renamed
  `lorcana-vault.html` (collection.css/collection.js names kept). /collection(.html) and
  /lorcana(.html) 308 → /lorcana-vault.
- **Redirects**: legacy pages lorcana/boosters/marketing(.html) 308 → clean vault URLs
  (vercel.json); files deleted. Footers link vault pages only. vercel.json also sets
  immutable Cache-Control on /assets/photos/** + nosniff/Referrer-Policy headers.
- Legacy Netlify hosting retired; old Netlify site can be deleted in the Netlify dashboard.

## Updating inventory (owner workflow)

Data files are hand-maintained — **edit only when explicitly told to**:
`lorcana.js` (Lorcana Vault), `marketing.js` (Slab Vault), `boosters.js` + `jp-specials.js`
+ `magic-tmnt.js` (Sealed Vault). `fortknox.js` is unused legacy (nothing reads it). Push
to `main`; the build re-prerenders automatically. Prices nullable (`null` = hidden).

## SEO/AEO state (as of 2026-08-26)

- Canonicals, robots.txt, sitemap.xml (with lastmod), llms.txt, og/twitter tags
  (summary_large_image): done.
- Schema: LocalBusiness with telephone (our-store), Organization+WebSite (index),
  ContactPage (contact), AboutPage (ripping-zacks), enriched ItemList/Product+Offer
  (Lorcana/Slab/Sealed vaults, injected at build). NO Product schema on Fort Knox
  (iframe page — would be markup without visible content).
- Titles/metas rewritten per page with keywords + Bradenton, FL; all descriptions ≤160 chars.
- Privacy/terms are real documents (2026-08-26) — no longer placeholders.
- Footers standardized sitewide: Shop / Company / Legal columns (no duplicates).
- Instagram: real handle is Ripping Zacks — https://www.instagram.com/rippingzacks/ —
  linked in all footers, contact page, and schema `sameAs`. Ripping Zacks page built out
  (2026-08-28): "What you'll see" 3-card grid (reuses `.steps`) + official Instagram
  post embed (instagram.com/p/DZp0FZtjZLC, embed.js loaded on that page only).

## Brand & logo (as of 2026-08-26, LIVE on main)

- **Rebrand shipped**: electric-yellow gremlin brand live on main (commits `7e39ebb` palette
  + mark, `063a52b` vault unification). Rollback = revert those commits or promote the
  previous deploy in Vercel. Old dragon assets (`descent-mark.png`, `logo.png`) kept in
  repo for now — delete once the brand settles.
- Site logo: `assets/gremlin-mark.png` (single yellow-stroke gremlin, transparent) in
  header/footer of every page. Header mark height 56px, footer 64px. Favicons from the mark.
- **Wordmark (2026-08-28, leadership decision)**: header/footer lockup is just "Descent"
  (`.logo-accent` span dropped; logo img alt="Descent"). The company is "Descent" in
  visible branding; "Descent TCG" is KEPT in titles, meta descriptions, og tags, schema,
  llms.txt, and copyright lines for SEO continuity. Domain stays descenttcg.com.
  og:image is `assets/og-card.png` sitewide EXCEPT ripping-zacks.html (keeps `logo.jpg`,
  the RZ community brand mark).
- **Palette (owner-locked)**: electric yellow #FFD100 on jet black #0A0A0A, charcoal
  #1A1A1A/#242424, soft-white #F5F5F0, ember #FF4D2E second accent. Token NAMES unchanged
  (--paper, --paper-soft, --cobalt...) — only values remapped. Yellow always takes BLACK
  text. Homepage hero has a subtle gremlin watermark (::after, hidden <768px).
  Vault stylesheets unified into the same system (2026-08-26); TMNT green + JP-red
  spotlight blocks stay as intentional guest features; semantic rarity colors (Enchanted
  purple, Epic orange, owned green) kept — they encode meaning.
- **Mascot**: the full-color "electric gremlin" (Nano Banana concept B) is the brand
  mascot for content/graphics/storytelling. Poses in use: card-throne cutout
  (`assets/mascot-card-throne.png`, homepage CTA band). Source art + all variations live
  in `~/Desktop/descent-brand-concepts/` (NOT committed — regenerate from reference
  image for consistency). Leading name candidate: **Zolta** (owner pending; check
  availability before wiring into copy).
- Mark/mascot were AI-generated (Higgsfield); stroke mark source:
  `stroke-A-refined-1.png` in the Desktop folder. Regenerate rather than edit raster files.
- Header layout: `.logo` and `.nav-links` are `white-space:nowrap` — all 9 nav items fit
  one line. Don't re-add wrapping.

## Parked / next up

- Owner off-site checklist lives at `~/Desktop/descent-tcg-checklist.md` (2026-08-26):
  Google Business Profile first, then Search Console (verify, sitemap, change of address
  from rippingzacks.com), Bing, Apple Business Connect, NAP citations, Instagram bio
  link, TCGplayer link, review asks. Several steps unlock site follow-ups — check there.
- Waiting on owner: shop hours → add `openingHoursSpecification` to LocalBusiness schema.
- Performance pass (done 2026-08-25): card photos live in `assets/photos/{lorcana,marketing,boosters}/`
  as files (data JS shrank from 1–3.2MB to 20–92KB; prerendered pages now 36–108KB).
  Renderer images get `loading="lazy"`. When adding photos to data files, add asset
  files under `assets/photos/…`, not base64.
- `fortknox.js` is unused legacy (kept for reference, excluded from `dist/`). Fort Knox
  page is a content-wrapped Collectr iframe; the Collectr account is not accessible, so
  the live inventory embed stays as-is.
- Form endpoints have best-effort per-IP throttling (5 submissions / 10 min per warm
  instance, see `api/_mail.js`). Not a hard guarantee — serverless instances reset.
- Content engine (planned 2026-08-26, awaiting owner "go"): `/guides/` hub + article
  template (question H1, 40-word direct answer, comparison/price table, FAQ+Article
  schema, "last verified" stamp, vault links, offer CTA, gremlin hero image). Cadence:
  2 articles/month + monthly price-guide refreshes. First: Lorcana chase-card price
  guide, Pokémon sealed price guide, "What are my cards worth?", raw-vs-graded math,
  fake-slab spotting, MTG Universes Beyond chase cards.
- Small open items: custom gremlin 404 page; real storefront photo for our-store;
  delete stale local clone `~/ripping-zacks-website` (3 commits behind); Zolta mascot
  name availability check.
- Long-term: replace TCGplayer Pro storefront (dig.tcgplayerpro.com) with own store —
  vault/shop-hub URLs are designed to become the future category pages.

## Secrets policy

Tokens/keys (GitHub, Cloudflare, Vercel, Resend) were shared in chat during setup — never
commit them. Resend key lives only in Vercel env vars.
