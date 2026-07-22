// ============================================================
// RIPPING ZACKS — Lorcana Chase Cards (lorcana.html)
// Static reference data (from a July 2026 TCGplayer-linked
// pricing snapshot). Market Price is editable directly on this
// page and saved in this browser's local storage only.
// ============================================================

// Hardcoded sealed-product inventory per set — updated by request only, not
// editable in-browser. All sets default to 0 unless stated otherwise below.
const LORCANA_SET_INVENTORY = {
  "the first chapter": { boosterBoxes: 0, cases: 1 },
  "rise of the floodborn": { boosterBoxes: 0, cases: 0 },
  "into the inklands": { boosterBoxes: 0, cases: 0 },
  "ursula's return": { boosterBoxes: 0, cases: 0 },
  "shimmering skies": { boosterBoxes: 0, cases: 0 },
  "azurite sea": { boosterBoxes: 0, cases: 0 },
  "archazia's island": { boosterBoxes: 0, cases: 0 },
  "reign of jafar": { boosterBoxes: 0, cases: 0 },
  "fabled": { boosterBoxes: 4, cases: 0 },
  "whispers in the well": { boosterBoxes: 0, cases: 1 },
  "winterspell": { boosterBoxes: 0, cases: 1 },
  "wilds unknown": { boosterBoxes: 0, cases: 1 },
  "attack of the vine!": { boosterBoxes: 0, cases: 1 },
};

const LORCANA_SET_PHOTOS = {
  "the first chapter": 'assets/lorcana-sets/the-first-chapter.webp',
  "rise of the floodborn": 'assets/lorcana-sets/rise-of-the-floodborn.webp',
  "into the inklands": 'assets/lorcana-sets/into-the-inklands.webp',
  "ursula's return": 'assets/lorcana-sets/ursula-s-return.webp',
  "shimmering skies": 'assets/lorcana-sets/shimmering-skies.webp',
  "azurite sea": 'assets/lorcana-sets/azurite-sea.webp',
  "archazia's island": 'assets/lorcana-sets/archazia-s-island.webp',
  "reign of jafar": 'assets/lorcana-sets/reign-of-jafar.webp',
  "fabled": 'assets/lorcana-sets/fabled.webp',
  "whispers in the well": 'assets/lorcana-sets/whispers-in-the-well.webp',
  "winterspell": 'assets/lorcana-sets/winterspell.webp',
  "wilds unknown": 'assets/lorcana-sets/wilds-unknown.webp',
  "attack of the vine!": 'assets/lorcana-sets/attack-of-the-vine.webp',
};

const LORCANA_PERMANENT_PHOTOS = {
  'all is found (song)': 'assets/lorcana/all-is-found-song.webp',
  'mickey mouse, inspirational warrior': 'assets/lorcana/mickey-mouse-inspirational-warrior.webp',
  'stitch, experiment 626': 'assets/lorcana/stitch-experiment-626.jpg',
  'it means no worries (song)': 'assets/lorcana/it-means-no-worries-song.jpg',
  'into the unknown (song)': 'assets/lorcana/into-the-unknown-song.jpg',
  'winnie the pooh, hunny wizard': 'assets/lorcana/winnie-the-pooh-hunny-wizard.webp',
  'spooky sight (song)': 'assets/lorcana/spooky-sight-song.webp',
  'elsa, ice artisan': 'assets/lorcana/elsa-ice-artisan.webp',
  "you've got a friend in me (song)": 'assets/lorcana/youve-got-a-friend-in-me-song.webp',
  'mufasa, ruler of pride rock': 'assets/lorcana/mufasa-ruler-of-pride-rock.webp',
  "tigger, in the crow's nest": 'assets/lorcana/tigger-in-the-crows-nest.webp',
  'aurora, waking beauty': 'assets/lorcana/aurora-waking-beauty.webp',
  'stitch, carefree surfer': 'assets/lorcana/stitch-carefree-surfer.webp',
  'elsa, spirit of winter': 'assets/lorcana/elsa-spirit-of-winter.webp',
  'mickey mouse, wayward sorcerer': 'assets/lorcana/mickey-mouse-wayward-sorcerer.webp',
  'snow white, well wisher': 'assets/lorcana/snow-white-well-wisher.webp',
  'cinderella, ballroom sensation': 'assets/lorcana/cinderella-ballroom-sensation.webp',
  'alice, growing girl': 'assets/lorcana/alice-growing-girl.webp',
  'morph, space goo': 'assets/lorcana/morph-space-goo.webp',
  'ursula, deceiver of all': 'assets/lorcana/ursula-deceiver-of-all.webp',
  'robin hood, champion of sherwood': 'assets/lorcana/robin-hood-champion-of-sherwood.webp',
  'diablo, devoted herald': 'assets/lorcana/diablo-devoted-herald.webp',
  'ariel, sonic warrior': 'assets/lorcana/ariel-sonic-warrior.webp',
  "you're welcome (song)": 'assets/lorcana/you-re-welcome-song.webp',
  'clarabelle, light on her hooves': 'assets/lorcana/clarabelle-light-on-her-hooves.webp',
  'you came back (song)': 'assets/lorcana/you-came-back-song.webp',
  'tiana, restaurant owner': 'assets/lorcana/tiana-restaurant-owner.webp',
  'lilo & stitch, fun-loving friends': 'assets/lorcana/lilo-stitch-fun-loving-friends.webp',
  'belle & beast, certain as the sun': 'assets/lorcana/belle-beast-certain-as-the-sun.webp',
  'pocahontas, peacekeeper': 'assets/lorcana/pocahontas-peacekeeper.webp',
  'merida, formidable archer': 'assets/lorcana/merida-formidable-archer.webp',
  'moana, curious explorer': 'assets/lorcana/moana-curious-explorer.webp',
  'hades, looking for a deal': 'assets/lorcana/hades-looking-for-a-deal.webp',
  'mickey mouse, brave little prince': 'assets/lorcana/mickey-mouse-brave-little-prince.webp',
  'buzz lightyear, jungle ranger': 'assets/lorcana/buzz-lightyear-jungle-ranger.webp',
  'minnie mouse, sweetheart princess': 'assets/lorcana/minnie-mouse-sweetheart-princess.webp',
  'ariel, ethereal voice': 'assets/lorcana/ariel-ethereal-voice.webp',
};

