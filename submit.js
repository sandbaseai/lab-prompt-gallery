(() => {
  const form = document.querySelector('#submitForm');
  const languageButton = document.querySelector('#langBtn');
  const continueLink = document.querySelector('#submitToGithub');
  const copyButton = document.querySelector('#copySubmission');
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
  Object.assign(copy.en, {
    submitLead: 'Fill out the short form first. We will prepare a submission draft that you can send through GitHub or another channel.',
    prepareDraft: 'Prepare submission →',
    submitPrivacy: 'Nothing is stored on this site. Review the draft, then choose where to send it.',
    submitNextTitle: 'Send the draft',
    submitNextBody: 'Continue to GitHub for public review, or copy the prepared text and send it through another channel.',
    copySubmission: 'Copy submission',
    copiedSubmission: 'Submission copied. Send it through any channel you prefer.',
    copyFailed: 'Could not copy. Select the prompt text and copy it manually.',
    draftReady: 'Draft ready. Continue to GitHub or copy it for another channel.',
  });
  Object.assign(copy.zh, {
    submitLead: '先填写这份简短表单，我们会整理成提交草稿，你可以选择 GitHub 或其他发送渠道。',
    prepareDraft: '生成提交草稿 →',
    submitPrivacy: '本站不会保存提交内容。检查草稿后，再选择发送方式。',
    submitNextTitle: '发送草稿',
    submitNextBody: '可以前往 GitHub 公开提交，也可以复制整理好的内容，通过微信、邮件或其他渠道发送。',
    copySubmission: '复制提交内容',
    copiedSubmission: '提交内容已复制，可通过微信、邮件或其他渠道发送。',
    copyFailed: '复制失败，请手动选择提示词内容。',
    draftReady: '草稿已准备好，可以前往 GitHub，也可以复制后通过其他渠道发送。',
  });
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

  function createSubmission() {
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
    return { title, body };
  }

  function createIssueUrl(submission) {
    const url = new URL('https://github.com/sandbaseai/lab-prompt-gallery/issues/new');
    url.searchParams.set('title', submission.title);
    url.searchParams.set('body', submission.body);
    return url.toString();
  }

  async function copySubmission(text) {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(text);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      status.textContent = t('copiedSubmission');
    } catch {
      status.textContent = t('copyFailed');
    }
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
    const submission = createSubmission();
    continueLink.href = createIssueUrl(submission);
    copyButton.dataset.submission = submission.body;
    continueLink.hidden = false;
    copyButton.hidden = false;
    status.textContent = t('draftReady');
    continueLink.focus();
  });
  copyButton.addEventListener('click', () => copySubmission(copyButton.dataset.submission || ''));
  renderLanguage();
})();
