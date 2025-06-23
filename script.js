document.addEventListener('DOMContentLoaded', function() {
  // ===== Основные элементы DOM =====
  const header = document.querySelector('.header');
  const nav = document.querySelector('.header__nav');
  const burger = document.querySelector('.header__burger');
  const navLinks = document.querySelectorAll('.header__link');
  const modalBtns = document.querySelectorAll('.open-modal');
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.close');

  // ===== Инициализация hero-секции =====
  const heroBg = document.querySelector('.hero-bg');

  // Проверка загрузки изображения
  if (heroBg) {
    heroBg.onerror = () => {
      console.error('Ошибка загрузки фонового изображения');
      heroBg.style.display = 'none';
    };

    // Для отладки
    console.log('Путь к изображению:', heroBg.src);
  }

  // ===== Управление хедером при скролле =====
  let lastScroll = 0;
  const headerHeight = header.offsetHeight;

  function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.style.transform = 'translateY(0)';
      header.classList.remove('scrolled');
      return;
    }

    if (currentScroll > lastScroll && currentScroll > headerHeight) {
      if (!nav.classList.contains('active')) {
        header.style.transform = 'translateY(-100%)';
      }
    } else {
      header.style.transform = 'translateY(0)';
    }

    if (currentScroll > headerHeight) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  // ===== Модальные окна =====
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  // ===== Мобильное меню =====
  function toggleMenu() {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('lock');
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    document.body.classList.remove('lock');
  }

  // ===== Назначение обработчиков событий =====
  window.addEventListener('scroll', handleHeaderScroll);

  // Модальные окна
  modalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      closeModal(modal);
    });
  });

  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'block') {
          closeModal(modal);
        }
      });
    }
  });

  // Мобильное меню
  burger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Адаптация к изменению размера окна
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      closeMenu();
    }

    // Обновление высоты хедера
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  });

  // Инициализация высоты хедера
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
});