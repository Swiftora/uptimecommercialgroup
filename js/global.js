/* ════════════════════════════════════════
   UPTIME COMMERCIAL — Global JavaScript
════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── CURSOR ── */
  const cdot  = document.getElementById('cdot');
  const cring = document.getElementById('cring');
  let mx=0, my=0, rx=0, ry=0;

  if (cdot && cring && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cdot.style.left  = mx + 'px';
      cdot.style.top   = my + 'px';
    });
    (function tick() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      cring.style.left = rx + 'px';
      cring.style.top  = ry + 'px';
      requestAnimationFrame(tick);
    })();
    document.querySelectorAll('a, button, .svc-item, .eng-card, .tcard, .clink, .ins-card, .team-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cdot.style.transform  = 'translate(-50%,-50%) scale(2.2)';
        cring.style.transform = 'translate(-50%,-50%) scale(1.5)';
        cring.style.borderColor = 'rgba(196,162,74,0.65)';
      });
      el.addEventListener('mouseleave', () => {
        cdot.style.transform  = 'translate(-50%,-50%) scale(1)';
        cring.style.transform = 'translate(-50%,-50%) scale(1)';
        cring.style.borderColor = 'rgba(196,162,74,0.35)';
      });
    });
  }

  /* ── NAV SCROLL STATE ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('solid', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* ── PROGRESS BAR ── */
  const prog = document.getElementById('prog');
  if (prog) {
    window.addEventListener('scroll', () => {
      const d = document.documentElement;
      const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
      prog.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  /* ── NAV ACTIVE STATE ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-mid a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── SCROLL REVEAL ── */
  const revEls = document.querySelectorAll('.rv');

  function showIfVisible(el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.93 && rect.bottom > 0) {
      el.classList.add('on');
      return true;
    }
    return false;
  }

  // Intersection Observer (primary method)
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -16px 0px' });

    revEls.forEach(el => {
      if (!showIfVisible(el)) io.observe(el);
    });
  } else {
    // Fallback for environments without IO
    revEls.forEach(el => el.classList.add('on'));
  }

  // Scroll fallback
  window.addEventListener('scroll', () => {
    revEls.forEach(el => {
      if (!el.classList.contains('on')) showIfVisible(el);
    });
  }, { passive: true });

  // Ensure all visible on load (handles iframe/preview contexts)
  setTimeout(() => {
    revEls.forEach(el => {
      if (!el.classList.contains('on')) showIfVisible(el);
    });
  }, 150);

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 66,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── CONTACT FORM (Formspree) ── */
  const forms = document.querySelectorAll('.cform[data-formspree]');
  forms.forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const endpoint = form.dataset.formspree;
      const okEl = form.querySelector('.form-ok');
      const submitBtn = form.querySelector('.fsub');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (resp.ok) {
          if (okEl) okEl.classList.add('show');
          form.querySelectorAll('input,select,textarea,button').forEach(el => el.disabled = true);
        } else {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
          alert('Something went wrong. Please email us directly at Eric.R.Elder86@gmail.com');
        }
      } catch {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
        alert('Something went wrong. Please email us directly at Eric.R.Elder86@gmail.com');
      }
    });
  });

  /* ── TICKER PAUSE ON HOVER ── */
  document.querySelectorAll('.ticker-track').forEach(t => {
    const parent = t.closest('.hero-foot, .ticker-wrap');
    if (parent) {
      parent.addEventListener('mouseenter', () => t.style.animationPlayState = 'paused');
      parent.addEventListener('mouseleave', () => t.style.animationPlayState = 'running');
    }
  });

})();
