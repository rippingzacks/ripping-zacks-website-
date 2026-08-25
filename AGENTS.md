# Descent TCG — project scratchpad

Static trading-card shop site. **Brand: Descent TCG** (formerly Ripping Zacks — legacy alias
kept on About page + Organization schema `alternateName`). Physical shop: 5205 33rd St E,
Bradenton, FL 34203. Contact email: sales@rippingzacks.com (mail still lives on the old
domain's M365 — do not move it).

## Stack & pipeline

- Plain HTML/CSS/JS, no framework. Repo root is the site.
- **Repo**: `sutika-capital/ripping-zacks-website-` (GitHub org). Push to `main` auto-deploys
  via Vercel git integration. Local clone: `~/ripping-zacks-website` (pushes auth as
  ryanhanley13 via keychain).
- **Vercel**: team `sutika-capital`, project `descenttcg`. `vercel.json` runs
  `npm run build` → `scripts/prerender.js` (Node + jsdom) → serves `dist/`.
- **Prerender**: the 3 vault pages render inventory client-side from data files; the build
  executes them in jsdom and emits static HTML + ItemList/Product JSON-LD so crawlers/AI see
  the cards. `fort-knox-vault.html` is a Collectr iframe; its JSON-LD is derived from
  `fortknox.js` directly. Prerendered pages are heavy (base64 photos in data files) —
  optimization backlog.
- **Forms**: `api/offer.js` + `api/contact.js` (Vercel serverless, CommonJS, zero deps) send
  via Resend (`api/_mail.js`). Env vars in Vercel: `RESEND_API_KEY`, `MAIL_FROM`
  (`Ripping Zacks <forms@descenttcg.com>`), `MAIL_TO` (`sales@rippingzacks.com`).
  Honeypot field: `bot-field`.
- **DNS** (Cloudflare): descenttcg.com A → 76.76.21.21 + CNAME www → cname.vercel-dns.com
  (both DNS-only; www 301s to apex at Vercel). rippingzacks.com + www point at the same
  Vercel project and 301 → descenttcg.com (path-preserving). Mail/M365 records on
  rippingzacks.com untouched — never modify them.
- **Redirects**: legacy pages lorcana/boosters/marketing.html 308 → vault pages
  (vercel.json); files deleted. Footers link vault pages only.
- Legacy Netlify hosting retired; old Netlify site can be deleted in the Netlify dashboard.

## Updating inventory (owner workflow)

Data files are hand-maintained — **edit only when explicitly told to**:
`lorcana.js` (Lorcana Vault), `marketing.js` (Slab Vault), `boosters.js` + `jp-specials.js`
+ `magic-tmnt.js` (Sealed Vault), `fortknox.js` (Fort Knox). Push to `main`; the build
re-prerenders automatically. Prices nullable (`null` = hidden).

## SEO/AEO state (as of 2026-08-25)

- Canonicals, robots.txt, sitemap.xml, llms.txt, og/twitter tags: done.
- Schema: LocalBusiness (our-store), Organization+WebSite (index), ItemList/Product+Offer
  (vault pages, injected at build).
- Titles/metas rewritten per page with keywords + Bradenton, FL.
- Instagram links are PLACEHOLDERS (https://instagram.com) — parked until the real handle
  is known. Also referenced on contact page.

## Parked / next up

- Real Instagram URL (owner to provide) — update footer + contact + sameAs in schema.
- Google Business Profile for the Bradenton address (biggest local lever, off-site).
- Search Console: verify descenttcg.com property, submit change of address from
  rippingzacks.com, submit sitemap.
- Performance pass (done 2026-08-25): card photos live in `assets/photos/{lorcana,marketing,boosters}/`
  as files (data JS shrank from 1–3.2MB to 20–92KB; prerendered pages now 36–108KB).
  Renderer images get `loading="lazy"`. When adding photos to data files, add asset
  files under `assets/photos/…`, not base64.
- `fortknox.js` is build-time only (read by `scripts/prerender.js` for Fort Knox
  JSON-LD; no page loads it) and is excluded from `dist/`.
- Form endpoints have best-effort per-IP throttling (5 submissions / 10 min per warm
  instance, see `api/_mail.js`). Not a hard guarantee — serverless instances reset.
- Content plays (AEO compounding): chase-card price guides, set spotlight pages.
- Long-term: replace TCGplayer Pro storefront (dig.tcgplayerpro.com) with own store —
  vault/shop-hub URLs are designed to become the future category pages.

## Secrets policy

Tokens/keys (GitHub, Cloudflare, Vercel, Resend) were shared in chat during setup — never
commit them. Resend key lives only in Vercel env vars.
