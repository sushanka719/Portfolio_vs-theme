// ── Theme definitions ──────────────────────────────────────────────────────
const THEMES = {
  'default-dark': {
    name: 'Default Dark+',
    vars: {
      '--color-bg-primary':       '#1E1E1E',
      '--color-bg-secondary':     '#252526',
      '--color-bg-tertiary':      '#2A2D2E',
      '--color-bg-tab-inactive':  '#2D2D2D',
      '--color-bg-tab-active':    '#1E1E1E',
      '--color-bg-titlebar':      '#3C3C3C',
      '--color-text-primary':     '#CCCCCC',
      '--color-text-secondary':   '#858585',
      '--color-border':           '#3E3E42',
      '--color-highlight':        '#37373D',
      '--color-tab-border-active':'#007ACC',
    },
    activityBg: '#333333',
    statusBg:   '#007ACC',
    tokens: {
      keyword:'#569CD6', string:'#CE9178', number:'#B5CEA8',
      fn:'#DCDCAA', type:'#4EC9B0', comment:'#6A9955',
      variable:'#9CDCFE', punctuation:'#D4D4D4',
    },
  },
  'one-dark-pro': {
    name: 'One Dark Pro',
    vars: {
      '--color-bg-primary':       '#282c34',
      '--color-bg-secondary':     '#21252b',
      '--color-bg-tertiary':      '#2c313a',
      '--color-bg-tab-inactive':  '#21252b',
      '--color-bg-tab-active':    '#282c34',
      '--color-bg-titlebar':      '#21252b',
      '--color-text-primary':     '#abb2bf',
      '--color-text-secondary':   '#636d83',
      '--color-border':           '#181a1f',
      '--color-highlight':        '#2c313a',
      '--color-tab-border-active':'#528bff',
    },
    activityBg: '#21252b',
    statusBg:   '#21252b',
    tokens: {
      keyword:'#c678dd', string:'#98c379', number:'#d19a66',
      fn:'#61afef', type:'#e5c07b', comment:'#5c6370',
      variable:'#e06c75', punctuation:'#abb2bf',
    },
  },
};

const EXTENSION = {
  id: 'one-dark-pro',
  themeId: 'one-dark-pro',
  name: 'One Dark Pro',
  publisher: 'zhuangtongfa',
  displayPublisher: 'Zhuang Tong',
  version: '3.15.10',
  description: "Atom's iconic One Dark theme, and one of the most installed themes for VS Code!",
  rating: 4.8,
  reviews: 1243,
  installs: '14,218,903',
  lastUpdated: 'Nov 12, 2024',
  category: 'Themes',
  license: 'MIT',
  tags: ['theme', 'dark', 'one dark', 'atom', 'color theme'],
  website: 'https://binaryify.github.io/OneDark-Pro',
  repo: 'https://github.com/Binaryify/OneDark-Pro',
  colors: ['#c678dd','#98c379','#61afef','#e06c75','#d19a66','#56b6c2'],
  readme: `
## One Dark Pro

One Dark Pro is based on Atom's default dark theme and is one of the most popular themes for Visual Studio Code.

### Features

- Carefully balanced syntax highlighting
- Supports a wide range of languages: JavaScript, TypeScript, Python, Go, Rust, HTML, CSS, JSON, and more
- Multiple variant options including flat and mix styles
- Italic support for keywords and comments
- Vivid and Flat variants available

### Color Palette

The theme uses a carefully crafted palette designed to reduce eye strain during long coding sessions while maintaining excellent readability.

| Token       | Color   |
|-------------|---------|
| Keywords    | #c678dd |
| Strings     | #98c379 |
| Functions   | #61afef |
| Variables   | #e06c75 |
| Numbers     | #d19a66 |
| Comments    | #5c6370 |

### Installation

Search for **One Dark Pro** in the Extensions view and click Install. Once installed, open the Command Palette and run **Preferences: Color Theme** to activate it.
  `,
  changelog: `
## v3.15.10 — Nov 12, 2024
- Fix semantic token colors for TypeScript generics
- Improve bracket pair colorization
- Update Markdown heading styles

## v3.15.9 — Oct 3, 2024
- Fix Python decorator highlighting
- Improve JSX attribute colors

## v3.15.8 — Aug 14, 2024
- Add support for Astro language
- Fix Rust lifetime annotation colors

## v3.15.0 — Mar 22, 2024
- Major overhaul of semantic token support
- New "Mix" variant added
- Improved contrast ratios for accessibility
  `,
};

