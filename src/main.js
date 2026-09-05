// Force browser to ALWAYS load/refresh at the top (Hero Section) fresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Intersection Observer for scroll-triggered entrance animations
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.08
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');

      // Trigger smooth ease-out number counters if element contains [data-count]
      const counters = entry.target.querySelectorAll ? entry.target.querySelectorAll('[data-count]') : [];
      if (entry.target.hasAttribute && entry.target.hasAttribute('data-count')) {
        animateNumber(entry.target);
      }
      counters.forEach(counter => animateNumber(counter));

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Silky Smooth 60fps Ease-Out Number Counter (High-end luxury feel, zero tacky ticker)
function animateNumber(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';

  const target = parseInt(el.getAttribute('data-count'), 10);
  const pad = el.getAttribute('data-pad') === 'true';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1100;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Exponential Ease Out curve
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(ease * target);
    const displayVal = pad && current < 10 ? `0${current}` : `${current}`;
    el.textContent = `${displayVal}${progress === 1 ? suffix : ''}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const finalVal = pad && target < 10 ? `0${target}` : `${target}`;
      el.textContent = `${finalVal}${suffix}`;
    }
  }
  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
  // Always scroll to top fresh on load/refresh
  window.scrollTo(0, 0);
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  // =========================================================================
  // 1. EXECUTIVE CURTAIN PRELOADER SEQUENCE (750ms Silky Reveal)
  // =========================================================================
  const preloader = document.getElementById('executivePreloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderCount = document.getElementById('preloaderCount');
  const preloaderStatus = document.getElementById('preloaderStatus');

  if (preloader && preloaderBar && preloaderCount) {
    let progress = 0;
    const preloaderStart = performance.now();
    const preloaderDuration = 700; // Fast, snappy, prestigious

    function tickPreloader(now) {
      const elapsed = now - preloaderStart;
      progress = Math.min(Math.round((elapsed / preloaderDuration) * 100), 100);

      preloaderBar.style.width = progress + '%';
      preloaderCount.textContent = progress + '%';

      if (progress < 40) {
        if (preloaderStatus) preloaderStatus.textContent = 'INITIALIZING DOSSIER...';
      } else if (progress < 85) {
        if (preloaderStatus) preloaderStatus.textContent = 'VERIFYING CREDENTIALS...';
      } else {
        if (preloaderStatus) preloaderStatus.textContent = 'DOSSIER READY';
      }

      if (progress < 100) {
        requestAnimationFrame(tickPreloader);
      } else {
        // Trigger high-end luxury curtain lift
        setTimeout(() => {
          preloader.classList.add('curtain-lift');

          // Orchestrated Hero Staggered Entrance
          setTimeout(() => {
            document.querySelectorAll('.animate-fade-up, .animate-fade-down, .animate-fade-left').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate');
                // Trigger hero numbers if present
                el.querySelectorAll('[data-count]').forEach(c => animateNumber(c));
              }, index * 80);
            });
          }, 250);

          // Clean up DOM after curtain finishes lifting
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 900);
        }, 120);
      }
    }
    requestAnimationFrame(tickPreloader);
  } else {
    // Fallback if preloader element not present
    document.querySelectorAll('.animate-fade-up, .animate-fade-down, .animate-fade-left').forEach(el => {
      el.classList.add('animate');
    });
  }

  // =========================================================================
  // 2. INTERACTIVE AMBIENT CURSOR SPOTLIGHT (Smooth desktop illumination)
  // =========================================================================
  const spotlight = document.getElementById('cursorSpotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let spotlightActive = false;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!spotlightActive) {
        spotlight.style.opacity = '1';
        spotlightActive = true;
      }
    });

    function renderSpotlight() {
      // Smooth lerp (linear interpolation) for buttery 60fps tracking
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      spotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderSpotlight);
    }
    requestAnimationFrame(renderSpotlight);
  }

  // =========================================================================
  // 3. SCROLL PROGRESS BAR
  // =========================================================================
  const progressBar = document.getElementById('scroll-progress');
  const mainHeader = document.getElementById('mainHeader');

  function updateHeaderOnScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = scrollPct + '%';

    if (mainHeader) {
      if (scrollTop > 25) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  // Observe section elements for scroll reveals
  const observeElements = [
    '.editorial-section-header', '.about-narrative-col', '.about-spec-col',
    '.career-ledger', '.ledger-row', '.edu-entry', '.project-dossier',
    '.competency-console', '.console-pillar', '.animate-cascade', '.cert-card', '.metrics-row', '.honor-roll',
    '.contact-form-col', '.contact-info-col'
  ];

  observeElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  });

  // =========================================================================
  // 4. CERTIFICATIONS CATEGORY FILTERS
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // =========================================================================
  // 5. LIGHTBOX MODAL FOR CERTIFICATES
  // =========================================================================
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.querySelector('.modal-close');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      let fullImgSrc = card.getAttribute('data-full-img');
      const title = card.querySelector('h4')?.innerText || 'Certificate Credential';
      if (modal && modalImg && fullImgSrc) {
        if (fullImgSrc.startsWith('/')) {
          fullImgSrc = '.' + fullImgSrc;
        }
        modalImg.src = fullImgSrc;
        if (modalCaption) modalCaption.innerText = title;
        modal.style.display = 'flex';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });

  // =========================================================================
  // 6. HERO PORTRAIT 3D TILT EFFECT
  // =========================================================================
  const portraitContainer = document.querySelector('.hero-portrait-container');
  const heroFrame = document.querySelector('.hero-img-frame');

  if (portraitContainer && heroFrame) {
    portraitContainer.addEventListener('mousemove', (e) => {
      const rect = portraitContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      heroFrame.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      heroFrame.style.transition = 'transform 0.08s ease-out';
    });

    portraitContainer.addEventListener('mouseleave', () => {
      heroFrame.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      heroFrame.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  }

  // =========================================================================
  // 7. CONTACT FORM SUBMISSION VIA HIDDEN IFRAME (NO PAGE REDIRECT)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formStatus  = document.getElementById('formStatus');
  const submitBtn   = document.getElementById('submitBtn');
  const dateField   = document.getElementById('dateField');

  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      if (dateField) dateField.value = new Date().toLocaleString();

      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.innerHTML = `
          <div class="form-status-card status-loading animate-fade-in">
            <div class="spinner-ring"></div>
            <span>Delivering your message...</span>
          </div>
        `;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span><div class="btn-spinner"></div>`;
      }

      setTimeout(() => {
        if (formStatus) {
          formStatus.innerHTML = `
            <div class="form-status-card status-success animate-pop-in">
              <div class="status-check">✓</div>
              <div class="status-info">
                <strong>Message Successfully Sent</strong>
                <p>Thank you for reaching out. Om Jee will review your note personally and respond promptly.</p>
              </div>
            </div>
          `;
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          `;
        }
      }, 2500);
    });
  }

  // =========================================================================
  // 8. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const navToggleBtn = document.getElementById('navToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('#mobileNavDrawer a');

  if (navToggleBtn && mobileNavDrawer) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.toggle('active');
      navToggleBtn.classList.toggle('active', isOpen);
      navToggleBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        navToggleBtn.classList.remove('active');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Prevent accidental image ghost dragging
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
}, true);
