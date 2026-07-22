// ============================================================
// RIPPING ZACKS — Boosters (boosters.html)
// Fully hardcoded — set name, release year, booster box price,
// and sealed-product counts (booster boxes / cases / Pokemon
// Center ETBs) are all maintained directly in this file.
// Update this data only when told to (e.g. "bought 1 booster
// box of Evolving Skies" or "set Base Set Unlimited to $12000").
// ============================================================

// Hardcoded set list — updated by request only.
const BOOSTERS_ITEMS = [
  { name: 'Base Set (Unlimited)', year: '1999', price: 0 },
  { name: 'Base Set (Shadowless)', year: '1999', price: 0 },
  { name: 'Jungle (1st Edition)', year: '1999', price: 0 },
  { name: 'Jungle (Unlimited)', year: '1999', price: 0 },
  { name: 'Fossil (1st Edition)', year: '1999', price: 0 },
  { name: 'Fossil (Unlimited)', year: '1999', price: 0 },
  { name: 'Base Set 2', year: '2000', price: 0 },
  { name: 'Team Rocket (1st Edition)', year: '2000', price: 0 },
  { name: 'Gym Heroes (1st Edition)', year: '2000', price: 0 },
  { name: 'Gym Heroes (Unlimited)', year: '2000', price: 0 },
  { name: 'Gym Challenge (1st Edition)', year: '2000', price: 0 },
  { name: 'Gym Challenge (Unlimited)', year: '2000', price: 0 },
  { name: 'Neo Genesis (1st Edition)', year: '2000', price: 0 },
  { name: 'Ruby & Sapphire', year: '2003', price: 0 },
  { name: 'Hidden Legends', year: '2004', price: 0 },
  { name: 'FireRed & LeafGreen', year: '2004', price: 0 },
  { name: 'Crystal Guardians', year: '2006', price: 0 },
  { name: 'Power Keepers', year: '2007', price: 0 },
  { name: 'Diamond and Pearl', year: '2007', price: 0 },
  { name: 'Mysterious Treasures', year: '2007', price: 0 },
  { name: 'Great Encounters', year: '2008', price: 0 },
  { name: 'Stormfront', year: '2008', price: 0 },
  { name: 'Supreme Victors', year: '2009', price: 0 },
  { name: 'Arceus', year: '2009', price: 0 },
  { name: 'Unleashed', year: '2009', price: 0 },
  { name: 'Undaunted', year: '2010', price: 0 },
  { name: 'Triumphant', year: '2010', price: 0 },
  { name: 'Call of Legends', year: '2011', price: 0 },
  { name: 'Black and White', year: '2011', price: 0 },
  { name: 'Emerging Powers', year: '2011', price: 0 },
  { name: 'Noble Victories', year: '2011', price: 0 },
  { name: 'Next Destinies', year: '2012', price: 0 },
  { name: 'Dark Explorers', year: '2012', price: 0 },
  { name: 'Dragons Exalted', year: '2012', price: 0 },
  { name: 'Boundaries Crossed', year: '2012', price: 0 },
  { name: 'Plasma Storm', year: '2013', price: 0 },
  { name: 'Plasma Freeze', year: '2013', price: 0 },
  { name: 'Plasma Blast', year: '2013', price: 0 },
  { name: 'Legendary Treasures', year: '2013', price: 0 },
  { name: 'XY Base Set', year: '2014', price: 0 },
  { name: 'Flashfire', year: '2014', price: 0 },
  { name: 'Furious Fists', year: '2014', price: 0 },
  { name: 'Phantom Forces', year: '2014', price: 0 },
  { name: 'Primal Clash', year: '2015', price: 0 },
  { name: 'Roaring Skies', year: '2015', price: 0 },
  { name: 'Ancient Origins', year: '2015', price: 0 },
  { name: 'BREAKthrough', year: '2015', price: 0 },
  { name: 'BREAKpoint', year: '2016', price: 0 },
  { name: 'Fates Collide', year: '2016', price: 0 },
  { name: 'Steam Siege', year: '2016', price: 0 },
  { name: 'Evolutions', year: '2016', price: 0 },
  { name: 'Sun & Moon Base Set', year: '2017', price: 0 },
  { name: 'Guardians Rising', year: '2017', price: 0 },
  { name: 'Burning Shadows', year: '2017', price: 0 },
  { name: 'Crimson Invasion', year: '2017', price: 0 },
  { name: 'Ultra Prism', year: '2018', price: 0 },
  { name: 'Forbidden Light', year: '2018', price: 0 },
  { name: 'Celestial Storm', year: '2018', price: 0 },
  { name: 'Lost Thunder', year: '2018', price: 0 },
  { name: 'Team Up', year: '2019', price: 0 },
  { name: 'Unbroken Bonds', year: '2019', price: 0 },
  { name: 'Unified Minds', year: '2019', price: 0 },
  { name: 'Cosmic Eclipse', year: '2019', price: 0 },
  { name: 'Sword & Shield Base Set', year: '2020', price: 0 },
  { name: 'Rebel Clash', year: '2020', price: 0 },
  { name: 'Darkness Ablaze', year: '2020', price: 0 },
  { name: 'Vivid Voltage', year: '2020', price: 0 },
  { name: 'Battle Styles', year: '2021', price: 0 },
  { name: 'Chilling Reign', year: '2021', price: 0 },
  { name: 'Evolving Skies', year: '2021', price: 0 },
  { name: 'Fusion Strike', year: '2021', price: 0 },
  { name: 'Brilliant Stars', year: '2022', price: 0 },
  { name: 'Astral Radiance', year: '2022', price: 0 },
  { name: 'Lost Origin', year: '2022', price: 0 },
  { name: 'Silver Tempest', year: '2022', price: 0 },
  { name: 'Scarlet & Violet Base Set', year: '2023', price: 0 },
  { name: 'Paldea Evolved', year: '2023', price: 0 },
  { name: 'Obsidian Flames', year: '2023', price: 0 },
  { name: 'Paradox Rift', year: '2023', price: 0 },
  { name: 'Temporal Forces', year: '2024', price: 0 },
  { name: 'Twilight Masquerade', year: '2024', price: 0 },
  { name: 'Stellar Crown', year: '2024', price: 0 },
  { name: 'Surging Sparks', year: '2024', price: 0 },
  { name: 'Journey Together', year: '2025', price: 0 },
  { name: 'Destined Rivals', year: '2025', price: 0 },
  { name: 'Mega Evolution Base Set', year: '2026', price: 0 },
  { name: 'Phantasmal Flames', year: '2026', price: 0 },
  { name: 'Perfect Order', year: '2026', price: 0 },
  { name: 'Chaos Rising', year: '2026', price: 0 },
  { name: 'Pitch Black', year: '2026', price: 0 },
];