const INSTALLED_KEY   = 'portfolio-installed-extensions';
const ACTIVE_THEME_KEY = 'portfolio-active-theme';

function getInstalled()    { try { return JSON.parse(localStorage.getItem(INSTALLED_KEY) || '[]'); } catch { return []; } }
function setInstalled(arr) { localStorage.setItem(INSTALLED_KEY, JSON.stringify(arr)); }
function isInstalled(id)   { return getInstalled().includes(id); }
function getActiveTheme()  { return localStorage.getItem(ACTIVE_THEME_KEY) || 'default-dark'; }
function setActiveTheme(id){ localStorage.setItem(ACTIVE_THEME_KEY, id); }

// ── Theme application ──────────────────────────────────────────────────────
export function applyStoredTheme() { applyTheme(getActiveTheme()); }

export function applyTheme(themeId) {
  const theme = THEMES[themeId];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  const ab = document.querySelector('.activity-bar');
  if (ab) ab.style.backgroundColor = theme.activityBg;
  const sb = document.querySelector('.statusbar');
  if (sb) sb.style.backgroundColor = theme.statusBg;

  let tag = document.getElementById('theme-tokens');
  if (!tag) { tag = document.createElement('style'); tag.id = 'theme-tokens'; document.head.appendChild(tag); }
  const t = theme.tokens;
  tag.textContent = `
    .token.keyword,.token.important{color:${t.keyword}!important}
    .token.string,.token.char,.token.attr-value,.token.atrule{color:${t.string}!important}
    .token.number,.token.boolean{color:${t.number}!important}
    .token.function{color:${t.fn}!important}
    .token.class-name,.token.type{color:${t.type}!important}
    .token.comment,.token.prolog,.token.doctype{color:${t.comment}!important;font-style:italic}
    .token.variable,.token.regex,.token.property,.token.tag{color:${t.variable}!important}
    .token.punctuation,.token.operator{color:${t.punctuation}!important}
    code[class*="language-"],pre[class*="language-"]{color:${t.punctuation}!important}
  `;
  setActiveTheme(themeId);
  document.body.dataset.theme = themeId;

  // Refresh extension tab if open
  refreshExtTab();
}

// ── Init ───────────────────────────────────────────────────────────────────
export function initExtensions() {
  applyStoredTheme();
  renderSidebarList();
}

// ── Sidebar list (compact) ─────────────────────────────────────────────────
function renderSidebarList() {
  const panel = document.getElementById('panel-extensions');
  if (!panel) return;
  const installed = isInstalled(EXTENSION.id);
  const active    = getActiveTheme() === EXTENSION.themeId;

  panel.innerHTML = `
    <div class="ext-panel">
      <div class="sidebar__section-label">Extensions</div>
      <div class="ext-search-row">
        <input class="ext-search" type="text" placeholder="Search extensions in Marketplace" readonly />
      </div>
      <div class="ext-section-label">INSTALLED (${installed ? 1 : 0})</div>
      ${installed ? sidebarCard(true, active) : '<div class="ext-empty">No extensions installed</div>'}
      <div class="ext-section-label" style="margin-top:8px">POPULAR</div>
      ${!installed ? sidebarCard(false, false) : '<div class="ext-empty" style="font-size:11px">One Dark Pro · installed</div>'}
    </div>`;

  panel.querySelector('.ext-card')?.addEventListener('click', openExtTab);

  panel.querySelector('[data-action="install"]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    doInstall(() => renderSidebarList());
  });
  panel.querySelector('[data-action="uninstall"]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    doUninstall(() => renderSidebarList());
  });
  panel.querySelector('[data-action="set-theme"]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    doSetTheme(() => renderSidebarList());
  });
}

