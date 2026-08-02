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

function buildSealedVaultPlaque(item, inventory, key, mode) {
  const plaque = document.createElement('article');
  plaque.className = 'vault-plaque';

  const corner1 = document.createElement('span'); corner1.className = 'corner-bl';
  const corner2 = document.createElement('span'); corner2.className = 'corner-br';
  plaque.appendChild(corner1);
  plaque.appendChild(corner2);

  let photoSrc = null;
  if (mode === 'etb') {
    photoSrc = (typeof BOOSTERS_SET_PHOTOS_ETB !== 'undefined') ? BOOSTERS_SET_PHOTOS_ETB[key] : null;
    // deliberately no fallback to the box photo here -- showing the same
    // booster box image on both the box and ETB entries for a set looked
    // like a duplicate/mistake. Better to show no photo than the wrong one.
  } else if (mode === 'upc') {
    photoSrc = (typeof BOOSTERS_SET_PHOTOS_UPC !== 'undefined') ? BOOSTERS_SET_PHOTOS_UPC[key] : null;
    // same principle as ETB -- UPC gets its own dedicated photo, never
    // borrowed from the box/case photo for this set.
  } else {
    photoSrc = (typeof BOOSTERS_SET_PHOTOS !== 'undefined') ? BOOSTERS_SET_PHOTOS[key] : null;
  }
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

  if (mode === 'etb') {
    body.appendChild(buildQtyLine('Pokemon Center ETBs', inventory.etbs));
  } else if (mode === 'upc') {
    body.appendChild(buildQtyLine('Ultra Premium Collections', inventory.upc));
  } else {
    body.appendChild(buildQtyLine('Booster Boxes', inventory.boosterBoxes));
    body.appendChild(buildQtyLine('Cases', inventory.cases));
  }

  plaque.appendChild(body);
  return plaque;
}

