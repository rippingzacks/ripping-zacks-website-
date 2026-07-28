// ============================================================
// SEALED VAULT
// Reads the same BOOSTERS_ITEMS / BOOSTERS_INVENTORY data
// defined in boosters.js (loaded before this file). Whatever is
// marked owned on the Boosters page shows up here automatically
// — no separate data source, no extra upkeep.
// ============================================================

function renderSealedVaultEmpty(container) {
  const empty = document.createElement('div');
  empty.className = 'vault-empty';
  empty.innerHTML = `
    <h3>The vault is still empty</h3>
    <p>Nothing sealed has made it into storage yet — check back once the first box arrives.</p>
  `;
  container.appendChild(empty);
}

function buildSealedVaultPlaque(item, inventory, key) {
  const plaque = document.createElement('article');
  plaque.className = 'vault-plaque';

  const corner1 = document.createElement('span'); corner1.className = 'corner-bl';
  const corner2 = document.createElement('span'); corner2.className = 'corner-br';
  plaque.appendChild(corner1);
  plaque.appendChild(corner2);

  const photoSrc = (typeof BOOSTERS_SET_PHOTOS !== 'undefined') ? BOOSTERS_SET_PHOTOS[key] : null;
  if (photoSrc) {
    const art = document.createElement('div');
    art.className = 'sealed-vault-plaque-art';
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = item.name || 'Sealed product';
    img.loading = 'lazy';
    art.appendChild(img);
    plaque.appendChild(art);
  }

  const body = document.createElement('div');
  body.className = 'sealed-vault-plaque-body';

  const year = document.createElement('span');
  year.className = 'vault-plaque-rarity';
  year.textContent = item.year || '';
  body.appendChild(year);

  const h3 = document.createElement('h3');
  h3.textContent = item.name || 'Untitled';
  body.appendChild(h3);

  function buildQtyLine(labelText, qty) {
    const row = document.createElement('div');
    row.className = 'sealed-vault-plaque-qty';
    const lbl = document.createElement('span');
    lbl.textContent = labelText;
    const val = document.createElement('span');
    val.textContent = String(qty);
    if (qty === 0) val.style.color = 'var(--vault-faint)';
    row.appendChild(lbl);
    row.appendChild(val);
    return row;
  }

  body.appendChild(buildQtyLine('Booster Boxes', inventory.boosterBoxes));
  body.appendChild(buildQtyLine('Cases', inventory.cases));
  body.appendChild(buildQtyLine('Pokemon Center ETBs', inventory.etbs));
  body.appendChild(buildQtyLine('Ultra Premium Collections', inventory.upc));

  plaque.appendChild(body);
  return plaque;
}

function renderSealedVault() {
  const content = document.getElementById('vault-content');
  if (!content) return;

  content.innerHTML = '';

  let totalBoxes = 0;
  let totalCases = 0;
  let totalEtbs = 0;
  let totalUpc = 0;
  const ownedSets = [];

  BOOSTERS_ITEMS.forEach(item => {
    const key = itemKeyFor(item.name);
    const inventory = BOOSTERS_INVENTORY[key] || { boosterBoxes: 0, cases: 0, etbs: 0, upc: 0 };
    totalBoxes += inventory.boosterBoxes || 0;
    totalCases += inventory.cases || 0;
    totalEtbs += inventory.etbs || 0;
    totalUpc += inventory.upc || 0;
    if (inventory.boosterBoxes > 0 || inventory.cases > 0 || inventory.etbs > 0 || inventory.upc > 0) {
      ownedSets.push({ item, inventory, key });
    }
  });

  const boxesEl = document.getElementById('stat-boxes');
  const casesEl = document.getElementById('stat-cases');
  const etbsEl = document.getElementById('stat-etbs');
  const upcEl = document.getElementById('stat-upc');
  if (boxesEl) boxesEl.textContent = totalBoxes;
  if (casesEl) casesEl.textContent = totalCases;
  if (etbsEl) etbsEl.textContent = totalEtbs;
  if (upcEl) upcEl.textContent = totalUpc;

  if (ownedSets.length === 0) {
    renderSealedVaultEmpty(content);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  ownedSets.forEach(({ item, inventory, key }) => grid.appendChild(buildSealedVaultPlaque(item, inventory, key)));
  content.appendChild(grid);
}

function buildPackPlaque(pack) {
  const plaque = document.createElement('article');
  plaque.className = 'vault-plaque pack-plaque';

  const corner1 = document.createElement('span'); corner1.className = 'corner-bl';
  const corner2 = document.createElement('span'); corner2.className = 'corner-br';
  plaque.appendChild(corner1);
  plaque.appendChild(corner2);

  const photoSrc = (typeof BOOSTERS_PACK_PHOTOS !== 'undefined') ? BOOSTERS_PACK_PHOTOS[pack.name.toLowerCase()] : null;
  if (photoSrc) {
    const art = document.createElement('div');
    art.className = 'sealed-vault-plaque-art';
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = pack.name || 'Booster pack';
    img.loading = 'lazy';
    art.appendChild(img);
    plaque.appendChild(art);
  }

  const body = document.createElement('div');
  body.className = 'sealed-vault-plaque-body';

  const set = document.createElement('span');
  set.className = 'vault-plaque-rarity';
  set.textContent = pack.set || '';
  body.appendChild(set);

  const h3 = document.createElement('h3');
  h3.textContent = pack.name || 'Untitled Pack';
  body.appendChild(h3);

  const row = document.createElement('div');
  row.className = 'sealed-vault-plaque-qty';
  const lbl = document.createElement('span');
  lbl.textContent = 'Amount';
  const val = document.createElement('span');
  val.textContent = String(pack.qty || 0);
  row.appendChild(lbl);
  row.appendChild(val);
  body.appendChild(row);

  plaque.appendChild(body);
  return plaque;
}

function renderPacksSection() {
  const content = document.getElementById('vault-packs-content');
  if (!content) return;

  content.innerHTML = '';

  const packs = (typeof BOOSTERS_PACKS !== 'undefined') ? BOOSTERS_PACKS.filter(p => p.qty > 0) : [];

  const totalPacks = packs.reduce((sum, p) => sum + (p.qty || 0), 0);
  const packsEl = document.getElementById('stat-packs');
  if (packsEl) packsEl.textContent = totalPacks;

  if (packs.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'vault-empty';
    empty.innerHTML = `
      <h3>No loose packs yet</h3>
      <p>Nothing individually packed has made it into storage yet — check back once the first one arrives.</p>
    `;
    content.appendChild(empty);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  packs.forEach(pack => grid.appendChild(buildPackPlaque(pack)));
  content.appendChild(grid);
}

function renderOtherSection() {
  const content = document.getElementById('vault-other-content');
  if (!content) return;

  content.innerHTML = '';

  const items = (typeof BOOSTERS_OTHER !== 'undefined') ? BOOSTERS_OTHER.filter(p => p.qty > 0) : [];

  const totalOther = items.reduce((sum, p) => sum + (p.qty || 0), 0);
  const otherEl = document.getElementById('stat-other');
  if (otherEl) otherEl.textContent = totalOther;

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'vault-empty';
    empty.innerHTML = `
      <h3>No other sealed items yet</h3>
      <p>Tins, deck displays, and other oddball sealed product will show up here once they arrive.</p>
    `;
    content.appendChild(empty);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  items.forEach(item => grid.appendChild(buildPackPlaque(item)));
  content.appendChild(grid);
}

document.addEventListener('DOMContentLoaded', renderSealedVault);
document.addEventListener('DOMContentLoaded', renderPacksSection);
document.addEventListener('DOMContentLoaded', renderOtherSection);