function sidebarCard(installed, active) {
  return `
  <div class="ext-card" role="button" tabindex="0" title="Click to open details">
    <div class="ext-card__icon">
      <span style="font-size:16px;color:#c678dd;font-weight:700;font-family:serif">O</span>
    </div>
    <div class="ext-card__body">
      <div class="ext-card__title-row">
        <span class="ext-card__name">${EXTENSION.name}</span>
        ${installed ? `<span class="ext-card__gear" title="${active ? 'Active' : 'Installed'}">${active ? '✓' : ''}</span>` : ''}
      </div>
      <div class="ext-card__desc-row">
        <span class="ext-card__desc">${EXTENSION.description}</span>
        <div onclick="event.stopPropagation()">
          ${installed
            ? `<button class="ext-card__action-btn ext-card__action-btn--installed" data-action="set-theme">${active ? 'Active' : 'Apply'}</button>`
            : `<button class="ext-card__action-btn" data-action="install">Install</button>`}
        </div>
      </div>
      <div class="ext-card__meta">
        <span class="ext-card__publisher-line">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="#3794ff" style="margin-right:2px;flex-shrink:0"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 6.5l-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L7 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06z"/></svg>
          ${EXTENSION.displayPublisher}
        </span>
        <span class="ext-card__sep">·</span>
        <span class="ext-card__stars-sm">★ ${EXTENSION.rating}</span>
        <span class="ext-card__sep">·</span>
        <span class="ext-card__downloads">14M</span>
      </div>
    </div>
  </div>`;
}

// ── Editor tab detail page ─────────────────────────────────────────────────
const EXT_TAB_ID = 'ext-one-dark-pro';

function openExtTab() {
  import('./tabs.js').then(({ openTab }) => {
    openTab({
      id:   EXT_TAB_ID,
      name: `${EXTENSION.name}`,
      ext:  'ext-detail',
      path: '',
      _extId: EXTENSION.id,
    });
  });
}

// Called by editor.js renderContent when ext === 'ext-detail'
export function renderExtDetailPage(pane) {
  const installed = isInstalled(EXTENSION.id);
  const active    = getActiveTheme() === EXTENSION.themeId;

  pane.innerHTML = buildDetailPage(installed, active);
  wireDetailPage(pane);
}

