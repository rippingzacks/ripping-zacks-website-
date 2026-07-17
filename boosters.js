// ============================================================
// RIPPING ZACKS — Boosters (boosters.html)
// Set Name / Release Year pulled live from a Google Sheet
// (read-only). Booster Box Price is editable directly on this
// page and saved in this browser's local storage, keyed by set
// name (not synced across devices).
// ============================================================

const BOOSTERS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtICBFDdqlmg0kPEA_cj-jIRPCvNsw77P8JPGfKrMRuZZxeyPrHK8omN9vqufo8Lo7qoR098GHo1yE/pub?gid=1034956444&single=true&output=csv';
const BOOSTERS_PRICES_KEY = 'rz_boosters_prices';
const BOOSTERS_PHOTOS_KEY = 'rz_boosters_photos';

const BOOSTERS_COLS = {
  name: 'set name',
  year: 'release year',
  price: 'booster box price'
};

let boosterItems = [];
let boostersSearchTerm = '';

function findCol(fields, targetLower) {
  return fields.find(f => f && f.trim().toLowerCase() === targetLower);
}

function itemKeyFor(name) {
  return (name || '').trim().toLowerCase();
}

function getLocalPrices() {
  try {
    const raw = localStorage.getItem(BOOSTERS_PRICES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveLocalPrice(name, price) {
  try {
    const prices = getLocalPrices();
    prices[itemKeyFor(name)] = price;
    localStorage.setItem(BOOSTERS_PRICES_KEY, JSON.stringify(prices));
    return true;
  } catch (e) {
    alert('Could not save — your browser storage may be full.');
    return false;
  }
}

function getLocalPhotos() {
  try {
    const raw = localStorage.getItem(BOOSTERS_PHOTOS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveLocalPhoto(name, dataUrl) {
  try {
    const photos = getLocalPhotos();
    photos[itemKeyFor(name)] = dataUrl;
    localStorage.setItem(BOOSTERS_PHOTOS_KEY, JSON.stringify(photos));
    return true;
  } catch (e) {
    alert('Could not save that photo — your browser storage may be full.');
    return false;
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderBoostersGrid() {
  const grid = document.getElementById('boosters-grid');
  const count = document.getElementById('boosters-count');
  if (!grid || !count) return;

  const localPrices = getLocalPrices();
  const localPhotos = getLocalPhotos();

  const term = boostersSearchTerm.trim().toLowerCase();
  const visible = term
    ? boosterItems.filter(i => (i.name || '').toLowerCase().includes(term))
    : boosterItems;

  count.textContent = visible.length + (visible.length === 1 ? ' set' : ' sets');
  grid.innerHTML = '';

  if (!visible.length) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--ink-faint)';
    empty.textContent = boosterItems.length ? 'No sets match your search.' : 'No sets found in the sheet yet.';
    grid.appendChild(empty);
    return;
  }

  visible.forEach(item => {
    const key = itemKeyFor(item.name);
    const currentPrice = localPrices[key] !== undefined ? localPrices[key] : (item.price || '');
    const localPhoto = localPhotos[key];

    const card = document.createElement('article');
    card.className = 'card-slab';

    const label = document.createElement('div');
    label.className = 'card-slab-label';
    const yearSpan = document.createElement('span');
    yearSpan.textContent = item.year || '';
    label.appendChild(yearSpan);
    card.appendChild(label);

    const art = document.createElement('div');
    art.className = 'card-art';
    art.style.position = 'relative';

    function showPlaceholder() {
      art.innerHTML = '<span class="card-glyph">?</span>';
    }

    if (localPhoto) {
      const img = document.createElement('img');
      img.src = localPhoto;
      img.alt = item.name || '';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      img.onerror = showPlaceholder;
      art.appendChild(img);
    } else {
      showPlaceholder();
    }
    card.appendChild(art);

    const body = document.createElement('div');
    body.className = 'card-body';

    const h3 = document.createElement('h3');
    h3.textContent = item.name || 'Untitled';
    body.appendChild(h3);

    const priceRow = document.createElement('div');
    priceRow.className = 'card-footer';
    const priceInput = document.createElement('input');
    priceInput.type = 'text';
    priceInput.value = currentPrice;
    priceInput.placeholder = 'Booster box price';
    priceInput.className = 'card-price';
    priceInput.style.cssText = 'background:var(--paper); border:1px solid var(--line); border-radius:6px; padding:6px 10px; width:100%; font-family:var(--mono); color:var(--ink);';
    priceInput.addEventListener('change', () => {
      saveLocalPrice(item.name, priceInput.value.trim());
    });
    priceRow.appendChild(priceInput);
    body.appendChild(priceRow);

    // Upload photo control — saved locally, keyed by set name
    const uploadWrap = document.createElement('label');
    uploadWrap.className = 'btn btn-ghost';
    uploadWrap.style.cssText = 'margin-top:12px; width:100%; justify-content:center; cursor:pointer; font-size:0.8rem; padding:9px 16px;';
    uploadWrap.textContent = localPhoto ? '↻ Replace photo' : '+ Upload photo';
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;
      try {
        const dataUrl = await fileToDataUrl(file);
        if (saveLocalPhoto(item.name, dataUrl)) {
          renderBoostersGrid();
        }
      } catch (e) {
        alert('Could not read that photo file.');
      }
    });
    uploadWrap.appendChild(fileInput);
    body.appendChild(uploadWrap);

    card.appendChild(body);
    grid.appendChild(card);
  });
}

function loadBoosters() {
  const grid = document.getElementById('boosters-grid');
  const status = document.getElementById('boosters-status');
  const count = document.getElementById('boosters-count');
  if (!grid || !status || !count) return;

  grid.innerHTML = '';
  status.style.display = 'none';
  count.textContent = 'Loading…';

  Papa.parse(BOOSTERS_CSV_URL + '&_t=' + Date.now(), {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const fields = results.meta.fields || [];
      const nameKey = findCol(fields, BOOSTERS_COLS.name);
      const yearKey = findCol(fields, BOOSTERS_COLS.year);
      const priceKey = findCol(fields, BOOSTERS_COLS.price);

      const rows = (results.data || []).filter(row =>
        Object.values(row).some(v => v && String(v).trim())
      );

      if (!nameKey || !rows.length) {
        count.textContent = '0 sets';
        status.style.display = 'block';
        status.textContent = 'No sets found yet. Make sure the sheet has "Set Name", "Release Year", and "Booster Box Price" columns in row 1.';
        boosterItems = [];
        renderBoostersGrid();
        return;
      }

      boosterItems = rows.map(row => ({
        name: nameKey ? row[nameKey] : '',
        year: yearKey ? row[yearKey] : '',
        price: priceKey ? row[priceKey] : ''
      }));

      renderBoostersGrid();
    },
    error: function () {
      count.textContent = '';
      status.style.display = 'block';
      status.textContent = 'Could not load right now. Try refreshing in a moment.';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadBoosters();
  const refreshBtn = document.getElementById('boosters-refresh');
  if (refreshBtn) refreshBtn.addEventListener('click', loadBoosters);

  const search = document.getElementById('boosters-search');
  if (search) {
    search.addEventListener('input', () => {
      boostersSearchTerm = search.value;
      renderBoostersGrid();
    });
  }
});
