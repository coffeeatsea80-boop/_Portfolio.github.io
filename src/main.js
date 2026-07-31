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

      // Skills progress bar & percentage count-up
      if (entry.target.classList.contains('animate-skill-card')) {
        const progressBars = entry.target.querySelectorAll('.progress-bar');
        const percentages = entry.target.querySelectorAll('.skill-pct');

        progressBars.forEach((bar, index) => {
          const target = parseInt(bar.getAttribute('data-target'), 10);
          setTimeout(() => {
            bar.style.width = target + '%';
            let current = 0;
            const increment = target / 40;
            const counter = setInterval(() => {
              current += increment;
              if (current >= target) {
                percentages[index].innerText = target + '%';
                clearInterval(counter);
              } else {
                percentages[index].innerText = Math.round(current) + '%';
              }
            }, 25);
          }, 200);
        });
      }

      // Stats Count-up animation
      if (entry.target.classList.contains('stats-counter')) {
        const statNums = entry.target.querySelectorAll('.stat-num');
        statNums.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-val'), 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 30));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              stat.innerText = target;
              clearInterval(timer);
            } else {
              stat.innerText = current;
            }
          }, 40);
        });
      }

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

  // Observe section elements
  const observeElements = [
    '.about-image-wrapper', '.summary-text', '.flip-card',
    '.animate-exp-card', '.animate-drop-in', '.animate-rise-up',
    '.animate-project', '.animate-skill-card', '.animate-cascade',
    '.animate-zoom-in', '.stats-counter', '.animate-slide-in-bl', '.animate-slide-in-br'
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
      const fullImgSrc = card.getAttribute('data-full-img');
      const title = card.querySelector('h4')?.innerText || 'Certificate Credential';
      if (modal && modalImg && fullImgSrc) {
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

  // Interactive 3D Mouse Parallax & Tilt Animation for Hero Profile Photo
  const portraitContainer = document.querySelector('.hero-portrait-container');
  const heroFrame = document.querySelector('.hero-img-frame');
  const halo = document.querySelector('.portrait-halo');

  if (portraitContainer && heroFrame) {
    portraitContainer.addEventListener('mousemove', (e) => {
      const rect = portraitContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -18;
      const rotateY = ((x - centerX) / centerX) * 18;

      heroFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.06, 1.06, 1.06)`;
      heroFrame.style.transition = 'transform 0.08s cubic-bezier(0.2, 0, 0.2, 1)';

      if (halo) {
        halo.style.transform = `translate(${rotateY * 1.5}px, ${-rotateX * 1.5}px) scale(1.18)`;
        halo.style.transition = 'transform 0.12s ease-out';
      }
    });

    portraitContainer.addEventListener('mouseleave', () => {
      heroFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      heroFrame.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      if (halo) {
        halo.style.transform = 'translate(0px, 0px) scale(1)';
        halo.style.transition = 'transform 0.6s ease-out';
      }
    });
  }

  // Interactive 3D Magnetic Mouse Parallax & Tilt for ALL Buttons
  const interactiveButtons = document.querySelectorAll('.btn, .nav-contact-btn, .filter-btn, .social-chip');

  interactiveButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      btn.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.06, 1.06, 1.06)`;
      btn.style.transition = 'transform 0.08s ease-out';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  // Google Sheets Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  // Active Google Apps Script Web App URL
  window.GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdgSWRRk7KAF9u-Fa1WalJ0FbUUtq5hVlt0mNy87BL4Yna_PXpew7HKfysEBwHm2Ps/exec';

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        subject: document.getElementById('subject')?.value || '',
        message: document.getElementById('message')?.value || '',
        date: new Date().toLocaleString()
      };

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

      try {
        await fetch(window.GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(formData)
        });

        if (formStatus) {
          formStatus.innerHTML = `
            <div class="form-status-card status-success animate-pop-in">
              <div class="status-check">✓</div>
              <div class="status-info">
                <strong>Message Delivered to Om Jee Pandey! ✨</strong>
                <p>Thank you for your consideration! Om will review your note personally and get back to you very soon. Looking forward to connecting!</p>
              </div>
            </div>
          `;
        }
        contactForm.reset();
      } catch (err) {
        if (formStatus) {
          formStatus.innerHTML = `
            <div class="form-status-card status-error animate-pop-in">
              <div class="status-check error-check">✕</div>
              <div class="status-info">
                <strong>Unable to send message</strong>
                <p>Please try again or email directly at <a href="mailto:omjeepandey112@gmail.com">omjeepandey112@gmail.com</a>.</p>
              </div>
            </div>
          `;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          `;
        }
      }
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
