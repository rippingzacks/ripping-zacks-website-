// ============================================================
// RIPPING ZACKS — Pikachu Tracker (marketing.html)
// Pulled live from a Google Sheet, same pattern as Inventory.
// ============================================================

const TRACKER_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtICBFDdqlmg0kPEA_cj-jIRPCvNsw77P8JPGfKrMRuZZxeyPrHK8omN9vqufo8Lo7qoR098GHo1yE/pub?gid=952828787&single=true&output=csv';

const TRACKER_COLS = {
  name: 'product name',
  image: 'image url',
  price: 'target price',
  status: 'status'
};

let trackerItems = [];
let trackerFilter = 'all';

function findCol(fields, targetLower) {
  return fields.find(f => f && f.trim().toLowerCase() === targetLower);
}

function renderTrackerGrid() {
  const grid = document.getElementById('tracker-grid');
  const count = document.getElementById('tracker-count');
  if (!grid || !count) return;

  const visible = trackerFilter === 'all'
    ? trackerItems
    : trackerItems.filter(i => (i.status || '').trim().toLowerCase() === trackerFilter.toLowerCase());

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
    const card = document.createElement('article');
    card.className = 'card-slab';

    const label = document.createElement('div');
    label.className = 'card-slab-label';
    const statusSpan = document.createElement('span');
    statusSpan.textContent = item.status || '—';
    statusSpan.style.color = (item.status || '').trim().toLowerCase() === 'own' ? 'var(--mint)' : 'var(--citrus)';
    label.appendChild(statusSpan);
    card.appendChild(label);

    const art = document.createElement('div');
    art.className = 'card-art';
    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name || '';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      img.onerror = () => { art.innerHTML = '<span class="card-glyph">?</span>'; };
      art.appendChild(img);
    } else {
      const glyph = document.createElement('span');
      glyph.className = 'card-glyph';
      glyph.textContent = '?';
      art.appendChild(glyph);
    }
    card.appendChild(art);

    const body = document.createElement('div');
    body.className = 'card-body';
    const h3 = document.createElement('h3');
    h3.textContent = item.name || 'Untitled';
    body.appendChild(h3);
    if (item.price) {
      const footer = document.createElement('div');
      footer.className = 'card-footer';
      const price = document.createElement('span');
      price.className = 'card-price';
      price.textContent = item.price;
      footer.appendChild(price);
      body.appendChild(footer);
    }
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
      const imageKey = findCol(fields, TRACKER_COLS.image);
      const priceKey = findCol(fields, TRACKER_COLS.price);
      const statusKey = findCol(fields, TRACKER_COLS.status);

      const rows = (results.data || []).filter(row =>
        Object.values(row).some(v => v && String(v).trim())
      );

      if (!nameKey || !rows.length) {
        count.textContent = '0 cards';
        status.style.display = 'block';
        status.textContent = 'No cards found yet. Make sure the sheet has "Product name", "Image URL", "Target Price", and "Status" columns in row 1.';
        trackerItems = [];
        renderTrackerGrid();
        return;
      }

      trackerItems = rows.map(row => ({
        name: nameKey ? row[nameKey] : '',
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
