// ============================================================
// RIPPING ZACKS — shared behavior
// ============================================================

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '116px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = '#13214a';
      links.style.padding = '20px 28px';
      links.style.borderBottom = '1px solid rgba(246,231,201,0.14)';
      links.style.gap = '18px';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // Shop filter chips (client-side, no backend)
  const chips = document.querySelectorAll('.filter-chip');
  const items = document.querySelectorAll('[data-set], [data-rarity]');
  if (chips.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.closest('.filter-group');
        group.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        applyFilters();
      });
    });
  }

  function applyFilters() {
    const activeRarity = document.querySelector('[data-filter="rarity"] .filter-chip.active');
    const rarityVal = activeRarity ? activeRarity.dataset.value : 'all';
    let visibleCount = 0;
    document.querySelectorAll('.card-slab[data-rarity]').forEach(card => {
      const match = rarityVal === 'all' || card.dataset.rarity === rarityVal;
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });
    const counter = document.querySelector('.result-count');
    if (counter) counter.textContent = `${visibleCount} card${visibleCount === 1 ? '' : 's'}`;
  }

  // Contact form — posts as JSON to POST /api/contact (Vercel serverless
  // function, see api/contact.js).
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const submitBtn = form.querySelector('button[type="submit"]');
      const fields = {};
      new FormData(form).forEach((value, key) => { fields[key] = value; });
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
        .then((res) => {
          if (!res.ok) throw new Error('send failed');
          if (status) {
            status.textContent = 'Message sent — we typically respond within 24–48 hours.';
            status.classList.add('visible');
          }
          form.reset();
        })
        .catch(() => {
          if (status) {
            status.textContent = 'Something went wrong sending your message. Please try again, or email us directly.';
            status.classList.add('visible');
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        });
    });
  }

  // Collectr portfolio embed — manual refresh
  const refreshBtn = document.getElementById('collectr-refresh');
  const collectrFrame = document.getElementById('collectr-frame');
  if (refreshBtn && collectrFrame) {
    refreshBtn.addEventListener('click', () => {
      const base = collectrFrame.src.split('?')[0];
      collectrFrame.src = base + '?t=' + Date.now();
    });
  }
});
