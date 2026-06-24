import { applyTheme } from './extensions.js';

// ── Default settings ───────────────────────────────────────────────────────
const DEFAULTS = {
  'workbench.colorTheme':         'Default Dark+',
  'editor.fontSize':              13,
  'editor.tabSize':               2,
  'editor.wordWrap':              'on',
  'editor.minimap.enabled':       true,
  'editor.lineNumbers':           'on',
  'workbench.activityBar.visible': true,
  'workbench.sideBar.visible':    true,
  'workbench.statusBar.visible':  true,
  'terminal.integrated.fontSize': 13,
};

const STORAGE_KEY = 'portfolio-settings';

export function getSettings() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
  catch { return { ...DEFAULTS }; }
}

function saveSettings(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

// ── Apply all settings to the live UI ─────────────────────────────────────
export function applySettings(s) {
  s = s || getSettings();

  // Color theme
  const themeId = s['workbench.colorTheme'] === 'One Dark Pro' ? 'one-dark-pro' : 'default-dark';
  applyTheme(themeId);

  // Editor font size
  document.documentElement.style.setProperty('--editor-font-size', s['editor.fontSize'] + 'px');
  document.querySelectorAll('.code-block__pre, .terminal-body, .terminal-input').forEach(el => {
    el.style.fontSize = s['editor.fontSize'] + 'px';
  });

  // Terminal font size
  document.querySelectorAll('.terminal-body, .terminal-input, .t-line, .terminal-prompt').forEach(el => {
    el.style.fontSize = s['terminal.integrated.fontSize'] + 'px';
  });

  // Minimap
  const minimap = document.querySelector('.minimap');
  if (minimap) minimap.style.display = s['editor.minimap.enabled'] ? '' : 'none';

  // Activity bar
  const ab = document.getElementById('activityBar');
  if (ab) ab.style.display = s['workbench.activityBar.visible'] ? '' : 'none';

  // Sidebar
  const ws = document.querySelector('.workspace');
  if (ws) {
    if (!s['workbench.sideBar.visible']) ws.classList.add('sidebar-collapsed');
    else ws.classList.remove('sidebar-collapsed');
  }

  // Status bar
  const sb = document.querySelector('.statusbar');
  if (sb) sb.style.display = s['workbench.statusBar.visible'] ? '' : 'none';

  // Word wrap on code panes
  document.querySelectorAll('.code-block__pre').forEach(el => {
    el.style.whiteSpace = s['editor.wordWrap'] === 'on' ? 'pre-wrap' : 'pre';
  });

  // Line numbers
  document.querySelectorAll('.code-block__gutter').forEach(el => {
    el.style.display = s['editor.lineNumbers'] === 'off' ? 'none' : '';
  });
}

// ── Settings schema (drives the GUI) ──────────────────────────────────────
const SCHEMA = [
  {
    section: 'Workbench',
    settings: [
      {
        key: 'workbench.colorTheme',
        label: 'Color Theme',
        desc: 'Specifies the color theme used in the workbench.',
        type: 'select',
        options: ['Default Dark+', 'One Dark Pro'],
      },
      {
        key: 'workbench.activityBar.visible',
        label: 'Activity Bar: Visible',
        desc: 'Controls the visibility of the activity bar in the workbench.',
        type: 'boolean',
      },
      {
        key: 'workbench.sideBar.visible',
        label: 'Side Bar: Visible',
        desc: 'Controls the visibility of the side bar in the workbench.',
        type: 'boolean',
      },
      {
        key: 'workbench.statusBar.visible',
        label: 'Status Bar: Visible',
        desc: 'Controls the visibility of the status bar at the bottom of the workbench.',
        type: 'boolean',
      },
    ],
  },
  {
    section: 'Editor',
    settings: [
      {
        key: 'editor.fontSize',
        label: 'Font Size',
        desc: 'Controls the font size in pixels.',
        type: 'number',
        min: 10, max: 24, step: 1,
      },
      {
        key: 'editor.tabSize',
        label: 'Tab Size',
        desc: 'The number of spaces a tab is equal to.',
        type: 'select',
        options: ['2', '4', '8'],
        parse: Number,
      },
      {
        key: 'editor.wordWrap',
        label: 'Word Wrap',
        desc: 'Controls how lines should wrap.',
        type: 'select',
        options: ['on', 'off'],
      },
      {
        key: 'editor.lineNumbers',
        label: 'Line Numbers',
        desc: 'Controls the display of line numbers.',
        type: 'select',
        options: ['on', 'relative', 'off'],
      },
      {
        key: 'editor.minimap.enabled',
        label: 'Minimap: Enabled',
        desc: 'Controls whether the minimap is shown.',
        type: 'boolean',
      },
    ],
  },
  {
    section: 'Terminal',
    settings: [
      {
        key: 'terminal.integrated.fontSize',
        label: 'Font Size',
        desc: 'Controls the font size in pixels of the terminal.',
        type: 'number',
        min: 10, max: 20, step: 1,
      },
    ],
  },
];

// ── Render the settings GUI into the content pane ─────────────────────────
export function renderSettingsEditor(pane) {
  const s = getSettings();

  pane.innerHTML = `
    <div class="settings-page">
      <div class="settings-topbar">
        <div class="settings-search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;opacity:.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="settings-search" id="settingsSearch" type="text" placeholder="Search settings" autocomplete="off" />
        </div>
        <button class="settings-json-btn" id="settingsJsonBtn" title="Open Settings (JSON)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Open Settings (JSON)
        </button>
      </div>
      <div class="settings-body" id="settingsBody">
        ${SCHEMA.map(group => renderGroup(group, s)).join('')}
      </div>
    </div>
  `;

  wireSettings(pane, s);

  // JSON modal toggle
  pane.querySelector('#settingsJsonBtn').addEventListener('click', () => openJsonModal(pane));

  // Search filter
  pane.querySelector('#settingsSearch').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    pane.querySelectorAll('.settings-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = q && !text.includes(q) ? 'none' : '';
    });
    pane.querySelectorAll('.settings-section').forEach(sec => {
      const visible = [...sec.querySelectorAll('.settings-item')].some(i => i.style.display !== 'none');
      sec.style.display = visible ? '' : 'none';
    });
  });
}

