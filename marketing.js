// ============================================================
// RIPPING ZACKS — Pikachu Tracker (marketing.html)
// Name / No. pulled live from a Google Sheet (read-only).
// Photos, target price, and status are editable directly on
// this page and saved in this browser's local storage, keyed
// by card name (not synced across devices).
//
// IMPORTANT: TRACKER_PHOTOS_KEY and its data structure must
// never change — that's where already-uploaded photos live.
// ============================================================

const TRACKER_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtICBFDdqlmg0kPEA_cj-jIRPCvNsw77P8JPGfKrMRuZZxeyPrHK8omN9vqufo8Lo7qoR098GHo1yE/pub?gid=952828787&single=true&output=csv';
const TRACKER_PHOTOS_KEY = 'rz_pikachu_tracker_photos'; // DO NOT rename/restructure — existing photos depend on this
const TRACKER_PRICES_KEY = 'rz_pikachu_tracker_prices';
const TRACKER_STATUSES_KEY = 'rz_pikachu_tracker_statuses';

const TRACKER_COLS = {
  name: 'product name',
  no: 'no.',
  image: 'image url',
  price: 'target price',
  status: 'status'
};

const STATUS_OPTIONS = ['Still looking', 'Own'];

let trackerItems = [];
let trackerFilter = 'all';

function findCol(fields, targetLower) {
  return fields.find(f => f && f.trim().toLowerCase() === targetLower.replace(/\.$/, ''));
}
// "No." header may or may not include the period — match either way
function findNoCol(fields) {
  return fields.find(f => f && ['no.', 'no'].includes(f.trim().toLowerCase()));
}

function itemKeyFor(name) {
  return (name || '').trim().toLowerCase();
}

