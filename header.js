// Яндекс.Метрика
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108222837','ym');
ym(108222837,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});

var _noscript = document.createElement('noscript');
_noscript.innerHTML = '<div><img src="https://mc.yandex.ru/watch/108222837" style="position:absolute;left:-9999px;" alt=""/></div>';
document.body.appendChild(_noscript);

// Загрузка хедера
fetch('/header.html')
  .then(r => r.text())
  .then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);

    // Бургер-меню
    document.getElementById('burgerBtn').addEventListener('click', function() {
      document.getElementById('mobileMenu').classList.toggle('open');
    });

    // Активная ссылка
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      if (window.location.pathname.endsWith(link.getAttribute('href').split('/').pop())) {
        link.style.color = 'var(--accent)';
      }
    });
  })
  .catch(err => console.error('header error:', err));