function buildDetailPage(installed, active) {
  return `
  <div class="extpage">
    <!-- Header -->
    <div class="extpage__header">
      <div class="extpage__icon">
        <span style="font-size:52px;color:#c678dd;font-weight:700;font-family:serif;line-height:1">O</span>
      </div>
      <div class="extpage__hero">
        <h1 class="extpage__name">${EXTENSION.name}</h1>
        <div class="extpage__publisher">
          <span class="extpage__publisher-name">${EXTENSION.displayPublisher}</span>
          <span class="extpage__sep">·</span>
          <a class="extpage__link" href="${EXTENSION.repo}" target="_blank" rel="noopener">Repository</a>
          <span class="extpage__sep">·</span>
          <a class="extpage__link" href="${EXTENSION.website}" target="_blank" rel="noopener">Website</a>
          <span class="extpage__sep">·</span>
          <span>${EXTENSION.license} license</span>
        </div>
        <p class="extpage__tagline">${EXTENSION.description}</p>

        <div class="extpage__stats">
          <div class="extpage__stat">
            <span class="extpage__stat-val">${starBar(EXTENSION.rating)}</span>
            <span class="extpage__stat-label">${EXTENSION.rating} (${EXTENSION.reviews.toLocaleString()})</span>
          </div>
          <div class="extpage__stat-divider"></div>
          <div class="extpage__stat">
            <span class="extpage__stat-val">⬇</span>
            <span class="extpage__stat-label">${Number(EXTENSION.installs.replace(/,/g,'')).toLocaleString()} installs</span>
          </div>
          <div class="extpage__stat-divider"></div>
          <div class="extpage__stat">
            <span class="extpage__stat-val">v${EXTENSION.version}</span>
            <span class="extpage__stat-label">Updated ${EXTENSION.lastUpdated}</span>
          </div>
          <div class="extpage__stat-divider"></div>
          <div class="extpage__stat">
            <span class="extpage__stat-val">${EXTENSION.category}</span>
            <span class="extpage__stat-label">Category</span>
          </div>
        </div>

        <div class="extpage__actions">
          ${installed
            ? `<button class="extpage-btn extpage-btn--uninstall" id="epUninstall">Uninstall</button>
               <button class="extpage-btn ${active ? 'extpage-btn--active' : 'extpage-btn--primary'}" id="epToggle">
                 ${active ? '✓ Active Theme' : 'Set Color Theme'}
               </button>`
            : `<button class="extpage-btn extpage-btn--primary" id="epInstall">
                 <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="margin-right:5px"><path d="M8 12l-4.5-4.5.7-.7L7.5 11V2h1v9l3.3-4.2.7.7L8 12zm-6 2h12v1H2v-1z"/></svg>
                 Install
               </button>`}
          <a class="extpage-btn extpage-btn--ghost" href="${EXTENSION.website}" target="_blank" rel="noopener">Website ↗</a>
        </div>

        <!-- Color swatches -->
        <div class="extpage__swatches">
          ${EXTENSION.colors.map(c => `
            <span class="extpage__swatch" style="background:${c}" title="${c}"></span>
          `).join('')}
          <span class="extpage__swatch-label">Color palette</span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="extpage__tabbar">
      <button class="extpage__tab is-active" data-tab="details">Details</button>
      <button class="extpage__tab" data-tab="changelog">Changelog</button>
    </div>

    <!-- Tab content -->
    <div class="extpage__body">
      <div class="extpage__tab-content is-active" id="ep-details">
        ${renderReadme(EXTENSION.readme)}
        <div class="extpage__info-grid">
          <div class="extpage__info-card">
            <div class="extpage__info-label">Publisher</div>
            <div class="extpage__info-val">${EXTENSION.displayPublisher}</div>
          </div>
          <div class="extpage__info-card">
            <div class="extpage__info-label">Version</div>
            <div class="extpage__info-val">${EXTENSION.version}</div>
          </div>
          <div class="extpage__info-card">
            <div class="extpage__info-label">Last Updated</div>
            <div class="extpage__info-val">${EXTENSION.lastUpdated}</div>
          </div>
          <div class="extpage__info-card">
            <div class="extpage__info-label">License</div>
            <div class="extpage__info-val">${EXTENSION.license}</div>
          </div>
          <div class="extpage__info-card">
            <div class="extpage__info-label">Category</div>
            <div class="extpage__info-val">${EXTENSION.category}</div>
          </div>
          <div class="extpage__info-card">
            <div class="extpage__info-label">Installs</div>
            <div class="extpage__info-val">${EXTENSION.installs}</div>
          </div>
        </div>
        <div class="extpage__tags">
          ${EXTENSION.tags.map(t => `<span class="ext-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="extpage__tab-content" id="ep-changelog">
        ${renderChangelog(EXTENSION.changelog)}
      </div>
    </div>
  </div>`;
}

function wireDetailPage(pane) {
  // Tab switching
  pane.querySelectorAll('.extpage__tab').forEach(btn => {
    btn.addEventListener('click', () => {
      pane.querySelectorAll('.extpage__tab').forEach(b => b.classList.remove('is-active'));
      pane.querySelectorAll('.extpage__tab-content').forEach(c => c.classList.remove('is-active'));
      btn.classList.add('is-active');
      pane.querySelector(`#ep-${btn.dataset.tab}`)?.classList.add('is-active');
    });
  });

  pane.querySelector('#epInstall')?.addEventListener('click', () => {
    const btn = pane.querySelector('#epInstall');
    btn.textContent = 'Installing…';
    btn.disabled = true;
    setTimeout(() => {
      const list = getInstalled(); list.push(EXTENSION.id); setInstalled(list);
      applyTheme(EXTENSION.themeId);
      showNotification(`✓ '${EXTENSION.name}' installed and applied`);
      renderSidebarList();
      pane.innerHTML = buildDetailPage(true, true);
      wireDetailPage(pane);
    }, 1200);
  });

  pane.querySelector('#epUninstall')?.addEventListener('click', () => {
    doUninstall(() => {
      renderSidebarList();
      pane.innerHTML = buildDetailPage(false, false);
      wireDetailPage(pane);
    });
  });

  pane.querySelector('#epToggle')?.addEventListener('click', () => {
    doSetTheme(() => {
      renderSidebarList();
      const nowActive = getActiveTheme() === EXTENSION.themeId;
      pane.innerHTML = buildDetailPage(true, nowActive);
      wireDetailPage(pane);
    });
  });
}

