const CHAR_W = 1.5;   // px per character column
const LINE_H = 2.5;   // px per line
const MAP_W  = 100;   // canvas width in px

// Token color map matching Dark+ prism theme (rgb)
const TOKEN_COLORS = {
  comment:    [106, 153,  85],
  keyword:    [ 86,156,214],
  string:     [206,145,120],
  number:     [181,206,168],
  function:   [220,220,170],
  'class-name':[78,201,176],
  operator:   [212,212,212],
  punctuation:[212,212,212],
  default:    [212,212,212],
};

let rafId = null;

export function initMinimap() {
  const pane = document.getElementById('contentPane');
  if (!pane) return;

  // Wrap content pane + minimap in a flex row
  const wrapper = document.createElement('div');
  wrapper.id = 'editorBody';
  wrapper.className = 'editor-body';

  // Move pane into wrapper (use pane's actual parent, not .editor-area)
  pane.parentElement.insertBefore(wrapper, pane);
  wrapper.appendChild(pane);

  // Canvas minimap
  const mapEl = document.createElement('div');
  mapEl.className = 'minimap';
  mapEl.innerHTML = `
    <canvas class="minimap__canvas" id="minimapCanvas" width="${MAP_W}"></canvas>
    <div class="minimap__slider" id="minimapSlider"></div>
  `;
  wrapper.appendChild(mapEl);

  const canvas = document.getElementById('minimapCanvas');
  const slider = document.getElementById('minimapSlider');

  // Sync scroll → slider position
  pane.addEventListener('scroll', () => updateSlider(pane, canvas, slider));

  // Click/drag on minimap → scroll editor
  let dragging = false;
  mapEl.addEventListener('mousedown', (e) => {
    dragging = true;
    seekTo(e, pane, canvas);
  });
  window.addEventListener('mousemove', (e) => { if (dragging) seekTo(e, pane, canvas); });
  window.addEventListener('mouseup', () => { dragging = false; });

  // Observe content changes to redraw
  const observer = new MutationObserver(() => scheduleRender(canvas, pane, slider));
  observer.observe(pane, { childList: true, subtree: true });

  scheduleRender(canvas, pane, slider);
}

function scheduleRender(canvas, pane, slider) {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    renderMinimap(canvas, pane);
    updateSlider(pane, canvas, slider);
    rafId = null;
  });
}

function renderMinimap(canvas, pane) {
  const mapEl = canvas.parentElement;
  const availH = mapEl.clientHeight || 600;
  canvas.height = availH;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, MAP_W, availH);
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, 0, MAP_W, availH);

  // Grab all code tokens from the pane
  const pre = pane.querySelector('pre code');
  if (pre) {
    renderTokenLines(ctx, pre, availH);
    return;
  }

  // Fallback: render plain text lines (for HTML / rendered views)
  const text = pane.innerText || '';
  const lines = text.split('\n').slice(0, Math.floor(availH / LINE_H));
  ctx.fillStyle = `rgba(${TOKEN_COLORS.default.join(',')},0.35)`;
  lines.forEach((line, i) => {
    const y = i * LINE_H + 1;
    const w = Math.min(line.length * CHAR_W * 0.6, MAP_W - 8);
    if (w > 2) ctx.fillRect(6, y, w, LINE_H - 0.5);
  });
}

function renderTokenLines(ctx, codeEl, availH) {
  // Walk the DOM to get tokens with their colors
  const items = [];   // {text, color}
  walkTokens(codeEl, items, TOKEN_COLORS.default);

  // Split into lines
  const lines = [[]];
  items.forEach(({ text, color }) => {
    const parts = text.split('\n');
    parts.forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part.length) lines[lines.length - 1].push({ text: part, color });
    });
  });

  const maxLines = Math.floor(availH / LINE_H);
  lines.slice(0, maxLines).forEach((tokens, lineIdx) => {
    let x = 6;
    const y = lineIdx * LINE_H + 1;
    tokens.forEach(({ text, color }) => {
      const trimmed = text.replace(/\t/g, '  ');
      const w = trimmed.length * CHAR_W;
      ctx.fillStyle = `rgba(${color.join(',')},0.85)`;
      ctx.fillRect(x, y, Math.min(w, MAP_W - x - 2), LINE_H - 0.5);
      x += w;
      if (x >= MAP_W - 2) return;
    });
  });
}

function walkTokens(node, items, parentColor) {
  if (node.nodeType === Node.TEXT_NODE) {
    items.push({ text: node.textContent, color: parentColor });
    return;
  }
  const cls = node.className || '';
  const color = tokenColor(cls) || parentColor;
  node.childNodes.forEach(child => walkTokens(child, items, color));
}

function tokenColor(cls) {
  for (const [key, val] of Object.entries(TOKEN_COLORS)) {
    if (cls.includes(key)) return val;
  }
  return null;
}

function updateSlider(pane, canvas, slider) {
  const scrollH = pane.scrollHeight;
  const clientH = pane.clientHeight;
  const mapH    = canvas.clientHeight;

  if (scrollH <= clientH) {
    slider.style.display = 'none';
    return;
  }

  const ratio    = mapH / scrollH;
  const sliderH  = Math.max(clientH * ratio, 20);
  const sliderTop = pane.scrollTop * ratio;

  slider.style.display = 'block';
  slider.style.height   = sliderH + 'px';
  slider.style.top      = sliderTop + 'px';
}

function seekTo(e, pane, canvas) {
  const rect = canvas.getBoundingClientRect();
  const relY  = e.clientY - rect.top;
  const ratio = pane.scrollHeight / canvas.clientHeight;
  pane.scrollTop = relY * ratio - pane.clientHeight / 2;
}