// Hardcoded sealed-product inventory per set — updated by
// request only, not editable in-browser.
const BOOSTERS_INVENTORY = {
  'base set (unlimited)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'base set (shadowless)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'jungle (1st edition)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'jungle (unlimited)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'fossil (1st edition)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'fossil (unlimited)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'base set 2': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'team rocket (1st edition)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'gym heroes (1st edition)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'gym heroes (unlimited)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'gym challenge (1st edition)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'gym challenge (unlimited)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'neo genesis (1st edition)': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'ruby & sapphire': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'hidden legends': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'firered & leafgreen': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'crystal guardians': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'power keepers': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'diamond and pearl': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'mysterious treasures': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'great encounters': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'stormfront': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'supreme victors': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'arceus': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'unleashed': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'undaunted': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'triumphant': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'call of legends': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'black and white': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'emerging powers': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'noble victories': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'next destinies': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'dark explorers': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'dragons exalted': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'boundaries crossed': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'plasma storm': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'plasma freeze': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'plasma blast': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'legendary treasures': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'xy base set': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'flashfire': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'furious fists': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'phantom forces': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'primal clash': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'roaring skies': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'ancient origins': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'breakthrough': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'breakpoint': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'fates collide': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'steam siege': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'evolutions': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'sun & moon base set': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'guardians rising': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'burning shadows': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'crimson invasion': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'ultra prism': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'forbidden light': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'celestial storm': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'lost thunder': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'team up': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'unbroken bonds': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'unified minds': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'cosmic eclipse': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'sword & shield base set': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'rebel clash': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'darkness ablaze': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'vivid voltage': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'battle styles': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'chilling reign': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'evolving skies': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'fusion strike': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'brilliant stars': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'astral radiance': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'lost origin': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'silver tempest': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'scarlet & violet base set': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'paldea evolved': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'obsidian flames': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'paradox rift': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'temporal forces': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'twilight masquerade': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'stellar crown': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'surging sparks': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'journey together': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'destined rivals': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'mega evolution base set': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'phantasmal flames': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'perfect order': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'chaos rising': { boosterBoxes: 0, cases: 0, etbs: 0 },
  'pitch black': { boosterBoxes: 0, cases: 0, etbs: 0 },
};

