(() => {
  const page = document.querySelector('.legal-page')?.dataset.legalPage || 'privacy';
  const languageButton = document.querySelector('#langBtn');
  const copy = {
    en: {
      backToGallery: 'Back to gallery',
      poweredBy: 'POWERED BY SANDBASE',
      langLabel: 'Switch to Chinese',
      languageCode: '中',
      titlePrivacy: 'Privacy · Prompt Gallery',
      titleTerms: 'Terms · Prompt Gallery',
      titleLicenses: 'Source licenses · Prompt Gallery',
    },
    zh: {
      backToGallery: '返回画廊',
      poweredBy: 'POWERED BY SANDBASE',
      langLabel: '切换到英文',
      languageCode: 'EN',
      titlePrivacy: '隐私说明 · 提示词画廊',
      titleTerms: '使用说明 · 提示词画廊',
      titleLicenses: '来源许可 · 提示词画廊',
    },
  };
  let language = 'en';
  try { language = localStorage.getItem('meimind-language') === 'zh' ? 'zh' : 'en'; } catch {}
  const t = key => copy[language][key] || copy.en[key] || key;

  function render() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = t(page === 'terms' ? 'titleTerms' : page === 'licenses' ? 'titleLicenses' : 'titlePrivacy');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-lang]').forEach(el => { el.hidden = el.dataset.lang !== language; });
    languageButton.textContent = t('languageCode');
    languageButton.setAttribute('aria-label', t('langLabel'));
  }

  document.querySelector('#backToGallery')?.addEventListener('click', event => {
    try {
      const raw = sessionStorage.getItem('prompt-gallery-return');
      if (!raw) return;
      const saved = JSON.parse(raw);
      const target = new URL(saved.href, window.location.href);
      if (target.origin !== window.location.origin) return;
      event.preventDefault();
      window.location.assign(target.href);
    } catch {}
  });

  languageButton.addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    try { localStorage.setItem('meimind-language', language); } catch {}
    render();
  });
  render();
})();
