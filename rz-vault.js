// ============================================================
// RZ VAULT (rz-vault.html)
// Self-contained — data and render both live here. Unlike Slab
// Vault (which reuses marketing.js's tracker data), RZ Vault is
// its own distinct Collectr portfolio, so it gets its own array.
// No price is shown on this public page, matching how Lorcana
// Vault / Slab Vault / Sealed Vault also keep pricing off the
// public-facing plaques — purchasePrice/marketPrice are still
// stored here for internal reference if a hidden reference page
// is ever built for RZ Vault later.
// Update this data only when told to (e.g. "bought the X").
// ============================================================

const RZ_VAULT_ITEMS = [
  { name: 'Charizard G LV.X', set: 'Garchomp vs Charizard SP Deck Kit (Charizard)', no: '002/016', rarity: '1st Edition', targetPrice: null, purchasePrice: null, marketPrice: 5076.94, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Other Cards' },
  { name: 'Pretend Comedian Pikachu (JP Pokemon Center Osaka DX Openning)', set: 'Sun & Moon Promos JP', no: '407/SM-P', rarity: 'Holofoil', targetPrice: null, purchasePrice: null, marketPrice: 941.35, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Other Cards' },
  { name: 'Team Boss Pikachu (Rocket) (JP)', set: 'Sun & Moon Promos JP', no: '191/SM-P', rarity: 'Holofoil', targetPrice: null, purchasePrice: null, marketPrice: 3867.14, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Team Boss Pikachu (JP)' },
  { name: 'Team Boss Pikachu (Aqua) (JP)', set: 'Sun & Moon Promos JP', no: '192/SM-P', rarity: 'Holofoil', targetPrice: null, purchasePrice: null, marketPrice: 3678.25, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Team Boss Pikachu (JP)' },
  { name: 'Team Boss Pikachu (Magma) (JP)', set: 'Sun & Moon Promos JP', no: '193/SM-P', rarity: 'Holofoil', targetPrice: null, purchasePrice: null, marketPrice: 2513.89, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Team Boss Pikachu (JP)' },
  { name: 'Team Boss Pikachu (Galactic) (JP)', set: 'Sun & Moon Promos JP', no: '194/SM-P', rarity: 'Holofoil', targetPrice: null, purchasePrice: null, marketPrice: 4022.33, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Team Boss Pikachu (JP)' },
  { name: 'Team Boss Pikachu (Plasma) (JP)', set: 'Sun & Moon Promos JP', no: '195/SM-P', rarity: 'Holofoil', targetPrice: null, purchasePrice: null, marketPrice: 3215.62, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Team Boss Pikachu (JP)' },
  { name: 'Team Boss Pikachu (Flare) (JP)', set: 'Sun & Moon Promos JP', no: '196/SM-P', rarity: 'Holofoil', targetPrice: null, purchasePrice: null, marketPrice: 2767, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Team Boss Pikachu (JP)' },
  { name: 'Team Boss Pikachu (Skull) (JP)', set: 'Sun & Moon Promos JP', no: '197/SM-P', rarity: 'Holofoil', targetPrice: null, purchasePrice: null, marketPrice: 3527.25, owned: true, grade: 'PSA 10.0 GEM - MT', series: 'Team Boss Pikachu (JP)' },
];

const RZ_VAULT_PHOTOS = {
  'charizard g lv.x': 'assets/rz-vault/charizard-g-lv-x.jpg',
  'pretend comedian pikachu (jp pokemon center osaka dx openning)': 'assets/rz-vault/pretend-comedian-pikachu.webp',
  'team boss pikachu (rocket) (jp)': 'assets/rz-vault/team-boss-pikachu-rocket.webp',
  'team boss pikachu (aqua) (jp)': 'assets/rz-vault/team-boss-pikachu-aqua.webp',
  'team boss pikachu (magma) (jp)': 'assets/rz-vault/team-boss-pikachu-magma.webp',
  'team boss pikachu (galactic) (jp)': 'assets/rz-vault/team-boss-pikachu-galactic.webp',
  'team boss pikachu (plasma) (jp)': 'assets/rz-vault/team-boss-pikachu-plasma.webp',
  'team boss pikachu (flare) (jp)': 'assets/rz-vault/team-boss-pikachu-flare.webp',
  'team boss pikachu (skull) (jp)': 'assets/rz-vault/team-boss-pikachu-skull.webp',
};

function rzVaultKeyFor(name) {
  return (name || '').trim().toLowerCase();
}

function renderRzVaultEmpty(container) {
  const empty = document.createElement('div');
  empty.className = 'vault-empty';
  empty.innerHTML = `
    <h3>The vault is still empty</h3>
    <p>Nothing has been pulled in yet — check back once the first piece lands.</p>
  `;
  container.appendChild(empty);
}

function buildRzVaultPlaque(item) {
  const key = rzVaultKeyFor(item.name);
  const photoSrc = RZ_VAULT_PHOTOS[key];

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

function buildRzVaultSeriesBanner(seriesName, cards) {
  const banner = document.createElement('div');
  banner.className = 'vault-series-banner';

  const corner1 = document.createElement('span'); corner1.className = 'vault-series-corner vault-series-corner-tl';
  const corner2 = document.createElement('span'); corner2.className = 'vault-series-corner vault-series-corner-br';
  banner.appendChild(corner1);
  banner.appendChild(corner2);

  const titleRow = document.createElement('div');
  titleRow.className = 'vault-series-title-row';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'vault-series-title-group';
  const h2 = document.createElement('h2');
  h2.className = 'vault-series-title';
  h2.textContent = seriesName;
  titleGroup.appendChild(h2);
  titleRow.appendChild(titleGroup);

  const stats = document.createElement('div');
  stats.className = 'vault-series-stats';
  stats.innerHTML = `<span><strong>${cards.length}</strong> card${cards.length === 1 ? '' : 's'}</span>`;
  titleRow.appendChild(stats);

  banner.appendChild(titleRow);
  const rule = document.createElement('div');
  rule.className = 'vault-series-rule';
  banner.appendChild(rule);

  return banner;
}

function renderRzVault() {
  const content = document.getElementById('vault-content');
  if (!content) return;

  content.innerHTML = '';

  const ownedItems = RZ_VAULT_ITEMS.filter(i => i.owned);

  if (ownedItems.length === 0) {
    renderRzVaultEmpty(content);
    return;
  }

  const seriesPriority = [
    'Team Boss Pikachu (JP)',
    'Other Cards',
  ];
  const seriesOrder = [];
  ownedItems.forEach(item => {
    const key = item.series || 'Other Cards';
    if (!seriesOrder.includes(key)) seriesOrder.push(key);
  });
  seriesOrder.sort((a, b) => {
    const ai = seriesPriority.indexOf(a);
    const bi = seriesPriority.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  seriesOrder.forEach(seriesName => {
    const cards = ownedItems.filter(i => (i.series || 'Other Cards') === seriesName);
    content.appendChild(buildRzVaultSeriesBanner(seriesName, cards));
    const grid = document.createElement('div');
    grid.className = 'vault-grid';
    cards.forEach(item => grid.appendChild(buildRzVaultPlaque(item)));
    content.appendChild(grid);
  });
}

document.addEventListener('DOMContentLoaded', renderRzVault);
