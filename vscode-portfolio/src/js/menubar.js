const MENUS = [
  {
    label: 'File',
    items: [
      { label: 'New File', disabled: true, hint: 'Ctrl+N' },
      { label: 'Open Folder…', disabled: true },
      { type: 'separator' },
      { label: 'Save', disabled: true, hint: 'Ctrl+S' },
      { label: 'Save All', disabled: true, hint: 'Ctrl+Shift+S' },
      { type: 'separator' },
      { label: 'Close Editor', action: 'closeActiveTab', hint: 'Ctrl+W' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Undo', disabled: true, hint: 'Ctrl+Z' },
      { label: 'Redo', disabled: true, hint: 'Ctrl+Y' },
      { type: 'separator' },
      { label: 'Cut', disabled: true, hint: 'Ctrl+X' },
      { label: 'Copy', disabled: true, hint: 'Ctrl+C' },
      { label: 'Paste', disabled: true, hint: 'Ctrl+V' },
      { type: 'separator' },
      { label: 'Find', disabled: true, hint: 'Ctrl+F' },
    ],
  },
  {
    label: 'Selection',
    items: [
      { label: 'Select All', disabled: true, hint: 'Ctrl+A' },
      { label: 'Expand Selection', disabled: true },
      { label: 'Shrink Selection', disabled: true },
      { type: 'separator' },
      { label: 'Add Cursor Above', disabled: true },
      { label: 'Add Cursor Below', disabled: true },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'Explorer', action: 'toggleSidebar', hint: 'Ctrl+B' },
      { label: 'Terminal', action: 'toggleTerminal', hint: 'Ctrl+`' },
      { label: 'Command Palette…', action: 'openPalette', hint: 'Ctrl+P' },
      { type: 'separator' },
      { label: 'Zoom In', disabled: true, hint: 'Ctrl+=' },
      { label: 'Zoom Out', disabled: true, hint: 'Ctrl+-' },
      { label: 'Reset Zoom', disabled: true, hint: 'Ctrl+0' },
    ],
  },
  {
    label: 'Go',
    items: [
      { label: 'Back', disabled: true, hint: 'Alt+←' },
      { label: 'Forward', disabled: true, hint: 'Alt+→' },
      { type: 'separator' },
      { label: 'Go to File…', action: 'openPalette', hint: 'Ctrl+P' },
      { label: 'Go to Line/Column…', disabled: true, hint: 'Ctrl+G' },
    ],
  },
  {
    label: 'Run',
    items: [
      { label: 'Run Project (npm run dev)', action: 'runProject' },
      { type: 'separator' },
      { label: 'Stop', disabled: true },
    ],
  },
  {
    label: 'Terminal',
    items: [
      { label: 'New Terminal', action: 'toggleTerminal', hint: 'Ctrl+`' },
      { label: 'Split Terminal', disabled: true },
      { type: 'separator' },
      { label: 'Clear Terminal', action: 'clearTerminal' },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'About', action: 'showAbout' },
      { type: 'separator' },
      { label: 'GitHub', action: 'openGitHub' },
      { label: 'LinkedIn', action: 'openLinkedIn' },
    ],
  },
];

let activeMenu = null;

export function initMenubar({ onToggleSidebar, onToggleTerminal, onOpenPalette, onRunProject, onClearTerminal, onCloseActiveTab }) {
  const bar = document.getElementById('menubar');

  MENUS.forEach((menu) => {
    const btn = document.createElement('button');
    btn.className = 'menubar__item';
    btn.textContent = menu.label;
    btn.setAttribute('role', 'menuitem');
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeMenu && activeMenu.btn === btn) {
        closeAll();
        return;
      }
      closeAll();
      openMenu(btn, menu, { onToggleSidebar, onToggleTerminal, onOpenPalette, onRunProject, onClearTerminal, onCloseActiveTab });
    });

    // Hover-switch: if another menu is already open, switch to this one
    btn.addEventListener('mouseenter', () => {
      if (activeMenu && activeMenu.btn !== btn) {
        closeAll();
        openMenu(btn, menu, { onToggleSidebar, onToggleTerminal, onOpenPalette, onRunProject, onClearTerminal, onCloseActiveTab });
      }
    });

    bar.appendChild(btn);
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
}

function openMenu(btn, menu, actions) {
  btn.classList.add('is-active');
  btn.setAttribute('aria-expanded', 'true');

  const dropdown = document.createElement('div');
  dropdown.className = 'menubar__dropdown';

  menu.items.forEach((item) => {
    if (item.type === 'separator') {
      const sep = document.createElement('div');
      sep.className = 'menubar__separator';
      dropdown.appendChild(sep);
      return;
    }

    const el = document.createElement('button');
    el.className = 'menubar__dropdown-item';
    if (item.disabled) el.classList.add('is-disabled');

    el.innerHTML = `<span class="menubar__item-label">${item.label}</span>${item.hint ? `<span class="menubar__item-hint">${item.hint}</span>` : ''}`;

    if (!item.disabled && item.action) {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAll();
        runAction(item.action, actions);
      });
    } else {
      el.disabled = true;
    }

    dropdown.appendChild(el);
  });

  // Position below the button
  const rect = btn.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px';
  dropdown.style.top = rect.bottom + 'px';

  document.body.appendChild(dropdown);
  activeMenu = { btn, dropdown };
}

function closeAll() {
  if (!activeMenu) return;
  activeMenu.btn.classList.remove('is-active');
  activeMenu.btn.setAttribute('aria-expanded', 'false');
  activeMenu.dropdown.remove();
  activeMenu = null;
}

function runAction(action, { onToggleSidebar, onToggleTerminal, onOpenPalette, onRunProject, onClearTerminal, onCloseActiveTab }) {
  switch (action) {
    case 'toggleSidebar': onToggleSidebar?.(); break;
    case 'toggleTerminal': onToggleTerminal?.(); break;
    case 'openPalette': onOpenPalette?.(); break;
    case 'runProject': onRunProject?.(); break;
    case 'clearTerminal': onClearTerminal?.(); break;
    case 'closeActiveTab': onCloseActiveTab?.(); break;
    case 'showAbout':
      alert('Portfolio — Visual Studio Code\nSushanka Karki · Full Stack Developer\nBuilt with Vite + Vanilla JS');
      break;
    case 'openGitHub':
      window.open('https://github.com/sushanka719', '_blank', 'noopener');
      break;
    case 'openLinkedIn':
      window.open('https://linkedin.com/in/sushanka-karki-73b50522b/', '_blank', 'noopener');
      break;
  }
}