function renderGroup(group, s) {
  return `
  <div class="settings-section">
    <div class="settings-section__title">${group.section}</div>
    ${group.settings.map(def => renderItem(def, s)).join('')}
  </div>`;
}

function renderItem(def, s) {
  const val = s[def.key] ?? DEFAULTS[def.key];
  let control = '';

  if (def.type === 'boolean') {
    control = `
      <label class="settings-toggle" title="${def.key}">
        <input type="checkbox" class="settings-ctrl" data-key="${def.key}" ${val ? 'checked' : ''} />
        <span class="settings-toggle__track"></span>
      </label>`;
  } else if (def.type === 'select') {
    control = `
      <select class="settings-ctrl settings-select" data-key="${def.key}">
        ${def.options.map(o => `<option value="${o}" ${String(val) === o ? 'selected' : ''}>${o}</option>`).join('')}
      </select>`;
  } else if (def.type === 'number') {
    control = `
      <div class="settings-number-wrap">
        <input type="range" class="settings-slider settings-ctrl" data-key="${def.key}"
          min="${def.min}" max="${def.max}" step="${def.step}" value="${val}" />
        <span class="settings-number-val" id="val-${def.key.replace(/\./g,'-')}">${val}px</span>
      </div>`;
  }

  return `
  <div class="settings-item">
    <div class="settings-item__left">
      <div class="settings-item__label">${group_prefix(def.key)}${def.label}</div>
      <div class="settings-item__desc">${def.desc}</div>
      <div class="settings-item__key">${def.key}</div>
    </div>
    <div class="settings-item__control">${control}</div>
  </div>`;
}

function group_prefix(key) {
  const prefix = key.split('.')[0];
  return `<span class="settings-item__prefix">${prefix} › </span>`;
}

function wireSettings(pane, s) {
  pane.querySelectorAll('.settings-ctrl').forEach(ctrl => {
    ctrl.addEventListener('change', () => {
      const key = ctrl.dataset.key;
      const def = SCHEMA.flatMap(g => g.settings).find(d => d.key === key);
      let val;

      if (ctrl.type === 'checkbox') val = ctrl.checked;
      else if (ctrl.type === 'range') {
        val = Number(ctrl.value);
        const labelId = `val-${key.replace(/\./g,'-')}`;
        const label = pane.querySelector(`#${labelId}`);
        if (label) label.textContent = val + 'px';
      }
      else val = def?.parse ? def.parse(ctrl.value) : ctrl.value;

      s[key] = val;
      saveSettings(s);
      applySettings(s);
    });

    // Live update for sliders
    if (ctrl.type === 'range') {
      ctrl.addEventListener('input', () => {
        const key = ctrl.dataset.key;
        const label = pane.querySelector(`#val-${key.replace(/\./g,'-')}`);
        if (label) label.textContent = ctrl.value + 'px';
      });
    }
  });
}

// ── JSON modal ─────────────────────────────────────────────────────────────
function openJsonModal(pane) {
  const s = getSettings();
  const json = JSON.stringify(s, null, 2);

  const overlay = document.createElement('div');
  overlay.className = 'settings-json-overlay';
  overlay.innerHTML = `
    <div class="settings-json-modal">
      <div class="settings-json-modal__header">
        <span>settings.json</span>
        <div style="display:flex;gap:8px">
          <button class="settings-json-apply" id="sjApply">Apply</button>
          <button class="settings-json-close" id="sjClose">✕</button>
        </div>
      </div>
      <textarea class="settings-json-editor" id="sjEditor" spellcheck="false">${json}</textarea>
      <div class="settings-json-error" id="sjError"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('#sjClose').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  overlay.querySelector('#sjApply').addEventListener('click', () => {
    const errEl = overlay.querySelector('#sjError');
    try {
      const parsed = JSON.parse(overlay.querySelector('#sjEditor').value);
      const merged = { ...DEFAULTS, ...parsed };
      saveSettings(merged);
      applySettings(merged);
      overlay.remove();
      renderSettingsEditor(pane); // refresh GUI
    } catch (e) {
      errEl.textContent = '⚠ ' + e.message;
    }
  });
}
