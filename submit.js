(() => {
  const form = document.querySelector('#submitForm');
  const languageButton = document.querySelector('#langBtn');
  const continueLink = document.querySelector('#submitToGithub');
  const status = document.querySelector('#submitStatus');
  const promptField = document.querySelector('#promptText');
  const copy = {
    en: {
      pageTitle: 'Submit a Prompt · MeiMind', skipToContent: 'Skip to content', backToGallery: 'Back to gallery', submitKicker: '// SHARE YOUR WORK', submitTitle: 'Submit a prompt', submitLead: 'Fill out the short form first. We will prepare a GitHub draft with your text, so you do not need to understand issue templates.', promptTitleLabel: 'Prompt title <span class="submit-optional">optional</span>', promptTextLabel: 'Prompt text <span aria-hidden="true">*</span>', promptAuthorLabel: 'Your name or handle <span class="submit-optional">optional</span>', promptSourceLabel: 'Source link <span class="submit-optional">optional</span>', optional: 'optional', promptTitlePlaceholder: 'e.g. Editorial product poster', promptTextPlaceholder: 'Paste the complete prompt here', promptAuthorPlaceholder: 'e.g. @yourhandle', promptSourcePlaceholder: 'https://...', prepareDraft: 'Prepare GitHub draft →', submitPrivacy: 'Nothing is stored on this site. The next step opens GitHub, where you can review the draft before submitting.', submitNextTitle: 'Finish on GitHub', submitNextBody: 'Review the pre-filled issue, sign in to GitHub if needed, and click “Submit new issue”.', continueGithub: 'Continue to GitHub →', openDirect: 'Prefer the direct issue form?', submitFooter: 'A simple path from idea to a shareable prompt.', draftReady: 'Draft ready. Open GitHub to review and submit.', langLabel: 'Switch to Chinese', languageCode: '中', requiredPrompt: 'Please add the prompt text before continuing.',
    },
    zh: {
      pageTitle: '提交提示词 · MeiMind', skipToContent: '跳到主要内容', backToGallery: '返回提示词库', submitKicker: '// 分享你的作品', submitTitle: '提交提示词', submitLead: '先填写这份简短表单，我们会把内容整理成 GitHub 草稿，你不需要理解 issue 模板。', promptTitleLabel: '提示词标题 <span class="submit-optional">可选</span>', promptTextLabel: '提示词原文 <span aria-hidden="true">*</span>', promptAuthorLabel: '你的名字或账号 <span class="submit-optional">可选</span>', promptSourceLabel: '来源链接 <span class="submit-optional">可选</span>', optional: '可选', promptTitlePlaceholder: '例如：杂志风格产品海报', promptTextPlaceholder: '粘贴完整提示词', promptAuthorPlaceholder: '例如：@yourhandle', promptSourcePlaceholder: 'https://...', prepareDraft: '生成 GitHub 草稿 →', submitPrivacy: '本站不会保存提交内容。下一步会打开 GitHub，你可以先检查草稿，再决定是否提交。', submitNextTitle: '在 GitHub 完成', submitNextBody: '检查已经填好的 issue；如有需要先登录 GitHub，然后点击“Submit new issue”。', continueGithub: '继续前往 GitHub →', openDirect: '想直接打开 issue 表单？', submitFooter: '从灵感到可分享提示词的简单路径。', draftReady: '草稿已准备好，打开 GitHub 检查并提交。', langLabel: '切换到英文', languageCode: 'EN', requiredPrompt: '请先填写提示词原文。',
    },
  };
  let language = 'en';
  try { language = localStorage.getItem('meimind-language') === 'zh' ? 'zh' : 'en'; } catch {}
  const t = key => copy[language][key] || copy.en[key] || key;

  function renderLanguage() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = t('pageTitle');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    languageButton.textContent = t('languageCode');
    languageButton.setAttribute('aria-label', t('langLabel'));
  }

  function createIssueUrl() {
    const values = new FormData(form);
    const title = String(values.get('title') || '').trim() || 'New prompt submission';
    const prompt = String(values.get('prompt') || '').trim();
    const author = String(values.get('author') || '').trim() || 'Not provided';
    const source = String(values.get('source') || '').trim();
    const safeSource = /^https?:\/\//i.test(source) ? source : 'Not provided';
    const body = [
      '### Prompt',
      '',
      prompt,
      '',
      '### Details',
      '',
      `- Title: ${title}`,
      `- Author: ${author}`,
      `- Source: ${safeSource}`,
      '',
      '_Submitted via lab-prompt-gallery._',
    ].join('\n');
    const url = new URL('https://github.com/sandbaseai/lab-prompt-gallery/issues/new');
    url.searchParams.set('title', title);
    url.searchParams.set('body', body);
    return url.toString();
  }

  languageButton.addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    try { localStorage.setItem('meimind-language', language); } catch {}
    renderLanguage();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      if (!promptField.value.trim()) status.textContent = t('requiredPrompt');
      return;
    }
    continueLink.href = createIssueUrl();
    continueLink.hidden = false;
    status.textContent = t('draftReady');
    continueLink.focus();
  });
  renderLanguage();
})();
