/* ============================================================
   ALFAZ KALADAGI — PORTFOLIO JAVASCRIPT (CLASSIC)
   ============================================================ */

'use strict';

const EMAILJS_CONFIG = {
  publicKey: "aRSQvp4Wftk7c4XaH",
  serviceId: "service_8181",
  templateId: "template_tn8evar"
};

// Safe initialization with your confirmed Public Key
if (typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initTypingEffect();
  initParticles();
  initScrollReveal();
  initSkillBars();
  initRipple();
  initContactForm();
  initScrollToTop();
  initSmoothScroll();
});

/* ============================================================
   1. CUSTOM CURSOR
   ============================================================ */
function initCustomCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = document.querySelectorAll('a, button, .btn, .project-card, .skill-pill, .social-btn');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hover');
      dot.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hover');
      dot.style.opacity = '1';
    });
  });
}

/* ============================================================
   2. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    bar.style.width = scrollPercent + '%';
  }, { passive: true });
}

/* ============================================================
   3. NAVBAR — SCROLL STYLE + ACTIVE HIGHLIGHT
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }, { passive: true });

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  updateActiveLink();
}

/* ============================================================
   4. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   5. TYPING EFFECT
   ============================================================ */
function initTypingEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const roles = [
    'CSE Student 🎓',
    'Web Developer 💻',
    'Java Learner ☕',
    'Frontend Builder 🎨',
    'Quick Learner ',
    'Problem Solver 🧠',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 1800;
      } else {
        typingDelay = 90 + Math.random() * 40;
      }
    } else {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 300;
      }
    }
    setTimeout(type, typingDelay);
  }
  setTimeout(type, 1200);
}

/* ============================================================
   6. PARTICLE ANIMATION ON HERO CANVAS
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.opacityDir = (Math.random() > 0.5 ? 1 : -1) * 0.005;
      const colours = ['99, 102, 241', '6, 182, 212', '236, 72, 153', '168, 85, 247'];
      this.color = colours[Math.floor(Math.random() * colours.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += this.opacityDir;
      if (this.opacity <= 0.05 || this.opacity >= 0.5) this.opacityDir *= -1;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = `rgba(${this.color}, 1)`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = `rgba(${this.color}, 0.5)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawConnections() {
    const maxDist = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.08;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = `rgba(99, 102, 241, 1)`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function createParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 100);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animFrame = requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame);
    resize();
    createParticles();
    animate();
  }, { passive: true });
}

/* ============================================================
   7. SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   8. SKILL BAR ANIMATION
   ============================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width') + '%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(bar => observer.observe(bar));
}

/* ============================================================
   9. RIPPLE EFFECT ON BUTTONS
   ============================================================ */
function initRipple() {
  document.addEventListener('click', e => {
    const target = e.target.closest('.ripple');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
    `;

    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

/* ============================================================
   10. CONTACT FORM VALIDATION & TRANSMISSION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('error');
    if (error) error.textContent = message;
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.remove('error');
    if (error) error.textContent = '';
  }

  ['name', 'email', 'message'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        clearError(id, id + 'Error');
      });
    }
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let hasError = false;

    if (!name || name.length < 2) {
      showError('name', 'nameError', 'Please enter your name (at least 2 letters).');
      hasError = true;
    } else {
      clearError('name', 'nameError');
    }

    if (!email || !isValidEmail(email)) {
      showError('email', 'emailError', 'Please enter a valid email address.');
      hasError = true;
    } else {
      clearError('email', 'emailError');
    }

    if (!message || message.length < 6) {
      showError('message', 'messageError', 'Message must be at least 6 characters.');
      hasError = true;
    } else {
      clearError('message', 'messageError');
    }

    if (hasError) return;

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    const templateParams = {
      name: name,
      from_name: name,
      email: email,
      from_email: email,
      reply_to: email,
      message: message
    };

    emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (successMsg) {
          successMsg.classList.add("show");
          setTimeout(() => successMsg.classList.remove("show"), 6000);
        }
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        const errDetail = error?.text || error?.message || 'Check EmailJS credentials';
        alert(`Message failed: ${errDetail}. Please contact alfaz.info81@gmail.com directly.`);
      });
  });
}

/* ============================================================
   11. SCROLL TO TOP BUTTON
   ============================================================ */
function initScrollToTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   12. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   13. CARD 3D TILT EFFECT
   ============================================================ */
const cards = document.querySelectorAll('[data-tilt]');
if (cards.length && !('ontouchstart' in window)) {
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}