// ============ 双语切换 ============
(function () {
  var KEY = 'tongxi-homepage-lang';
  var lang = localStorage.getItem(KEY) || 'en';

  function applyLang(l) {
    lang = l;
    localStorage.setItem(KEY, l);
    // 遍历所有带 data-en / data-zh 的元素
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.hasAttribute('data-zh')) {
        var text = (l === 'zh') ? el.getAttribute('data-zh') : el.getAttribute('data-en');
        if (text !== null) el.innerHTML = text;
      }
    });
    // 切换按钮文字
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = (l === 'zh') ? 'EN' : '中文';
    // 更新 html lang
    document.documentElement.lang = (l === 'zh') ? 'zh-CN' : 'en';
  }

  document.getElementById('langToggle').addEventListener('click', function (e) {
    e.preventDefault();
    applyLang(lang === 'zh' ? 'en' : 'zh');
  });

  applyLang(lang);
})();

// ============ 返回顶部按钮 ============
var mybutton = document.getElementById('myBtn');

window.addEventListener('scroll', scrollFunction, { passive: true });

function scrollFunction() {
  if (window.scrollY > 200) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ 页脚年份 ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ 移动端导航优化 ============
// 点击锚点导航后，补偿 sticky 导航栏的高度，避免标题被遮挡
(function () {
  var navbar = document.querySelector('.navbar');
  var links = document.querySelectorAll('.layout-menu a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = navbar ? navbar.offsetHeight + 12 : 12;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // 移动端点击后收起菜单
      if (typeof window._closeMenu === 'function') window._closeMenu();
    });
  });
})();

// ============ 汉堡菜单开关 ============
(function () {
  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('layoutMenu');
  var overlay = document.getElementById('menuOverlay');

  function openMenu() {
    menu.classList.add('open');
    hamburger.classList.add('open');
    overlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // 点击 ESC 关闭
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // 窗口放大到桌面尺寸时，强制复位菜单状态
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeMenu();
  });

  // 暴露给外部（锚点点击已调用）
  window._closeMenu = closeMenu;
})();

// ============ 导航栏滚动状态 + scrollspy 高亮 ============
(function () {
  var navbar = document.querySelector('.navbar');
  var navLinks = document.querySelectorAll('.layout-menu a[href^="#"]');
  if (!navbar || !navLinks.length) return;

  // 1) 滚动后导航栏变实 + 底部浮影
  function onScroll() {
    if (window.scrollY > 12) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2) scrollspy：滚动高亮当前区块
  var sections = [];
  navLinks.forEach(function (l) {
    var s = document.querySelector(l.getAttribute('href'));
    if (s) sections.push(s);
  });

  var currentId = null;
  function setActive(id) {
    if (id === currentId) return;
    currentId = id;
    navLinks.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + id);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function (s) { observer.observe(s); });
})();
