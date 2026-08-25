// ============================================================
// BUILD-TIME PRERENDER
// Each vault page renders its inventory client-side, which means
// search engines and AI crawlers see an empty container. This
// script runs each vault page through jsdom — executing the
// page's own data + renderer scripts exactly as a browser would —
// then serializes the fully-rendered DOM back to static HTML.
//
// Output: dist/ contains the 4 prerendered vault pages plus
// verbatim copies of every other site file. The api/ directory
// is intentionally NOT copied — Vercel builds those serverless
// functions from the project root independently of the static
// output directory.
//
// The client-side <script> tags stay in the prerendered output.
// Every renderer clears its container before rendering
// (content.innerHTML = ''), so re-running in the browser on top
// of the prerendered DOM is idempotent — no duplicate inventory.
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM, ResourceLoader } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE_ORIGIN = 'https://descenttcg.com';

// Never copied into dist/. api/ stays out because those are Vercel
// serverless functions, not static files. scripts/ and the package
// files are build tooling, not site content.
const EXCLUDE_FROM_COPY = new Set([
  '.git',
  '.vercel',
  'node_modules',
  'dist',
  'scripts',
  'api',
  'package.json',
  'package-lock.json',
  '.DS_Store',
]);

const VAULT_PAGES = ['collection.html', 'slab-vault.html', 'sealed-vault.html', 'fort-knox-vault.html'];

// ------------------------------------------------------------
// Static copy of everything that isn't build tooling.
// ------------------------------------------------------------
function copySite() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  function walk(srcDir, destDir) {
    for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
      if (EXCLUDE_FROM_COPY.has(entry.name)) continue;
      const src = path.join(srcDir, entry.name);
      const dest = path.join(destDir, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        walk(src, dest);
      } else if (entry.isFile()) {
        fs.copyFileSync(src, dest);
      }
    }
  }

  walk(ROOT, DIST);
}

// ------------------------------------------------------------
// Only load file: resources (the page's own scripts). External
// URLs (Google Fonts CSS, the Collectr iframe) resolve to empty
// responses so the build never touches the network.
// ------------------------------------------------------------
class LocalOnlyResourceLoader extends ResourceLoader {
  fetch(url, options) {
    if (url.startsWith('file:')) {
      return super.fetch(url, options);
    }
    return Promise.resolve(Buffer.alloc(0));
  }
}

function installBrowserShims(window) {
  // jsdom lacks these; shim them inside the jsdom context so the
  // data/renderer files (which must not be edited) run unmodified.
  if (typeof window.IntersectionObserver !== 'function') {
    window.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
    };
  }
  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() { return false; },
    });
  }
}

async function prerenderPage(page) {
  const dom = await JSDOM.fromFile(path.join(ROOT, page), {
    runScripts: 'dangerously',
    resources: new LocalOnlyResourceLoader(),
    pretendToBeVisual: true,
    beforeParse(window) {
      installBrowserShims(window);
    },
  });

  await new Promise((resolve) => {
    if (dom.window.document.readyState === 'complete') {
      resolve();
    } else {
      dom.window.addEventListener('load', () => resolve(), { once: true });
    }
  });
  // Settle time for any deferred work after load.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return dom;
}

// ------------------------------------------------------------
// JSON-LD (schema.org ItemList of Products) derived from each
// page's own data globals after its scripts have executed — the
// same source of truth the renderer uses.
// ------------------------------------------------------------
function product(name, pageUrl, price) {
  const p = {
    '@type': 'Product',
    name,
    url: pageUrl,
  };
  if (typeof price === 'number' && price > 0) {
    p.offers = {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: 'USD',
      url: pageUrl,
    };
  }
  return p;
}

function injectJsonLd(dom, page, items) {
  const pageUrl = `${SITE_ORIGIN}/${page}`;
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: product(it.name, pageUrl, it.price),
    })),
  };
  const script = dom.window.document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(itemList);
  dom.window.document.head.appendChild(script);
  return items.length;
}

// The data files declare their globals with top-level `const`,
// which creates global *lexical* bindings — they are visible to
// every script on the page but are NOT properties of `window`.
// `window.eval` sees them; `window.LORCANA_ITEMS` would not.
function evalIn(window, expression, fallback) {
  try {
    const value = window.eval(expression);
    return value === undefined ? fallback : value;
  } catch {
    return fallback;
  }
}

