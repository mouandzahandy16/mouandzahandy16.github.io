document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const menuLinks = document.querySelectorAll('.menu-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollPos > sectionTop && scrollPos <= sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
});

function copyContact(text, customMessage) {
  navigator.clipboard.writeText(text).then(() => {
    triggerToast(customMessage || 'Copied to clipboard!');
  }).catch(err => {
    console.error('Error copying text:', err);
  });
}

function triggerToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}