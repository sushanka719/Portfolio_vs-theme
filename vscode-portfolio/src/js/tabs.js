import { getFileIcon, getCloseIcon } from './icons.js';

let openTabs = [];
let onTabChange = null;

export function initTabs(onChange) {
  onTabChange = onChange;
}

export function openTab(file) {
  const existing = openTabs.find(t => t.id === file.id);
  if (!existing) {
    openTabs.push({ ...file, isActive: false });
  }
  setActiveTab(file.id);
}

export function setActiveTab(id) {
  openTabs.forEach(t => (t.isActive = t.id === id));
  renderTabs();
  renderOpenEditors();
  onTabChange && onTabChange(openTabs.find(t => t.isActive));
}

export function closeTab(id, event) {
  event && event.stopPropagation();
  const idx = openTabs.findIndex(t => t.id === id);
  if (idx === -1) return;

  const wasActive = openTabs[idx].isActive;
  openTabs.splice(idx, 1);

  if (wasActive && openTabs.length > 0) {
    const nextIdx = Math.min(idx, openTabs.length - 1);
    openTabs[nextIdx].isActive = true;
    onTabChange && onTabChange(openTabs[nextIdx]);
  } else if (openTabs.length === 0) {
    onTabChange && onTabChange(null);
  }

  renderTabs();
  renderOpenEditors();
}

function renderTabs() {
  const tabBar = document.getElementById('tabBar');
  tabBar.innerHTML = '';

  openTabs.forEach(tab => {
    const el = document.createElement('div');
    el.className = `tab ${tab.isActive ? 'is-active' : ''}`;
    el.setAttribute('role', 'tab');
    el.setAttribute('aria-selected', tab.isActive);
    el.dataset.id = tab.id;
    el.innerHTML = `
      <span class="tab__icon">${getFileIcon(tab.ext)}</span>
      <span class="tab__name">${tab.name}</span>
      <button class="tab__close" aria-label="Close ${tab.name}">${getCloseIcon()}</button>
    `;

    el.addEventListener('click', () => setActiveTab(tab.id));
    el.querySelector('.tab__close').addEventListener('click', (e) => closeTab(tab.id, e));

    tabBar.appendChild(el);
  });
}

function renderOpenEditors() {
  const list = document.getElementById('openEditorsList');
  const section = document.getElementById('openEditors');
  list.innerHTML = '';

  if (openTabs.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  openTabs.forEach(tab => {
    const el = document.createElement('div');
    el.className = `file-item ${tab.isActive ? 'is-selected' : ''}`;
    el.style.paddingLeft = '20px';
    el.dataset.id = tab.id;
    el.innerHTML = `
      <span class="file-item__icon">${getFileIcon(tab.ext)}</span>
      <span class="file-item__name">${tab.name}</span>
      <button class="file-item__close" aria-label="Close ${tab.name}">${getCloseIcon()}</button>
    `;

    el.addEventListener('click', () => setActiveTab(tab.id));
    el.querySelector('.file-item__close').addEventListener('click', (e) => closeTab(tab.id, e));

    list.appendChild(el);
  });
}

export function getActiveTab() {
  return openTabs.find(t => t.isActive) || null;
}
