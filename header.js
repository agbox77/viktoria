// Яндекс.Метрика
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108222837','ym');
ym(108222837,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});

var _noscript = document.createElement('noscript');
_noscript.innerHTML = '<div><img src="https://mc.yandex.ru/watch/108222837" style="position:absolute;left:-9999px;" alt="" width="1" height="1"/></div>';
document.body.appendChild(_noscript);

// Загрузка хедера
fetch('/viktoria/header.html')
  .then(r => r.text())
  .then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);

    // Бургер-меню с aria-expanded
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    burgerBtn.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.toggle('open');
      burgerBtn.setAttribute('aria-expanded', isOpen);
      burgerBtn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Закрывать меню при клике вне его
    document.addEventListener('click', function(e) {
      if (!burgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.setAttribute('aria-label', 'Открыть меню');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });

    // Активная ссылка
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const linkPath = link.getAttribute('href');
      const isHome = (linkPath === '/viktoria/' || linkPath === '/') &&
                     (currentPath === '/viktoria/' || currentPath === '/viktoria/index.html' || currentPath === '/');
      const isMatch = !isHome && linkPath && currentPath.endsWith(linkPath.split('/').pop());
      if (isHome || isMatch) {
        link.style.color = 'var(--accent)';
        link.setAttribute('aria-current', 'page');
      }
    });
  })
  .catch(err => console.error('header load error:', err));
