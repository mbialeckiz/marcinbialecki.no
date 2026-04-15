/* =============================================
   MARCIN BIAŁECKI — main.js
   Animations, Interactions, UX
   ============================================= */

'use strict';

// ── THEME ──────────────────────────────────────
const THEME_KEY = 'marcin-theme';
const html = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || system);
}

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

initTheme();

// ── NAV SCROLL ─────────────────────────────────
const nav = document.getElementById('nav');
let lastScroll = 0;

function onScroll() {
  const y = window.scrollY;
  nav?.classList.toggle('scrolled', y > 40);
  lastScroll = y;
}
window.addEventListener('scroll', onScroll, { passive: true });

// ── MOBILE MENU ────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const overlay     = document.getElementById('mobileOverlay');
const overlayClose = document.getElementById('overlayClose');

function openMenu() {
  overlay?.classList.add('open');
  overlay?.removeAttribute('aria-hidden');
  hamburger?.classList.add('open');
  hamburger?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  overlay?.classList.remove('open');
  overlay?.setAttribute('aria-hidden', 'true');
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openMenu);
overlayClose?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// Close on link click
overlay?.querySelectorAll('.overlay-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ── SMOOTH SCROLL ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── INTERSECTION OBSERVER — SCROLL REVEAL ──────
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('in-view'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

// ── BENTO GRID — STAGGERED ENTRY ───────────────
function initBento() {
  const cards = document.querySelectorAll('.bento-card');
  const delays = [0, 80, 160, 240, 320, 400];

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      cards.forEach((card, i) => {
        const delay = delays[i] || i * 80;
        setTimeout(() => {
          card.classList.add('in-view');
          card.style.transitionDelay = '0ms'; // reset after entry
        }, delay);
      });
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  const bentoGrid = document.getElementById('bentoGrid');
  if (bentoGrid) observer.observe(bentoGrid);
}

// ── COUNTUP ANIMATION ──────────────────────────
function countUp(el, target, suffix, duration = 1500) {
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOut(progress) * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }

  requestAnimationFrame(update);
}

function initStats() {
  const nums = document.querySelectorAll('.stat-num[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        countUp(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
}

// ── SERVICE CARD MOUSE GLOW ────────────────────
function initCardGlow() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
}

// ── TESTIMONIAL CAROUSEL ───────────────────────
function initTestiCarousel() {
  const track  = document.getElementById('testiTrack');
  const dots   = document.querySelectorAll('.testi-dot');
  const prev   = document.querySelector('.testi-prev');
  const next   = document.querySelector('.testi-next');
  if (!track) return;

  const cards = track.querySelectorAll('.testi-card');
  let current = 0;
  let autoTimer;

  function goTo(i) {
    const total = cards.length;
    current = ((i % total) + total) % total;
    const cardWidth = cards[0].offsetWidth + 24; // gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === current);
      d.setAttribute('aria-selected', idx === current ? 'true' : 'false');
    });
  }

  prev?.addEventListener('click', () => { clearInterval(autoTimer); goTo(current - 1); });
  next?.addEventListener('click', () => { clearInterval(autoTimer); goTo(current + 1); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { clearInterval(autoTimer); goTo(i); });
  });

  // Auto-advance
  autoTimer = setInterval(() => goTo(current + 1), 6000);

  // Pause on hover
  track.closest('.testi-carousel')?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.closest('.testi-carousel')?.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  });

  // Recalculate on resize
  window.addEventListener('resize', () => goTo(current), { passive: true });
}

// ── CUSTOM CURSOR ──────────────────────────────
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  const LERP = 0.12;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const interactive = 'a, button, [role="button"], input, textarea, .service-card, .bento-card, .case-card';
  document.querySelectorAll(interactive).forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
}

// ── EMAIL COPY-TO-CLIPBOARD ────────────────────
function initEmailCopy() {
  const emailEl = document.getElementById('emailCopy');
  const toast   = document.getElementById('emailToast');
  if (!emailEl || !toast) return;

  emailEl.addEventListener('click', async (e) => {
    const email = emailEl.dataset.email;
    if (!email || email.startsWith('[')) return;

    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}

// ── CONTACT FORM ───────────────────────────────
function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const action = form.getAttribute('action');

    // Don't submit if placeholder
    if (!action || action.includes('[FORM_ID]')) {
      success?.classList.add('show');
      form.reset();
      return;
    }

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        success?.classList.add('show');
        form.reset();
        form.querySelectorAll('input, textarea, button[type="submit"]').forEach(el => {
          el.disabled = true;
        });
      }
    } catch (err) {
      console.error('Form submission failed:', err);
    }
  });
}

// ── BRAND BAR — pause on hover ─────────────────
function initBrandBar() {
  const track = document.querySelector('.brand-track');
  if (!track) return;
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// ── INIT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Reduced motion check
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initScrollReveal();
  initBento();
  initStats();
  initCardGlow();
  initTestiCarousel();
  initEmailCopy();
  initForm();
  initBrandBar();

  if (!reducedMotion) {
    initCursor();
  }

  // Make all bento cards visible immediately if reduced motion
  if (reducedMotion) {
    document.querySelectorAll('.bento-card').forEach(c => c.classList.add('in-view'));
  }
});
