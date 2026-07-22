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

function buildSealedVaultPlaque(item, inventory) {
  const plaque = document.createElement('article');
  plaque.className = 'vault-plaque';

  const corner1 = document.createElement('span'); corner1.className = 'corner-bl';
  const corner2 = document.createElement('span'); corner2.className = 'corner-br';
  plaque.appendChild(corner1);
  plaque.appendChild(corner2);

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
  const ownedSets = [];

  BOOSTERS_ITEMS.forEach(item => {
    const key = itemKeyFor(item.name);
    const inventory = BOOSTERS_INVENTORY[key] || { boosterBoxes: 0, cases: 0, etbs: 0 };
    totalBoxes += inventory.boosterBoxes || 0;
    totalCases += inventory.cases || 0;
    totalEtbs += inventory.etbs || 0;
    if (inventory.boosterBoxes > 0 || inventory.cases > 0 || inventory.etbs > 0) {
      ownedSets.push({ item, inventory });
    }
  });

  const boxesEl = document.getElementById('stat-boxes');
  const casesEl = document.getElementById('stat-cases');
  const etbsEl = document.getElementById('stat-etbs');
  if (boxesEl) boxesEl.textContent = totalBoxes;
  if (casesEl) casesEl.textContent = totalCases;
  if (etbsEl) etbsEl.textContent = totalEtbs;

  if (ownedSets.length === 0) {
    renderSealedVaultEmpty(content);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  ownedSets.forEach(({ item, inventory }) => grid.appendChild(buildSealedVaultPlaque(item, inventory)));
  content.appendChild(grid);
}

document.addEventListener('DOMContentLoaded', renderSealedVault);
