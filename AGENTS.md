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
  linked in all footers, contact page, and schema `sameAs`.

## Brand & logo (as of 2026-08-27, rebrand branch)

- Site logo: `assets/gremlin-mark.png` (single yellow-stroke gremlin, transparent) in
  header/footer of every page; wordmark renders "TCG" in `.logo-accent` yellow.
  Header mark height 56px, footer 64px. Favicons regenerated from the mark.
  `assets/logo.png` (1200x630 dragon+wordmark lockup) is still the og:image and schema
  logo (new social card pending). Old `assets/descent-mark.png` kept in repo for rollback.
- Palette (re-themed 2026-08-27): electric yellow #FFD100 accent on jet black #0A0A0A,
  charcoal panels #1A1A1A/#242424, white/soft-white #F5F5F0 text, ember #FF4D2E second
  accent (--citrus). Token NAMES unchanged (--paper, --paper-soft, --cobalt...) — only
  values remapped. Homepage hero has a subtle gremlin watermark (::after, hidden <768px).
  Vault pages (collection/sealed-vault/slab-vault.css) keep their own per-vault palettes.
- `assets/logo.jpg` is now the **Ripping Zacks** brand mark only — used on
  `ripping-zacks.html` (community-brand landing page, links to the RZ Instagram).
- Logo was AI-generated (GPT Image 2 via Higgsfield); source candidates in /tmp were not
  committed. Regenerate rather than edit raster files.
- Header layout (2026-08-26): `.logo-mark` is height 80px/width auto; `.logo` and
  `.nav-links` are `white-space:nowrap` — all 9 nav items fit one line. Don't re-add
  wrapping.
- Possible future move: full site re-theme to dragon palette (deferred — owner wants
  partner sign-off on the logo first).

## Parked / next up

- Google Business Profile for the Bradenton address (biggest local lever, off-site).
- Search Console: verify descenttcg.com property, submit change of address from
  rippingzacks.com, submit sitemap.
- Performance pass (done 2026-08-25): card photos live in `assets/photos/{lorcana,marketing,boosters}/`
  as files (data JS shrank from 1–3.2MB to 20–92KB; prerendered pages now 36–108KB).
  Renderer images get `loading="lazy"`. When adding photos to data files, add asset
  files under `assets/photos/…`, not base64.
- `fortknox.js` is unused legacy (kept for reference, excluded from `dist/`). Fort Knox
  page is a content-wrapped Collectr iframe; the Collectr account is not accessible, so
  the live inventory embed stays as-is.
- Design: full site re-theme to the black/electric-yellow gremlin palette DONE on the
  `rebrand` branch (2026-08-27) — tokens remapped, gremlin mark in header/footer. Old
  dragon assets kept for rollback; og:image swap pending new social card.
- Form endpoints have best-effort per-IP throttling (5 submissions / 10 min per warm
  instance, see `api/_mail.js`). Not a hard guarantee — serverless instances reset.
- Content plays (AEO compounding): chase-card price guides, set spotlight pages.
- Long-term: replace TCGplayer Pro storefront (dig.tcgplayerpro.com) with own store —
  vault/shop-hub URLs are designed to become the future category pages.

## Secrets policy

Tokens/keys (GitHub, Cloudflare, Vercel, Resend) were shared in chat during setup — never
commit them. Resend key lives only in Vercel env vars.