function getLocalMap(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveLocalMap(key, map) {
  try {
    localStorage.setItem(key, JSON.stringify(map));
    return true;
  } catch (e) {
    alert('Could not save — your browser storage may be full.');
    return false;
  }
}

function saveLocalPhoto(name, dataUrl) {
  const photos = getLocalMap(TRACKER_PHOTOS_KEY);
  photos[itemKeyFor(name)] = dataUrl;
  return saveLocalMap(TRACKER_PHOTOS_KEY, photos);
}

function saveLocalPrice(name, price) {
  const prices = getLocalMap(TRACKER_PRICES_KEY);
  prices[itemKeyFor(name)] = price;
  return saveLocalMap(TRACKER_PRICES_KEY, prices);
}

function saveLocalStatus(name, status) {
  const statuses = getLocalMap(TRACKER_STATUSES_KEY);
  statuses[itemKeyFor(name)] = status;
  return saveLocalMap(TRACKER_STATUSES_KEY, statuses);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderTrackerGrid() {
  const grid = document.getElementById('tracker-grid');
  const count = document.getElementById('tracker-count');
  if (!grid || !count) return;

  const localPhotos = getLocalMap(TRACKER_PHOTOS_KEY);
  const localPrices = getLocalMap(TRACKER_PRICES_KEY);
  const localStatuses = getLocalMap(TRACKER_STATUSES_KEY);

  const effectiveStatus = (item) => {
    const key = itemKeyFor(item.name);
    return (localStatuses[key] !== undefined ? localStatuses[key] : item.status) || '';
  };

  const visible = trackerFilter === 'all'
    ? trackerItems
    : trackerItems.filter(i => effectiveStatus(i).trim().toLowerCase() === trackerFilter.toLowerCase());

  count.textContent = visible.length + (visible.length === 1 ? ' card' : ' cards');
  grid.innerHTML = '';

  if (!visible.length) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--ink-faint)';
    empty.textContent = trackerItems.length ? 'No cards match this filter.' : 'No cards found in the sheet yet.';
    grid.appendChild(empty);
    return;
  }

  visible.forEach(item => {
    const key = itemKeyFor(item.name);
    const localPhoto = localPhotos[key];
    const photoSrc = localPhoto || item.image;
    const currentPrice = localPrices[key] !== undefined ? localPrices[key] : (item.price || '');
    const currentStatus = effectiveStatus(item);

    const card = document.createElement('article');
    card.className = 'card-slab';

    // --- label bar: No. on the left, editable status on the right ---
    const label = document.createElement('div');
    label.className = 'card-slab-label';

    const noSpan = document.createElement('span');
    noSpan.textContent = item.no || '';
    label.appendChild(noSpan);

    const statusSelect = document.createElement('select');
    statusSelect.style.cssText = 'background:transparent; border:none; font-family:var(--mono); font-size:0.62rem; text-transform:uppercase; letter-spacing:0.05em; cursor:pointer;';
    STATUS_OPTIONS.forEach(opt => {
      const optionEl = document.createElement('option');
      optionEl.value = opt;
      optionEl.textContent = opt;
      if (opt.toLowerCase() === currentStatus.trim().toLowerCase()) optionEl.selected = true;
      statusSelect.appendChild(optionEl);
    });
    statusSelect.style.color = currentStatus.trim().toLowerCase() === 'own' ? 'var(--mint)' : 'var(--citrus)';
    statusSelect.addEventListener('change', () => {
      if (saveLocalStatus(item.name, statusSelect.value)) {
        renderTrackerGrid();
      }
    });
    label.appendChild(statusSelect);

    card.appendChild(label);

    // --- photo ---
    const art = document.createElement('div');
    art.className = 'card-art';
    art.style.position = 'relative';

    function showPlaceholder() {
      art.innerHTML = '<span class="card-glyph">?</span>';
    }

    if (photoSrc) {
      const img = document.createElement('img');
      img.src = photoSrc;
      img.alt = item.name || '';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      img.onerror = showPlaceholder;
      art.appendChild(img);
    } else {
      showPlaceholder();
    }
    card.appendChild(art);

    // --- body ---
    const body = document.createElement('div');
    body.className = 'card-body';
    const h3 = document.createElement('h3');
    h3.textContent = item.name || 'Untitled';
    body.appendChild(h3);

    // Editable target price
    const priceRow = document.createElement('div');
    priceRow.className = 'card-footer';
    const priceInput = document.createElement('input');
    priceInput.type = 'text';
    priceInput.value = currentPrice;
    priceInput.placeholder = 'Target price';
    priceInput.className = 'card-price';
    priceInput.style.cssText = 'background:var(--paper); border:1px solid var(--line); border-radius:6px; padding:6px 10px; width:100%; font-family:var(--mono); color:var(--ink);';
    priceInput.addEventListener('change', () => {
      saveLocalPrice(item.name, priceInput.value.trim());
    });
    priceRow.appendChild(priceInput);
    body.appendChild(priceRow);

    // Upload photo control — saved locally, keyed by card name
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
          renderTrackerGrid();
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

function loadTracker() {
  const grid = document.getElementById('tracker-grid');
  const status = document.getElementById('tracker-status');
  const count = document.getElementById('tracker-count');
  if (!grid || !status || !count) return;

  grid.innerHTML = '';
  status.style.display = 'none';
  count.textContent = 'Loading…';

  Papa.parse(TRACKER_CSV_URL + '&_t=' + Date.now(), {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const fields = results.meta.fields || [];
      const nameKey = findCol(fields, TRACKER_COLS.name);
      const noKey = findNoCol(fields);
      const imageKey = findCol(fields, TRACKER_COLS.image);
      const priceKey = findCol(fields, TRACKER_COLS.price);
      const statusKey = findCol(fields, TRACKER_COLS.status);

      const rows = (results.data || []).filter(row =>
        Object.values(row).some(v => v && String(v).trim())
      );

      if (!nameKey || !rows.length) {
        count.textContent = '0 cards';
        status.style.display = 'block';
        status.textContent = 'No cards found yet. Make sure the sheet has "Product name", "No.", "Target Price", and "Status" columns in row 1.';
        trackerItems = [];
        renderTrackerGrid();
        return;
      }

      trackerItems = rows.map(row => ({
        name: nameKey ? row[nameKey] : '',
        no: noKey ? row[noKey] : '',
        image: imageKey ? row[imageKey] : '',
        price: priceKey ? row[priceKey] : '',
        status: statusKey ? row[statusKey] : ''
      }));

      renderTrackerGrid();
    },
    error: function () {
      count.textContent = '';
      status.style.display = 'block';
      status.textContent = 'Could not load the tracker right now. Try refreshing in a moment.';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTracker();

  const refreshBtn = document.getElementById('tracker-refresh');
  if (refreshBtn) refreshBtn.addEventListener('click', loadTracker);

  document.querySelectorAll('#tracker-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#tracker-filters .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      trackerFilter = chip.dataset.status;
      renderTrackerGrid();
    });
  });
});
