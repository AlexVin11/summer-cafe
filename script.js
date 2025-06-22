// Навигация при скролле
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  const nav = document.querySelector('nav');

  // Прячем навигацию при скролле вниз, показываем при скролле вверх
  if (currentScroll > lastScroll && currentScroll > 50) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }

  // Добавляем эффект при скролле
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Модальные окна
document.addEventListener('DOMContentLoaded', function() {
  const modalBtns = document.querySelectorAll('.open-modal');
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.close');

  modalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  });

  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'block') {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    }
  });
});