import { fileContents } from './data.js';
import { renderExtDetailPage } from './extensions.js';
import { renderSettingsEditor } from './settingsEditor.js';
import Prism from 'prismjs';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-markdown.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/components/prism-css.js';

const extLangMap = {
  html: 'HTML',
  js: 'JavaScript',
  jsx: 'JSX',
  css: 'CSS',
  json: 'JSON',
  md: 'Markdown',
  svg: 'SVG',
  txt: 'Text',
  png: 'Image',
  pdf: 'PDF',
  preview: 'Preview',
  admin: 'Admin',
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

  // Admin panel — contact messages
  if (file.ext === 'admin') {
    renderAdminPanel(pane);
    return;
  }

  // Preview tab — full portfolio (VSCode Live Preview style)
  if (file.ext === 'preview') {
    pane.innerHTML = buildFullPreview();
    wirePreviewContactForm(pane);
    return;
  }

  const content = fileContents[file.id];

  if (file.ext === 'html' && content) {
    pane.innerHTML = `
      <div class="source-view-hint">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Source code — type <strong>npm run dev</strong> in the terminal and press Enter to preview the UI.
      </div>
      ${renderCode(content, 'html')}`;
    return;
  } else if ((file.ext === 'json' || file.ext === 'js' || file.ext === 'jsx' || file.ext === 'css' || file.ext === 'svg') && content) {
    pane.innerHTML = renderCode(content, file.ext === 'svg' ? 'html' : file.ext);
  } else if ((file.ext === 'txt' || file.ext === 'png') && content) {
    pane.innerHTML = renderPlainText(content, file.name);
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
  const langMap = { json: 'json', js: 'javascript', jsx: 'jsx', css: 'css', html: 'markup' };
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

function renderPlainText(content, name) {
  const lines = content.split('\n').length;
  const gutter = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join('');
  const escaped = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const ext = name.split('.').pop().toUpperCase();
  return `<div class="code-block">
    <div class="code-block__header"><span class="code-block__lang">${ext}</span></div>
    <div class="code-block__body">
      <div class="code-block__gutter">${gutter}</div>
      <pre class="code-block__pre"><code>${escaped}</code></pre>
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

// ── Full portfolio preview (triggered by npm run dev) ─────────────────────────

function buildFullPreview() {
  const SKILLS = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express.js',
    'NestJS', 'Prisma', 'PostgreSQL', 'MongoDB', 'Redis', 'Socket.IO',
    'Docker', 'JWT / OAuth', 'Stripe', 'REST APIs',
  ];

  const PROJECTS = [
    {
      title: 'E-Commerce Platform',
      desc: 'Full-stack eCommerce with JWT auth, Stripe payments, admin panel, cart, and real-time order tracking.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT'],
      link: 'https://github.com/sushanka719',
    },
    {
      title: 'Dating App',
      desc: 'Smart matching app with proximity-based algorithm, swipe mechanic, and real-time 1-on-1 chat via Socket.IO.',
      stack: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'JWT'],
      link: 'https://github.com/sushanka719',
    },
    {
      title: 'Teen Patti Game',
      desc: 'Real-time multiplayer card game — NestJS backend APIs and game logic, React + TypeScript frontend.',
      stack: ['NestJS', 'React', 'TypeScript', 'Tailwind CSS', 'Socket.IO'],
      link: 'https://github.com/sushanka719',
    },
  ];

  const TIMELINE = [
    {
      period: 'Dec 2025 – Present', role: 'Full-Stack Developer',
      company: 'CSTC Pvt. Ltd', type: 'On-site',
      highlights: ['ERP system maintenance (HTML/CSS/JS)', 'Legacy app migration to .NET MVC', 'SSMS & MySQL database operations', 'Agile team collaboration'],
    },
    {
      period: 'Mar 2025 – Dec 2025', role: 'Full-Stack Developer',
      company: 'Phoenix-Doorje', type: 'On-site',
      highlights: ['Doorje.com frontend with Next.js', 'PanditJi App — PostgreSQL, Prisma, Next.js', 'Agile professional dev workflow'],
    },
    {
      period: 'Jan 2025 – Feb 2025', role: 'Freelance Backend Developer',
      company: 'Teen Patti Game', type: 'Remote',
      highlights: ['NestJS APIs & card game logic', 'React + TypeScript frontend', 'Socket.IO real-time multiplayer'],
    },
  ];

  const heroHTML = `
    <div style="display:flex;flex-direction:column;justify-content:center;padding:40px 0 40px;">
      <p style="color:#58a6ff;font-size:16px;margin-bottom:10px;">Hi, I'm</p>
      <h1 style="font-size:clamp(40px,8vw,72px);font-weight:800;line-height:1.1;margin-bottom:10px;color:#e6edf3;">Sushanka Karki</h1>
      <h2 style="font-size:clamp(20px,4vw,32px);color:#8b949e;font-weight:400;margin-bottom:14px;">Full Stack Developer</h2>
      <p style="color:#8b949e;font-size:14px;margin-bottom:28px;">📍 Kausaltar, Bhaktapur, Nepal</p>
      <p style="max-width:540px;color:#8b949e;font-size:16px;line-height:1.75;margin-bottom:36px;">
        Motivated full-stack developer with hands-on experience building real-world web applications —
        from ERP systems and e-commerce platforms to real-time multiplayer games.
        I write clean, scalable code and ship things that work.
      </p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="https://github.com/sushanka719" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#58a6ff;color:#0d1117;border-radius:6px;font-size:13px;font-weight:700;text-decoration:none;">
          GitHub
        </a>
        <a href="https://linkedin.com/in/sushanka-karki-73b50522b/" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;padding:10px 20px;border:1px solid #58a6ff;color:#58a6ff;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;">
          LinkedIn
        </a>
        <a href="#pv-contact"
           style="display:inline-flex;align-items:center;padding:10px 20px;border:1px solid #30363d;color:#e6edf3;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;">
          Hire Me
        </a>
      </div>
    </div>`;

  const aboutHTML = `
    <h2 class="pv-h2">About Me</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;">
      <div style="display:flex;flex-direction:column;gap:16px;color:#8b949e;font-size:15px;line-height:1.7;">
        <p>I'm <strong style="color:#e6edf3;">Sushanka Karki</strong>, a full-stack developer based in
        Kausaltar, Bhaktapur with a strong foundation in both frontend and backend development.</p>
        <p>Currently working at <strong style="color:#58a6ff;">CSTC Pvt. Ltd</strong> maintaining and
        enhancing ERP systems and upgrading legacy apps to modern .NET MVC. Previously at
        <strong style="color:#58a6ff;">Phoenix-Doorje</strong> contributing to Doorje.com and the PanditJi App.</p>
        <p>I enjoy building everything from real-time multiplayer games to full-stack e-commerce platforms.
        I work best with React, Node.js, and Next.js — always picking up new tools.</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;">
        ${SKILLS.map(s => `<span style="background:#21262d;border:1px solid #30363d;color:#58a6ff;padding:4px 12px;border-radius:20px;font-size:12px;">${s}</span>`).join('')}
      </div>
    </div>`;

  const projectsHTML = PROJECTS.map(p => `
    <div class="pv-card">
      <h3 class="pv-card__title">${p.title}</h3>
      <p class="pv-card__desc">${p.desc}</p>
      <div class="pv-card__stack">${p.stack.map(t => `<span class="pv-tech">${t}</span>`).join('')}</div>
      <a href="${p.link}" target="_blank" rel="noopener" class="pv-card__link">View on GitHub →</a>
    </div>`).join('');

  const timelineHTML = TIMELINE.map((j, i) => `
    <div class="pv-tl">
      <div class="pv-tl__track">
        <div class="pv-tl__dot"></div>
        ${i < TIMELINE.length - 1 ? '<div class="pv-tl__line"></div>' : ''}
      </div>
      <div class="pv-tl__body">
        <div class="pv-tl__hd">
          <h3 class="pv-tl__role">${j.role}</h3>
          <span class="pv-tl__badge">${j.type}</span>
        </div>
        <p class="pv-tl__co">${j.company}</p>
        <p class="pv-tl__period">${j.period}</p>
        <ul class="pv-tl__list">${j.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
      </div>
    </div>`).join('');

  const contactHTML = `
    <h2 class="pv-h2">Get In Touch</h2>
    <p style="color:#8b949e;margin-bottom:36px;max-width:500px;">
      I'm open to new opportunities — freelance, full-time, or collaboration.
      Drop me a message and I'll get back to you.
    </p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;">
      <form id="pvContactForm" style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;flex-direction:column;gap:5px;">
          <label style="font-size:12px;color:#8b949e;">Name</label>
          <input name="name" placeholder="Your name" required
            style="background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:9px 12px;border-radius:5px;font-size:13px;font-family:inherit;outline:none;" />
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <label style="font-size:12px;color:#8b949e;">Email</label>
          <input name="email" type="email" placeholder="you@example.com" required
            style="background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:9px 12px;border-radius:5px;font-size:13px;font-family:inherit;outline:none;" />
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <label style="font-size:12px;color:#8b949e;">Subject</label>
          <input name="subject" placeholder="What's this about?"
            style="background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:9px 12px;border-radius:5px;font-size:13px;font-family:inherit;outline:none;" />
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <label style="font-size:12px;color:#8b949e;">Message</label>
          <textarea name="message" rows="5" placeholder="Your message..." required
            style="background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:9px 12px;border-radius:5px;font-size:13px;font-family:inherit;outline:none;resize:vertical;"></textarea>
        </div>
        <button type="submit" id="pvContactBtn"
          style="background:#58a6ff;color:#0d1117;border:none;padding:10px 20px;border-radius:5px;font-size:13px;font-weight:700;cursor:pointer;">
          Send Message
        </button>
        <p id="pvContactStatus" style="font-size:13px;color:#3fb950;display:none;">
          ✓ Message sent! I'll get back to you soon.
        </p>
      </form>
      <div style="padding-top:8px;display:flex;flex-direction:column;gap:18px;">
        <p style="font-size:12px;color:#8b949e;">// or reach me directly</p>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <a href="mailto:karkisushanka719@gmail.com" style="color:#8b949e;font-size:13px;text-decoration:none;">✉ karkisushanka719@gmail.com</a>
          <a href="tel:+9779844396037" style="color:#8b949e;font-size:13px;text-decoration:none;">📞 (984) 439-6037</a>
          <a href="https://github.com/sushanka719" target="_blank" style="color:#8b949e;font-size:13px;text-decoration:none;">⌥ github.com/sushanka719</a>
          <a href="https://linkedin.com/in/sushanka-karki-73b50522b/" target="_blank" style="color:#8b949e;font-size:13px;text-decoration:none;">in linkedin.com/in/sushanka-karki-73b50522b</a>
        </div>
        <div style="display:flex;align-items:center;gap:8px;color:#3fb950;font-size:13px;">
          <span style="width:8px;height:8px;border-radius:50%;background:#3fb950;animation:pvPulse 2s infinite;flex-shrink:0;"></span>
          Available for new projects
        </div>
      </div>
    </div>
    <style>@keyframes pvPulse{0%,100%{opacity:1}50%{opacity:.4}}</style>`;

  return `
    <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <!-- Browser chrome -->
      <div style="display:flex;align-items:center;gap:10px;padding:7px 14px;background:#1e1e1e;border-bottom:1px solid #3c3c3c;flex-shrink:0;">
        <div style="display:flex;gap:6px;align-items:center;">
          <span style="width:11px;height:11px;border-radius:50%;background:#ff5f57;display:block;"></span>
          <span style="width:11px;height:11px;border-radius:50%;background:#febc2e;display:block;"></span>
          <span style="width:11px;height:11px;border-radius:50%;background:#28c840;display:block;"></span>
        </div>
        <div style="flex:1;background:#3c3c3c;border-radius:4px;padding:3px 10px;font-size:11px;color:#ccc;display:flex;align-items:center;gap:6px;max-width:360px;margin:0 auto;">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3fb950" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          localhost:5173
        </div>
        <span style="font-size:11px;color:#3fb950;white-space:nowrap;">● Live</span>
      </div>
      <!-- Portfolio viewport -->
      <div style="flex:1;overflow-y:auto;background:#0d1117;color:#e6edf3;line-height:1.6;">
        <style>
          .pv-nav{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:12px 5%;background:rgba(13,17,23,.92);backdrop-filter:blur(12px);border-bottom:1px solid #30363d;}
          .pv-logo{font-weight:800;font-size:17px;color:#58a6ff;text-decoration:none;}
          .pv-navlinks{display:flex;gap:22px;list-style:none;margin:0;padding:0;}
          .pv-navlinks a{color:#8b949e;font-size:13px;font-weight:500;text-decoration:none;}
          .pv-navlinks a:hover{color:#e6edf3;}
          .pv-navlinks .pv-cta{color:#58a6ff;border:1px solid #58a6ff;border-radius:5px;padding:4px 13px;}
          .pv-sec{padding:60px 5% 40px;max-width:960px;margin:0 auto;}
          #pv-home.pv-sec{padding-top:32px;padding-bottom:32px;}
          .pv-h2{font-size:24px;font-weight:700;margin-bottom:32px;color:#e6edf3;}
          .pv-h2::before{content:'// ';color:#8b949e;font-weight:400;}
          .pv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:18px;}
          .pv-card{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:20px;display:flex;flex-direction:column;gap:10px;transition:border-color .18s;}
          .pv-card:hover{border-color:#58a6ff;}
          .pv-card__title{font-size:15px;font-weight:700;color:#e6edf3;}
          .pv-card__desc{color:#8b949e;font-size:13px;flex:1;line-height:1.55;}
          .pv-card__stack{display:flex;flex-wrap:wrap;gap:5px;}
          .pv-tech{background:#21262d;color:#bc8cff;padding:2px 8px;border-radius:12px;font-size:11px;}
          .pv-card__link{color:#58a6ff;font-size:12px;font-weight:600;margin-top:2px;text-decoration:none;}
          .pv-tl{display:grid;grid-template-columns:22px 1fr;gap:16px;}
          .pv-tl__track{display:flex;flex-direction:column;align-items:center;}
          .pv-tl__dot{width:10px;height:10px;border-radius:50%;background:#58a6ff;flex-shrink:0;margin-top:5px;}
          .pv-tl__line{flex:1;width:2px;background:#30363d;margin:5px 0;}
          .pv-tl__body{padding-bottom:32px;}
          .pv-tl__hd{display:flex;align-items:center;gap:8px;margin-bottom:3px;}
          .pv-tl__role{font-size:15px;font-weight:700;color:#e6edf3;}
          .pv-tl__badge{background:#21262d;border:1px solid #30363d;color:#8b949e;padding:2px 8px;border-radius:12px;font-size:11px;}
          .pv-tl__co{color:#58a6ff;font-weight:600;font-size:13px;margin-bottom:2px;}
          .pv-tl__period{color:#8b949e;font-size:12px;margin-bottom:8px;}
          .pv-tl__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px;}
          .pv-tl__list li{color:#8b949e;font-size:13px;padding-left:14px;position:relative;}
          .pv-tl__list li::before{content:'▸';position:absolute;left:0;color:#58a6ff;}
          .pv-footer{text-align:center;padding:36px 5%;color:#8b949e;font-size:12px;border-top:1px solid #30363d;}
        </style>

        <nav class="pv-nav">
          <a href="#pv-home" class="pv-logo">SK</a>
          <ul class="pv-navlinks">
            <li><a href="#pv-about">About</a></li>
            <li><a href="#pv-projects">Projects</a></li>
            <li><a href="#pv-exp">Experience</a></li>
            <li><a href="#pv-contact">Contact</a></li>
            <li><a href="https://github.com/sushanka719" target="_blank" class="pv-cta">GitHub</a></li>
          </ul>
        </nav>

        <div class="pv-sec" id="pv-home">${heroHTML}</div>
        <div class="pv-sec" id="pv-about">${aboutHTML}</div>
        <div class="pv-sec" id="pv-projects"><h2 class="pv-h2">Projects</h2><div class="pv-grid">${projectsHTML}</div></div>
        <div class="pv-sec" id="pv-exp"><h2 class="pv-h2">Experience</h2>${timelineHTML}</div>
        <div class="pv-sec" id="pv-contact">${contactHTML}</div>

        <footer class="pv-footer">
          Built by <strong style="color:#58a6ff">Sushanka Karki</strong> &nbsp;·&nbsp; React + Vite &nbsp;·&nbsp; Deployed on Vercel
        </footer>
      </div>
    </div>`;
}

function wirePreviewContactForm(pane) {
  const form = pane.querySelector('#pvContactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn    = pane.querySelector('#pvContactBtn');
    const status = pane.querySelector('#pvContactStatus');
    const data   = Object.fromEntries(new FormData(form));

    // Save to localStorage
    const msgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    msgs.unshift({ ...data, ts: new Date().toISOString() });
    localStorage.setItem('portfolio_messages', JSON.stringify(msgs));
    updateAdminBadge();

    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
    setTimeout(() => {
      if (status) status.style.display = 'block';
      if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
      form.reset();
    }, 1200);
  });
}

export function updateAdminBadge() {
  const msgs  = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
  const badge = document.getElementById('adminMsgBadge');
  if (!badge) return;
  if (msgs.length > 0) {
    badge.textContent = msgs.length;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

export function renderAdminPanel(pane) {
  const msgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');

  const rows = msgs.length
    ? msgs.map((m, i) => {
        const date = new Date(m.ts).toLocaleString();
        return `
          <div class="admin-msg" data-idx="${i}">
            <div class="admin-msg__header">
              <span class="admin-msg__name">${escHtml(m.name || '—')}</span>
              <span class="admin-msg__email">${escHtml(m.email || '')}</span>
              <span class="admin-msg__date">${date}</span>
              <button class="admin-msg__del" data-idx="${i}" title="Delete">✕</button>
            </div>
            ${m.subject ? `<p class="admin-msg__subject">${escHtml(m.subject)}</p>` : ''}
            <p class="admin-msg__body">${escHtml(m.message || '')}</p>
          </div>`;
      }).join('')
    : `<div class="admin-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:.3"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <p>No messages yet.</p>
        <p style="font-size:12px;opacity:.6;">Submit the contact form in the preview to see messages here.</p>
      </div>`;

  pane.innerHTML = `
    <style>
      .admin-wrap{padding:24px;display:flex;flex-direction:column;gap:0;height:100%;box-sizing:border-box;overflow-y:auto;}
      .admin-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-shrink:0;}
      .admin-title{font-size:16px;font-weight:700;color:var(--color-text-primary);}
      .admin-title span{color:var(--color-accent);font-size:12px;font-weight:400;margin-left:8px;}
      .admin-clear{background:transparent;border:1px solid var(--color-border);color:var(--color-text-secondary);padding:4px 10px;border-radius:4px;font-size:11px;cursor:pointer;font-family:inherit;}
      .admin-clear:hover{border-color:#f85149;color:#f85149;}
      .admin-msg{background:var(--color-surface);border:1px solid var(--color-border);border-radius:6px;padding:14px 16px;margin-bottom:10px;}
      .admin-msg__header{display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap;}
      .admin-msg__name{font-weight:700;font-size:13px;color:var(--color-text-primary);}
      .admin-msg__email{color:var(--color-accent);font-size:12px;}
      .admin-msg__date{color:var(--color-text-secondary);font-size:11px;margin-left:auto;}
      .admin-msg__del{background:none;border:none;color:var(--color-text-secondary);cursor:pointer;font-size:12px;padding:2px 6px;border-radius:3px;line-height:1;}
      .admin-msg__del:hover{background:#f8514922;color:#f85149;}
      .admin-msg__subject{font-size:12px;font-weight:600;color:var(--color-text-primary);margin-bottom:6px;}
      .admin-msg__body{font-size:13px;color:var(--color-text-secondary);line-height:1.6;white-space:pre-wrap;}
      .admin-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;flex:1;color:var(--color-text-secondary);text-align:center;padding:60px 0;}
    </style>
    <div class="admin-wrap">
      <div class="admin-header">
        <div class="admin-title">
          Contact Messages
          <span>${msgs.length} message${msgs.length !== 1 ? 's' : ''}</span>
        </div>
        ${msgs.length ? '<button class="admin-clear" id="adminClearAll">Clear all</button>' : ''}
      </div>
      <div id="adminMsgList">${rows}</div>
    </div>`;

  // Delete individual message
  pane.querySelectorAll('.admin-msg__del').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx  = parseInt(btn.dataset.idx);
      const msgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      msgs.splice(idx, 1);
      localStorage.setItem('portfolio_messages', JSON.stringify(msgs));
      updateAdminBadge();
      renderAdminPanel(pane);
    });
  });

  // Clear all
  pane.querySelector('#adminClearAll')?.addEventListener('click', () => {
    localStorage.removeItem('portfolio_messages');
    updateAdminBadge();
    renderAdminPanel(pane);
  });
}
