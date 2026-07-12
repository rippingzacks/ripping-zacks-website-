// ============================================================
// RIPPING ZACKS — Inventory page (Google Sheet live feed)
// ============================================================

const INVENTORY_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtICBFDdqlmg0kPEA_cj-jIRPCvNsw77P8JPGfKrMRuZZxeyPrHK8omN9vqufo8Lo7qoR098GHo1yE/pub?gid=1746690319&single=true&output=csv';

function loadInventory() {
  const grid = document.getElementById('inventory-grid');
  const status = document.getElementById('inventory-status');
  const count = document.getElementById('inventory-count');
  if (!grid || !status || !count) return;

  grid.innerHTML = '';
  status.style.display = 'none';
  count.textContent = 'Loading inventory…';

  Papa.parse(INVENTORY_CSV_URL + '&_t=' + Date.now(), {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const ALLOWED_COLUMNS = ['product name', 'quantity'];
      const headers = (results.meta.fields || []).filter(
        h => h && ALLOWED_COLUMNS.includes(h.trim().toLowerCase())
      );
      const rows = (results.data || []).filter(row =>
        Object.values(row).some(v => v && String(v).trim())
      );

      if (!headers.length || !rows.length) {
        count.textContent = '0 items';
        status.style.display = 'block';
        status.textContent = 'No inventory items found yet. Make sure the sheet has column titles in row 1 and at least one item below it.';
        return;
      }

      const titleKey = headers.find(h => h.trim().toLowerCase() === 'product name') || headers[0];
      const bodyKeys = headers.filter(h => h !== titleKey);
      count.textContent = rows.length + (rows.length === 1 ? ' item' : ' items');

      rows.forEach(row => {
        const card = document.createElement('article');
        card.className = 'card-slab';

        const body = document.createElement('div');
        body.className = 'card-body';

        const h3 = document.createElement('h3');
        h3.textContent = row[titleKey] || 'Untitled';
        h3.style.marginBottom = '12px';
        body.appendChild(h3);

        bodyKeys.forEach(key => {
          const val = row[key];
          if (!val || !String(val).trim()) return;
          const rowDiv = document.createElement('div');
          rowDiv.className = 'inv-row';
          const label = document.createElement('span');
          label.className = 'inv-label';
          label.textContent = key;
          const value = document.createElement('span');
          value.className = 'inv-value';
          value.textContent = val;
          rowDiv.appendChild(label);
          rowDiv.appendChild(value);
          body.appendChild(rowDiv);
        });

        card.appendChild(body);
        grid.appendChild(card);
      });
    },
    error: function () {
      count.textContent = '';
      status.style.display = 'block';
      status.textContent = 'Could not load inventory right now. Try refreshing in a moment.';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadInventory();
  const btn = document.getElementById('inventory-refresh');
  if (btn) btn.addEventListener('click', loadInventory);
});
