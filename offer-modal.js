// ============================================================
// MAKE AN OFFER MODAL
// Shared across Lorcana Vault, Slab Vault, and Sealed Vault.
// Clicking any card (image or plaque) opens the modal with the
// item name pre-filled. Submits via Netlify Forms (AJAX), so the
// static <form data-netlify="true"> lower in this page's HTML
// must stay untouched for Netlify's build-time form detection to
// pick it up. Not wired on Fort Knox Vault -- that page is a
// third-party Collectr iframe, not our own card markup.
// ============================================================

(function () {
  function encodeFormData(form) {
    const data = new FormData(form);
    return new URLSearchParams(data).toString();
  }

  function initOfferModal() {
    const overlay = document.getElementById('offer-modal-overlay');
    if (!overlay) return;

    const closeBtn = document.getElementById('offer-modal-close');
    const itemNameEl = document.getElementById('offer-modal-item-name');
    const itemInput = document.getElementById('offer-item-input');
    const form = document.getElementById('offer-form');
    const successEl = document.getElementById('offer-success');
    const errorEl = document.getElementById('offer-error');
    const submitBtn = form ? form.querySelector('.offer-submit-btn') : null;

    function resetModal() {
      if (form) {
        form.style.display = '';
        form.reset();
      }
      if (successEl) successEl.hidden = true;
      if (errorEl) errorEl.hidden = true;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Offer';
      }
    }

    function openModal(itemName) {
      resetModal();
      if (itemNameEl) itemNameEl.textContent = itemName;
      if (itemInput) itemInput.value = itemName;
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
    });

    // Delegated click: any plaque anywhere on the page opens the modal.
    // Ignores clicks on actual links inside a plaque (e.g. the set-name tag).
    document.addEventListener('click', function (e) {
      if (e.target.closest('.offer-modal')) return;
      const plaque = e.target.closest('.vault-plaque');
      if (!plaque) return;
      if (e.target.closest('a')) return;

      const titleEl = plaque.querySelector('h3');
      const itemName = titleEl ? titleEl.textContent.trim() : 'this item';
      openModal(itemName);
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending…';
        }
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodeFormData(form),
        })
          .then(function () {
            form.style.display = 'none';
            if (successEl) successEl.hidden = false;
          })
          .catch(function () {
            if (errorEl) errorEl.hidden = false;
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Send Offer';
            }
          });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initOfferModal);
})();
