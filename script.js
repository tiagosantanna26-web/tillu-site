'use strict';
(function () {
  const contact = window.TILLU_CONTACT || {};

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
