document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Preloader
     ========================================================================== */
  const preloader    = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderPct = document.getElementById('preloader-pct');
  let progress = 0;

  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        preloader.style.opacity    = '0';
        preloader.style.visibility = 'hidden';
        document.body.classList.remove('loading');
        initReveal(); // trigger reveals for elements already in view
      }, 380);
    }
    preloaderBar.style.width  = `${progress}%`;
    preloaderPct.textContent  = `${progress}%`;
  }, 110);

  /* ==========================================================================
     Custom Cursor (fine pointer / desktop only)
     ========================================================================== */
  const cursorDot  = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');

  if (window.matchMedia('(pointer: fine)').matches) {
    let mx = window.innerWidth / 2,  my = window.innerHeight / 2;
    let dx = mx, dy = my, gx = mx, gy = my;

    window.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    const renderCursor = () => {
      dx += (mx - dx) * 0.22;
      dy += (my - dy) * 0.22;
      gx += (mx - gx) * 0.05;
      gy += (my - gy) * 0.05;

      cursorDot.style.left  = `${dx}px`;
      cursorDot.style.top   = `${dy}px`;
      cursorGlow.style.left = `${gx}px`;
      cursorGlow.style.top  = `${gy}px`;

      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Expand cursor on interactive elements
    document.querySelectorAll(
      'a, button, .skill-tag, .card, .cert-card, .cmethod, .contact-chip'
    ).forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('expand'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('expand'));
    });
  }

  /* ==========================================================================
     Scroll Progress + Nav state + Active section link + Back-to-top
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const mainNav        = document.getElementById('main-nav');
  const backToTop      = document.getElementById('back-to-top');
  const navLinks       = document.querySelectorAll('.nav-link');
  const sections       = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY   = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;

    // Scroll progress bar
    scrollProgress.style.width = `${(scrollY / docHeight) * 100}%`;

    // Nav glass effect
    mainNav.classList.toggle('scrolled', scrollY > 60);

    // Back-to-top button
    backToTop.classList.toggle('visible', scrollY > 450);

    // Active nav link highlight
    let current = 'hero';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================================
     Smooth-scroll for all anchor links + Mobile menu close
     ========================================================================== */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      const target   = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      // Close mobile menu
      closeMobileMenu();
    });
  });

  /* ==========================================================================
     Mobile Menu Toggle
     ========================================================================== */
  function openMobileMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ==========================================================================
     Typed Role Effect
     ========================================================================== */
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    const roles = ['AI Engineer', 'Data Scientist', 'ML Developer', 'Django Dev'];
    let rIdx = 0, cIdx = 0, deleting = false, speed = 140;

    const type = () => {
      const word = roles[rIdx];
      typedEl.textContent = deleting
        ? word.substring(0, --cIdx)
        : word.substring(0, ++cIdx);

      speed = deleting ? 55 : 140;
      if (!deleting && cIdx === word.length)  { speed = 2200; deleting = true; }
      else if (deleting && cIdx === 0)         { deleting = false; rIdx = (rIdx + 1) % roles.length; speed = 420; }

      setTimeout(type, speed);
    };
    type();
  }

  /* ==========================================================================
     Scroll Reveal via IntersectionObserver
     ========================================================================== */
  const reveals = document.querySelectorAll('.reveal-up');

  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Animate timeline dots with a slight extra delay
      if (entry.target.classList.contains('timeline-entry')) {
        const dot = entry.target.querySelector('.tl-dot');
        if (dot) setTimeout(() => dot.classList.add('active'), 350);
      }

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObs.observe(el));

  function initReveal() {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
        const dot = el.querySelector('.tl-dot');
        if (dot) setTimeout(() => dot.classList.add('active'), 350);
      }
    });
  }

  /* ==========================================================================
     Hero SVG Parallax on Mouse Move (desktop, no reduced-motion)
     ========================================================================== */
  const svgWrap = document.getElementById('hero-svg-wrap');
  if (
    svgWrap &&
    window.matchMedia('(min-width: 900px)').matches &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  ) {
    const heroSection = document.getElementById('hero');
    svgWrap.style.transition = 'transform 0.5s cubic-bezier(0.25,1,0.5,1)';

    heroSection.addEventListener('mousemove', e => {
      const { left, top, width, height } = heroSection.getBoundingClientRect();
      const x = (e.clientX - left - width  / 2) / width;
      const y = (e.clientY - top  - height / 2) / height;
      svgWrap.style.transform = `translate(${x * 12}px, ${y * 9}px)`;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      svgWrap.style.transform = 'translate(0, 0)';
    });
  }

  /* ==========================================================================
     Contact Form (EmailJS)
     ========================================================================== */
  if (typeof emailjs !== 'undefined') {
    emailjs.init('d2puZ2XIYjd6UNekY');
  }

  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name    = document.getElementById('cf-name').value.trim();
      const email   = document.getElementById('cf-email').value.trim();
      const subject = document.getElementById('cf-subject').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        showFeedback('Please fill out all fields.', 'error');
        return;
      }

      // Simple email format check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      // Set timestamp
      const timeField = document.getElementById('cf-time');
      if (timeField) {
        timeField.value = new Date().toLocaleString('en-IN', {
          weekday: 'short', year: 'numeric', month: 'short',
          day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
      }

      // Loading state
      const submitBtn = document.getElementById('cf-submit');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending…</span> <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
      formFeedback.textContent = '';

      if (typeof emailjs === 'undefined') {
        showFeedback('❌ Email service unavailable. Please email: g.s.mandal433@gmail.com', 'error');
        resetBtn(submitBtn);
        return;
      }

      emailjs.sendForm('service_daz4yv4', 'template_9q55euf', contactForm)
        .then(() => {
          showFeedback('✅ Message sent! I\'ll get back to you soon.', 'success');
          contactForm.reset();
          resetBtn(submitBtn);
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          showFeedback('❌ Something went wrong. Email me directly: g.s.mandal433@gmail.com', 'error');
          resetBtn(submitBtn);
        });
    });

    function showFeedback(msg, type) {
      formFeedback.textContent = msg;
      formFeedback.style.color = type === 'error' ? '#f87171' : '#86efac';
    }

    function resetBtn(btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
    }
  }

  /* ==========================================================================
     Footer year
     ========================================================================== */
  const copyYear = document.getElementById('copy-year');
  if (copyYear) copyYear.textContent = new Date().getFullYear();

});
