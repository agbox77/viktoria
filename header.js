fetch('/viktoria/header.html')
  .then(r => r.text())
  .then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);

    // Подсвечиваем активную ссылку
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.style.color = 'var(--accent)';
      }
    });
  });
