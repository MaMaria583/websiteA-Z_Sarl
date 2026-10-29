/* ==========================================================================
   A-Z Sarl — interactions du site (sans dépendance)
   ========================================================================== */
(() => {
  'use strict';
  window.__az = true;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const root = document.documentElement;
  const lang = root.lang || 'fr';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;

  /* ---------- En-tête au défilement + retour en haut ---------- */
  const header = $('.site-header');
  const toTop = $('.to-top');
  const onScroll = () => {
    const y = window.scrollY;
    header && header.classList.toggle('is-scrolled', y > 8);
    toTop && toTop.classList.toggle('is-visible', y > 900);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Méga-menu « Expertises » ---------- */
  $$('[data-mega]').forEach((item) => {
    const btn = $('.nav__link', item);
    let closeTimer;
    const setOpen = (open) => {
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    if (canHover) {
      item.addEventListener('mouseenter', () => { clearTimeout(closeTimer); setOpen(true); });
      item.addEventListener('mouseleave', () => { closeTimer = setTimeout(() => setOpen(false), 140); });
    }
    item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) setOpen(false); });
    document.addEventListener('click', (e) => { if (!item.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && item.classList.contains('is-open')) { setOpen(false); btn.focus(); }
    });
  });

  /* ---------- Menu mobile ---------- */
  const toggle = $('.nav-toggle');
  const panel = $('#mobile-nav');
  if (toggle && panel) {
    const focusables = () => $$('a[href], button:not([disabled]), summary', panel).filter((el) => el.offsetParent !== null);
    const open = (state) => {
      root.classList.toggle('menu-open', state);
      toggle.setAttribute('aria-expanded', String(state));
      panel.toggleAttribute('inert', !state);
      panel.setAttribute('aria-hidden', String(!state));
      if (state) { const first = focusables()[0]; first && setTimeout(() => first.focus(), 60); }
      else toggle.focus({ preventScroll: true });
    };
    toggle.addEventListener('click', () => open(!root.classList.contains('menu-open')));
    $$('[data-close-menu]', panel).forEach((b) => b.addEventListener('click', () => open(false)));
    $$('a[href]', panel).forEach((a) => a.addEventListener('click', () => root.classList.remove('menu-open')));
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') open(false);
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
    window.matchMedia('(min-width: 1180px)').addEventListener('change', (m) => { if (m.matches && root.classList.contains('menu-open')) open(false); });
  }

  /* ---------- Apparitions au défilement ---------- */
  const revealEls = $$('[data-reveal]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Compteurs ---------- */
  const counters = $$('[data-count]');
  const runCount = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = String(target); return; }
    const start = performance.now();
    const dur = 1300;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  } else counters.forEach(runCount);

  /* ---------- Longueur des tracés animés (flèche du héros) ---------- */
  $$('.swoosh-path').forEach((p) => {
    try { p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + 1); } catch (e) { /* SVG non rendu */ }
  });

  /* ---------- Démarche : ligne qui se trace au défilement ---------- */
  const steps = $('[data-process]');
  if (steps) {
    const items = $$('.step', steps);
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = steps.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = reduceMotion ? 1 : Math.min(1, Math.max(0, (vh * 0.78 - r.top) / (r.height * 0.85)));
      steps.style.setProperty('--p', p.toFixed(3));
      items.forEach((s, i) => s.classList.toggle('is-active', p >= (items.length > 1 ? i / (items.length - 1) : 1) - 0.04));
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
  }

  /* ---------- Carte : survol légende <-> repères ---------- */
  $$('[data-map]').forEach((block) => {
    $$('[data-place]', block).forEach((el) => {
      const key = el.dataset.place;
      const hl = (on) => $$(`[data-place="${key}"]`, block).forEach((x) => x.classList.toggle('is-hl', on));
      el.addEventListener('mouseenter', () => hl(true));
      el.addEventListener('mouseleave', () => hl(false));
    });
  });

  /* ---------- Filtres partenaires ---------- */
  const filterBtns = $$('[data-filter]');
  if (filterBtns.length) {
    const cards = $$('[data-cat]');
    filterBtns.forEach((btn) => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      cards.forEach((c) => { c.hidden = !(f === 'all' || c.dataset.cat === f); });
      const live = $('[data-filter-status]');
      if (live) live.textContent = live.dataset.template.replace('{n}', String(cards.filter((c) => !c.hidden).length));
    }));
  }

  /* ---------- Visionneuse photo ---------- */
  const galleryLinks = $$('[data-lightbox]');
  if (galleryLinks.length && typeof HTMLDialogElement === 'function') {
    const L = lang === 'en'
      ? { close: 'Close', prev: 'Previous photo', next: 'Next photo', of: 'of' }
      : { close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', of: 'sur' };
    const icon = (d) => `<svg class="icon icon-stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', lang === 'en' ? 'Photo viewer' : 'Visionneuse de photos');
    dlg.innerHTML = `
      <div class="lightbox__bar"><span class="lightbox__count" aria-live="polite"></span>
        <button type="button" class="lightbox__close" aria-label="${L.close}">${icon('M6 6l12 12M18 6 6 18')}</button></div>
      <div class="lightbox__stage"><img alt=""></div>
      <p class="lightbox__cap"></p>
      <button type="button" class="lightbox__prev" aria-label="${L.prev}">${icon('M5 12h14M13 6l6 6-6 6')}</button>
      <button type="button" class="lightbox__next" aria-label="${L.next}">${icon('M5 12h14M13 6l6 6-6 6')}</button>`;
    document.body.appendChild(dlg);
    const img = $('img', dlg);
    const cap = $('.lightbox__cap', dlg);
    const count = $('.lightbox__count', dlg);
    let group = [];
    let idx = 0;
    const show = (i) => {
      idx = (i + group.length) % group.length;
      const a = group[idx];
      img.src = a.getAttribute('href');
      img.alt = a.dataset.caption || '';
      cap.textContent = a.dataset.caption || '';
      count.textContent = `${idx + 1} ${L.of} ${group.length}`;
    };
    galleryLinks.forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      group = galleryLinks.filter((x) => x.dataset.lightbox === a.dataset.lightbox);
      show(group.indexOf(a));
      dlg.showModal();
    }));
    $('.lightbox__close', dlg).addEventListener('click', () => dlg.close());
    $('.lightbox__prev', dlg).addEventListener('click', () => show(idx - 1));
    $('.lightbox__next', dlg).addEventListener('click', () => show(idx + 1));
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lightbox__stage')) dlg.close(); });
    let x0 = null;
    dlg.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- Formulaires ---------- */
  const MSG = lang === 'en'
    ? { required: 'This field is required.', email: 'Please enter a valid email address.', fileSize: 'The file must not exceed 5 MB.', fileType: 'Accepted formats: PDF, Word (.doc, .docx) or .odt.', check: 'Please check this box to continue.' }
    : { required: 'Ce champ est obligatoire.', email: 'Veuillez saisir une adresse e-mail valide.', fileSize: 'Le fichier ne doit pas dépasser 5 Mo.', fileType: 'Formats acceptés : PDF, Word (.doc, .docx) ou .odt.', check: 'Veuillez cocher cette case pour continuer.' };
  $$('form[data-form]').forEach((form) => {
    const next = $('input[name="_next"]', form);
    if (next && next.dataset.page) next.value = new URL(next.dataset.page, window.location.href).href;

    $$('.dropzone', form).forEach((dz) => {
      const input = $('input[type="file"]', dz);
      const name = $('.dropzone__name', dz);
      input.addEventListener('change', () => { name.textContent = input.files[0] ? input.files[0].name : ''; });
      ['dragenter', 'dragover'].forEach((t) => dz.addEventListener(t, () => dz.classList.add('is-over')));
      ['dragleave', 'drop'].forEach((t) => dz.addEventListener(t, () => dz.classList.remove('is-over')));
    });

    const validate = (field) => {
      const box = field.closest('.field');
      const err = box && $('.field__error', box);
      let msg = '';
      if (field.type === 'checkbox' && field.required && !field.checked) msg = MSG.check;
      else if (field.validity.valueMissing) msg = MSG.required;
      else if (field.type === 'email' && field.validity.typeMismatch) msg = MSG.email;
      else if (field.type === 'file' && field.files && field.files[0]) {
        const f = field.files[0];
        if (f.size > 5 * 1024 * 1024) msg = MSG.fileSize;
        else if (!/\.(pdf|docx?|odt)$/i.test(f.name)) msg = MSG.fileType;
      }
      if (msg) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
      if (err) err.textContent = msg;
      return !msg;
    };
    const fields = $$('input, select, textarea', form).filter((f) => f.name && !f.name.startsWith('_') && f.type !== 'hidden');
    fields.forEach((f) => f.addEventListener('blur', () => { if (f.value || f.hasAttribute('aria-invalid')) validate(f); }));
    fields.forEach((f) => f.addEventListener('change', () => { if (f.hasAttribute('aria-invalid')) validate(f); }));

    form.addEventListener('submit', (e) => {
      const ok = fields.map(validate).every(Boolean);
      if (!ok) {
        e.preventDefault();
        const first = $('[aria-invalid="true"]', form);
        first && first.focus();
        return;
      }
      form.classList.add('is-sending');
    });
  });

  /* ---------- Année courante ---------- */
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
