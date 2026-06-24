import { getFileIcon, getFolderIcon, getChevronIcon } from './icons.js';
import { fileContents } from './data.js';

let onFileOpen = null;
let _fileStructure = null;
let _closeTabById = null;

// These nodes are read-only — visitors cannot rename or delete them
const PROTECTED_IDS = new Set([
  'root',
  'home-html', 'about-html', 'contact-me',
  'projects-folder', 'project-ecommerce', 'project-dating', 'project-teenpatti',
  'proj1-overview', 'proj1-features', 'proj2-overview', 'proj3-overview',
  'experience-folder', 'skills-json', 'timeline-json', 'education-json',
  'resume-pdf', 'package-json', 'settings-json', 'env-file', 'gitignore',
]);

export function initFileExplorer(fileStructure, onOpen, { closeTab } = {}) {
  onFileOpen = onOpen;
  _fileStructure = fileStructure;
  _closeTabById = closeTab || null;
  renderTree();
  initContextMenu();
  initExplorerToolbar();
}

// ── Tree rendering ────────────────────────────────────────────────────────────

function renderTree() {
  const container = document.getElementById('fileTree');
  container.innerHTML = '';
  renderNode(_fileStructure, container, 0, true);
}

function renderNode(node, parent, depth, isRoot = false) {
  if (isRoot) {
    const rootEl = document.createElement('div');
    rootEl.className = 'file-item file-item--root';
    rootEl.style.paddingLeft = `${depth * 12 + 8}px`;
    rootEl.innerHTML = `
      <span class="file-item__chevron ${node.expanded ? 'is-open' : ''}">${getChevronIcon()}</span>
      <span class="file-item__icon">${getFolderIcon(node.expanded)}</span>
      <span class="file-item__name">${node.name.toUpperCase()}</span>
      <span class="file-item__actions">
        <button class="file-item__action-btn" data-action="new-file" title="New File">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        </button>
        <button class="file-item__action-btn" data-action="new-folder" title="New Folder">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
        </button>
        <button class="file-item__action-btn" data-action="collapse" title="Collapse All">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/><polyline points="9 18 3 12 9 6"/></svg>
        </button>
      </span>
    `;

    const childContainer = document.createElement('div');
    childContainer.className = `folder-children ${node.expanded ? 'is-open' : ''}`;
    childContainer.dataset.id = node.id;

    rootEl.addEventListener('click', (e) => {
      if (e.target.closest('.file-item__action-btn')) return;
      toggleFolder(node, rootEl, childContainer);
    });
    rootEl.addEventListener('contextmenu', (e) => showContextMenu(e, node, null));

    rootEl.querySelector('[data-action="new-file"]').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!node.expanded) toggleFolder(node, rootEl, childContainer);
      startCreate(childContainer, node, 'file', 1);
    });
    rootEl.querySelector('[data-action="new-folder"]').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!node.expanded) toggleFolder(node, rootEl, childContainer);
      startCreate(childContainer, node, 'folder', 1);
    });
    rootEl.querySelector('[data-action="collapse"]').addEventListener('click', (e) => {
      e.stopPropagation();
      collapseAll();
    });

    if (node.children) node.children.forEach(child => renderNode(child, childContainer, depth + 1));

    parent.appendChild(rootEl);
    parent.appendChild(childContainer);
    return;
  }

  if (node.type === 'folder') {
    const el = document.createElement('div');
    el.className = 'file-item file-item--folder';
    el.style.paddingLeft = `${depth * 12 + 4}px`;
    el.dataset.id = node.id;

    const childContainer = document.createElement('div');
    childContainer.className = `folder-children ${node.expanded ? 'is-open' : ''}`;
    childContainer.dataset.id = node.id + '-children';

    el.innerHTML = `
      <span class="file-item__chevron ${node.expanded ? 'is-open' : ''}">${getChevronIcon()}</span>
      <span class="file-item__icon">${getFolderIcon(node.expanded)}</span>
      <span class="file-item__name">${node.name}</span>
      <span class="file-item__actions">
        <button class="file-item__action-btn" data-action="new-file" title="New File">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        </button>
        <button class="file-item__action-btn" data-action="new-folder" title="New Folder">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
        </button>
      </span>
    `;

    el.addEventListener('click', (e) => {
      if (e.target.closest('.file-item__action-btn')) return;
      e.stopPropagation();
      toggleFolder(node, el, childContainer);
    });

    el.addEventListener('contextmenu', (e) => showContextMenu(e, node, findParent(_fileStructure, node.id)));

    el.querySelector('[data-action="new-file"]').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!node.expanded) toggleFolder(node, el, childContainer);
      startCreate(childContainer, node, 'file', depth + 1);
    });
    el.querySelector('[data-action="new-folder"]').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!node.expanded) toggleFolder(node, el, childContainer);
      startCreate(childContainer, node, 'folder', depth + 1);
    });

    if (node.children) node.children.forEach(child => renderNode(child, childContainer, depth + 1));

    parent.appendChild(el);
    parent.appendChild(childContainer);
  } else {
    const el = document.createElement('div');
    el.className = 'file-item file-item--file';
    el.style.paddingLeft = `${depth * 12 + 20}px`;
    el.dataset.id = node.id;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Open ${node.name}`);
    el.innerHTML = `
      <span class="file-item__icon">${getFileIcon(node.ext)}</span>
      <span class="file-item__name">${node.name}</span>
    `;

    el.addEventListener('click', () => {
      selectFile(node.id);
      onFileOpen && onFileOpen(node);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectFile(node.id);
        onFileOpen && onFileOpen(node);
      }
    });
    el.addEventListener('contextmenu', (e) => showContextMenu(e, node, findParent(_fileStructure, node.id)));

    parent.appendChild(el);
  }
}

function toggleFolder(node, el, childContainer) {
  node.expanded = !node.expanded;
  el.querySelector('.file-item__chevron').classList.toggle('is-open', node.expanded);
  el.querySelector('.file-item__icon').innerHTML = getFolderIcon(node.expanded);
  childContainer.classList.toggle('is-open', node.expanded);
}

// ── Selection ─────────────────────────────────────────────────────────────────

export function selectFile(id) {
  document.querySelectorAll('.file-item.is-selected').forEach(el => el.classList.remove('is-selected'));
  const el = document.querySelector(`.file-item[data-id="${id}"]`);
  if (el) el.classList.add('is-selected');
}

// ── Explorer toolbar (panel header hover buttons) ─────────────────────────────

function initExplorerToolbar() {
  const panel = document.getElementById('panel-explorer');
  if (!panel) return;
  let header = panel.querySelector('.sidebar__panel-header');
  if (!header) {
    header = document.createElement('div');
    header.className = 'sidebar__panel-header';
    panel.insertBefore(header, panel.firstChild);
  }
  header.innerHTML = `<span class="sidebar__panel-title">EXPLORER</span>`;
}

function collapseAll() {
  function collapse(node) {
    if (node.type === 'folder' && node.id !== 'root') node.expanded = false;
    if (node.children) node.children.forEach(collapse);
  }
  collapse(_fileStructure);
  renderTree();
  initExplorerToolbar();
}

// ── Inline create (new file / folder) ────────────────────────────────────────

function startCreate(container, parentNode, type, depth) {
  // Remove any existing create inputs
  document.querySelectorAll('.file-item--creating').forEach(el => el.remove());

  const el = document.createElement('div');
  el.className = `file-item file-item--creating file-item--${type === 'folder' ? 'folder' : 'file'}`;
  el.style.paddingLeft = `${depth * 12 + (type === 'folder' ? 4 : 20)}px`;
  el.innerHTML = `
    ${type === 'folder'
      ? `<span class="file-item__chevron">${getChevronIcon()}</span><span class="file-item__icon">${getFolderIcon(false)}</span>`
      : `<span class="file-item__icon">${getFileIcon('')}</span>`
    }
    <input class="file-item__create-input" type="text" placeholder="${type === 'folder' ? 'folder name' : 'file name'}" autocomplete="off" spellcheck="false" />
  `;

  container.insertBefore(el, container.firstChild);
  const input = el.querySelector('.file-item__create-input');
  input.focus();

  function confirm() {
    const name = input.value.trim();
    el.remove();
    if (!name) return;
    addNode(parentNode, name, type);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') confirm();
    if (e.key === 'Escape') el.remove();
  });
  input.addEventListener('blur', () => setTimeout(() => el.remove(), 100));
}

function addNode(parentNode, name, type) {
  if (!parentNode.children) parentNode.children = [];
  const id = 'user-' + Date.now();
  const ext = type === 'file' ? name.split('.').pop() : '';
  const node = type === 'folder'
    ? { id, name, type: 'folder', expanded: false, children: [] }
    : { id, name, type: 'file', ext, path: name };

  if (type === 'file') fileContents[id] = '';
  parentNode.children.push(node);
  renderTree();
  initExplorerToolbar();
}

// ── Rename inline ─────────────────────────────────────────────────────────────

function startRename(node) {
  if (PROTECTED_IDS.has(node.id)) return;
  const el = document.querySelector(`.file-item[data-id="${node.id}"]`);
  if (!el) return;
  const nameSpan = el.querySelector('.file-item__name');
  const oldName = node.name;

  const input = document.createElement('input');
  input.className = 'file-item__rename-input';
  input.type = 'text';
  input.value = oldName;
  input.autocomplete = 'off';
  input.spellcheck = false;
  nameSpan.replaceWith(input);
  input.focus();
  input.select();

  function confirm() {
    const newName = input.value.trim();
    if (newName && newName !== oldName) {
      node.name = newName;
      if (node.type === 'file') {
        node.ext = newName.includes('.') ? newName.split('.').pop() : node.ext;
      }
    }
    renderTree();
    initExplorerToolbar();
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') confirm();
    if (e.key === 'Escape') { input.replaceWith(nameSpan); }
  });
  input.addEventListener('blur', () => setTimeout(confirm, 100));
}

// ── Delete ────────────────────────────────────────────────────────────────────

function deleteNode(node, parentNode) {
  if (PROTECTED_IDS.has(node.id) || !parentNode) return;
  const idx = parentNode.children.indexOf(node);
  if (idx === -1) return;
  parentNode.children.splice(idx, 1);

  // Close tabs for deleted files
  const ids = collectIds(node);
  ids.forEach(id => {
    if (_closeTabById) _closeTabById(id);
    delete fileContents[id];
  });

  renderTree();
  initExplorerToolbar();
}

function collectIds(node) {
  if (node.type === 'file') return [node.id];
  return (node.children || []).flatMap(collectIds);
}

// ── Context menu ──────────────────────────────────────────────────────────────

let _activeMenu = null;

function initContextMenu() {
  document.addEventListener('click', () => removeContextMenu());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') removeContextMenu(); });
}

function removeContextMenu() {
  if (_activeMenu) { _activeMenu.remove(); _activeMenu = null; }
}

function showContextMenu(e, node, parentNode) {
  e.preventDefault();
  e.stopPropagation();
  removeContextMenu();

  const isRoot = node.id === 'root';
  const isFolder = node.type === 'folder';

  const items = [];
  if (isFolder) {
    items.push({ label: 'New File', icon: newFileIcon(), action: () => {
      if (!node.expanded) {
        const el = document.querySelector(`.file-item[data-id="${node.id}"]`);
        const cc = document.querySelector(`[data-id="${node.id}-children"]`);
        if (el && cc) toggleFolder(node, el, cc);
        else if (isRoot) {
          const rootEl = document.querySelector('.file-item--root');
          const rootCc = document.querySelector(`[data-id="root"]`);
          if (rootEl && rootCc) toggleFolder(node, rootEl, rootCc);
        }
      }
      const cc = isRoot
        ? document.querySelector('[data-id="root"]')
        : document.querySelector(`[data-id="${node.id}-children"]`);
      if (cc) startCreate(cc, node, 'file', isRoot ? 1 : getDepth(node));
    }});
    items.push({ label: 'New Folder', icon: newFolderIcon(), action: () => {
      if (!node.expanded) {
        const el = document.querySelector(`.file-item[data-id="${node.id}"]`);
        const cc = document.querySelector(`[data-id="${node.id}-children"]`);
        if (el && cc) toggleFolder(node, el, cc);
        else if (isRoot) {
          const rootEl = document.querySelector('.file-item--root');
          const rootCc = document.querySelector(`[data-id="root"]`);
          if (rootEl && rootCc) toggleFolder(node, rootEl, rootCc);
        }
      }
      const cc = isRoot
        ? document.querySelector('[data-id="root"]')
        : document.querySelector(`[data-id="${node.id}-children"]`);
      if (cc) startCreate(cc, node, 'folder', isRoot ? 1 : getDepth(node));
    }});
  }
  if (!isRoot && !PROTECTED_IDS.has(node.id)) {
    if (items.length) items.push({ sep: true });
    items.push({ label: 'Rename', icon: renameIcon(), action: () => startRename(node) });
    items.push({ label: 'Delete', icon: deleteIcon(), action: () => deleteNode(node, parentNode), danger: true });
  }
  if (!items.length) return;

  const menu = document.createElement('div');
  menu.className = 'explorer-context-menu';
  menu.innerHTML = items.map((item, i) => item.sep
    ? `<div class="explorer-ctx__sep"></div>`
    : `<button class="explorer-ctx__item${item.danger ? ' explorer-ctx__item--danger' : ''}" data-idx="${i}">
        <span class="explorer-ctx__icon">${item.icon}</span>
        <span>${item.label}</span>
      </button>`
  ).join('');

  document.body.appendChild(menu);
  _activeMenu = menu;

  // Position
  const mw = 180, mh = menu.offsetHeight || 120;
  let x = e.clientX, y = e.clientY;
  if (x + mw > window.innerWidth) x = window.innerWidth - mw - 8;
  if (y + mh > window.innerHeight) y = window.innerHeight - mh - 8;
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';

  menu.querySelectorAll('.explorer-ctx__item').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const idx = Number(btn.dataset.idx);
      items[idx].action?.();
      removeContextMenu();
    });
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function findParent(node, targetId, parent = null) {
  if (node.id === targetId) return parent;
  if (node.children) {
    for (const child of node.children) {
      const found = findParent(child, targetId, node);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

function getDepth(node) {
  function search(current, target, depth) {
    if (current.id === target.id) return depth;
    if (current.children) {
      for (const c of current.children) {
        const d = search(c, target, depth + 1);
        if (d !== -1) return d;
      }
    }
    return -1;
  }
  return search(_fileStructure, node, 0);
}

// ── SVG icons for context menu ────────────────────────────────────────────────

function newFileIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`;
}
function newFolderIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`;
}
function renameIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
}
function deleteIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`;
}
