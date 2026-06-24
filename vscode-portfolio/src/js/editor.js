import { fileContents } from './data.js';
import { renderExtDetailPage } from './extensions.js';
import { renderSettingsEditor } from './settingsEditor.js';
import Prism from 'prismjs';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-markdown.js';
import 'prismjs/components/prism-markup.js';

const extLangMap = {
  html: 'HTML',
  js: 'JavaScript',
  css: 'CSS',
  json: 'JSON',
  md: 'Markdown',
  pdf: 'PDF',
  preview: 'Preview',
  'ext-detail': 'Extension',
  env: 'ENV',
  gitignore: 'Gitignore',
};

export function renderContent(file, targetPane = null) {
  const pane = targetPane || document.getElementById('contentPane');
  // Reset any inline styles left by the editable file renderer
  pane.style.display = '';
  pane.style.flexDirection = '';
  pane.style.padding = '';
  const isMain = !targetPane;
  const statusFile = isMain ? document.getElementById('statusFile') : null;
  const statusLang = isMain ? document.getElementById('statusLang') : null;

  if (!file) {
    pane.innerHTML = renderWelcome();
    renderBreadcrumb(null, targetPane);
    if (statusFile) statusFile.textContent = 'No file open';
    if (statusLang) statusLang.textContent = '';
    return;
  }

  const lang = extLangMap[file.ext] || 'Plain Text';
  if (statusFile) statusFile.textContent = file.name;
  if (statusLang) statusLang.textContent = lang;
  renderBreadcrumb(file, targetPane);

  // User-created files — editable textarea
  if (file.id.startsWith('user-')) {
    renderEditableFile(pane, file);
    return;
  }

  // Settings editor — interactive live settings
  if (file.id === 'settings-json') {
    renderSettingsEditor(pane);
    return;
  }

  // Extension detail tab — full marketplace page
  if (file.ext === 'ext-detail') {
    renderExtDetailPage(pane);
    return;
  }

  // .env — render with easter egg warning banner
  if (file.ext === 'env') {
    const raw = fileContents[file.id] || '';
    const lines = raw.split('\n').length;
    const gutter = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join('');
    const highlighted = raw
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^(#.*)$/gm, '<span style="color:#6a9955">$1</span>')
      .replace(/^([A-Z_]+)(=)/gm, '<span style="color:#9cdcfe">$1</span>$2')
      .replace(/=(["']?)(.+)\1$/gm, (_, q, v) => `=<span style="color:#ce9178">${q}${v}${q}</span>`);
    pane.innerHTML = `
      <div style="background:#3a2a00;border-left:3px solid #e5c07b;padding:8px 14px;font-size:12px;color:#e5c07b;display:flex;align-items:center;gap:8px;flex-shrink:0;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <strong>Sensitive file</strong> — This file is listed in <code>.gitignore</code> and should <strong>never</strong> be committed to version control.
        &nbsp;<span style="opacity:.6">🥚 Easter egg found!</span>
      </div>
      <div class="code-block" style="flex:1">
        <div class="code-block__header"><span class="code-block__lang">ENV</span></div>
        <div class="code-block__body">
          <div class="code-block__gutter">${gutter}</div>
          <pre class="code-block__pre"><code>${highlighted}</code></pre>
        </div>
      </div>`;
    return;
  }

  // .gitignore — plain text with syntax coloring
  if (file.ext === 'gitignore') {
    const raw = fileContents[file.id] || '';
    const lines = raw.split('\n').length;
    const gutter = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join('');
    const highlighted = raw
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^(#.*)$/gm, '<span style="color:#6a9955">$1</span>')
      .replace(/^(!.+)$/gm, '<span style="color:#f14c4c">$1</span>');
    pane.innerHTML = `<div class="code-block">
      <div class="code-block__header"><span class="code-block__lang">GITIGNORE</span></div>
      <div class="code-block__body">
        <div class="code-block__gutter">${gutter}</div>
        <pre class="code-block__pre"><code>${highlighted}</code></pre>
      </div>
    </div>`;
    return;
  }

  // Preview tab — renders home.html as live UI (VSCode Live Preview style)
  if (file.ext === 'preview') {
    pane.innerHTML = `<div class="rendered-html preview-pane">${fileContents['home-html'] || ''}</div>`;
    return;
  }

  const content = fileContents[file.id];

  if (file.ext === 'html' && content) {
    pane.innerHTML = `<div class="rendered-html">${content}</div>`;
  } else if ((file.ext === 'json' || file.ext === 'js' || file.ext === 'css') && content) {
    pane.innerHTML = renderCode(content, file.ext);
  } else if (file.ext === 'md' && content) {
    pane.innerHTML = renderMarkdown(content);
  } else if (file.ext === 'pdf') {
    pane.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;background:var(--color-bg);">
        <div style="display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--color-border);flex-shrink:0;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f14c4c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>
          <span style="font-size:13px;color:var(--color-text-secondary);">${file.name}</span>
          <a href="/resume.pdf" download="Sushanka_Karki_CV.pdf"
             style="margin-left:auto;display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:3px;background:var(--color-accent);color:#fff;font-size:12px;text-decoration:none;font-weight:500;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </a>
        </div>
        <iframe src="/resume.pdf" style="flex:1;border:none;width:100%;background:#fff;" title="Resume PDF"></iframe>
      </div>`;
  } else {
    pane.innerHTML = `<div class="content-placeholder">
      <p style="color:var(--color-text-secondary)">No preview available for <strong>${file.name}</strong></p>
    </div>`;
  }
}

function renderBreadcrumb(file, targetPane = null) {
  const bcId = targetPane && targetPane.id === 'contentPaneRight' ? 'breadcrumbRight' : 'breadcrumb';
  const bc = document.getElementById(bcId);
  if (!bc) return;
  if (!file) { bc.innerHTML = ''; return; }
  const parts = ['Portfolio', ...(file.path ? file.path.split('/') : [file.name])];
  bc.innerHTML = parts.map((part, i) => {
    const isLast = i === parts.length - 1;
    return `<span class="breadcrumb__segment">
      ${i > 0 ? '<span class="breadcrumb__sep">›</span>' : ''}
      <span class="${isLast ? 'breadcrumb__name' : ''}">${part}</span>
    </span>`;
  }).join('');
}

function renderCode(content, ext) {
  const langMap = { json: 'json', js: 'javascript', css: 'css', html: 'markup' };
  const prismLang = langMap[ext] || 'plain';
  let highlighted;
  try {
    highlighted = Prism.highlight(content, Prism.languages[prismLang], prismLang);
  } catch {
    highlighted = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  const lineCount = content.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join('');

  return `<div class="code-block">
    <div class="code-block__header">
      <span class="code-block__lang">${ext.toUpperCase()}</span>
      <button class="code-block__copy" data-content="${encodeURIComponent(content)}" title="Copy to clipboard">Copy</button>
    </div>
    <div class="code-block__body">
      <div class="code-block__gutter">${lineNumbers}</div>
      <pre class="code-block__pre language-${prismLang}"><code>${highlighted}</code></pre>
    </div>
  </div>`;
}

function renderMarkdown(md) {
  const html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, '<ul>$&</ul>')
    .split('\n\n').map(p => p.startsWith('<') ? p : `<p>${p}</p>`).join('\n');
  return `<div class="rendered-md">${html}</div>`;
}

function renderWelcome() {
  return `<div class="welcome-screen">
    <div class="welcome-screen__logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="12" fill="#282C34"/>
        <path d="M20 30 L50 15 L80 30 L80 70 L50 85 L20 70 Z" stroke="#61AFEF" stroke-width="3" fill="none"/>
        <path d="M35 45 L50 38 L65 45 L65 58 L50 65 L35 58 Z" fill="#61AFEF" opacity="0.3"/>
      </svg>
    </div>
    <div class="welcome-screen__title">Portfolio</div>
    <div class="welcome-screen__hint">Select a file from the explorer to get started</div>
    <div class="welcome-screen__shortcuts">
      <div class="shortcut-row"><kbd>Ctrl+P</kbd> <span>Go to file</span></div>
      <div class="shortcut-row"><kbd>Ctrl+B</kbd> <span>Toggle sidebar</span></div>
      <div class="shortcut-row"><kbd>Ctrl+\`</kbd> <span>Toggle terminal</span></div>
    </div>
  </div>`;
}

// ── Editable file (user-created) ─────────────────────────────────────────────

function renderEditableFile(pane, file) {
  const content = fileContents[file.id] || '';
  const lang = extLangMap[file.ext] || file.ext?.toUpperCase() || 'TEXT';

  pane.style.display = 'flex';
  pane.style.flexDirection = 'column';
  pane.style.padding = '0';

  pane.innerHTML = `
    <div class="editable-file__header">
      <span class="code-block__lang">${lang}</span>
      <span class="editable-file__hint">Editing · changes auto-saved</span>
    </div>
    <div class="editable-file__body">
      <div class="editable-file__gutter" id="editGutter-${file.id}"></div>
      <textarea
        class="editable-file__area"
        id="editArea-${file.id}"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        placeholder="Start typing..."
      >${escHtml(content)}</textarea>
    </div>
  `;

  const area = pane.querySelector(`#editArea-${file.id}`);
  const gutter = pane.querySelector(`#editGutter-${file.id}`);

  function updateGutter() {
    const lines = area.value.split('\n').length;
    gutter.innerHTML = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join('');
    // Sync gutter scroll with textarea scroll
    gutter.scrollTop = area.scrollTop;
  }

  updateGutter();
  area.focus();

  // Sync scroll
  area.addEventListener('scroll', () => { gutter.scrollTop = area.scrollTop; });

  // Save to fileContents + update gutter on every keystroke
  area.addEventListener('input', () => {
    fileContents[file.id] = area.value;
    updateGutter();
  });

  // Tab key inserts spaces instead of focusing next element
  area.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = area.selectionStart;
      const end = area.selectionEnd;
      area.value = area.value.slice(0, start) + '  ' + area.value.slice(end);
      area.selectionStart = area.selectionEnd = start + 2;
      fileContents[file.id] = area.value;
      updateGutter();
    }
  });
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Copy button handler (delegated)
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('code-block__copy')) {
    const content = decodeURIComponent(e.target.dataset.content);
    navigator.clipboard.writeText(content).then(() => {
      e.target.textContent = 'Copied!';
      setTimeout(() => (e.target.textContent = 'Copy'), 1500);
    });
  }
});