let boostersSearchTerm = '';

function itemKeyFor(name) {
  return (name || '').trim().toLowerCase();
}

function buildBoosterCard(item) {
  const key = itemKeyFor(item.name);
  const inventory = BOOSTERS_INVENTORY[key] || { boosterBoxes: 0, cases: 0, etbs: 0 };
  const hasStock = inventory.boosterBoxes > 0 || inventory.cases > 0 || inventory.etbs > 0;

  const card = document.createElement('article');
  card.className = 'card-slab';
  if (hasStock) card.classList.add('in-stock');

  const label = document.createElement('div');
  label.className = 'card-slab-label';
  const yearSpan = document.createElement('span');
  yearSpan.textContent = item.year || '';
  label.appendChild(yearSpan);
  card.appendChild(label);

  const body = document.createElement('div');
  body.className = 'card-body';

  const h3 = document.createElement('h3');
  h3.textContent = item.name || 'Untitled';
  body.appendChild(h3);

  function buildQtyDisplay(labelText, qty) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:6px;';

    const lbl = document.createElement('span');
    lbl.textContent = labelText;
    lbl.style.cssText = 'font-family:var(--mono); font-size:0.7rem; color:var(--ink-faint); text-transform:uppercase; letter-spacing:0.03em;';
    wrap.appendChild(lbl);

    const value = document.createElement('span');
    value.textContent = String(qty);
    value.style.cssText = `font-family:var(--mono); font-weight:700; font-size:0.9rem; color:${qty > 0 ? 'var(--mint)' : 'var(--ink-faint)'};`;
    wrap.appendChild(value);

    return wrap;
  }

  const qtyBlock = document.createElement('div');
  qtyBlock.style.cssText = 'margin-bottom:12px;';
  qtyBlock.appendChild(buildQtyDisplay('Booster Boxes', inventory.boosterBoxes));
  qtyBlock.appendChild(buildQtyDisplay('Cases', inventory.cases));
  qtyBlock.appendChild(buildQtyDisplay('Pokemon Center ETBs', inventory.etbs));
  body.appendChild(qtyBlock);

  const priceRow = document.createElement('div');
  priceRow.className = 'card-footer';
  const priceDisplay = document.createElement('div');
  priceDisplay.className = 'card-price';
  const priceNum = parseFloat(item.price) || 0;
  priceDisplay.textContent = '$' + priceNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  priceDisplay.style.cssText = 'background:var(--paper); border:1px solid var(--line); border-radius:6px; padding:6px 10px; width:100%; font-family:var(--mono); color:var(--ink); text-align:center; font-weight:700;';
  priceRow.appendChild(priceDisplay);
  body.appendChild(priceRow);

  card.appendChild(body);
  return card;
}

function renderBoostersGrid() {
  const grid = document.getElementById('boosters-grid');
  const count = document.getElementById('boosters-count');
  if (!grid || !count) return;

  const term = boostersSearchTerm.trim().toLowerCase();
  const visible = term
    ? BOOSTERS_ITEMS.filter(i => (i.name || '').toLowerCase().includes(term))
    : BOOSTERS_ITEMS;

  count.textContent = visible.length + (visible.length === 1 ? ' set' : ' sets');
  grid.innerHTML = '';

  if (!visible.length) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--ink-faint)';
    empty.textContent = 'No sets match your search.';
    grid.appendChild(empty);
    return;
  }

  visible.forEach(item => {
    grid.appendChild(buildBoosterCard(item));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderBoostersGrid();

  const search = document.getElementById('boosters-search');
  if (search) {
    search.addEventListener('input', () => {
      boostersSearchTerm = search.value;
      renderBoostersGrid();
    });
  }
});
