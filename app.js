/* =========================================================================
   MeiMind / GPT Image 2 — Brutalism App
   Plain vanilla JS. No dependencies.
   ========================================================================= */

(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const REPO_URL = 'https://github.com/sandbaseai/lab-prompt-gallery';

  const copy = {
    en: {
      navPrompts: 'Prompts', navTrending: 'Trending', navAbout: 'About', navFaq: 'FAQ', github: 'GitHub', submitPrompt: 'Submit Prompt',
      modelPill: 'MODEL', modelMeta: '| Settings · Image · Generate', heroTitleLead: 'The Loudest Library of', heroTitleSuffix: 'Prompts.',
      heroPromptTail: ' upstream image & video prompts.', heroSamplePrefix: 'This snapshot includes ', heroSampleTail: ' curated entries across ', heroCategoryTail: ' brutalist categories. Zero fluff. Copy · Remix · Ship.', browseGallery: 'Browse Gallery →', viewTrending: 'View Trending',
      statPrompts: 'PROMPTS', statCategories: 'CATEGORIES', statResolution: 'RES OUTPUT', statFree: 'FREE FOREVER', trendingTitle: 'Trending Prompts', viewAll: 'View All →',
      aboutKicker: '// ABOUT THE MODEL', aboutTitle: 'What is GPT Image 2?', aboutCopy: '<b>GPT Image 2</b> is OpenAI\'s flagship image model with native <b>4K</b> output, precise text rendering (posters, UI screenshots, comic speech bubbles), and strong instruction following. It handles JSON and natural-language prompts across photography, UI, infographics, posters, and consistent characters.',
      sourcesCopy: 'This gallery samples prompts from <a href="https://github.com/freestylefly/awesome-gpt-image-2" target="_blank" rel="noopener">awesome-gpt-image-2</a>, the <a href="https://gpt-image2.canghe.ai/" target="_blank" rel="noopener">canghe.ai mirror</a>, and community posts. Everything is grouped for quick copying, remixing, and attribution.',
      tryMeiMind: 'Try it in MeiMind →', allPrompts: 'All Prompts', total: 'TOTAL', searchPlaceholder: 'Search prompts by title, tag, model...', sortLabel: 'SORT', sortTrending: 'Trending', sortNewest: 'Newest', sortAZ: 'A → Z', loadMore: 'Load More ↓',
      faqTitle: 'Common Questions', faq1Question: 'What is GPT Image 2?', faq1Answer: 'OpenAI\'s native image generation model for high-resolution output, accurate typography, and strong instruction following.', faq2Question: 'Where do these prompts come from?', faq2Answer: 'Data is curated from <a href="https://github.com/freestylefly/awesome-gpt-image-2" target="_blank" rel="noopener">freestylefly/awesome-gpt-image-2</a>, <a href="https://gpt-image2.canghe.ai/" target="_blank" rel="noopener">canghe.ai</a>, and community posts. Credit the original author when remixing.', faq3Question: 'How do I use these prompts?', faq3Answer: 'Open a card, copy the full prompt, paste it into MeiMind, ChatGPT, or another compatible tool, then adjust the parameters and remix.', faq4Question: 'Can I submit my own prompt?', faq4Answer: 'Yes. Use “Submit Prompt” to open an issue in the company repository. Strong prompts can be featured in Trending.', faq5Question: 'Is this free?', faq5Answer: 'The gallery is free to browse and copy. Prompt content follows the license and attribution terms of its original source.',
      ctaLead: 'Ready to create with', ctaTail: ' prompts, one-click copy, infinite remix.', startGenerating: 'Start Generating →', resources: 'RESOURCES', legal: 'LEGAL', license: 'License · CC-BY-4.0', privacy: 'Privacy', terms: 'Terms', poweredBy: 'POWERED BY SANDBASE', close: 'Close', noscript: 'This gallery needs JavaScript enabled to load prompts and open the inspector.', source: 'Source', views: 'Views', copyPrompt: 'Copy Prompt', generateImage: 'Generate Image →', switchedToChinese: '已切换到中文', switchedToEnglish: 'Switched to English',
    },
    zh: {
      navPrompts: '提示词', navTrending: '趋势', navAbout: '关于', navFaq: '问答', github: 'GitHub', submitPrompt: '提交提示词',
      modelPill: '模型', modelMeta: '| 参数 · 图像 · 生成', heroTitleLead: '最响亮的', heroTitleSuffix: '提示词库。',
      heroPromptTail: ' 条上游图像与视频提示词。', heroSamplePrefix: '本快照收录 ', heroSampleTail: ' 条精选内容，覆盖 ', heroCategoryTail: ' 个粗粝主义分类。零废话。复制 · 改编 · 发布。', browseGallery: '浏览画廊 →', viewTrending: '查看趋势',
      statPrompts: '提示词', statCategories: '分类', statResolution: '输出分辨率', statFree: '永久免费', trendingTitle: '趋势提示词', viewAll: '查看全部 →',
      aboutKicker: '// 关于模型', aboutTitle: 'GPT Image 2 是什么？', aboutCopy: '<b>GPT Image 2</b> 是 OpenAI 的旗舰图像模型，支持原生 <b>4K</b> 输出、精准文字渲染（海报、UI 截图、漫画对话框）和强指令遵循。它能处理 JSON 与自然语言提示词，适合摄影、UI、信息图、海报和角色一致性创作。',
      sourcesCopy: '本画廊整理自 <a href="https://github.com/freestylefly/awesome-gpt-image-2" target="_blank" rel="noopener">awesome-gpt-image-2</a>、<a href="https://gpt-image2.canghe.ai/" target="_blank" rel="noopener">canghe.ai 镜像库</a> 与社区内容，方便复制、改编和标注来源。',
      tryMeiMind: '在 MeiMind 中试用 →', allPrompts: '全部提示词', total: '总计', searchPlaceholder: '按标题、标签或模型搜索提示词……', sortLabel: '排序', sortTrending: '趋势', sortNewest: '最新', sortAZ: 'A → Z', loadMore: '加载更多 ↓',
      faqTitle: '常见问题', faq1Question: 'GPT Image 2 是什么？', faq1Answer: 'OpenAI 的原生图像生成模型，支持高分辨率输出、准确排版和强指令遵循。', faq2Question: '这些提示词来自哪里？', faq2Answer: '内容整理自 <a href="https://github.com/freestylefly/awesome-gpt-image-2" target="_blank" rel="noopener">freestylefly/awesome-gpt-image-2</a>、<a href="https://gpt-image2.canghe.ai/" target="_blank" rel="noopener">canghe.ai</a> 与社区内容。改编时请保留原作者署名。', faq3Question: '如何使用这些提示词？', faq3Answer: '打开卡片，复制完整提示词，粘贴到 MeiMind、ChatGPT 或其他兼容工具中，再调整参数并继续改编。', faq4Question: '可以提交自己的提示词吗？', faq4Answer: '可以。点击“提交提示词”在公司仓库创建 issue，优质提示词会进入趋势区域。', faq5Question: '这些内容免费吗？', faq5Answer: '画廊浏览和复制免费。提示词内容遵循原始来源的许可证与署名要求。',
      ctaLead: '准备好用 GPT Image 2', ctaTail: ' 创作了吗？复制、改编，无限灵感。', startGenerating: '开始生成 →', resources: '资源', legal: '法律', license: '许可证 · CC-BY-4.0', privacy: '隐私', terms: '条款', poweredBy: 'POWERED BY SANDBASE', close: '关闭', noscript: '请启用 JavaScript 以加载提示词并打开查看器。', source: '来源', views: '浏览量', copyPrompt: '复制提示词', generateImage: '生成图像 →', switchedToChinese: '已切换到中文', switchedToEnglish: '已切换到英文',
    },
  };
  const categoryLabels = {
    en: { all: 'All', ui: 'UI & Interfaces', infographic: 'Infographic', poster: 'Poster', product: 'Product', photography: 'Photography', illustration: 'Illustration', character: 'Character', comic: 'Comic', scene: 'Scene', history: 'History', youtube: 'YouTube Thumb' },
    zh: { all: '全部', ui: 'UI 与界面', infographic: '信息图', poster: '海报', product: '产品', photography: '摄影', illustration: '插画', character: '角色', comic: '漫画', scene: '场景', history: '历史', youtube: 'YouTube 缩略图' },
  };
  let language = 'en';
  try { language = localStorage.getItem('meimind-language') === 'zh' ? 'zh' : 'en'; } catch {}
  const t = key => copy[language][key] || copy.en[key] || key;
  const categoryLabel = category => categoryLabels[language][category.id] || category.label;

  function setLanguage(next) {
    language = next === 'zh' ? 'zh' : 'en';
    try { localStorage.setItem('meimind-language', language); } catch {}
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-placeholder]').forEach(el => { el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder)); });
    $$('[data-i18n-aria-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)); });
    const button = $('#langBtn');
    button.textContent = language === 'en' ? '中' : 'EN';
    button.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
    if (state.data) renderPills();
  }

  const state = {
    data:      null,       // { categories, prompts }
    filtered:  [],
    category:  'all',
    query:     '',
    sort:      'trending',
    page:      0,
    pageSize:  24,
  };
  let lastFocused = null;

  /* ---------- 1. DATA LOAD ---------- */
  async function load() {
    try {
      const res = await fetch('data/prompts.json');
      if (!res.ok) throw new Error('fetch failed');
      state.data = await res.json();
    } catch (err) {
      console.error('Failed to load prompts.json', err);
      $('#grid').innerHTML = '<p class="load-error">Failed to load prompts.json.<br>请通过本地服务器访问(例如 <code>python -m http.server</code>)。</p>';
      return;
    }
    initFilters();
    setLanguage(language);
    applyFilters();
    renderTrending();
    renderPills();
    const promptCount = state.data.prompts.length;
    const categoryCount = state.data.categories.filter(category => category.id !== 'all').length;
    $('#totalCount').textContent = promptCount.toLocaleString();
    $('#heroPromptCount').textContent = promptCount.toLocaleString();
    $('#heroStatPromptCount').textContent = promptCount.toLocaleString();
    $('#heroCategoryCount').textContent = categoryCount.toLocaleString();
    $('#heroStatCategoryCount').textContent = categoryCount.toLocaleString();
    $('#ctaPromptCount').textContent = promptCount.toLocaleString();
  }

  /* ---------- 2. PILLS / FILTERS ---------- */
  function initFilters() {
    $('#searchInput').addEventListener('input', debounce(e => {
      state.query = e.target.value.trim().toLowerCase();
      state.page = 0;
      applyFilters();
    }, 180));
    $('#sortSel').addEventListener('change', e => {
      state.sort = e.target.value;
      state.page = 0;
      applyFilters();
    });
    $('#loadMore').addEventListener('click', () => {
      state.page += 1;
      renderGrid(true);
    });
    $('#submitBtn').addEventListener('click', () => {
      window.open(`${REPO_URL}/issues/new`, '_blank', 'noopener');
    });
    $('#langBtn').addEventListener('click', () => {
      const next = language === 'en' ? 'zh' : 'en';
      setLanguage(next);
      toast(next === 'zh' ? copy.zh.switchedToChinese : copy.en.switchedToEnglish);
    });

    /* Modal close handlers */
    $('#modal').addEventListener('click', e => {
      if (e.target.dataset.close !== undefined) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (!$('#modal').classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = $$('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])', $('#modal'))
        .filter(el => !el.hasAttribute('disabled'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  function renderPills() {
    const wrap = $('#pills');
    const counts = {};
    state.data.prompts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    counts.all = state.data.prompts.length;

    wrap.innerHTML = state.data.categories
      .map(c => `
        <button class="pill ${state.category === c.id ? 'is-active' : ''}" data-cat="${c.id}">
          <span aria-hidden="true">${escapeHTML(c.icon)}</span>${escapeHTML(categoryLabel(c))}
          <span class="pill__count">${counts[c.id] || 0}</span>
        </button>
      `).join('');

    $$('.pill', wrap).forEach(btn => {
      btn.addEventListener('click', () => {
        state.category = btn.dataset.cat;
        state.page = 0;
        $$('.pill').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        applyFilters();
      });
    });
  }

  /* ---------- 3. FILTER + SORT ---------- */
  function applyFilters() {
    let list = state.data.prompts.slice();

    if (state.category !== 'all') {
      list = list.filter(p => p.category === state.category);
    }
    if (state.query) {
      const q = state.query;
      list = list.filter(p =>
        (p.title + ' ' + (p.summary || '') + ' ' + (p.tags || []).join(' ') + ' ' + p.model)
          .toLowerCase().includes(q)
      );
    }

    if (state.sort === 'trending') list.sort((a, b) => (b.views || 0) - (a.views || 0));
    if (state.sort === 'newest')   list.sort((a, b) => String(b.id).localeCompare(String(a.id)));
    if (state.sort === 'az')       list.sort((a, b) => a.title.localeCompare(b.title));

    state.filtered = list;
    renderGrid(false);
  }

  /* ---------- 4. TRENDING (top 3 by views) ---------- */
  function renderTrending() {
    const top = state.data.prompts.slice().sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);
    $('#trendingGrid').innerHTML = top.map((p, i) => cardHTML(p, i + 1, '', true)).join('');
    bindCardEvents('#trendingGrid');
  }

  /* ---------- 5. GRID RENDER ---------- */
  function renderGrid(append) {
    const start = state.page * state.pageSize;
    const end   = start + state.pageSize;
    const slice = state.filtered.slice(0, end);

    const html = slice.map((p, i) => cardHTML(p, i + 1, 'wide', false)).join('');
    $('#grid').innerHTML = html;
    $('#gridCount').textContent = `${slice.length.toLocaleString()} / ${state.filtered.length.toLocaleString()}`;

    /* hide load more if no more */
    $('#loadMore').style.display = end >= state.filtered.length ? 'none' : 'inline-flex';

    bindCardEvents('#grid');
  }

  /* ---------- 6. CARD HTML ---------- */
  function cardHTML(p, idx, hint = '', showTrend = false) {
    const mediaClass = hint === 'wide'
      ? (p.aspectHint === 'tall' ? 'card__media card__media--tall'
         : p.aspectHint === 'wide' ? 'card__media card__media--wide'
         : 'card__media')
      : 'card__media';

    const views = p.views ? formatViews(p.views) : '';
    const tag   = (p.tags && p.tags[0]) ? `<span class="card__tag">${p.tags[0]}</span>` : '';

    return `
      <article class="card" data-id="${escapeAttr(p.id)}" tabindex="0" role="button" aria-label="${escapeAttr(language === 'zh' ? `打开提示词：${p.title}` : `Open prompt: ${p.title}`)}">
        <div class="${mediaClass}">
          <div class="card__placeholder">
            ${escapeHTML(p.aspect || 'image')} · ${escapeHTML(p.model || 'gpt-image-2')}
          </div>
          ${p.imageCount && p.imageCount > 1 ? `<span class="card__count">×${p.imageCount}</span>` : ''}
          ${showTrend && idx <= 3 ? `<span class="card__badge">#${idx} TREND</span>` : ''}
        </div>
        <div class="card__body">
          <div class="card__title">${escapeHTML(p.title)}</div>
          <div class="card__summary">${escapeHTML(p.summary || '')}</div>
          <div class="card__meta">
            <span class="card__author">@${escapeHTML(p.source.author)}</span>
            <span>${views} ${tag}</span>
          </div>
        </div>
      </article>
    `;
  }

  function formatViews(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
  }

  function bindCardEvents(rootSel) {
    $$(`${rootSel} .card`).forEach(el => {
      el.addEventListener('click', () => openModal(el.dataset.id));
      el.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(el.dataset.id);
        }
      });
    });
  }

  /* ---------- 7. MODAL DETAIL ---------- */
  function openModal(id) {
    const p = state.data.prompts.find(x => x.id === id);
    if (!p) return;
    const body = $('#modalBody');
    body.innerHTML = `
      <div class="detail__media">
        <div class="card__placeholder" style="width:100%;aspect-ratio:${p.aspect || '4/3'}">
          ${escapeHTML(p.aspect || 'image')} preview · ${escapeHTML(p.model)}
        </div>
      </div>
      <div class="detail__body">
        <h2 class="detail__title" id="modalTitle">${escapeHTML(p.title)}</h2>
        <p class="detail__summary">${escapeHTML(p.summary || '')}</p>
        <div class="detail__meta">
          <span class="detail__chip detail__chip--accent">${escapeHTML(p.model)}</span>
          <span class="detail__chip">${escapeHTML(p.aspect || 'image')}</span>
          <span class="detail__chip">${escapeHTML(categoryLabels[language][p.category] || p.category)}</span>
          ${(p.tags || []).map(t => `<span class="detail__chip">${escapeHTML(t)}</span>`).join('')}
        </div>
        <pre class="detail__prompt" id="promptText">${escapeHTML(p.prompt)}</pre>
        <div class="detail__actions">
          <button class="btn btn--solid" id="copyBtn">${t('copyPrompt')}</button>
          <button class="btn btn--ghost" id="generateBtn">${t('generateImage')}</button>
        </div>
        <div class="detail__source">
          <b>${t('source')}:</b> <a href="${escapeAttr(p.source.url)}" target="_blank" rel="noopener">@${escapeHTML(p.source.author)}</a>
          · <b>${t('views')}:</b> ${p.views ? p.views.toLocaleString() : '—'}
        </div>
      </div>
    `;
    $('#modal').classList.add('is-open');
    $('#modal').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    $('#modal .modal__close').focus();

    $('#copyBtn').addEventListener('click', () => copyText(p.prompt));
    $('#generateBtn').addEventListener('click', () => {
      window.open('https://meimind.app', '_blank', 'noopener');
    });
  }

  function closeModal() {
    if (!$('#modal').classList.contains('is-open')) return;
    $('#modal').classList.remove('is-open');
    $('#modal').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  /* ---------- 8. UTILS ---------- */
  function copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => toast('COPIED ✓')).catch(() => toast('COPY FAILED'));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); toast('COPIED ✓'); } catch (e) { toast('COPY FAILED'); }
      ta.remove();
    }
  }

  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-show'), 1600);
  }

  function debounce(fn, ms) {
    let id;
    return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); };
  }

  function escapeHTML(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function escapeAttr(s) { return escapeHTML(s); }

  /* ---------- BOOT ---------- */
  document.addEventListener('DOMContentLoaded', load);
})();
