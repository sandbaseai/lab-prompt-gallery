/* =========================================================================
   MeiMind / GPT Image 2 — Brutalism App
   Plain vanilla JS. No dependencies.
   ========================================================================= */

(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const REPO_URL = 'https://github.com/sandbaseai/lab-prompt-gallery';
  const UPSTREAM_IMAGE_ROOT = 'https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data';
  const CATEGORY_DEFS = [
    ['architecture', 'Architecture & Spaces', '▣'],
    ['brand', 'Brand & Logos', '▤'],
    ['character', 'Characters & People', '▥'],
    ['infographic', 'Charts & Infographics', '▦'],
    ['document', 'Documents & Publishing', '▧'],
    ['history', 'History & Classical Themes', '▨'],
    ['illustration', 'Illustration & Art', '▩'],
    ['other', 'Other Use Cases', '◧'],
    ['photography', 'Photography & Realism', '◨'],
    ['poster', 'Posters & Typography', '◩'],
    ['product', 'Products & E-commerce', '◪'],
    ['scene', 'Scenes & Storytelling', '◫'],
    ['ui', 'UI & Interfaces', '◬'],
  ].map(([id, label, icon]) => ({ id, label, icon }));

  const copy = {
    en: {
      pageTitle: 'MeiMind · GPT Image 2 Prompts Gallery', primaryNav: 'Primary navigation', navPrompts: 'Prompts', navTrending: 'Featured', navAbout: 'About', navLibraries: 'Libraries', navFaq: 'FAQ', github: 'GitHub', submitPrompt: 'Submit Prompt', menu: 'Menu', menuOpen: 'Open menu', menuClose: 'Close menu', skipToContent: 'Skip to content',
      modelPill: 'MODEL', modelMeta: '| Settings · Image · Generate', heroTitleLead: 'The Loudest Library of', heroTitleSuffix: 'Prompts.',
      browseGallery: 'Browse Gallery →', viewTrending: 'View Featured',
      statPrompts: 'PROMPTS', statCategories: 'CATEGORIES', statResolution: 'RES OUTPUT', statFree: 'FREE FOREVER', trendingTitle: 'Featured Prompts', viewAll: 'View All →', librariesTitle: 'More Prompt Libraries', librariesLead: 'Go beyond this snapshot with complementary, source-attributed GPT Image 2 collections.', exploreLibrary: 'Explore library →', externalLibrary: 'External catalog',
      aboutKicker: '// ABOUT THE MODEL', aboutTitle: 'What is GPT Image 2?', aboutCopy: '<b>GPT Image 2</b> is OpenAI\'s flagship image model with native <b>4K</b> output, precise text rendering (posters, UI screenshots, comic speech bubbles), and strong instruction following. It handles JSON and natural-language prompts across photography, UI, infographics, posters, and consistent characters.',
      sourcesCopy: 'This gallery samples prompts from <a href="https://github.com/freestylefly/awesome-gpt-image-2" target="_blank" rel="noopener">awesome-gpt-image-2</a>, <a href="https://github.com/no-chili/awesome-gpt-image-2-prompts" target="_blank" rel="noopener">Virloom\'s GPT Image 2 collection</a>, the <a href="https://gpt-image2.canghe.ai/" target="_blank" rel="noopener">canghe.ai mirror</a>, and community posts. Everything is grouped for quick copying, remixing, and attribution.',
      tryMeiMind: 'Try it in MeiMind →', allPrompts: 'All Prompts', total: 'TOTAL', searchLabel: 'Search prompts', searchPlaceholder: 'Search prompts by title, tag, model…', sortLabel: 'SORT', sortTrending: 'Featured', sortNewest: 'Newest', sortAZ: 'A → Z', loadMore: 'Load More ↓', noResultsTitle: 'No prompts found', noResultsBody: 'Try a different search or clear the current filters.', clearFilters: 'Clear filters',
      faqTitle: 'Common Questions', faq1Question: 'What is GPT Image 2?', faq1Answer: 'OpenAI\'s native image generation model for high-resolution output, accurate typography, and strong instruction following.', faq2Question: 'Where do these prompts come from?', faq2Answer: 'Data is curated from <a href="https://github.com/freestylefly/awesome-gpt-image-2" target="_blank" rel="noopener">freestylefly/awesome-gpt-image-2</a>, <a href="https://github.com/no-chili/awesome-gpt-image-2-prompts" target="_blank" rel="noopener">Virloom\'s collection</a>, <a href="https://gpt-image2.canghe.ai/" target="_blank" rel="noopener">canghe.ai</a>, and community posts. Credit the original author when remixing.', faq3Question: 'How do I use these prompts?', faq3Answer: 'Open a card, copy the full prompt, paste it into MeiMind, ChatGPT, or another compatible tool, then adjust the parameters and remix.', faq4Question: 'Can I submit my own prompt?', faq4Answer: 'Yes. Use “Submit Prompt” to fill out a short guided form, then continue to GitHub to send it. Strong prompts can be featured in the Featured section.', faq5Question: 'Is this free?', faq5Answer: 'The gallery is free to browse and copy. Prompt content follows the license and attribution terms of its original source.',
      ctaLead: 'Ready to create with', ctaTail: ' prompts, one-click copy, infinite remix.', startGenerating: 'Start Generating →', resources: 'RESOURCES', legal: 'LEGAL', license: 'License · CC-BY-4.0', privacy: 'Privacy', terms: 'Terms', mirror: 'canghe.ai mirror', poweredBy: 'POWERED BY SANDBASE', close: 'Close', noscript: 'This gallery needs JavaScript enabled to load prompts and open the inspector.', source: 'Source', copyPrompt: 'Copy Prompt', generateImage: 'Generate Image →', originalPrompt: 'Original prompt text (preserved from the source)', imageUnavailable: 'Image unavailable · open the source to view it', copied: 'COPIED ✓', copyFailed: 'COPY FAILED', loadFailedTitle: 'Unable to load the gallery', loadFailedBody: 'Refresh the page and try again.', retry: 'Refresh', switchedToChinese: '已切换到中文', switchedToEnglish: 'Switched to English',
    },
    zh: {
      pageTitle: 'MeiMind · GPT Image 2 提示词画廊', primaryNav: '主导航', navPrompts: '提示词', navTrending: '精选', navAbout: '关于', navLibraries: '提示词库', navFaq: '问答', github: 'GitHub', submitPrompt: '提交提示词', menu: '菜单', menuOpen: '打开菜单', menuClose: '关闭菜单', skipToContent: '跳到主要内容',
      modelPill: '模型', modelMeta: '| 参数 · 图像 · 生成', heroTitleLead: '最响亮的', heroTitleSuffix: '提示词库。',
      browseGallery: '浏览画廊 →', viewTrending: '查看精选',
      statPrompts: '提示词', statCategories: '分类', statResolution: '输出分辨率', statFree: '永久免费', trendingTitle: '精选提示词', viewAll: '查看全部 →', librariesTitle: '更多提示词库', librariesLead: '当前画廊已合并两个 GPT Image 2 数据源，其他库先以外链形式提供，待完成版权与素材审核后再合并。', exploreLibrary: '浏览提示词库 →', externalLibrary: '外部目录',
      aboutKicker: '// 关于模型', aboutTitle: 'GPT Image 2 是什么？', aboutCopy: '<b>GPT Image 2</b> 是 OpenAI 的旗舰图像模型，支持原生 <b>4K</b> 输出、精准文字渲染（海报、UI 截图、漫画对话框）和强指令遵循。它能处理 JSON 与自然语言提示词，适合摄影、UI、信息图、海报和角色一致性创作。',
      sourcesCopy: '本画廊整理自 <a href="https://github.com/freestylefly/awesome-gpt-image-2" target="_blank" rel="noopener">awesome-gpt-image-2</a>、<a href="https://github.com/no-chili/awesome-gpt-image-2-prompts" target="_blank" rel="noopener">Virloom 的 GPT Image 2 提示词库</a>、<a href="https://gpt-image2.canghe.ai/" target="_blank" rel="noopener">canghe.ai 镜像库</a> 与社区内容，方便复制、改编和标注来源。',
      tryMeiMind: '在 MeiMind 中试用 →', allPrompts: '全部提示词', total: '总计', searchLabel: '搜索提示词', searchPlaceholder: '按标题、标签或模型搜索提示词……', sortLabel: '排序', sortTrending: '精选', sortNewest: '最新', sortAZ: 'A → Z', loadMore: '加载更多 ↓', noResultsTitle: '没有找到提示词', noResultsBody: '换个关键词，或清除当前筛选条件。', clearFilters: '清除筛选',
      faqTitle: '常见问题', faq1Question: 'GPT Image 2 是什么？', faq1Answer: 'OpenAI 的原生图像生成模型，支持高分辨率输出、准确排版和强指令遵循。', faq2Question: '这些提示词来自哪里？', faq2Answer: '内容整理自 <a href="https://github.com/freestylefly/awesome-gpt-image-2" target="_blank" rel="noopener">awesome-gpt-image-2</a>、<a href="https://github.com/no-chili/awesome-gpt-image-2-prompts" target="_blank" rel="noopener">Virloom 提示词库</a>、<a href="https://gpt-image2.canghe.ai/" target="_blank" rel="noopener">canghe.ai</a> 与社区内容。改编时请保留原作者署名。', faq3Question: '如何使用这些提示词？', faq3Answer: '打开卡片，复制完整提示词，粘贴到 MeiMind、ChatGPT 或其他兼容工具中，再调整参数并继续改编。', faq4Question: '可以提交自己的提示词吗？', faq4Answer: '可以。点击“提交提示词”填写简短表单，再前往 GitHub 完成提交；优质提示词会进入精选区域。', faq5Question: '这些内容免费吗？', faq5Answer: '画廊浏览和复制免费。提示词内容遵循原始来源的许可证与署名要求。',
      ctaLead: '准备好用', ctaTail: ' 条提示词，复制、改编，无限灵感。', startGenerating: '开始生成 →', resources: '资源', legal: '法律', license: '许可证 · CC-BY-4.0', privacy: '隐私', terms: '条款', mirror: 'canghe.ai 镜像', poweredBy: 'POWERED BY SANDBASE', close: '关闭', noscript: '请启用 JavaScript 以加载提示词并打开查看器。', source: '来源', copyPrompt: '复制提示词', generateImage: '生成图像 →', originalPrompt: '提示词原文（按上游内容保留）', imageUnavailable: '图片暂时无法加载 · 可打开来源查看', copied: '已复制 ✓', copyFailed: '复制失败', loadFailedTitle: '画廊加载失败', loadFailedBody: '请刷新页面后重试。', retry: '刷新页面', switchedToChinese: '已切换到中文', switchedToEnglish: 'Switched to English',
    },
  };
  const categoryLabels = {
    en: { all: 'All', architecture: 'Architecture & Spaces', brand: 'Brand & Logos', character: 'Characters & People', infographic: 'Charts & Infographics', document: 'Documents & Publishing', history: 'History & Classical Themes', illustration: 'Illustration & Art', other: 'Other Use Cases', photography: 'Photography & Realism', poster: 'Posters & Typography', product: 'Products & E-commerce', scene: 'Scenes & Storytelling', ui: 'UI & Interfaces' },
    zh: { all: '全部', architecture: '建筑与空间', brand: '品牌与标志', character: '人物与角色', infographic: '图表与信息图', document: '文档与出版', history: '历史与古典题材', illustration: '插画与艺术', other: '其他应用场景', photography: '摄影与写实', poster: '海报与排版', product: '商品与电商', scene: '场景与叙事', ui: 'UI 与界面' },
  };
  let language = 'en';
  try { language = localStorage.getItem('meimind-language') === 'zh' ? 'zh' : 'en'; } catch {}
  const t = key => copy[language][key] || copy.en[key] || key;
  const categoryLabel = category => categoryLabels[language][category.id] || category.label;

  function setLanguage(next) {
    language = next === 'zh' ? 'zh' : 'en';
    try { localStorage.setItem('meimind-language', language); } catch {}
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = t('pageTitle');
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-placeholder]').forEach(el => { el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder)); });
    $$('[data-i18n-aria-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)); });
    const button = $('#langBtn');
    button.textContent = language === 'en' ? '中' : 'EN';
    button.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
    const menu = $('#menuBtn');
    if (menu) menu.setAttribute('aria-label', menu.getAttribute('aria-expanded') === 'true' ? t('menuClose') : t('menuOpen'));
    if (state.data) {
      renderPills();
      applyFilters();
      renderTrending();
      renderLibraries();
      if ($('#modal').classList.contains('is-open') && activeModalId) openModal(activeModalId, { updateUrl: false, focus: false });
    }
  }

  function inferAspect(prompt) {
    const match = String(prompt || '').match(/\b(\d{1,2}:\d{1,2})\b/);
    return match ? match[1] : '4:5';
  }

  function containsCjk(value) {
    return /[\u3400-\u9fff]/.test(String(value || ''));
  }

  function truncate(value, max) {
    const text = String(value || '').replace(/\s+/g, ' ').trim();
    return text.length > max ? `${text.slice(0, max - 1).trim()}…` : text;
  }

  function englishCandidates(...values) {
    return values
      .flatMap(value => String(value || '').split(/[\n.!?。！？；;]+/))
      .map(value => value.replace(/^[-–—•*\s]+/, '').replace(/\s+/g, ' ').trim())
      .filter(value => /[A-Za-z]{3,}/.test(value) && !containsCjk(value));
  }

  function englishTitle(item, category) {
    const sourceTitle = String(item.title || '').trim();
    if (sourceTitle && !containsCjk(sourceTitle)) return truncate(sourceTitle, 72);
    const candidate = englishCandidates(item.promptPreview, item.prompt)[0];
    return candidate ? truncate(candidate, 72) : `Case #${item.id} · ${category.label}`;
  }

  function englishSummary(item, category) {
    const sourcePreview = String(item.promptPreview || '').trim();
    if (sourcePreview && !containsCjk(sourcePreview)) return truncate(sourcePreview, 190);
    const candidates = englishCandidates(item.promptPreview, item.prompt);
    if (candidates.length) return truncate(candidates.slice(0, 2).join('. '), 190);
    return `A GPT Image 2 prompt case from ${category.label}.`;
  }

  const displayTitle = prompt => language === 'zh' ? prompt.titleZh : prompt.titleEn;
  const displaySummary = prompt => language === 'zh' ? prompt.summaryZh : prompt.summaryEn;
  const displayImageAlt = prompt => language === 'zh' ? prompt.imageAltZh : prompt.imageAltEn;
  const displayAuthor = prompt => {
    const author = String(prompt.source.author || 'upstream').trim();
    return language === 'en' && containsCjk(author) ? 'community contributor' : author;
  };

  function normalizeData(raw) {
    const categoryByLabel = new Map(CATEGORY_DEFS.map(category => [category.label, category]));
    const categories = [{ id: 'all', label: 'All', icon: '▣' }, ...CATEGORY_DEFS];
    const prompts = (Array.isArray(raw.cases) ? raw.cases : []).map(item => {
      const category = categoryByLabel.get(item.category) || CATEGORY_DEFS.find(def => def.id === 'other');
      const aspect = inferAspect(item.prompt);
      const [width, height] = aspect.split(':').map(Number);
      const aspectHint = width === height ? 'square' : width > height ? 'wide' : 'tall';
      const image = /^https?:\/\//.test(String(item.imageUrl || ''))
        ? item.imageUrl
        : typeof item.image === 'string' && item.image.startsWith('/')
          ? `${UPSTREAM_IMAGE_ROOT}${item.image}`
          : '';
      const imageFallback = /^https?:\/\//.test(String(item.imageFallback || ''))
        ? item.imageFallback
        : typeof item.image === 'string' && item.image.startsWith('/')
          ? `https://github.com/freestylefly/awesome-gpt-image-2/raw/refs/heads/main/data${item.image}`
          : '';
      return {
        id: String(item.id),
        titleZh: item.title,
        summaryZh: item.promptPreview || String(item.prompt || '').slice(0, 180),
        titleEn: englishTitle(item, category),
        summaryEn: englishSummary(item, category),
        category: category.id,
        tags: [...(Array.isArray(item.styles) ? item.styles : []), ...(Array.isArray(item.scenes) ? item.scenes : [])].slice(0, 4),
        model: 'gpt-image-2',
        aspect,
        aspectHint,
        featured: Boolean(item.featured),
        image,
        imageFallback,
        sourceId: item.sourceId || 'freestylefly',
        sourceName: item.sourceName || 'awesome-gpt-image-2',
        imageAltZh: item.imageAlt || item.title,
        imageAltEn: englishTitle(item, category),
        prompt: item.prompt,
        source: { author: item.sourceLabel || 'upstream case', url: item.sourceUrl || item.githubUrl || raw.repository },
      };
    });
    const sources = Array.isArray(raw.sources) && raw.sources.length
      ? raw.sources
      : [{ id: 'freestylefly', name: 'awesome-gpt-image-2', url: 'https://github.com/freestylefly/awesome-gpt-image-2', cases: prompts.length, license: 'CC-BY-4.0' }];
    return { categories, prompts, sources };
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
  let activeModalId = null;

  function hydrateUrlState() {
    if (!state.data) return null;
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const sort = params.get('sort');
    state.category = state.data.categories.some(item => item.id === category) ? category : 'all';
    state.query = (params.get('q') || '').trim().toLowerCase();
    state.sort = ['trending', 'newest', 'az'].includes(sort) ? sort : 'trending';
    if ($('#searchInput')) $('#searchInput').value = state.query;
    if ($('#sortSel')) $('#sortSel').value = state.sort;
    return params.get('case');
  }

  function syncUrl({ push = false, modalId = activeModalId } = {}) {
    const url = new URL(window.location.href);
    if (state.category === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', state.category);
    if (state.query) url.searchParams.set('q', state.query);
    else url.searchParams.delete('q');
    if (state.sort === 'trending') url.searchParams.delete('sort');
    else url.searchParams.set('sort', state.sort);
    if (modalId) url.searchParams.set('case', modalId);
    else url.searchParams.delete('case');
    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next === current) return;
    window.history[push ? 'pushState' : 'replaceState']({}, '', next);
  }

  function handleUrlChange() {
    if (!state.data) return;
    const requestedCase = hydrateUrlState();
    renderPills();
    applyFilters();
    renderTrending();
    renderLibraries();
    const prompt = requestedCase && state.data.prompts.find(item => item.id === requestedCase);
    if (prompt) {
      if (activeModalId !== prompt.id || !$('#modal').classList.contains('is-open')) openModal(prompt.id, { updateUrl: false });
    } else if ($('#modal').classList.contains('is-open')) {
      closeModal({ updateUrl: false });
    } else if (requestedCase) {
      syncUrl({ modalId: null });
    }
  }

  /* ---------- 1. DATA LOAD ---------- */
  async function load() {
    try {
      const res = await fetch('data/cases.json');
      if (!res.ok) throw new Error('fetch failed');
      state.data = normalizeData(await res.json());
    } catch (err) {
      console.error('Failed to load cases.json', err);
      $('#grid').innerHTML = `<div class="load-error" role="alert"><strong>${t('loadFailedTitle')}</strong><p>${t('loadFailedBody')}</p><button class="btn btn--ghost" id="retryLoad" type="button">${t('retry')}</button></div>`;
      $('#retryLoad').addEventListener('click', () => window.location.reload());
      return;
    }
    const requestedCase = hydrateUrlState();
    initFilters();
    setLanguage(language);
    applyFilters();
    renderTrending();
    renderPills();
    const promptCount = state.data.prompts.length;
    const categoryCount = state.data.categories.filter(category => category.id !== 'all').length;
    $('#totalCount').textContent = promptCount.toLocaleString();
    $('#heroStatPromptCount').textContent = promptCount.toLocaleString();
    $('#heroStatCategoryCount').textContent = categoryCount.toLocaleString();
    $('#ctaPromptCount').textContent = promptCount.toLocaleString();
    if (requestedCase) {
      const prompt = state.data.prompts.find(item => item.id === requestedCase);
      if (prompt) openModal(prompt.id, { updateUrl: false });
      else syncUrl({ modalId: null });
    }
  }

  /* ---------- 2. PILLS / FILTERS ---------- */
  function initFilters() {
    $('#searchInput').addEventListener('input', debounce(e => {
      state.query = e.target.value.trim().toLowerCase();
      state.page = 0;
      applyFilters();
      syncUrl();
    }, 180));
    $('#sortSel').addEventListener('change', e => {
      state.sort = e.target.value;
      state.page = 0;
      applyFilters();
      syncUrl();
    });
    $('#loadMore').addEventListener('click', () => {
      state.page += 1;
      renderGrid();
    });
    $('#langBtn').addEventListener('click', () => {
      const next = language === 'en' ? 'zh' : 'en';
      setLanguage(next);
      toast(next === 'zh' ? copy.zh.switchedToChinese : copy.en.switchedToEnglish);
    });
    $('#menuBtn').addEventListener('click', () => {
      const menu = $('#menuBtn');
      const expanded = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!expanded));
      $('#primaryNav').classList.toggle('is-open', !expanded);
      menu.setAttribute('aria-label', !expanded ? t('menuClose') : t('menuOpen'));
    });
    $$('#primaryNav a').forEach(link => link.addEventListener('click', () => {
      $('#menuBtn').setAttribute('aria-expanded', 'false');
      $('#menuBtn').setAttribute('aria-label', t('menuOpen'));
      $('#primaryNav').classList.remove('is-open');
    }));
    window.addEventListener('popstate', handleUrlChange);
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || $('#menuBtn').getAttribute('aria-expanded') !== 'true') return;
      $('#menuBtn').setAttribute('aria-expanded', 'false');
      $('#menuBtn').setAttribute('aria-label', t('menuOpen'));
      $('#primaryNav').classList.remove('is-open');
      $('#menuBtn').focus();
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
        syncUrl();
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
        (p.titleZh + ' ' + p.summaryZh + ' ' + p.titleEn + ' ' + p.summaryEn + ' ' + (p.tags || []).join(' ') + ' ' + p.model)
          .toLowerCase().includes(q)
      );
    }

    if (state.sort === 'trending') list.sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.id) - Number(a.id));
    if (state.sort === 'newest')   list.sort((a, b) => Number(b.id) - Number(a.id));
    if (state.sort === 'az')       list.sort((a, b) => displayTitle(a).localeCompare(displayTitle(b), language === 'zh' ? 'zh' : 'en'));

    state.filtered = list;
    renderGrid();
  }

  /* ---------- 4. FEATURED (top 3 by source flag / case id) ---------- */
  function renderTrending() {
    const top = state.data.prompts.slice().sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.id) - Number(a.id)).slice(0, 3);
    $('#trendingGrid').innerHTML = top.map((p, i) => cardHTML(p, i + 1, '', true)).join('');
    bindCardEvents('#trendingGrid');
  }

  /* ---------- 5. GRID RENDER ---------- */
  function renderGrid() {
    const start = state.page * state.pageSize;
    const end   = start + state.pageSize;
    const slice = state.filtered.slice(0, end);

    if (slice.length === 0) {
      $('#grid').innerHTML = `
        <div class="empty-state" role="status">
          <h3>${t('noResultsTitle')}</h3>
          <p>${t('noResultsBody')}</p>
          <button class="btn btn--ghost" id="clearFilters" type="button">${t('clearFilters')}</button>
        </div>
      `;
      $('#clearFilters').addEventListener('click', clearFilters);
    } else {
      const html = slice.map((p, i) => cardHTML(p, i + 1, 'wide', false)).join('');
      $('#grid').innerHTML = html;
      bindCardEvents('#grid');
    }
    $('#gridCount').textContent = `${slice.length.toLocaleString()} / ${state.filtered.length.toLocaleString()}`;

    /* hide load more if no more */
    $('#loadMore').style.display = end >= state.filtered.length ? 'none' : 'inline-flex';

  }

  function renderLibraries() {
    const grid = $('#libraryGrid');
    if (!grid || !state.data?.sources) return;
    grid.innerHTML = state.data.sources.map(source => `
      <article class="library-card">
        <div class="library-card__top">
          <span class="library-card__kicker">${escapeHTML(source.id || 'SOURCE')}</span>
          <strong>${source.external ? escapeHTML(t('externalLibrary')) : escapeHTML(Number(source.cases || 0).toLocaleString())}</strong>
        </div>
        <h3>${escapeHTML(source.name || 'Prompt library')}</h3>
        <p>${escapeHTML(source.license || '')}</p>
        <a href="${escapeAttr(source.url || '#')}" target="_blank" rel="noopener">${t('exploreLibrary')}</a>
      </article>
    `).join('');
  }

  function clearFilters() {
    state.category = 'all';
    state.query = '';
    state.page = 0;
    $('#searchInput').value = '';
    renderPills();
    applyFilters();
    syncUrl();
  }

  /* ---------- 6. CARD HTML ---------- */
  function cardHTML(p, idx, hint = '', showTrend = false) {
    const mediaClass = hint === 'wide'
      ? (p.aspectHint === 'tall' ? 'card__media card__media--tall'
         : p.aspectHint === 'wide' ? 'card__media card__media--wide'
         : 'card__media')
      : 'card__media';

    const tag   = (p.tags && p.tags[0]) ? `<span class="card__tag">${escapeHTML(p.tags[0])}</span>` : '';
    const authorName = displayAuthor(p);
    const author = authorName.startsWith('@') ? authorName : `@${authorName}`;
    const title = displayTitle(p);
    const summary = displaySummary(p);
    const [imageWidth, imageHeight] = String(p.aspect || '4:5').split(':').map(Number);
    const image = p.image
      ? `<img class="card__image" src="${escapeAttr(p.image)}" data-fallback="${escapeAttr(p.imageFallback || '')}" width="${Number.isFinite(imageWidth) ? imageWidth : 4}" height="${Number.isFinite(imageHeight) ? imageHeight : 5}" alt="${escapeAttr(displayImageAlt(p))}" loading="lazy" decoding="async" />`
      : '';

    return `
      <article class="card" data-id="${escapeAttr(p.id)}" tabindex="${idx === 1 ? '0' : '-1'}" role="button" aria-label="${escapeAttr(language === 'zh' ? `打开提示词：${title}` : `Open prompt: ${title}`)}">
        <div class="${mediaClass}">
          ${image}
          <div class="card__placeholder">
            ${escapeHTML(p.aspect || 'image')} · ${escapeHTML(p.model || 'gpt-image-2')}
          </div>
          ${showTrend && idx <= 3 ? `<span class="card__badge">#${idx} FEATURED</span>` : ''}
        </div>
        <div class="card__body">
          <div class="card__title">${escapeHTML(title)}</div>
          <div class="card__summary">${escapeHTML(summary)}</div>
          <div class="card__meta">
            <span class="card__author">${escapeHTML(author)}</span>
            <span>CASE ${escapeHTML(p.id)} ${tag}</span>
          </div>
        </div>
      </article>
    `;
  }

  function bindCardEvents(rootSel) {
    $$(`${rootSel} .card`).forEach(el => {
      el.addEventListener('click', () => openModal(el.dataset.id));
      el.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(el.dataset.id);
          return;
        }
        if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        const cards = $$(`${rootSel} .card`);
        const index = cards.indexOf(el);
        if (index < 0) return;
        let nextIndex = index;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = cards.length - 1;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = Math.min(cards.length - 1, index + 1);
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = Math.max(0, index - 1);
        if (nextIndex !== index) {
          event.preventDefault();
          el.tabIndex = -1;
          cards[nextIndex].tabIndex = 0;
          cards[nextIndex].focus();
        }
      });
    });
    bindImageFallbacks(rootSel);
  }

  function bindImageFallbacks(rootSel) {
    $$(`${rootSel} .card__image`).forEach(image => {
      const media = image.closest('.card__media');
      const markLoaded = () => media?.classList.add('has-image');
      const removeBroken = () => {
        const fallback = image.dataset.fallback;
        if (fallback && !image.dataset.fallbackTried) {
          image.dataset.fallbackTried = 'true';
          image.src = fallback;
          return;
        }
        image.remove();
        media?.classList.remove('has-image');
        const placeholder = $('.card__placeholder', media);
        if (placeholder) placeholder.textContent = t('imageUnavailable');
        media?.classList.add('image-unavailable');
      };
      image.addEventListener('load', markLoaded, { once: true });
      image.addEventListener('error', removeBroken);
      if (image.complete && image.naturalWidth > 0) markLoaded();
    });
  }

  /* ---------- 7. MODAL DETAIL ---------- */
  function openModal(id, { updateUrl = true, focus = true } = {}) {
    const p = state.data.prompts.find(x => x.id === id);
    if (!p) return;
    const wasOpen = $('#modal').classList.contains('is-open');
    activeModalId = p.id;
    if (updateUrl) syncUrl({ push: true, modalId: p.id });
    const body = $('#modalBody');
    const authorName = displayAuthor(p);
    const authorLabel = authorName.startsWith('@') ? authorName : `@${authorName}`;
    const [imageWidth, imageHeight] = String(p.aspect || '4:5').split(':').map(Number);
    const detailImage = p.image
      ? `<img src="${escapeAttr(p.image)}" data-fallback="${escapeAttr(p.imageFallback || '')}" width="${Number.isFinite(imageWidth) ? imageWidth : 4}" height="${Number.isFinite(imageHeight) ? imageHeight : 5}" alt="${escapeAttr(displayImageAlt(p))}" decoding="async" />`
      : '';
    body.innerHTML = `
      <div class="detail__media">
        ${detailImage}
        <div class="card__placeholder" style="width:100%;aspect-ratio:${String(p.aspect || '4:3').replace(':', ' / ')}">
          ${escapeHTML(p.aspect || 'image')} preview · ${escapeHTML(p.model)}
        </div>
      </div>
      <div class="detail__body">
        <h2 class="detail__title" id="modalTitle">${escapeHTML(displayTitle(p))}</h2>
        <p class="detail__summary">${escapeHTML(displaySummary(p))}</p>
        <div class="detail__meta">
          <span class="detail__chip detail__chip--accent">${escapeHTML(p.model)}</span>
          <span class="detail__chip">${escapeHTML(p.aspect || 'image')}</span>
          <span class="detail__chip">${escapeHTML(categoryLabels[language][p.category] || p.category)}</span>
          ${(p.tags || []).map(t => `<span class="detail__chip">${escapeHTML(t)}</span>`).join('')}
        </div>
        <div class="detail__prompt-label">${t('originalPrompt')}</div>
        <pre class="detail__prompt" id="promptText">${escapeHTML(p.prompt)}</pre>
        <div class="detail__actions">
          <button class="btn btn--solid" id="copyBtn">${t('copyPrompt')}</button>
          <button class="btn btn--ghost" id="generateBtn">${t('generateImage')}</button>
        </div>
        <div class="detail__source">
          <b>${t('source')}:</b> <a href="${escapeAttr(p.source.url)}" target="_blank" rel="noopener">${escapeHTML(authorLabel)}</a>

        </div>
      </div>
    `;
    const detailMedia = $('.detail__media', body);
    const detailImageEl = $('img', detailMedia);
    if (detailImageEl) {
      const detailPlaceholder = $('.card__placeholder', detailMedia);
      const hidePlaceholder = () => { if (detailPlaceholder) detailPlaceholder.hidden = true; };
      const handleImageError = () => {
        const fallback = detailImageEl.dataset.fallback;
        if (fallback && !detailImageEl.dataset.fallbackTried) {
          detailImageEl.dataset.fallbackTried = 'true';
          detailImageEl.src = fallback;
          return;
        }
        detailImageEl.remove();
        if (detailPlaceholder) detailPlaceholder.textContent = t('imageUnavailable');
      };
      detailImageEl.addEventListener('load', hidePlaceholder, { once: true });
      detailImageEl.addEventListener('error', handleImageError);
      if (detailImageEl.complete && detailImageEl.naturalWidth > 0) hidePlaceholder();
    }
    $('#modal').classList.add('is-open');
    $('#modal').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (!wasOpen) lastFocused = document.activeElement;
    if (focus) $('#modal .modal__close').focus();

    $('#copyBtn').addEventListener('click', () => copyText(p.prompt));
    $('#generateBtn').addEventListener('click', () => {
      window.open('https://meimind.app', '_blank', 'noopener');
    });
  }

  function closeModal({ updateUrl = true } = {}) {
    if (!$('#modal').classList.contains('is-open')) return;
    $('#modal').classList.remove('is-open');
    $('#modal').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
    activeModalId = null;
    if (updateUrl) syncUrl({ modalId: null });
  }

  /* ---------- 8. UTILS ---------- */
  function copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => toast(t('copied'))).catch(() => toast(t('copyFailed')));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); toast(t('copied')); } catch (e) { toast(t('copyFailed')); }
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
