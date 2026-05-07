'use strict';

// ── Scroll progress ────────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');

// ── Navbar ─────────────────────────────────────────────────────
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Progress bar
  scrollProgress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';

  // Scrolled state
  navbar.classList.toggle('scrolled', scrollTop > 20);

  // Active nav link
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (scrollTop >= s.offsetTop - 90) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile menu ────────────────────────────────────────────────
const mobileToggle = document.getElementById('mobileToggle');
const navList      = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(open));
  const spans = mobileToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Smooth scroll (offset for fixed nav) ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
  });
});

// ── Scroll reveal ──────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Skill bar animation ────────────────────────────────────────
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(f => f.classList.add('animated'));
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(g => skillObs.observe(g));

// ── Animated counters ──────────────────────────────────────────
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix  || '';
  const prefix   = el.dataset.prefix  || '';
  const decimal  = el.dataset.decimal === '1';
  const duration = 1800;
  const fps      = 60;
  const steps    = Math.round(duration / (1000 / fps));
  let frame      = 0;

  const tick = () => {
    frame++;
    const progress = frame / steps;
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value    = target * eased;
    el.textContent = prefix + (decimal ? value.toFixed(1) : Math.round(value)) + suffix;
    if (frame < steps) requestAnimationFrame(tick);
    else el.textContent = prefix + (decimal ? target.toFixed(1) : target) + suffix;
  };

  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

// ── Terminal typewriter ────────────────────────────────────────
const terminalBody = document.getElementById('terminalBody');

const LINES = [
  { type: 'cmd', cmd: 'whoami' },
  { type: 'out', text: 'Niall Heeney' },
  { type: 'cmd', cmd: 'cat role.txt' },
  { type: 'out', text: 'Cybersecurity &amp; AI Specialist' },
  { type: 'cmd', cmd: 'cat education.txt' },
  { type: 'out', text: '[BSc]&nbsp; Computer Science Infrastructure &mdash; TU Dublin, Class of 2026<br>[MSc]&nbsp; Cybersecurity &amp; AI &mdash; Radboud University, Sept 2026' },
  { type: 'cmd', cmd: './scan_skills.sh' },
  { type: 'out', text: '[✓] Digital Forensics &amp; Memory Analysis<br>[✓] Network Security &amp; Infrastructure<br>[✓] AI/ML Security Applications<br>[✓] IoT Systems &amp; Embedded Linux<br>[✓] Threat Detection &amp; Analysis' },
  { type: 'cursor' },
];

let lineIdx = 0;

function renderTerminalLine() {
  if (lineIdx >= LINES.length || !terminalBody) return;
  const line = LINES[lineIdx++];

  if (line.type === 'cmd') {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = `<span class="t-prompt">niall@portfolio ~ $</span><span class="t-cmd">&nbsp;${line.cmd}</span>`;
    terminalBody.appendChild(div);
    setTimeout(renderTerminalLine, 280);

  } else if (line.type === 'out') {
    const div = document.createElement('div');
    div.className = 't-output';
    div.innerHTML = line.text;
    terminalBody.appendChild(div);
    setTimeout(renderTerminalLine, 200);

  } else if (line.type === 'cursor') {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = `<span class="t-prompt">niall@portfolio ~ $</span>&nbsp;<span class="t-cursor" aria-hidden="true"></span>`;
    terminalBody.appendChild(div);
  }
}

// Start typing shortly after page load
window.addEventListener('load', () => {
  setTimeout(renderTerminalLine, 600);
});

// ── Console easter egg ─────────────────────────────────────────
console.log('%cNiall Heeney', 'color:#22d3ee;font-size:20px;font-weight:600;font-family:monospace;');
console.log('%cBSc CS Infrastructure → MSc Cybersecurity & AI', 'color:#94a3b8;font-family:monospace;');
console.log('%cniall1707@gmail.com', 'color:#22d3ee;font-family:monospace;');