function renderSealedVault() {
  const boxesContent = document.getElementById('vault-content');
  const etbContent = document.getElementById('vault-etb-content');
  if (!boxesContent && !etbContent) return;

  if (boxesContent) boxesContent.innerHTML = '';
  if (etbContent) etbContent.innerHTML = '';

  let totalBoxes = 0;
  let totalCases = 0;
  let totalEtbs = 0;
  let totalUpc = 0;
  const boxSets = [];
  const etbSets = [];
  const upcSets = [];

  BOOSTERS_ITEMS.forEach(item => {
    const key = itemKeyFor(item.name);
    const inventory = BOOSTERS_INVENTORY[key] || { boosterBoxes: 0, cases: 0, etbs: 0, upc: 0 };
    totalBoxes += inventory.boosterBoxes || 0;
    totalCases += inventory.cases || 0;
    totalEtbs += inventory.etbs || 0;
    totalUpc += inventory.upc || 0;
    if (inventory.boosterBoxes > 0 || inventory.cases > 0) {
      boxSets.push({ item, inventory, key });
    }
    if (inventory.etbs > 0) {
      etbSets.push({ item, inventory, key });
    }
    if (inventory.upc > 0) {
      upcSets.push({ item, inventory, key });
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

  const sectionBoxesEl = document.getElementById('section-stat-boxes');
  const sectionEtbsEl = document.getElementById('section-stat-etbs');
  if (sectionBoxesEl) sectionBoxesEl.textContent = boxSets.length;
  if (sectionEtbsEl) sectionEtbsEl.textContent = etbSets.length;

  if (boxesContent) {
    if (boxSets.length === 0) {
      renderSealedVaultEmpty(boxesContent);
    } else {
      const grid = document.createElement('div');
      grid.className = 'vault-grid';
      boxSets.forEach(({ item, inventory, key }) => grid.appendChild(buildSealedVaultPlaque(item, inventory, key, 'box')));
      boxesContent.appendChild(grid);
    }
  }

  if (etbContent) {
    if (etbSets.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'vault-empty';
      empty.innerHTML = `
        <h3>No ETBs yet</h3>
        <p>Nothing sealed in this category has made it into storage yet — check back once the first one arrives.</p>
      `;
      etbContent.appendChild(empty);
    } else {
      const grid = document.createElement('div');
      grid.className = 'vault-grid';
      etbSets.forEach(({ item, inventory, key }) => grid.appendChild(buildSealedVaultPlaque(item, inventory, key, 'etb')));
      etbContent.appendChild(grid);
    }
  }

  // stash for renderOtherSection to pick up alongside BOOSTERS_OTHER
  window.__sealedVaultUpcSets = upcSets;
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
  const sectionPacksEl = document.getElementById('section-stat-packs');
  if (sectionPacksEl) sectionPacksEl.textContent = totalPacks;

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
  const upcSets = window.__sealedVaultUpcSets || [];

  const totalOther = items.reduce((sum, p) => sum + (p.qty || 0), 0)
    + upcSets.reduce((sum, s) => sum + (s.inventory.upc || 0), 0);
  const otherEl = document.getElementById('stat-other');
  if (otherEl) otherEl.textContent = totalOther;
  const sectionOtherEl = document.getElementById('section-stat-other');
  if (sectionOtherEl) sectionOtherEl.textContent = totalOther;

  if (items.length === 0 && upcSets.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'vault-empty';
    empty.innerHTML = `
      <h3>No other sealed items yet</h3>
      <p>Tins, deck displays, Ultra Premium Collections, and other oddball sealed product will show up here once they arrive.</p>
    `;
    content.appendChild(empty);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  upcSets.forEach(({ item, inventory, key }) => grid.appendChild(buildSealedVaultPlaque(item, inventory, key, 'upc')));
  items.forEach(item => grid.appendChild(buildPackPlaque(item)));
  content.appendChild(grid);
}

// ------------------------------------------------------------
// MAGIC: THE GATHERING — TEENAGE MUTANT NINJA TURTLES
// Reads MAGIC_TMNT_ITEMS / MAGIC_TMNT_PHOTOS from magic-tmnt.js.
// Rendered as its own highlighted section, styled via the
// .tmnt-highlight color overrides in sealed-vault.css.
// ------------------------------------------------------------
function buildTmntPlaque(item) {
  const plaque = document.createElement('article');
  plaque.className = 'vault-plaque';

  const corner1 = document.createElement('span'); corner1.className = 'corner-bl';
  const corner2 = document.createElement('span'); corner2.className = 'corner-br';
  plaque.appendChild(corner1);
  plaque.appendChild(corner2);

  const key = item.name.trim().toLowerCase();
  const photoSrc = (typeof MAGIC_TMNT_PHOTOS !== 'undefined') ? MAGIC_TMNT_PHOTOS[key] : null;
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

  const tag = document.createElement('span');
  tag.className = 'vault-plaque-rarity';
  tag.textContent = 'Magic: The Gathering';
  body.appendChild(tag);

  const h3 = document.createElement('h3');
  h3.textContent = item.short || item.name || 'Untitled';
  body.appendChild(h3);

  const qtyRow = document.createElement('div');
  qtyRow.className = 'sealed-vault-plaque-qty';
  const qtyLbl = document.createElement('span');
  qtyLbl.textContent = 'Units';
  const qtyVal = document.createElement('span');
  qtyVal.textContent = String(item.qty || 0);
  qtyRow.appendChild(qtyLbl);
  qtyRow.appendChild(qtyVal);
  body.appendChild(qtyRow);

  plaque.appendChild(body);
  return plaque;
}

function renderTmntSection() {
  const content = document.getElementById('vault-tmnt-content');
  if (!content) return;

  content.innerHTML = '';

  const items = (typeof MAGIC_TMNT_ITEMS !== 'undefined') ? MAGIC_TMNT_ITEMS : [];
  const totalItems = items.reduce((sum, i) => sum + (i.qty || 0), 0);

  const statEl = document.getElementById('section-stat-tmnt');
  if (statEl) statEl.textContent = totalItems;
  const heroStatEl = document.getElementById('stat-tmnt');
  if (heroStatEl) heroStatEl.textContent = totalItems;

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'vault-empty';
    empty.innerHTML = `
      <h3>No TMNT sealed product yet</h3>
      <p>Cowabunga's on hold — check back once the first turtle box shows up.</p>
    `;
    content.appendChild(empty);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  items.forEach(item => grid.appendChild(buildTmntPlaque(item)));
  content.appendChild(grid);
}

document.addEventListener('DOMContentLoaded', renderSealedVault);
document.addEventListener('DOMContentLoaded', renderPacksSection);
document.addEventListener('DOMContentLoaded', renderOtherSection);
document.addEventListener('DOMContentLoaded', renderTmntSection);
