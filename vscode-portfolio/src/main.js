import './styles/main.css';
import { fileStructure } from './js/data.js';
import { initFileExplorer, selectFile } from './js/fileExplorer.js';
import { initTabs, openTab, getActiveTab, closeTab } from './js/tabs.js';
import { renderContent, updateAdminBadge } from './js/editor.js';
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
      const previewFile = { id: 'preview-home', name: 'localhost:5173', ext: 'preview', path: 'localhost:5173' };
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
      name: 'localhost:5173',
      ext: 'preview',
      path: 'localhost:5173',
    };
    openTab(previewFile);
  });

  // Initial state: open App.jsx
  const appFile = findFile(fileStructure, 'src-app');
  if (appFile) {
    openTab(appFile);
    selectFile(appFile.id);
    renderContent(appFile);
  }

  // Admin messages button
  updateAdminBadge();
  document.getElementById('openAdminBtn')?.addEventListener('click', () => {
    const adminFile = { id: 'admin-messages', name: 'Messages', ext: 'admin', path: 'admin/messages' };
    openTab(adminFile);
  });

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


function updateTerminalDir(filePath) {
  // Update the terminal prompt to reflect current file directory
  const dir = filePath ? filePath.split('/').slice(0, -1).join('/') || '~' : '~';
  const promptEl = document.querySelector('.terminal-prompt');
  if (promptEl) {
    promptEl.textContent = `guest@portfolio:~/${dir}$ `;
  }
}

init();
