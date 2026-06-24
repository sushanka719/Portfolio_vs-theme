import { getFileIcon, getCloseIcon } from './icons.js';
import { renderContent } from './editor.js';

let rightTabs = [];
let isSplit = false;
let activePane = 'left'; // 'left' | 'right'

// ── Public API ────────────────────────────────────────────────────────────────

export function isSplitActive() { return isSplit; }
export function getActivePane() { return activePane; }
export function setActivePane(side) {
  activePane = side;
  document.getElementById('editorLeft')?.classList.toggle('is-focused', side === 'left');
  document.getElementById('editorRight')?.classList.toggle('is-focused', side === 'right');
}

export function toggleSplit() {
  isSplit = !isSplit;
  const right = document.getElementById('editorRight');
  const btn = document.getElementById('splitEditorBtn');
  right.classList.toggle('is-visible', isSplit);
  btn?.classList.toggle('is-active', isSplit);

  if (isSplit) {
    setActivePane('right');
    if (rightTabs.length === 0) {
      renderRightContent(null);
    }
  } else {
    setActivePane('left');
  }
}

export function openInRight(file) {
  const existing = rightTabs.find(t => t.id === file.id);
  if (!existing) rightTabs.push({ ...file, isActive: false });
  setActiveRightTab(file.id);
}

export function initSplitFocusHandlers() {
  document.getElementById('editorLeft')?.addEventListener('mousedown', () => setActivePane('left'));
  document.getElementById('editorRight')?.addEventListener('mousedown', () => setActivePane('right'));
  initResizer();
}

// ── Right pane tab management ─────────────────────────────────────────────────

function setActiveRightTab(id) {
  rightTabs.forEach(t => (t.isActive = t.id === id));
  renderRightTabs();
  const active = rightTabs.find(t => t.isActive);
  const pane = document.getElementById('contentPaneRight');
  if (pane) renderContent(active || null, pane);
}

function closeRightTab(id) {
  const idx = rightTabs.findIndex(t => t.id === id);
  if (idx === -1) return;
  const wasActive = rightTabs[idx].isActive;
  rightTabs.splice(idx, 1);
  if (wasActive && rightTabs.length > 0) {
    rightTabs[Math.min(idx, rightTabs.length - 1)].isActive = true;
  }
  renderRightTabs();
  const active = rightTabs.find(t => t.isActive);
  const pane = document.getElementById('contentPaneRight');
  if (pane) renderContent(active || null, pane);
}

function renderRightTabs() {
  const bar = document.getElementById('tabBarRight');
  if (!bar) return;
  bar.innerHTML = '';

  // Close-split button on the right of the tab bar
  const closeBtn = document.createElement('button');
  closeBtn.className = 'tab tab--close-split';
  closeBtn.title = 'Close split editor';
  closeBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  closeBtn.addEventListener('click', toggleSplit);

  rightTabs.forEach(tab => {
    const el = document.createElement('div');
    el.className = `tab ${tab.isActive ? 'is-active' : ''}`;
    el.dataset.id = tab.id;
    el.innerHTML = `
      <span class="tab__icon">${getFileIcon(tab.ext)}</span>
      <span class="tab__name">${tab.name}</span>
      <button class="tab__close" aria-label="Close ${tab.name}">${getCloseIcon()}</button>
    `;
    el.addEventListener('click', () => { setActivePane('right'); setActiveRightTab(tab.id); });
    el.querySelector('.tab__close').addEventListener('click', (e) => { e.stopPropagation(); closeRightTab(tab.id); });
    bar.appendChild(el);
  });

  bar.appendChild(closeBtn);
}

function renderRightContent(file) {
  const pane = document.getElementById('contentPaneRight');
  if (pane) renderContent(file, pane);
}

// ── Resizer drag ──────────────────────────────────────────────────────────────

function initResizer() {
  const resizer = document.getElementById('editorResizer');
  const columns = document.getElementById('editorColumns');
  if (!resizer || !columns) return;

  let dragging = false;
  let startX = 0;
  let startLeftW = 0;

  resizer.addEventListener('mousedown', (e) => {
    dragging = true;
    startX = e.clientX;
    startLeftW = document.getElementById('editorLeft').offsetWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const delta = e.clientX - startX;
    const total = columns.offsetWidth;
    const newLeft = Math.max(200, Math.min(total - 200, startLeftW + delta));
    const newRight = total - newLeft - 4;
    document.getElementById('editorLeft').style.flex = 'none';
    document.getElementById('editorLeft').style.width = newLeft + 'px';
    document.getElementById('editorRight').style.flex = 'none';
    document.getElementById('editorRight').style.width = newRight + 'px';
  });

  window.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
}
