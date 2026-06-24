import './styles/main.css';
import { fileStructure, fileContents } from './js/data.js';
import { initFileExplorer, selectFile } from './js/fileExplorer.js';
import { initTabs, openTab, getActiveTab, closeTab } from './js/tabs.js';
import { renderContent } from './js/editor.js';
import { initCommandPalette } from './js/commandPalette.js';
import { initTerminal, setRunProjectHandler } from './js/terminal.js';
import { initMenubar } from './js/menubar.js';
import { initActivityBar } from './js/activityBar.js';
import { initMinimap } from './js/minimap.js';
import { initExtensions, applyStoredTheme } from './js/extensions.js';
import { applySettings, getSettings } from './js/settingsEditor.js';
import { toggleSplit, isSplitActive, getActivePane, openInRight, initSplitFocusHandlers } from './js/splitEditor.js';

function findFile(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findFile(child, id);
      if (found) return found;
    }
  }
  return null;
}

// Show raw HTML source of home.html as the initial "code" view
function showCodeView() {
  const homeFile = findFile(fileStructure, 'home-html');
  if (!homeFile) return;

  // Add tab but render as source code, not rendered HTML
  openTab(homeFile);
  selectFile(homeFile.id);

  const pane = document.getElementById('contentPane');
  const rawHtml = fileContents['home-html'] || '';

  // Use the editor's renderContent but override with source view
  import('./js/editor.js').then(({ renderSourceView }) => {
    if (renderSourceView) {
      renderSourceView(homeFile, rawHtml);
    }
  });
}

function init() {
  document.getElementById('openEditors').style.display = 'none';

  // Tab system
  initTabs((activeFile) => {
    renderContent(activeFile);
    if (activeFile) selectFile(activeFile.id);
  });

  // File explorer — routes to active pane
  initFileExplorer(fileStructure, (file) => {
    if (isSplitActive() && getActivePane() === 'right') {
      openInRight(file);
    } else {
      openTab(file);
    }
    updateTerminalDir(file.path);
  }, { closeTab });

  // Command palette — routes to active pane
  initCommandPalette(fileStructure.children, (file) => {
    if (isSplitActive() && getActivePane() === 'right') {
      openInRight(file);
    } else {
      openTab(file);
      selectFile(file.id);
    }
    updateTerminalDir(file.path);
  });

  // Terminal — open by default, pre-filled with npm run dev
  initTerminal();

  // Menubar
  const workspace = document.querySelector('.workspace');
  initMenubar({
    onToggleSidebar: () => workspace.classList.toggle('sidebar-collapsed'),
    onToggleTerminal: () => document.querySelector('.terminal-panel')?.classList.toggle('is-open'),
    onOpenPalette: () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', ctrlKey: true, bubbles: true })),
    onRunProject: () => {
      const previewFile = { id: 'preview-home', name: 'Preview home.html', ext: 'preview', path: 'home.html' };
      openTab(previewFile);
    },
    onClearTerminal: () => {
      const out = document.querySelector('.terminal-output');
      if (out) out.innerHTML = '';
    },
    onCloseActiveTab: () => {
      const active = getActiveTab();
      if (active) closeTab(active.id);
    },
  });

  // Activity bar panel switching
  initActivityBar(fileStructure);

  // Minimap
  initMinimap();

  // Extensions + theme + settings
  applyStoredTheme();
  initExtensions();
  applySettings(getSettings());

  // Titlebar search + layout buttons
  document.getElementById('titlebarSearch')?.addEventListener('click', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', ctrlKey: true, bubbles: true }));
  });
  document.getElementById('toggleSidebarBtn')?.addEventListener('click', () => {
    workspace.classList.toggle('sidebar-collapsed');
  });
  document.getElementById('togglePanelBtn')?.addEventListener('click', () => {
    document.querySelector('.terminal-panel')?.classList.toggle('is-open');
  });
  // Split editor focus tracking
  initSplitFocusHandlers();

  document.getElementById('splitEditorBtn')?.addEventListener('click', () => {
    toggleSplit();
  });

  // When user runs "npm run dev" → open a "Preview" editor tab (like VSCode Live Preview)
  setRunProjectHandler(() => {
    const previewFile = {
      id: 'preview-home',
      name: 'Preview home.html',
      ext: 'preview',
      path: 'home.html',
    };
    openTab(previewFile);
  });

  // Initial state: show home.html source code (not rendered)
  const homeFile = findFile(fileStructure, 'home-html');
  if (homeFile) {
    openTab(homeFile);
    selectFile(homeFile.id);
    showHomeSource(homeFile);
  }

  // Mobile sidebar
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggle = document.getElementById('sidebarToggle');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('is-open');
    overlay.classList.toggle('is-visible');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
  });
}

function showHomeSource(file) {
  const pane = document.getElementById('contentPane');
  const bc = document.getElementById('breadcrumb');
  const statusFile = document.getElementById('statusFile');
  const statusLang = document.getElementById('statusLang');

  statusFile.textContent = file.name;
  statusLang.textContent = 'HTML';

  bc.innerHTML = `<span class="breadcrumb__segment"><span class="">Portfolio</span></span>
    <span class="breadcrumb__segment"><span class="breadcrumb__sep">›</span><span class="breadcrumb__name">${file.name}</span></span>`;

  const raw = fileContents['home-html'] || '';
  // Show syntax-highlighted source with a "run to preview" overlay hint
  import('prismjs').then(({ default: Prism }) => {
    let highlighted;
    try {
      highlighted = Prism.highlight(raw, Prism.languages.markup, 'markup');
    } catch {
      highlighted = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const lines = raw.split('\n').length;
    const gutter = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join('');

    pane.innerHTML = `
      <div class="source-view-hint">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        This is the source code. Type <strong>npm run dev</strong> in the terminal below and press Enter to preview the UI.
      </div>
      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__lang">HTML · home.html</span>
        </div>
        <div class="code-block__body">
          <div class="code-block__gutter">${gutter}</div>
          <pre class="code-block__pre language-markup"><code>${highlighted}</code></pre>
        </div>
      </div>`;
  });
}

function updateTerminalDir(filePath) {
  // Update the terminal prompt to reflect current file directory
  const dir = filePath ? filePath.split('/').slice(0, -1).join('/') || '~' : '~';
  const promptEl = document.querySelector('.terminal-prompt');
  if (promptEl) {
    promptEl.textContent = `guest@portfolio:~/${dir}$ `;
  }
}

init();
