/* ============================================================
   Chancetop Pixel — Main Script
   Engineer: Cyril
   ============================================================ */

(function() {
  'use strict';

  const SITE_URL = '/chancetop-pixel/';
  const PAGES = {
    'index':   { title: '首页', path: 'index.html' },
    'about':   { title: '关于我们', path: 'about.html' },
    'services':{ title: '技术能力', path: 'services.html' },
    'cases':   { title: '客户案例', path: 'cases.html' },
    'join':    { title: '加入我们', path: 'join.html' },
    'contact': { title: '联系我们', path: 'contact.html' }
  };

  /* ----- Current Page Detection ----- */
  const path = window.location.pathname;
  let currentPage = 'index';
  for (const [key, page] of Object.entries(PAGES)) {
    if (path.endsWith(page.path) || path.endsWith(page.path.replace('.html', ''))) {
      currentPage = key;
      break;
    }
  }

  /* ----- Shared Nav HTML ----- */
  function getNavHTML() {
    let links = '';
    for (const [key, page] of Object.entries(PAGES)) {
      const active = key === currentPage ? ' class="active"' : '';
      const href = key === 'index' ? 'index.html' : page.path;
      links += `<a href="${href}"${active}>${page.title}</a>`;
    }

    return `
      <div class="nav-bar">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo">
            <img src="images/logo-pixel.svg" alt="Chancetop" class="nav-logo-img" />
          </a>
          <div class="nav-links" id="navLinks">
            ${links}
          </div>
          <button class="nav-toggle" id="navToggle" aria-label="菜单">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
  }

  /* ----- Shared Footer HTML ----- */
  function getFooterHTML() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="nav-logo">
                <img src="images/logo-pixel.svg" alt="Chancetop" class="nav-logo-img" />
              </a>
              <p>技术改变商业 — 厦门畅拓科技，为全球电商企业提供一站式数字化技术解决方案。</p>
            </div>
            <div class="footer-col">
              <h4>导航</h4>
              <a href="index.html">首页</a>
              <a href="about.html">关于我们</a>
              <a href="services.html">技术能力</a>
              <a href="cases.html">客户案例</a>
              <a href="join.html">加入我们</a>
              <a href="contact.html">联系我们</a>
            </div>
            <div class="footer-col">
              <h4>服务</h4>
              <a href="services.html">电商解决方案</a>
              <a href="services.html">技术架构</a>
              <a href="services.html">项目管理</a>
              <a href="services.html">技术咨询</a>
            </div>
            <div class="footer-col">
              <h4>联系</h4>
              <a href="mailto:hr@chancetop.com">hr@chancetop.com</a>
              <a href="contact.html">厦门软件园二期</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} Chancetop. All rights reserved.</span>
            <span>闽ICP备XXXXXXXX号</span>
          </div>
        </div>
      </footer>
    `;
  }

  /* ----- Inject Nav & Footer ----- */
  function injectComponents() {
    const navContainer = document.getElementById('nav-container');
    const footerContainer = document.getElementById('footer-container');
    if (navContainer) navContainer.innerHTML = getNavHTML();
    if (footerContainer) footerContainer.innerHTML = getFooterHTML();
  }

  /* ----- Mobile Nav Toggle ----- */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      links.classList.toggle('open');
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('open');
      });
    });

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });

    // Reset on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        links.classList.remove('open');
      }
    });
  }

  /* ----- Scroll Animation (Fade In) ----- */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      elements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      elements.forEach(function(el) {
        el.classList.add('visible');
      });
    }
  }

  /* ----- Contact Form Handling ----- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const formView = document.getElementById('formView');
    const loadingView = document.getElementById('formLoading');
    const successView = document.getElementById('formSuccess');
    const errorView = document.getElementById('formError');
    const retryBtn = document.getElementById('formRetry');

    // Formspree endpoint (placeholder — replace with actual endpoint)
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

    function showView(viewToShow) {
      [formView, loadingView, successView, errorView].forEach(function(v) {
        if (v) v.style.display = 'none';
      });
      if (viewToShow) viewToShow.style.display = 'block';
    }

    function validateField(input) {
      const errorEl = input.nextElementSibling;
      if (!input.value.trim()) {
        input.classList.add('error');
        if (errorEl && errorEl.classList.contains('form-error')) {
          errorEl.textContent = '请填写此项';
        }
        return false;
      }
      if (input.type === 'email' && input.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(input.value.trim())) {
          input.classList.add('error');
          if (errorEl && errorEl.classList.contains('form-error')) {
            errorEl.textContent = '邮箱格式不正确';
          }
          return false;
        }
      }
      input.classList.remove('error');
      return true;
    }

    // Real-time validation on blur
    form.querySelectorAll('.form-input').forEach(function(input) {
      input.addEventListener('blur', function() {
        if (input.hasAttribute('required')) {
          validateField(input);
        }
      });
      input.addEventListener('input', function() {
        input.classList.remove('error');
      });
    });

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Validate all required fields
      let valid = true;
      form.querySelectorAll('.form-input[required]').forEach(function(input) {
        if (!validateField(input)) valid = false;
      });

      if (!valid) return;

      // Show loading
      showView(loadingView);

      const formData = new FormData(form);
      const data = {};
      formData.forEach(function(value, key) { data[key] = value; });

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showView(successView);
        } else {
          showView(errorView);
        }
      } catch (err) {
        showView(errorView);
      }
    });

    // Retry button
    if (retryBtn) {
      retryBtn.addEventListener('click', function() {
        showView(formView);
      });
    }
  }

  /* ============================================================
     Bootstrap
     ============================================================ */
  function init() {
    injectComponents();

    // Wait a tick for DOM to update, then init interactivity
    setTimeout(function() {
      initMobileNav();
      initScrollAnimations();
      initContactForm();

      // Handle hash anchors (smooth scroll for same-page anchors)
      document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href === '#') return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