function itemsForCollection(window) {
  const items = evalIn(window, 'typeof LORCANA_ITEMS !== "undefined" ? LORCANA_ITEMS : []', [])
    .filter((i) => i.owned)
    .map((i) => ({ name: i.name, price: i.marketPrice }));

  // Sealed Products showcase — every set with box/case/promo-set
  // stock, named the same way the renderer names its plaques.
  const inventory = evalIn(window, 'typeof LORCANA_SET_INVENTORY !== "undefined" ? LORCANA_SET_INVENTORY : {}', {});
  const displayNames = evalIn(window, 'typeof LORCANA_SET_DISPLAY_NAMES !== "undefined" ? LORCANA_SET_DISPLAY_NAMES : {}', {});
  const properCaseByKey = {};
  evalIn(window, 'typeof LORCANA_ITEMS !== "undefined" ? LORCANA_ITEMS : []', []).forEach((i) => {
    const k = (i.set || '').trim().toLowerCase();
    if (!properCaseByKey[k]) properCaseByKey[k] = i.set;
  });
  Object.keys(inventory).forEach((key) => {
    const inv = inventory[key] || {};
    if ((inv.boosterBoxes || 0) > 0 || (inv.cases || 0) > 0 || (inv.promoSets || 0) > 0) {
      items.push({ name: properCaseByKey[key] || displayNames[key] || key, price: null });
    }
  });
  return items;
}

function itemsForSlabVault(window) {
  return evalIn(window, 'typeof TRACKER_ITEMS !== "undefined" ? TRACKER_ITEMS : []', [])
    .filter((i) => i.owned)
    .map((i) => ({ name: i.name, price: i.marketPrice }));
}

function itemsForSealedVault(window) {
  const items = [];
  const inventory = evalIn(window, 'typeof BOOSTERS_INVENTORY !== "undefined" ? BOOSTERS_INVENTORY : {}', {});
  const keyFor = (n) => (n || '').trim().toLowerCase();

  evalIn(window, 'typeof BOOSTERS_ITEMS !== "undefined" ? BOOSTERS_ITEMS : []', []).forEach((i) => {
    const inv = inventory[keyFor(i.name)] || {};
    if ((inv.boosterBoxes || 0) > 0 || (inv.cases || 0) > 0 || (inv.etbs || 0) > 0 || (inv.upc || 0) > 0) {
      items.push({ name: i.name, price: i.marketPrice });
    }
  });
  evalIn(window, 'typeof BOOSTERS_PACKS !== "undefined" ? BOOSTERS_PACKS : []', []).forEach((p) => {
    if ((p.qty || 0) > 0) items.push({ name: p.name, price: p.price });
  });
  evalIn(window, 'typeof BOOSTERS_OTHER !== "undefined" ? BOOSTERS_OTHER : []', []).forEach((p) => {
    if ((p.qty || 0) > 0) items.push({ name: p.name, price: p.price });
  });
  evalIn(window, 'typeof MAGIC_TMNT_ITEMS !== "undefined" ? MAGIC_TMNT_ITEMS : []', []).forEach((i) => {
    if ((i.qty || 0) > 0) items.push({ name: i.name, price: i.marketPrice });
  });
  evalIn(window, 'typeof JP_SPECIALS_ITEMS !== "undefined" ? JP_SPECIALS_ITEMS : []', []).forEach((i) => {
    if ((i.qty || 0) > 0) items.push({ name: i.name, price: null });
  });
  return items;
}

// fort-knox-vault.html is a third-party Collectr iframe page — it
// does not load fortknox.js, so its data globals are evaluated
// directly in a Node vm sandbox here (fortknox.js only defines
// plain data + a key helper; no DOM access at load time).
function itemsForFortKnox() {
  const code = fs.readFileSync(path.join(ROOT, 'fortknox.js'), 'utf8');
  const items = vm.runInNewContext(`${code}\n;FORT_KNOX_ITEMS;`, Object.create(null));
  return (items || [])
    .filter((i) => (i.qty || 0) > 0)
    .map((i) => ({ name: i.name, price: i.price }));
}

// ------------------------------------------------------------
async function main() {
  console.log('Copying site files to dist/ ...');
  copySite();

  const itemBuilders = {
    'collection.html': itemsForCollection,
    'slab-vault.html': itemsForSlabVault,
    'sealed-vault.html': itemsForSealedVault,
  };

  for (const page of VAULT_PAGES) {
    console.log(`Prerendering ${page} ...`);
    const dom = await prerenderPage(page);

    let items;
    if (page === 'fort-knox-vault.html') {
      items = itemsForFortKnox();
    } else {
      items = itemBuilders[page](dom.window);
    }
    const count = injectJsonLd(dom, page, items);

    fs.writeFileSync(path.join(DIST, page), dom.serialize());
    console.log(`  -> dist/${page} (${count} JSON-LD products)`);

    dom.window.close();
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