// Snapshot data — card name, set, rarity, market price at time of snapshot
const LORCANA_ITEMS = [
  { name: 'Elsa, Spirit of Winter', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Wayward Sorcerer', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Stitch, Carefree Surfer', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Cinderella, Ballroom Sensation', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Alice, Growing Girl', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Snow White, Well Wisher', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Morph, Space Goo', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ursula, Deceiver of All', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Robin Hood, Champion of Sherwood', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ariel, Sonic Warrior', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Diablo, Devoted Herald', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mufasa, Ruler of Pride Rock', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Clarabelle, Light on Her Hooves', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: "You're Welcome (song)", set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'You Came Back (song)', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Tiana, Restaurant Owner', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Tigger, In the Crow's Nest", set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'All Is Found (song)', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Aurora, Waking Beauty', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Inspirational Warrior', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Stitch, Experiment 626', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'It Means No Worries (song)', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Into the Unknown (song)', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Brave Little Prince', set: 'Fabled', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Minnie Mouse, Sweetheart Princess', set: 'Fabled', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Winnie the Pooh, Hunny Wizard', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ariel, Ethereal Voice', set: 'Whispers in the Well', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Hades, Looking for a Deal', set: 'Whispers in the Well', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Spooky Sight (song)', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Moana, Curious Explorer', set: 'Winterspell', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Pocahontas, Peacekeeper', set: 'Winterspell', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Elsa, Ice Artisan', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Buzz Lightyear, Jungle Ranger', set: 'Wilds Unknown', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Merida, Formidable Archer', set: 'Wilds Unknown', rarity: 'Iconic', price: 0, owned: false },
  { name: "You've Got a Friend in Me (song)", set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Lilo & Stitch, Fun-Loving Friends', set: 'Attack of the Vine!', rarity: 'Legendary', price: 0, owned: false },
  { name: 'Belle & Beast, Certain as the Sun', set: 'Attack of the Vine!', rarity: 'Legendary', price: 0, owned: false },
];

let lorcanaSearchTerm = '';

function lorcanaKeyFor(name) {
  return (name || '').trim().toLowerCase();
}

function buildLorcanaCard(item) {
  const key = lorcanaKeyFor(item.name);
  const isOwned = !!item.owned;
  const photoSrc = LORCANA_PERMANENT_PHOTOS[key];

  const card = document.createElement('article');
  card.className = 'card-slab';
  if (isOwned) card.classList.add('in-stock');

  if (photoSrc) {
    const art = document.createElement('div');
    art.className = 'card-art';
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = item.name || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    art.appendChild(img);
    card.appendChild(art);
  }

  const label = document.createElement('div');
  label.className = 'card-slab-label';
  label.style.cssText = 'display:flex; justify-content:space-between; align-items:center;';
  const raritySpan = document.createElement('span');
  raritySpan.textContent = item.rarity || '';
  raritySpan.style.cssText = item.rarity === 'Iconic'
    ? 'color:var(--cobalt); font-weight:700;'
    : 'color:var(--citrus); font-weight:700;';
  label.appendChild(raritySpan);

  const statusBadge = document.createElement('span');
  statusBadge.textContent = isOwned ? 'Own' : 'Still looking';
  statusBadge.style.cssText = `font-family:var(--mono); font-weight:700; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.04em; color:${isOwned ? 'var(--mint)' : 'var(--citrus)'};`;
  label.appendChild(statusBadge);

  card.appendChild(label);

  const body = document.createElement('div');
  body.className = 'card-body';

  const h3 = document.createElement('h3');
  h3.textContent = item.name || 'Untitled';
  body.appendChild(h3);

  const setLine = document.createElement('p');
  setLine.textContent = item.set || '';
  setLine.style.cssText = 'font-family:var(--mono); font-size:0.78rem; color:var(--ink-faint); margin-bottom:14px;';
  body.appendChild(setLine);

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

function buildLorcanaSetBanner(setName) {
  const key = setName.trim().toLowerCase();
  const photoSrc = LORCANA_SET_PHOTOS[key];
  const inventory = LORCANA_SET_INVENTORY[key] || { boosterBoxes: 0, cases: 0 };
  const hasStock = inventory.boosterBoxes > 0 || inventory.cases > 0;

  const banner = document.createElement('div');
  banner.className = 'lorcana-set-banner';
  banner.style.cssText = 'grid-column: 1 / -1; display:flex; align-items:center; flex-wrap:wrap; gap:16px; margin:28px 0 6px; padding:14px 16px; border-radius:14px; border:2px solid transparent;';
  if (hasStock) {
    banner.style.borderColor = 'var(--mint)';
    banner.style.background = 'rgba(76,175,88,0.08)';
  }

  if (photoSrc) {
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = setName;
    img.style.cssText = 'width:64px; height:64px; object-fit:contain; border-radius:8px;';
    banner.appendChild(img);
  }

  const h2 = document.createElement('h2');
  h2.textContent = setName;
  h2.style.cssText = 'font-family:var(--display); font-size:1.3rem; margin:0; margin-right:auto;';
  banner.appendChild(h2);

  function buildQtyDisplay(labelText, qty) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:6px;';

    const lbl = document.createElement('span');
    lbl.textContent = labelText;
    lbl.style.cssText = 'font-family:var(--mono); font-size:0.72rem; color:var(--ink-faint); text-transform:uppercase; letter-spacing:0.04em;';
    wrap.appendChild(lbl);

    const value = document.createElement('span');
    value.textContent = String(qty);
    value.style.cssText = `font-family:var(--mono); font-weight:700; font-size:0.9rem; color:${qty > 0 ? 'var(--mint)' : 'var(--ink-faint)'};`;
    wrap.appendChild(value);

    return wrap;
  }

  banner.appendChild(buildQtyDisplay('Booster Boxes:', inventory.boosterBoxes));
  banner.appendChild(buildQtyDisplay('Cases:', inventory.cases));

  return banner;
}

function renderLorcanaGrid() {
  const grid = document.getElementById('lorcana-grid');
  const count = document.getElementById('lorcana-count');
  if (!grid || !count) return;

  const term = lorcanaSearchTerm.trim().toLowerCase();
  const visible = term
    ? LORCANA_ITEMS.filter(i =>
        (i.name || '').toLowerCase().includes(term) ||
        (i.set || '').toLowerCase().includes(term))
    : LORCANA_ITEMS;

  count.textContent = visible.length + (visible.length === 1 ? ' card' : ' cards');
  grid.innerHTML = '';

  if (!visible.length && term) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--ink-faint)';
    empty.textContent = 'No cards match your search.';
    grid.appendChild(empty);
    return;
  }

  let lastSet = null;
  visible.forEach(item => {
    if (item.set !== lastSet) {
      grid.appendChild(buildLorcanaSetBanner(item.set));
      lastSet = item.set;
    }
    grid.appendChild(buildLorcanaCard(item));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderLorcanaGrid();

  const search = document.getElementById('lorcana-search');
  if (search) {
    search.addEventListener('input', () => {
      lorcanaSearchTerm = search.value;
      renderLorcanaGrid();
    });
  }
});
