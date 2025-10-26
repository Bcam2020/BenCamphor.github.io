// 1) Reveal on scroll (keeps your existing behaviour)
(() => {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        o.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  items.forEach(el => obs.observe(el));
})();

// 2) Scroll progress bar
(() => {
  const bar = document.querySelector('.scrollbar');
  if (!bar) return;
  const onScroll = () => {
    const sc = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(1, h ? sc / h : 0));
    bar.style.width = (pct * 100) + '%';
  };
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
})();

// 3) Subtle parallax for hero background
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  addEventListener('scroll', () => {
    const offset = window.scrollY * 0.2;
    hero.style.backgroundPositionY = `${offset}px`;
  }, { passive: true });
})();

// 4) Mobile nav toggle (hamburger)
(() => {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primaryNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open');
  });
})();
