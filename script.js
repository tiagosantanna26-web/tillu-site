'use strict';
(function () {
  const contact = window.TILLU_CONTACT || {};

  // Vaso espiral 3D: cada camada é um anel, empilhado e torcido.
  const spinner = document.getElementById('vase-spinner');
  const stage = document.getElementById('vase-stage');
  if (spinner && stage) {
    const total = 60;
    const twist = 3;
    const height = 300;
    const mix = (a, b, t) => {
      const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
      const pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
      return 'rgb(' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(',') + ')';
    };
    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const t = i / (total - 1);
      const d = Math.round(110 + 150 * Math.sin(Math.PI * (0.08 + 0.78 * t)) * (1 - 0.3 * t) + 20 * t);
      const top = i >= total - 3;
      const layer = document.createElement('span');
      layer.className = 'vase-layer' + (top ? ' top' : '');
      layer.style.width = d + 'px';
      layer.style.height = d + 'px';
      layer.style.marginLeft = (-d / 2) + 'px';
      layer.style.marginTop = (-d / 2) + 'px';
      layer.style.borderColor = top ? '#96F320' : mix('#5B2FD6', '#B79CFF', t);
      layer.style.transform = 'translateZ(' + (i * height / total).toFixed(1) + 'px) rotateZ(' + (i * twist) + 'deg)';
      layer.style.animationDelay = (i * 45) + 'ms';
      frag.appendChild(layer);
    }
    spinner.appendChild(frag);
    const count = document.getElementById('layer-count');
    if (count) count.textContent = String(total);

    const visual = stage.closest('.hero-visual');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (visual && finePointer) {
      visual.addEventListener('pointermove', e => {
        const r = visual.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        stage.style.transform = 'rotateX(' + (66 - y * 24).toFixed(1) + 'deg) rotateY(' + (x * 30).toFixed(1) + 'deg)';
      });
      visual.addEventListener('pointerleave', () => { stage.style.transform = ''; });
    }
  }

  // Contatos vindos do config.js
  if (/^\d{10,15}$/.test(contact.whatsapp || '')) {
    document.querySelectorAll('[data-wa-link]').forEach(a => {
      a.href = 'https://wa.me/' + contact.whatsapp + '?text=' + encodeURIComponent(a.dataset.waText || 'Olá! Vim pelo site da TILLU.');
    });
  }
  const handle = (contact.instagram || '').replace(/^@/, '').trim();
  if (/^[A-Za-z0-9._]{1,30}$/.test(handle)) {
    const ig = document.getElementById('footer-instagram');
    ig.href = 'https://instagram.com/' + handle;
    ig.textContent = 'Instagram @' + handle;
    ig.hidden = false;
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email || '')) {
    const em = document.getElementById('footer-email');
    em.href = 'mailto:' + contact.email;
    em.textContent = contact.email;
    em.hidden = false;
  }

  // Borda do cabeçalho ao rolar
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
