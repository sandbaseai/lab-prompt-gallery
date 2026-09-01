/* =========================================================================
   MeiMind / GPT Image 2 — Brutalism App
   Plain vanilla JS. No dependencies.
   ========================================================================= */

(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const state = {
    data:      null,       // { categories, prompts }
    filtered:  [],
    category:  'all',
    query:     '',
    sort:      'trending',
    page:      0,
    pageSize:  24,
  };

  /* ---------- 1. DATA LOAD ---------- */
  async function load() {
    try {
      const res = await fetch('data/prompts.json');
      if (!res.ok) throw new Error('fetch failed');
      state.data = await res.json();
    } catch (err) {
      console.error('Failed to load prompts.json', err);
      $('#grid').innerHTML = '<p style="padding:40px;font-family:Menlo">⚠ Failed to load prompts.json.<br>请通过本地服务器访问(例如 <code>python3 -m http.server</code>)。</p>';
      return;
    }
    initFilters();
    applyFilters();
    renderTrending();
    renderPills();
    $('#totalCount').textContent = state.data.prompts.length.toLocaleString();
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
      window.open('https://github.com/freestylefly/awesome-gpt-image-2/issues/new', '_blank');
    });
    $('#langBtn').addEventListener('click', () => {
      const btn = $('#langBtn');
      btn.textContent = btn.textContent === 'EN' ? '中' : 'EN';
      toast(btn.textContent === 'EN' ? 'Switched to English' : '已切换到中文');
    });

    /* Modal close handlers */
    $('#modal').addEventListener('click', e => {
      if (e.target.dataset.close !== undefined) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
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
          <span aria-hidden="true">${c.icon}</span>${c.label}
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
    $('#trendingGrid').innerHTML = top.map((p, i) => cardHTML(p, i + 1)).join('');
    bindCardEvents('#trendingGrid');
  }

  /* ---------- 5. GRID RENDER ---------- */
  function renderGrid(append) {
    const start = state.page * state.pageSize;
    const end   = start + state.pageSize;
    const slice = state.filtered.slice(0, end);

    const html = slice.map((p, i) => cardHTML(p, i + 1, 'wide')).join('');
    $('#grid').innerHTML = html;
    $('#gridCount').textContent = `${slice.length.toLocaleString()} / ${state.filtered.length.toLocaleString()}`;

    /* hide load more if no more */
    $('#loadMore').style.display = end >= state.filtered.length ? 'none' : 'inline-flex';

    bindCardEvents('#grid');
    if (!append) {
      $('#grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ---------- 6. CARD HTML ---------- */
  function cardHTML(p, idx, hint = '') {
    const mediaClass = hint === 'wide'
      ? (p.aspectHint === 'tall' ? 'card__media card__media--tall'
         : p.aspectHint === 'wide' ? 'card__media card__media--wide'
         : 'card__media')
      : 'card__media';

    const views = p.views ? formatViews(p.views) : '';
    const tag   = (p.tags && p.tags[0]) ? `<span class="card__tag">${p.tags[0]}</span>` : '';

    return `
      <article class="card" data-id="${p.id}">
        <div class="${mediaClass}">
          <div class="card__placeholder">
            ${escapeHTML(p.aspect || 'image')} · ${escapeHTML(p.model || 'gpt-image-2')}
          </div>
          ${p.imageCount && p.imageCount > 1 ? `<span class="card__count">×${p.imageCount}</span>` : ''}
          ${idx <= 3 ? `<span class="card__badge">#${idx} TREND</span>` : ''}
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
        <h2 class="detail__title">${escapeHTML(p.title)}</h2>
        <p class="detail__summary">${escapeHTML(p.summary || '')}</p>
        <div class="detail__meta">
          <span class="detail__chip detail__chip--accent">${escapeHTML(p.model)}</span>
          <span class="detail__chip">${escapeHTML(p.aspect || 'image')}</span>
          <span class="detail__chip">${escapeHTML(p.category.toUpperCase())}</span>
          ${(p.tags || []).map(t => `<span class="detail__chip">${escapeHTML(t)}</span>`).join('')}
        </div>
        <pre class="detail__prompt" id="promptText">${escapeHTML(p.prompt)}</pre>
        <div class="detail__actions">
          <button class="btn btn--solid" id="copyBtn">Copy Prompt</button>
          <button class="btn btn--ghost" id="generateBtn">Generate Image →</button>
        </div>
        <div class="detail__source">
          <b>Source:</b> <a href="${escapeAttr(p.source.url)}" target="_blank" rel="noopener">@${escapeHTML(p.source.author)}</a>
          · <b>Views:</b> ${p.views ? p.views.toLocaleString() : '—'}
        </div>
      </div>
    `;
    $('#modal').classList.add('is-open');
    $('#modal').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    $('#copyBtn').addEventListener('click', () => copyText(p.prompt));
    $('#generateBtn').addEventListener('click', () => {
      window.open('https://meimind.app', '_blank');
    });
  }

  function closeModal() {
    $('#modal').classList.remove('is-open');
    $('#modal').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------- 8. UTILS ---------- */
  function copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => toast('COPIED ✓'));
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