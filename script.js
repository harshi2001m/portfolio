const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const backTop = document.getElementById('backTop');
const progress = document.getElementById('scrollProgress');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Theme preference is saved locally in the visitor's browser.
const savedTheme = localStorage.getItem('harshani-theme');
if (savedTheme === 'light') document.body.classList.add('light');
themeToggle.querySelector('.theme-icon').textContent = document.body.classList.contains('light') ? '☾' : '☼';
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const light = document.body.classList.contains('light');
  themeToggle.querySelector('.theme-icon').textContent = light ? '☾' : '☼';
  localStorage.setItem('harshani-theme', light ? 'light' : 'dark');
});

// Small typewriter detail in the hero.
const roles = ['IT Undergraduate', 'Creative Problem Solver', 'Technology Enthusiast'];
const roleElement = document.getElementById('roleText');
let roleIndex = 0, charIndex = roles[0].length, deleting = true;
function typeRole() {
  const current = roles[roleIndex];
  if (deleting) {
    charIndex--;
    roleElement.textContent = current.slice(0, Math.max(0, charIndex));
    if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  } else {
    const next = roles[roleIndex];
    charIndex++;
    roleElement.textContent = next.slice(0, charIndex);
    if (charIndex >= next.length) { deleting = true; setTimeout(typeRole, 1500); return; }
  }
  setTimeout(typeRole, deleting ? 48 : 85);
}
setTimeout(typeRole, 1800);

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function handleScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0) + '%';
  backTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', handleScroll, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('year').textContent = new Date().getFullYear();
