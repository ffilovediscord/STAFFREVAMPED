// script.js - shared by all pages

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const mobileToggle = document.getElementById('mobileToggle');
  const themeToggle = document.getElementById('themeToggle');
  const navBtns = Array.from(document.querySelectorAll('.nav-btn'));

  // Apply saved theme (default dark)
  const saved = localStorage.getItem('staff_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved === 'light' ? 'light' : 'dark');

  // Theme toggle handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('staff_theme', next === 'light' ? 'light' : 'dark');
    });
  }

  // Mobile sidebar toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Close mobile sidebar when a nav item is clicked
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 900) sidebar.classList.remove('open');
    });
  });

  // Mark active nav button based on current page filename
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const mapping = {
    'index.html': 'main',
    '': 'main',
    'credits.html': 'credits',
    'meetings.html': 'meetings',
    'moderation.html': 'moderation',
    'faqs.html': 'faqs'
  };
  const pageId = mapping[path] || 'main';
  navBtns.forEach(b => {
    if (b.dataset.target === pageId) b.classList.add('active');
    else b.classList.remove('active');
  });

  // Simple page reveal animation on load (so navigation feels smooth)
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('hidden'));
});