function refreshExtTab() {
  const pane = document.getElementById('contentPane');
  if (!pane) return;
  // Only refresh if the ext detail tab is currently active
  if (document.querySelector('.tab.is-active[data-id="ext-one-dark-pro"]')) {
    const installed = isInstalled(EXTENSION.id);
    const active    = getActiveTheme() === EXTENSION.themeId;
    pane.innerHTML  = buildDetailPage(installed, active);
    wireDetailPage(pane);
  }
}

// ── Shared actions ─────────────────────────────────────────────────────────
function doInstall(cb) {
  const list = getInstalled(); list.push(EXTENSION.id); setInstalled(list);
  applyTheme(EXTENSION.themeId);
  showNotification(`✓ '${EXTENSION.name}' installed and applied`);
  cb();
}

function doUninstall(cb) {
  setInstalled(getInstalled().filter(id => id !== EXTENSION.id));
  if (getActiveTheme() === EXTENSION.themeId) applyTheme('default-dark');
  showNotification(`'${EXTENSION.name}' uninstalled`);
  cb();
}

function doSetTheme(cb) {
  const nowActive = getActiveTheme() === EXTENSION.themeId;
  applyTheme(nowActive ? 'default-dark' : EXTENSION.themeId);
  showNotification(nowActive ? 'Theme set to Default Dark+' : `✓ Theme set to '${EXTENSION.name}'`);
  cb();
}

// ── Helpers ────────────────────────────────────────────────────────────────
function starBar(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '<span style="color:#e5c07b">' + '★'.repeat(full) + (half ? '½' : '') + '<span style="opacity:.3">' + '★'.repeat(5 - full - half) + '</span></span>';
}

function renderReadme(md) {
  return `<div class="extpage__readme">${
    md.trim()
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code class="ext-inline-code">$1</code>')
      .replace(/^\| (.+) \|$/gm, (_, row) =>
        '<tr>' + row.split(' | ').map(c => `<td>${c}</td>`).join('') + '</tr>')
      .replace(/(<tr>.*<\/tr>\n?)+/gs, m => `<table class="ext-table">${m}</table>`)
      .replace(/\|[-| ]+\|/g, '')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/gs, '<ul>$&</ul>')
      .split('\n\n').map(p => p.startsWith('<') ? p : p.trim() ? `<p>${p}</p>` : '').join('\n')
  }</div>`;
}

function renderChangelog(md) {
  return `<div class="extpage__readme">${
    md.trim()
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/gs, '<ul>$&</ul>')
      .split('\n\n').map(p => p.startsWith('<') ? p : p.trim() ? `<p>${p}</p>` : '').join('\n')
  }</div>`;
}

function showNotification(msg) {
  const old = document.getElementById('ext-notification');
  if (old) old.remove();
  const el = document.createElement('div');
  el.id = 'ext-notification';
  el.className = 'ext-notification';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-visible'));
  setTimeout(() => { el.classList.remove('is-visible'); setTimeout(() => el.remove(), 300); }, 3000);
}
