function buildFortKnoxPlaque(item) {
  const key = fortKnoxKeyFor(item.name);
  const photoSrc = FORT_KNOX_PHOTOS[key];

  const plaque = document.createElement('article');
  plaque.className = 'vault-plaque';

  const corner1 = document.createElement('span'); corner1.className = 'corner-tl';
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

  const h3 = document.createElement('h3');
  h3.textContent = item.name || 'Untitled';
  plaque.appendChild(h3);

  if (item.set) {
    const setLine = document.createElement('a');
    setLine.className = 'vault-plaque-set';
    setLine.href = '#';
    setLine.onclick = (e) => e.preventDefault();
    setLine.textContent = item.set;
    plaque.appendChild(setLine);
  }

  const priceLine = document.createElement('div');
  priceLine.className = 'fortknox-plaque-price';
  const priceParts = [];
  if (item.price > 0) priceParts.push(`$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  if (item.qty) priceParts.push(`Qty: ${item.qty}`);
  priceLine.textContent = priceParts.join(' \u2022 ');
  plaque.appendChild(priceLine);

  return plaque;
}

function buildFortKnoxSetBlock(setName, items) {
  const block = document.createElement('div');
  block.className = 'fortknox-set-block';

  if (setName) {
    const header = document.createElement('div');
    header.className = 'fortknox-set-header';

    const h3 = document.createElement('h3');
    h3.className = 'fortknox-set-title';
    h3.textContent = setName;
    header.appendChild(h3);

    const count = document.createElement('span');
    count.className = 'fortknox-set-count';
    const totalQty = items.reduce((sum, i) => sum + (i.qty || 0), 0);
    count.textContent = `${items.length} item${items.length === 1 ? '' : 's'} \u2022 ${totalQty} unit${totalQty === 1 ? '' : 's'}`;
    header.appendChild(count);

    block.appendChild(header);
  }

  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  items.forEach(item => grid.appendChild(buildFortKnoxPlaque(item)));
  block.appendChild(grid);

  return block;
}

function buildFortKnoxGameSection(gameName, items) {
  const section = document.createElement('div');
  section.className = 'fortknox-game-section';

  const banner = document.createElement('div');
  banner.className = 'fortknox-game-banner';

  const corner1 = document.createElement('span'); corner1.className = 'fortknox-game-corner fortknox-game-corner-tl';
  const corner2 = document.createElement('span'); corner2.className = 'fortknox-game-corner fortknox-game-corner-br';
  banner.appendChild(corner1);
  banner.appendChild(corner2);

  const titleRow = document.createElement('div');
  titleRow.className = 'fortknox-game-title-row';

  const h2 = document.createElement('h2');
  h2.className = 'fortknox-game-title';
  h2.textContent = gameName;
  titleRow.appendChild(h2);

  const count = document.createElement('div');
  count.className = 'fortknox-game-count';
  const totalQty = items.reduce((sum, i) => sum + (i.qty || 0), 0);
  count.innerHTML = `<span><strong>${items.length}</strong> product${items.length === 1 ? '' : 's'}</span><span>\u2022</span><span><strong>${totalQty}</strong> unit${totalQty === 1 ? '' : 's'} in stock</span>`;
  titleRow.appendChild(count);

  banner.appendChild(titleRow);
  const rule = document.createElement('div');
  rule.className = 'fortknox-game-rule';
  banner.appendChild(rule);

  section.appendChild(banner);

  // No set-level sub-headers — with dozens of distinct sets per game that
  // got noisy fast. Each card already shows its own set name underneath
  // the title, so one grid per game is enough to stay organized without
  // the page turning into a wall of headers.
  const grid = document.createElement('div');
  grid.className = 'vault-grid';
  items.forEach(item => grid.appendChild(buildFortKnoxPlaque(item)));
  section.appendChild(grid);

  return section;
}

function renderFortKnoxVault() {
  const content = document.getElementById('fortknox-content');
  if (!content) return;

  content.innerHTML = '';

  const items = FORT_KNOX_ITEMS.filter(i => (i.qty || 0) > 0);

  const totalProducts = items.length;
  const totalUnits = items.reduce((sum, i) => sum + (i.qty || 0), 0);
  const totalValue = items.reduce((sum, i) => sum + ((i.price || 0) * (i.qty || 0)), 0);

  const statProducts = document.getElementById('stat-fk-products');
  const statUnits = document.getElementById('stat-fk-units');
  const statValue = document.getElementById('stat-fk-value');
  if (statProducts) statProducts.textContent = totalProducts;
  if (statUnits) statUnits.textContent = totalUnits;
  if (statValue) statValue.textContent = `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'vault-empty';
    empty.innerHTML = `
      <h3>Inventory coming soon</h3>
      <p>Send over screenshots or photos of the Descent Into Gaming sealed product and it'll show up here, organized by game and set.</p>
    `;
    content.appendChild(empty);
    return;
  }

  const gameOrder = [];
  items.forEach(item => {
    const g = item.game || 'Other';
    if (!gameOrder.includes(g)) gameOrder.push(g);
  });

  gameOrder.forEach(gameName => {
    const gameItems = items.filter(i => (i.game || 'Other') === gameName);
    content.appendChild(buildFortKnoxGameSection(gameName, gameItems));
  });
}

document.addEventListener('DOMContentLoaded', renderFortKnoxVault);
