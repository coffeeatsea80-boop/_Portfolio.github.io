// Force browser to ALWAYS load/refresh at the top (Hero Section) fresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Intersection Observer options for smooth entrance animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Always scroll to top fresh on load/refresh
  window.scrollTo(0, 0);
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  // Initial hero entrance animations
  setTimeout(() => {
    document.querySelectorAll('.animate-fade-up, .animate-fade-down, .animate-fade-left').forEach(el => {
      el.classList.add('animate');
    });
  }, 200);

  // Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = scrollPct + '%';
  });

  // Observe section elements for scroll reveals
  const observeElements = [
    '.editorial-section-header', '.about-narrative-col', '.about-spec-col',
    '.career-ledger', '.edu-entry', '.project-dossier',
    '.competency-console', '.animate-cascade', '.metrics-row', '.honor-roll',
    '.contact-form-col', '.contact-info-col'
  ];

  observeElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  });

  // Category Filter for Certifications
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

  // Lightbox Modal for Certificate Previews
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

  // Subtle interactive hover on hero portrait frame
  const portraitContainer = document.querySelector('.hero-portrait-container');
  const heroFrame = document.querySelector('.hero-img-frame');

  if (portraitContainer && heroFrame) {
    portraitContainer.addEventListener('mousemove', (e) => {
      const rect = portraitContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      heroFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      heroFrame.style.transition = 'transform 0.1s ease-out';
    });

    portraitContainer.addEventListener('mouseleave', () => {
      heroFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      heroFrame.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  }

  // Contact Form — Hidden iFrame POST to Google Sheets (no CORS issues)
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

  // Mobile Navigation Drawer Toggle
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
