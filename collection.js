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
  } else if (item.rarity === 'Epic') {
    rarity.style.color = '#ff8c1a';
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
  const hasStock = inventory.boosterBoxes > 0 || inventory.cases > 0 || inventory.promoSets > 0;
  const isEmpty = ownedCards.length === 0 && !hasStock;

  const section = document.createElement('div');
  section.className = isEmpty ? 'vault-set vault-set-empty' : 'vault-set';

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
  if (photoSrc) {
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = setName;
    titleGroup.appendChild(img);
  }
  const h2 = document.createElement('h2');
  h2.className = 'vault-series-title';
  const setNum = LORCANA_SET_NUMBERS[key];
  h2.textContent = setNum ? `${setName} - Set ${setNum}` : setName;
  titleGroup.appendChild(h2);
  titleRow.appendChild(titleGroup);

  const stats = document.createElement('div');
  stats.className = 'vault-series-stats';
  if (setNum) {
    stats.appendChild(buildLorcanaRarityBadges(setName));
  }
  if (hasStock) {
    const sealed = document.createElement('span');
    const parts = [];
    if (inventory.boosterBoxes > 0) parts.push(`<strong>${inventory.boosterBoxes}</strong> booster box${inventory.boosterBoxes === 1 ? '' : 'es'}`);
    if (inventory.cases > 0) parts.push(`<strong>${inventory.cases}</strong> case${inventory.cases === 1 ? '' : 's'}`);
    if (inventory.promoSets > 0) parts.push(`<strong>${inventory.promoSets}</strong> Sealed Promo Set${inventory.promoSets === 1 ? '' : 's'}`);
    sealed.innerHTML = parts.join(' <span class="vault-series-stats-divider">&nbsp;•&nbsp;</span> ');
    stats.appendChild(sealed);
  }
  titleRow.appendChild(stats);

  banner.appendChild(titleRow);
  const rule = document.createElement('div');
  rule.className = 'vault-series-rule';
  banner.appendChild(rule);

  section.appendChild(banner);

  if (isEmpty) {
    // Compact: just the banner row, no grid or placeholder paragraph.
    return section;
  }

  if (ownedCards.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'vault-grid';
    const sortedCards = [
      ...ownedCards.filter(c => c.rarity !== 'Epic'),
      ...ownedCards.filter(c => c.rarity === 'Epic'),
    ];
    sortedCards.forEach(item => grid.appendChild(buildVaultPlaque(item)));
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
  const ownedEnchanted = ownedItems.filter(i => i.rarity === 'Enchanted').length;
  const ownedOther = ownedItems.filter(i => i.rarity !== 'Iconic' && i.rarity !== 'Enchanted').length;
  const totalIconic = Object.values(LORCANA_ICONIC_TOTALS).reduce((sum, n) => sum + n, 0);
  const totalEnchanted = Object.values(LORCANA_ENCHANTED_TOTALS).reduce((sum, n) => sum + n, 0);
  let totalBoxes = 0;
  let totalCases = 0;
  let totalPromoSets = 0;
  Object.values(LORCANA_SET_INVENTORY).forEach(inv => {
    totalBoxes += inv.boosterBoxes || 0;
    totalCases += inv.cases || 0;
    totalPromoSets += inv.promoSets || 0;
  });

  const cardsIconicEl = document.getElementById('stat-cards-iconic');
  const cardsEnchantedEl = document.getElementById('stat-cards-enchanted');
  const cardsOtherEl = document.getElementById('stat-cards-other');
  const boxesEl = document.getElementById('stat-boxes');
  const casesEl = document.getElementById('stat-cases');
  const promoSetsEl = document.getElementById('stat-promo-sets');
  if (cardsIconicEl) cardsIconicEl.textContent = ownedIconic;
  if (cardsEnchantedEl) cardsEnchantedEl.textContent = ownedEnchanted;
  if (cardsOtherEl) cardsOtherEl.textContent = ownedOther;
  if (boxesEl) boxesEl.textContent = totalBoxes;
  if (casesEl) casesEl.textContent = totalCases;
  if (promoSetsEl) promoSetsEl.textContent = totalPromoSets;

  const iconicProgressLabel = document.getElementById('stat-iconic-progress-label');
  const iconicProgressFill = document.getElementById('stat-iconic-progress-fill');
  if (iconicProgressLabel) iconicProgressLabel.textContent = `${ownedIconic} of ${totalIconic} collected`;
  if (iconicProgressFill) iconicProgressFill.style.width = `${totalIconic ? Math.min(100, (ownedIconic / totalIconic) * 100) : 0}%`;

  const enchantedProgressLabel = document.getElementById('stat-enchanted-progress-label');
  const enchantedProgressFill = document.getElementById('stat-enchanted-progress-fill');
  if (enchantedProgressLabel) enchantedProgressLabel.textContent = `${ownedEnchanted} of ${totalEnchanted} collected`;
  if (enchantedProgressFill) enchantedProgressFill.style.width = `${totalEnchanted ? Math.min(100, (ownedEnchanted / totalEnchanted) * 100) : 0}%`;


  // Walk sets in the order they first appear in LORCANA_ITEMS, then append
  // any sealed-only sets (inventory entries with no individual cards yet),
  // then make sure all 13 numbered mainline sets are always represented.
  const seenSets = [];
  LORCANA_ITEMS.forEach(item => {
    if (!seenSets.includes(item.set)) seenSets.push(item.set);
  });
  Object.keys(LORCANA_SET_INVENTORY).forEach(key => {
    const inv = LORCANA_SET_INVENTORY[key];
    const hasStock = (inv.boosterBoxes || 0) > 0 || (inv.cases || 0) > 0 || (inv.promoSets || 0) > 0;
    if (!hasStock) return;
    const alreadySeen = seenSets.some(s => s.trim().toLowerCase() === key);
    if (!alreadySeen) {
      // Recover the properly-cased display name from LORCANA_SET_PHOTOS/ITEMS if
      // possible; otherwise title-case the key as a reasonable fallback.
      const display = LORCANA_SET_DISPLAY_NAMES[key] || key;
      seenSets.push(display);
    }
  });
  Object.entries(LORCANA_SET_NUMBERS)
    .sort((a, b) => a[1] - b[1])
    .forEach(([key]) => {
      const alreadySeen = seenSets.some(s => s.trim().toLowerCase() === key);
      if (!alreadySeen) {
        const display = LORCANA_SET_DISPLAY_NAMES[key] || key;
        seenSets.push(display);
      }
    });

  seenSets.forEach(setName => {
    const key = setName.trim().toLowerCase();
    const inventory = LORCANA_SET_INVENTORY[key] || { boosterBoxes: 0, cases: 0 };
    const ownedCards = LORCANA_ITEMS.filter(i => i.set === setName && i.owned);
    const isNumberedSet = !!LORCANA_SET_NUMBERS[key];

    const hasAnything = ownedCards.length > 0 || inventory.boosterBoxes > 0 || inventory.cases > 0 || inventory.promoSets > 0;
    if (!hasAnything && !isNumberedSet) {
      return; // nothing to show, and not one of the 13 mainline sets
    }

    content.appendChild(buildVaultSet(setName, ownedCards, inventory));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderLorcanaRarityLegend === 'function') renderLorcanaRarityLegend();
  renderVault();
});
