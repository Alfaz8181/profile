/* ============================================================
   ALFAZ KALADAGI — MODERN PORTFOLIO JAVASCRIPT
   ============================================================ */

'use strict';

const EMAILJS_CONFIG = {
  publicKey: "aRSQvp4Wftk7c4XaH",
  serviceId: "service_8181",
  templateId: "template_tn8evar"
};

// Safe initialization
if (typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTyping();
  initStatsCounter();
  initProjectSlider();
  initSkillGrid();
  initScrollEffects();
  initContactForm();
  initScrollTop();
});

/* ============================================================
   NAVIGATION & MOBILE MENU
   ============================================================ */
function initNavigation() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('stuck');
    } else {
      nav.classList.remove('stuck');
    }
  }, { passive: true });

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }
}

/* ============================================================
   HERO TYPING ANIMATION
   ============================================================ */
function initTyping() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'responsive web applications',
    'scalable backend services',
    'interactive full-stack platforms',
    'AI-powered digital solutions'
  ];

  let pIndex = 0;
  let cIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function loop() {
    const current = phrases[pIndex];
    if (!isDeleting) {
      el.textContent = current.substring(0, cIndex + 1);
      cIndex++;
      if (cIndex === current.length) {
        isDeleting = true;
        delay = 1800;
      } else {
        delay = 80;
      }
    } else {
      el.textContent = current.substring(0, cIndex - 1);
      cIndex--;
      delay = 45;
      if (cIndex === 0) {
        isDeleting = false;
        pIndex = (pIndex + 1) % phrases.length;
        delay = 400;
      }
    }
    setTimeout(loop, delay);
  }
  loop();
}

/* ============================================================
   STATS COUNTER (CGPA & GRADUATION)
   ============================================================ */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat strong[data-n]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-n'));
        const decimals = parseInt(el.getAttribute('data-d') || '0', 10);
        const duration = 1200;
        const startTime = performance.now();

        function count(time) {
          const progress = Math.min((time - startTime) / duration, 1);
          const current = (progress * target).toFixed(decimals);
          el.textContent = current;
          if (progress < 1) {
            requestAnimationFrame(count);
          } else {
            el.textContent = target.toFixed(decimals);
          }
        }
        requestAnimationFrame(count);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
}

/* ============================================================
   PROJECTS SLIDER
   ============================================================ */
