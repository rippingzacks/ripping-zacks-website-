// ============================================================
// MY COLLECTION — Illumineer's Vault
// Reads the same LORCANA_ITEMS / LORCANA_SET_INVENTORY /
// LORCANA_PERMANENT_PHOTOS / LORCANA_SET_PHOTOS data defined in
// lorcana.js (loaded before this file). There is no separate
// data source here on purpose — whatever is marked owned or
// stocked on the Lorcana Chase Cards page is exactly what shows
// up here, automatically, with zero extra upkeep.
// ============================================================

function renderVaultEmpty(container) {
  const empty = document.createElement('div');
  empty.className = 'vault-empty';
  empty.innerHTML = `
    <h3>The vault is still empty</h3>
    <p>Nothing has been pulled from the inkwell yet — check back once the first card or box is in hand.</p>
  `;
  container.appendChild(empty);
}

function buildVaultPlaque(item) {
  const key = lorcanaKeyFor(item.name);
  const photoSrc = LORCANA_PERMANENT_PHOTOS[key];

  const plaque = document.createElement('article');
  plaque.className = 'vault-plaque';

  const corner1 = document.createElement('span'); corner1.className = 'corner-bl';
  const corner2 = document.createElement('span'); corner2.className = 'corner-br';
  plaque.appendChild(corner1);
  plaque.appendChild(corner2);

  if (photoSrc) {
    const art = document.createElement('div');
    art.className = 'vault-plaque-art';
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = item.name || '';
    art.appendChild(img);
    plaque.appendChild(art);
  }

  const rarity = document.createElement('span');
  rarity.className = 'vault-plaque-rarity';
  rarity.textContent = item.rarity || '';
  if (item.rarity === 'Iconic') {
    rarity.style.color = 'var(--vault-gold-br)';
    rarity.style.fontWeight = '700';
  }
  plaque.appendChild(rarity);

  if (item.grade) {
    const grade = document.createElement('span');
    grade.className = 'vault-plaque-grade';
    grade.textContent = item.grade;
    plaque.appendChild(grade);
  }

  const h3 = document.createElement('h3');
  h3.textContent = item.name || 'Untitled';
  plaque.appendChild(h3);

  const setLine = document.createElement('span');
  setLine.className = 'vault-plaque-set';
  setLine.textContent = item.set || '';
  plaque.appendChild(setLine);

  return plaque;
}

function buildVaultSet(setName, ownedCards, inventory) {
  const key = setName.trim().toLowerCase();
  const photoSrc = LORCANA_SET_PHOTOS[key];

  const section = document.createElement('div');
  section.className = 'vault-set';

  const header = document.createElement('div');
  header.className = 'vault-set-header';

  if (photoSrc) {
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = setName;
    header.appendChild(img);
  }

  const h2 = document.createElement('h2');
  h2.textContent = setName;
  header.appendChild(h2);

  if (inventory.boosterBoxes > 0 || inventory.cases > 0) {
    const sealed = document.createElement('span');
    sealed.className = 'vault-set-sealed';
    const parts = [];
    if (inventory.boosterBoxes > 0) parts.push(`<strong>${inventory.boosterBoxes}</strong> booster box${inventory.boosterBoxes === 1 ? '' : 'es'}`);
    if (inventory.cases > 0) parts.push(`<strong>${inventory.cases}</strong> case${inventory.cases === 1 ? '' : 's'}`);
    sealed.innerHTML = parts.join(' &nbsp;•&nbsp; ');
    header.appendChild(sealed);
  }

  section.appendChild(header);

  if (ownedCards.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'vault-grid';
    ownedCards.forEach(item => grid.appendChild(buildVaultPlaque(item)));
    section.appendChild(grid);
  } else {
    const note = document.createElement('p');
    note.style.cssText = 'color:var(--vault-faint); font-family:var(--mono); font-size:0.82rem;';
    note.textContent = 'No individual chase cards owned yet from this set.';
    section.appendChild(note);
  }

  return section;
}

function renderVault() {
  const content = document.getElementById('vault-content');
  if (!content) return;

  content.innerHTML = '';

  const ownedItems = LORCANA_ITEMS.filter(i => i.owned);
  const ownedIconic = ownedItems.filter(i => i.rarity === 'Iconic').length;
  const ownedEnchanted = ownedItems.filter(i => i.rarity !== 'Iconic').length;
  let totalBoxes = 0;
  let totalCases = 0;
  Object.values(LORCANA_SET_INVENTORY).forEach(inv => {
    totalBoxes += inv.boosterBoxes || 0;
    totalCases += inv.cases || 0;
  });

  const cardsIconicEl = document.getElementById('stat-cards-iconic');
  const cardsEnchantedEl = document.getElementById('stat-cards-enchanted');
  const boxesEl = document.getElementById('stat-boxes');
  const casesEl = document.getElementById('stat-cases');
  if (cardsIconicEl) cardsIconicEl.textContent = ownedIconic;
  if (cardsEnchantedEl) cardsEnchantedEl.textContent = ownedEnchanted;
  if (boxesEl) boxesEl.textContent = totalBoxes;
  if (casesEl) casesEl.textContent = totalCases;

  if (ownedItems.length === 0 && totalBoxes === 0 && totalCases === 0) {
    renderVaultEmpty(content);
    return;
  }

  // Walk sets in the order they first appear in LORCANA_ITEMS
  const seenSets = [];
  LORCANA_ITEMS.forEach(item => {
    if (!seenSets.includes(item.set)) seenSets.push(item.set);
  });

  seenSets.forEach(setName => {
    const key = setName.trim().toLowerCase();
    const inventory = LORCANA_SET_INVENTORY[key] || { boosterBoxes: 0, cases: 0 };
    const ownedCards = LORCANA_ITEMS.filter(i => i.set === setName && i.owned);

    if (ownedCards.length === 0 && inventory.boosterBoxes === 0 && inventory.cases === 0) {
      return; // nothing to show for this set
    }

    content.appendChild(buildVaultSet(setName, ownedCards, inventory));
  });
}

document.addEventListener('DOMContentLoaded', renderVault);
