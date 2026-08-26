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
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    img.src = photoSrc;
    img.alt = item.name || '';
    art.appendChild(img);
    plaque.appendChild(art);
  }

  const h3 = document.createElement('h3');
  h3.textContent = item.name || 'Untitled';
  plaque.appendChild(h3);

  if (item.set) {
    const setLine = document.createElement('span');
    setLine.className = 'vault-plaque-set';
    setLine.textContent = item.set;
    plaque.appendChild(setLine);
  }

  const no = document.createElement('span');
  no.className = 'vault-plaque-rarity';
  if (item.rarity && item.no) {
    no.textContent = `${item.rarity} \u2022 ${item.no}`;
  } else if (item.rarity) {
    no.textContent = item.rarity;
  } else {
    no.textContent = item.no || '';
  }
  plaque.appendChild(no);

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

function buildSlabSeriesBanner(seriesName, cards) {
  const banner = document.createElement('div');
  banner.className = 'slab-series-banner';

  const corner1 = document.createElement('span'); corner1.className = 'slab-series-corner slab-series-corner-tl';
  const corner2 = document.createElement('span'); corner2.className = 'slab-series-corner slab-series-corner-br';
  banner.appendChild(corner1);
  banner.appendChild(corner2);

  const titleRow = document.createElement('div');
  titleRow.className = 'slab-series-title-row';

  const h2 = document.createElement('h2');
  h2.className = 'slab-series-title';
  h2.textContent = seriesName;
  titleRow.appendChild(h2);

  const stats = document.createElement('div');
  stats.className = 'slab-series-stats';
  stats.innerHTML = `<span><strong>${cards.length}</strong> slab${cards.length === 1 ? '' : 's'}</span>`;
  titleRow.appendChild(stats);

  banner.appendChild(titleRow);
  const rule = document.createElement('div');
  rule.className = 'slab-series-rule';
  banner.appendChild(rule);

  return banner;
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

  const seriesPriority = [
    'Team Boss Pikachu (JP)',
    "Poncho Pikachu's",
    'Scarlet & Violet: Black Bolt & White Flare',
    'Vending Series 3 (Green)',
    'Other Slabs',
  ];
  const seriesOrder = [];
  ownedItems.forEach(item => {
    const key = item.series || null;
    if (key && !seriesOrder.includes(key)) seriesOrder.push(key);
  });
  seriesOrder.sort((a, b) => {
    const ai = seriesPriority.indexOf(a);
    const bi = seriesPriority.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  const unSeriesed = ownedItems
    .filter(i => !i.series)
    .sort((a, b) => (b.marketPrice || 0) - (a.marketPrice || 0));
  if (unSeriesed.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'vault-grid';
    unSeriesed.forEach(item => grid.appendChild(buildSlabVaultPlaque(item)));
    content.appendChild(grid);
  }

  seriesOrder.forEach(seriesName => {
    const cards = ownedItems
      .filter(i => i.series === seriesName)
      .sort((a, b) => (b.marketPrice || 0) - (a.marketPrice || 0));
    content.appendChild(buildSlabSeriesBanner(seriesName, cards));
    const grid = document.createElement('div');
    grid.className = 'vault-grid';
    cards.forEach(item => grid.appendChild(buildSlabVaultPlaque(item)));
    content.appendChild(grid);
  });
}

document.addEventListener('DOMContentLoaded', renderSlabVault);
