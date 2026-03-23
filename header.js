fetch('/viktoria/header.html')
  .then(r => r.text())
  .then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);

    // Подсвечиваем активную ссылку
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      if (window.location.pathname.endsWith(link.getAttribute('href').split('/').pop())) {
        link.style.color = 'var(--accent)';
      }
    });

    // Бургер-меню
    document.getElementById('burgerBtn').addEventListener('click', function() {
      document.getElementById('mobileMenu').classList.toggle('open');
    });
  });
