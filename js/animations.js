function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = el.parentElement
          ? Array.from(el.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale'))
          : [el];
        const siblingIndex = siblings.indexOf(el);
        const staggerDelay = Math.min(siblingIndex * 120, 800);

        el.style.transitionDelay = `${staggerDelay}ms`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.classList.add('visible');
          });
        });
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '+';
        const duration = 2200;
        const start = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!navbar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function initParallaxParticles() {
  const particles = document.querySelectorAll('.particle');
  if (!particles.length || window.innerWidth < 768) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        particles.forEach((p, i) => {
          const speed = 0.3 + (i % 5) * 0.1;
          p.style.transform = `translateY(${scrollY * speed * 0.02}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initHero3DEffect() {
  const hero = document.querySelector('.hero-content');
  if (!hero || window.innerWidth < 768) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -4;
    const rotateY = x * 4;

    hero.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  hero.addEventListener('mouseleave', () => {
    hero.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    hero.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    setTimeout(() => { hero.style.transition = ''; }, 800);
  });
}

function initPerformanceOptimizer() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const imgs = document.querySelectorAll('img[loading="lazy"]');
      imgs.forEach(img => { if (img.complete) img.style.contentVisibility = 'auto'; });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounterAnimation();
  initNavbar();
  initSmoothScroll();
  initParallaxParticles();
  initHero3DEffect();
  initPerformanceOptimizer();
});
