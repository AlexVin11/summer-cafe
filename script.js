document.addEventListener('DOMContentLoaded', function() {
    const modalBtns = document.querySelectorAll('.open-modal');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');

    // Открытие модального окна
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.removeAttribute('hidden');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.setAttribute('hidden', 'true');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.setAttribute('hidden', 'true');
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (!modal.hasAttribute('hidden')) {
                    modal.setAttribute('hidden', 'true');
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});