function initProjectSlider() {
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const viewport = document.getElementById('sliderViewport');

  if (!track || !dotsContainer) return;

  const projectData = [
    {
      title: "SET-2026 Examination & Admission Portal",
      tag: "SET",
      bg: "linear-gradient(135deg, #4f46e5, #06b6d4)",
      points: [
        "Dynamic canvas-based captcha engine & validation.",
        "Real-time rank check & automated applicant onboarding.",
        "Engineered for ALSA Educational Trust with client-side indexing."
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
      live: "https://aet-home.vercel.app/"
    },
    {
      title: "ALSA University Portal",
      tag: "ALSA",
      bg: "linear-gradient(135deg, #7c3aed, #ec4899)",
      points: [
        "Automated AJAX admissions pipeline and scholarship estimator.",
        "Interactive fee-waiver verification architecture.",
        "Deployed on Vercel with high responsiveness."
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "FormSubmit API"],
      live: "https://alsauniversity.vercel.app"
    },
    {
      title: "FastChef – AI Recipe Generator",
      tag: "CHEF",
      bg: "linear-gradient(135deg, #ea580c, #eab308)",
      points: [
        "Transforms cooking URLs (YouTube/Reels) into structured recipes.",
        "Google Gemini API integration with Python/Flask backend.",
        "Generates ingredient checklists and preparation instructions."
      ],
      tags: ["Python", "Flask", "Gemini API", "Docker"],
      live: "https://fastchef-hlae.onrender.com/"
    },
    {
      title: "Royal Dry Fruits",
      tag: "RDF",
      bg: "linear-gradient(135deg, #059669, #10b981)",
      points: [
        "Gourmet e-commerce featuring UPI payments & dynamic weights.",
        "Edge authentication powered by Cloudflare Workers and KV.",
        "Automated instant PDF invoice generation via jsPDF."
      ],
      tags: ["JavaScript", "Cloudflare KV", "Google OAuth", "jsPDF"],
      live: "https://royaldryfruit.vercel.app"
    },
    {
      title: "CSS Box Shadow Studio",
      tag: "CSS",
      bg: "linear-gradient(135deg, #2563eb, #38bdf8)",
      points: [
        "Visual tool for creating layered box shadows and palettes.",
        "Live CSS code generation and one-click clipboard copying.",
        "Clean responsive user interface."
      ],
      tags: ["HTML", "CSS", "JavaScript"],
      live: "https://css-boxshadow-silk.vercel.app/"
    }
  ];

  track.innerHTML = projectData.map(p => `
    <div class="proj">
      <div class="thumb" style="--g: ${p.bg}">
        <span>${p.tag}</span>
      </div>
      <div class="proj-body">
        <div>
          <h3>${p.title}</h3>
          <ul>
            ${p.points.map(pt => `<li>${pt}</li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="tags">
            ${p.tags.map(t => `<span>${t}</span>`).join('')}
          </div>
          <div class="links">
            <a href="${p.live}" target="_blank" rel="noopener">Live Demo →</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = projectData.map((_, i) => `
    <button class="slider-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Go to slide ${i + 1}"></button>
  `).join('');

  const dots = dotsContainer.querySelectorAll('.slider-dot');
  let current = 0;
  let autoplayTimer = null;

  function showSlide(index) {
    current = (index + projectData.length) % projectData.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => showSlide(current + 1), 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(current - 1); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(current + 1); startAutoplay(); });

  dots.forEach(d => {
    d.addEventListener('click', () => {
      showSlide(parseInt(d.dataset.idx, 10));
      startAutoplay();
    });
  });

  if (viewport) {
    viewport.addEventListener('mouseenter', stopAutoplay);
    viewport.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

/* ============================================================
   SKILLS GRID (40% - 50% BEGINNER / STUDENT RANGE)
   ============================================================ */
function initSkillGrid() {
  const grid = document.getElementById('skillGrid');
  if (!grid) return;

  const skillsData = [
    {
      category: "Frontend Development",
      items: [
        { name: "HTML5 & Semantic Markup", w: "50%" },
        { name: "CSS3 / Flex & Grid", w: "46%" },
        { name: "JavaScript (ES6+)", w: "42%" },
        { name: "UI Design & Responsive Layouts", w: "45%" }
      ]
    },
    {
      category: "Programming & Backend",
      items: [
        { name: "Java (Core & OOP)", w: "48%" },
        { name: "Python / Flask API", w: "44%" },
        { name: "SQL & Relational Databases", w: "42%" },
        { name: "Cloudflare Workers & KV", w: "40%" }
      ]
    },
    {
      category: "Tools & Deployment",
      items: [
        { name: "Git & GitHub Version Control", w: "48%" },
        { name: "Vercel & Render Deployment", w: "50%" },
        { name: "Google Gemini API Integration", w: "46%" },
        { name: "VS Code & DevTools", w: "50%" }
      ]
    }
  ];

  grid.innerHTML = skillsData.map(c => `
    <article class="card skill rv">
      <h3>${c.category}</h3>
      ${c.items.map(s => `
        <div class="bar">
          <div><span>${s.name}</span><span>${s.w}</span></div>
          <i style="--w: ${s.w}"></i>
        </div>
      `).join('')}
    </article>
  `).join('');
}

/* ============================================================
   SCROLL EFFECTS
   ============================================================ */
function initScrollEffects() {
  const progress = document.getElementById('progress');
  const reveals = document.querySelectorAll('.rv');

  window.addEventListener('scroll', () => {
    if (progress) {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progress.style.width = scrolled + '%';
    }
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => observer.observe(r));
}

/* ============================================================
   CONTACT FORM SUBMISSION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('form');
  const status = document.getElementById('status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value.trim() || '';
    const email = form.elements['email']?.value.trim() || '';
    const message = form.elements['message']?.value.trim() || '';

    if (!name || !email || !message) {
      status.textContent = 'Please fill out all required fields.';
      status.className = 'status err';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting...';
    }

    status.textContent = 'Sending message...';
    status.className = 'status';

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
        status.textContent = 'Message transmitted successfully! I will reply shortly.';
        status.className = 'status ok';
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        const errDetail = error?.text || error?.message || 'Check EmailJS service/template';
        status.textContent = `Transmission failed: ${errDetail}. Please email alfaz.info81@gmail.com directly.`;
        status.className = 'status err';
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
        }
      });
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initScrollTop() {
  const topBtn = document.getElementById('top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}