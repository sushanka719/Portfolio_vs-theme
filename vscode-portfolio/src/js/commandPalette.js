let allFiles = [];
let isOpen = false;
let onSelect = null;

export function initCommandPalette(files, onSelectFile) {
  allFiles = files;
  onSelect = onSelectFile;
  buildUI();
  bindShortcuts();
}

function flattenFiles(node, path = '') {
  const results = [];
  const currentPath = path ? `${path}/${node.name}` : node.name;
  if (node.type === 'file') {
    results.push({ ...node, displayPath: currentPath });
  }
  if (node.children) {
    node.children.forEach(child => results.push(...flattenFiles(child, currentPath)));
  }
  return results;
}

function buildUI() {
  const overlay = document.createElement('div');
  overlay.id = 'cmdOverlay';
  overlay.className = 'cmd-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML = `
    <div class="cmd-palette" role="dialog" aria-modal="true" aria-label="Command Palette">
      <div class="cmd-input-wrap">
        <svg class="cmd-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input id="cmdInput" class="cmd-input" type="text" placeholder="Go to file..." autocomplete="off" spellcheck="false" />
      </div>
      <ul class="cmd-results" id="cmdResults" role="listbox"></ul>
      <div class="cmd-footer">
        <span><kbd>↑↓</kbd> navigate</span>
        <span><kbd>Enter</kbd> open</span>
        <span><kbd>Esc</kbd> close</span>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const input = document.getElementById('cmdInput');
  input.addEventListener('input', () => renderResults(input.value));
  input.addEventListener('keydown', handleNavigation);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
}

function bindShortcuts() {
  document.addEventListener('keydown', (e) => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key === 'p') { e.preventDefault(); toggle(); }
    if (mod && e.key === 'b') { e.preventDefault(); toggleSidebar(); }
    if (e.key === 'Escape' && isOpen) close();
    if (e.key === '`' && mod) { e.preventDefault(); toggleTerminal(); }
  });
}

function toggle() {
  isOpen ? close() : open();
}

function open() {
  isOpen = true;
  const overlay = document.getElementById('cmdOverlay');
  overlay.classList.add('is-visible');
  overlay.setAttribute('aria-hidden', 'false');
  const input = document.getElementById('cmdInput');
  input.value = '';
  renderResults('');
  setTimeout(() => input.focus(), 50);
}

function close() {
  isOpen = false;
  const overlay = document.getElementById('cmdOverlay');
  overlay.classList.remove('is-visible');
  overlay.setAttribute('aria-hidden', 'true');
}

function renderResults(query) {
  const files = flattenFiles({ name: 'Portfolio', type: 'folder', children: allFiles });
  const filtered = query
    ? files.filter(f => f.name.toLowerCase().includes(query.toLowerCase()) || f.displayPath.toLowerCase().includes(query.toLowerCase()))
    : files;

  const list = document.getElementById('cmdResults');
  list.innerHTML = '';

  if (filtered.length === 0) {
    list.innerHTML = `<li class="cmd-empty">No files found</li>`;
    return;
  }

  filtered.slice(0, 12).forEach((file, i) => {
    const li = document.createElement('li');
    li.className = `cmd-item ${i === 0 ? 'is-focused' : ''}`;
    li.setAttribute('role', 'option');
    li.dataset.id = file.id;

    const highlighted = query ? highlight(file.name, query) : file.name;
    li.innerHTML = `
      <span class="cmd-item__icon icon-${file.ext}">${getExtIcon(file.ext)}</span>
      <span class="cmd-item__name">${highlighted}</span>
      <span class="cmd-item__path">${file.displayPath.split('/').slice(0, -1).join(' › ')}</span>
    `;
    li.addEventListener('click', () => { selectItem(file); });
    li.addEventListener('mouseenter', () => focusItem(li));
    list.appendChild(li);
  });
}

function highlight(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + `<mark class="cmd-highlight">${text.slice(idx, idx + query.length)}</mark>` + text.slice(idx + query.length);
}

function handleNavigation(e) {
  const items = document.querySelectorAll('.cmd-item');
  const focused = document.querySelector('.cmd-item.is-focused');
  const idx = Array.from(items).indexOf(focused);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const next = items[idx + 1] || items[0];
    focusItem(next);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prev = items[idx - 1] || items[items.length - 1];
    focusItem(prev);
  } else if (e.key === 'Enter' && focused) {
    const id = focused.dataset.id;
    const file = flattenFiles({ name: 'Portfolio', type: 'folder', children: allFiles }).find(f => f.id === id);
    if (file) selectItem(file);
  }
}

function focusItem(el) {
  document.querySelectorAll('.cmd-item.is-focused').forEach(i => i.classList.remove('is-focused'));
  if (el) {
    el.classList.add('is-focused');
    el.scrollIntoView({ block: 'nearest' });
  }
}

function selectItem(file) {
  close();
  onSelect && onSelect(file);
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('is-collapsed');
  const workspace = document.querySelector('.workspace');
  workspace.classList.toggle('sidebar-collapsed');
}

function toggleTerminal() {
  const terminal = document.getElementById('terminal');
  if (terminal) terminal.classList.toggle('is-open');
}

function getExtIcon(ext) {
  const map = { html: '◈', js: '⬡', json: '{}', md: '✎', css: '◉', pdf: '⊞' };
  return map[ext] || '◻';
}
