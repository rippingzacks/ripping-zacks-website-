// ============================================================
// SLAB VAULT
// Reads the same TRACKER_ITEMS / TRACKER_PERMANENT_PHOTOS data
// defined in marketing.js (loaded before this file). Whatever is
// marked owned on the Ponchos & Slab Tracker page shows up here
// automatically — no separate data source, no extra upkeep.
// ============================================================

function renderSlabVaultEmpty(container) {
  const empty = document.createElement('div');
  empty.className = 'vault-empty';
  empty.innerHTML = `
    <h3>The vault is still empty</h3>
    <p>Nothing has been pulled from the pack yet — check back once the first card is in hand.</p>
  `;
  container.appendChild(empty);
}

function buildSlabVaultPlaque(item) {
  const key = itemKeyFor(item.name);
  const photoSrc = TRACKER_PERMANENT_PHOTOS[key];

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

  const no = document.createElement('span');
  no.className = 'vault-plaque-rarity';
  no.textContent = item.no || '';
  plaque.appendChild(no);

  const h3 = document.createElement('h3');
  h3.textContent = item.name || 'Untitled';
  plaque.appendChild(h3);

  if (item.grade || item.note) {
    const badgeRow = document.createElement('div');
    badgeRow.className = 'vault-plaque-badges';

    if (item.note) {
      const note = document.createElement('span');
      note.className = 'vault-plaque-note';
      note.textContent = item.note;
      badgeRow.appendChild(note);
    }

    if (item.grade) {
      const grade = document.createElement('span');
      grade.className = 'vault-plaque-grade';
      grade.textContent = item.grade;
      badgeRow.appendChild(grade);
    }

    plaque.appendChild(badgeRow);
  }

  return plaque;
}

function renderSlabVault() {
  const content = document.getElementById('vault-content');
  if (!content) return;

  content.innerHTML = '';

  const ownedItems = TRACKER_ITEMS.filter(i => i.owned);

  if (ownedItems.length === 0) {
    renderSlabVaultEmpty(content);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  ownedItems.forEach(item => grid.appendChild(buildSlabVaultPlaque(item)));
  content.appendChild(grid);
}

document.addEventListener('DOMContentLoaded', renderSlabVault);
