import { fileStructure, fileContents } from './data.js';

// Exposed so main.js can trigger the "run" transition
export let onRunProject = null;
export function setRunProjectHandler(fn) { onRunProject = fn; }

// ── Virtual filesystem state ──────────────────────────────────────────────────

// cwd is an array of node references: [root, Projects, ecommerce-app, ...]
let cwd = [fileStructure]; // start at root

function cwdNode() { return cwd[cwd.length - 1]; }

function cwdPath() {
  if (cwd.length === 1) return '~';
  return '~/' + cwd.slice(1).map(n => n.name).join('/');
}

function getPrompt() {
  return `guest@portfolio:${cwdPath()}$`;
}

function findChild(node, name) {
  return (node.children || []).find(c => c.name.toLowerCase() === name.toLowerCase());
}

// ── Command implementations ───────────────────────────────────────────────────

function cmdLs(args) {
  const target = args[0] ? resolveNode(args[0]) : cwdNode();
  if (!target) return err(`ls: cannot access '${args[0]}': No such file or directory`);
  if (target.type === 'file') return esc(target.name);

  const children = target.children || [];
  if (!children.length) return '<span class="t-dim">(empty)</span>';

  const cols = children.map(c =>
    c.type === 'folder'
      ? `<span class="t-dir">${esc(c.name)}/</span>`
      : `<span>${esc(c.name)}</span>`
  );
  // Wrap in a flex grid
  return `<div class="t-ls-grid">${cols.join('')}</div>`;
}

function cmdCd(args) {
  const target = args[0];
  if (!target || target === '~') { cwd = [fileStructure]; return null; }
  if (target === '/') { cwd = [fileStructure]; return null; }

  const parts = target.split('/').filter(Boolean);
  let cursor = [...cwd];

  for (const part of parts) {
    if (part === '..') {
      if (cursor.length > 1) cursor.pop();
    } else if (part === '.') {
      // stay
    } else {
      const child = findChild(cursor[cursor.length - 1], part);
      if (!child) return err(`cd: ${esc(target)}: No such file or directory`);
      if (child.type === 'file') return err(`cd: ${esc(target)}: Not a directory`);
      cursor.push(child);
    }
  }
  cwd = cursor;
  return null;
}

function cmdPwd() {
  if (cwd.length === 1) return '/home/guest/portfolio';
  return '/home/guest/portfolio/' + cwd.slice(1).map(n => n.name).join('/');
}

function cmdCat(args) {
  if (!args[0]) return err('cat: missing operand');
  const node = resolveNode(args[0]);
  if (!node) return err(`cat: ${esc(args[0])}: No such file or directory`);
  if (node.type === 'folder') return err(`cat: ${esc(args[0])}: Is a directory`);
  const content = fileContents[node.id];
  if (!content) return `<span class="t-dim">(empty file)</span>`;
  // Show first 40 lines to avoid flooding
  const lines = esc(content).split('\n').slice(0, 40);
  const truncated = esc(content).split('\n').length > 40;
  return lines.join('\n') + (truncated ? '\n<span class="t-dim">... (truncated)</span>' : '');
}

function cmdMkdir(args) {
  if (!args[0]) return err('mkdir: missing operand');
  const node = cwdNode();
  if (!node.children) node.children = [];
  if (findChild(node, args[0])) return err(`mkdir: cannot create directory '${esc(args[0])}': File exists`);
  node.children.push({ id: 'user-' + Date.now(), name: args[0], type: 'folder', expanded: false, children: [] });
  // Refresh file explorer if visible
  import('./fileExplorer.js').then(m => m.initFileExplorer && null);
  return null;
}

function cmdTouch(args) {
  if (!args[0]) return err('touch: missing operand');
  const node = cwdNode();
  if (!node.children) node.children = [];
  if (findChild(node, args[0])) return null; // already exists, touch is a no-op
  const id = 'user-' + Date.now();
  const ext = args[0].includes('.') ? args[0].split('.').pop() : '';
  node.children.push({ id, name: args[0], type: 'file', ext, path: args[0] });
  fileContents[id] = '';
  return null;
}

function cmdEcho(args) {
  return esc(args.join(' '));
}

function cmdDate() {
  return new Date().toLocaleString();
}

function cmdWhoami() {
  return `<span class="t-welcome">Sushanka Karki</span> — Full Stack Developer
Location:  Kausaltar, Bhaktapur
Currently: CSTC Pvt. Ltd (Full-Stack Developer, On-site)
Stack:     React · Next.js · Node.js · PostgreSQL · MongoDB
Open to new opportunities ✓`;
}

function cmdSkills() {
  return `Languages:  JavaScript  TypeScript  PHP  C  C#  HTML/CSS
Frontend:   React  Next.js  Redux Toolkit  Tailwind CSS
Backend:    Node.js  Express.js  NestJS  Prisma  REST APIs
Databases:  MongoDB  PostgreSQL  Redis  MySQL
Tools:      Git  Docker  Postman  Socket.IO  JWT  Stripe`;
}

function cmdContact() {
  return `Email:    <a class="t-link" href="mailto:karkisushanka719@gmail.com">karkisushanka719@gmail.com</a>
Phone:    <a class="t-link" href="tel:+9779844396037">(984) 439-6037</a>
GitHub:   <a class="t-link" href="https://github.com/sushanka719" target="_blank">github.com/sushanka719</a>
LinkedIn: <a class="t-link" href="https://linkedin.com/in/sushanka-karki-73b50522b/" target="_blank">linkedin.com/in/sushanka-karki-73b50522b</a>`;
}

function cmdHelp() {
  return `<span class="t-welcome">Available commands:</span>

  <span class="t-dim">Navigation</span>
  <span class="t-cmd">ls</span> [dir]         list directory contents
  <span class="t-cmd">cd</span> &lt;dir&gt;         change directory  (<span class="t-cmd">cd ..</span> to go up)
  <span class="t-cmd">pwd</span>              print working directory
  <span class="t-cmd">cat</span> &lt;file&gt;       print file contents

  <span class="t-dim">Files</span>
  <span class="t-cmd">mkdir</span> &lt;name&gt;     create a folder
  <span class="t-cmd">touch</span> &lt;name&gt;     create an empty file
  <span class="t-cmd">echo</span> &lt;text&gt;      print text

  <span class="t-dim">Portfolio</span>
  <span class="t-cmd">whoami</span>           about the developer
  <span class="t-cmd">skills</span>           tech stack
  <span class="t-cmd">contact</span>          contact info
  <span class="t-cmd">npm run dev</span>      launch portfolio preview
  <span class="t-cmd">date</span>             current date/time
  <span class="t-cmd">clear</span>            clear terminal
  <span class="t-cmd">help</span>             show this help`;
}

// ── Tab completion ─────────────────────────────────────────────────────────────

function tabComplete(partial) {
  const parts = partial.split(' ');
  if (parts.length === 1) {
    // Complete command name
    const cmds = ['ls', 'cd', 'pwd', 'cat', 'mkdir', 'touch', 'echo', 'date', 'clear', 'help', 'whoami', 'skills', 'contact', 'npm'];
    const matches = cmds.filter(c => c.startsWith(parts[0]));
    return matches.length === 1 ? matches[0] : partial;
  }
  // Complete file/dir name
  const token = parts[parts.length - 1];
  const node = cwdNode();
  const children = node.children || [];
  const matches = children.filter(c => c.name.toLowerCase().startsWith(token.toLowerCase()));
  if (matches.length === 1) {
    parts[parts.length - 1] = matches[0].name + (matches[0].type === 'folder' ? '/' : '');
    return parts.join(' ');
  }
  if (matches.length > 1) {
    // Show options (handled in caller)
    return { ambiguous: matches.map(m => m.name) };
  }
  return partial;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveNode(path) {
  if (!path) return null;
  const parts = path.split('/').filter(Boolean);
  let cursor = path.startsWith('/') || path.startsWith('~') ? [fileStructure] : [...cwd];
  for (const part of parts) {
    if (part === '..') { if (cursor.length > 1) cursor.pop(); }
    else if (part === '.' || part === '~') { /* stay */ }
    else {
      const child = findChild(cursor[cursor.length - 1], part);
      if (!child) return null;
      cursor.push(child);
    }
  }
  return cursor[cursor.length - 1];
}

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function err(msg) {
  return `<span class="t-error">${msg}</span>`;
}

export function initTerminal() {
  const panel = document.createElement('div');
  panel.id = 'terminal';
  panel.className = 'terminal-panel is-open'; // open by default
  panel.innerHTML = `
    <div class="terminal-header">
      <div class="terminal-tabs">
        <span class="terminal-tab is-active">TERMINAL</span>
      </div>
      <div class="terminal-controls">
        <button class="terminal-btn" id="terminalClose" aria-label="Close terminal">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="terminal-body" id="terminalBody">
      <div class="terminal-output" id="terminalOutput"></div>
      <div class="terminal-input-row">
        <span class="terminal-prompt">guest@portfolio:~$ </span>
        <input id="terminalInput" class="terminal-input" type="text" autocomplete="off" spellcheck="false" aria-label="Terminal input" />
      </div>
    </div>
  `;

  document.querySelector('.editor-area').appendChild(panel);

  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  let history = [];
  let histIdx = -1;

  // Boot sequence on load
  bootSequence(output, input);

  function updatePromptEl() {
    const promptEl = panel.querySelector('.terminal-prompt');
    if (promptEl) promptEl.textContent = getPrompt() + ' ';
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      appendLine(`<span class="t-prompt">${esc(getPrompt())}</span> ${esc(cmd)}`);
      if (cmd) {
        history.unshift(cmd);
        histIdx = -1;
        handleCommand(cmd);
      }
      input.value = '';
      updatePromptEl();
      scrollToBottom();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const result = tabComplete(input.value);
      if (typeof result === 'string') {
        input.value = result;
      } else if (result && result.ambiguous) {
        appendLine(`<span class="t-prompt">${esc(getPrompt())}</span> ${esc(input.value)}`);
        appendLine(`<div class="t-ls-grid">${result.ambiguous.map(n => esc(n)).join('  ')}</div>`);
        scrollToBottom();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx] || ''; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx] || ''; }
      else { histIdx = -1; input.value = ''; }
    }
  });

  document.getElementById('terminalClose').addEventListener('click', () => {
    panel.classList.remove('is-open');
  });

  document.getElementById('terminalBody').addEventListener('click', () => input.focus());

  updateStatusBar();

  // ── Package.json helpers ────────────────────────────────────────────────────

  function getPkg() {
    try { return JSON.parse(fileContents['package-json'] || '{}'); }
    catch { return {}; }
  }

  function handleCommand(cmd) {
    const parts = cmd.trim().split(/\s+/);
    const name = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (name === 'npm') { handleNpm(args); return; }

    let result;
    switch (name) {
      case 'ls':      result = cmdLs(args); break;
      case 'cd':      result = cmdCd(args); break;
      case 'pwd':     result = cmdPwd(); break;
      case 'cat':     result = cmdCat(args); break;
      case 'mkdir':   result = cmdMkdir(args); break;
      case 'touch':   result = cmdTouch(args); break;
      case 'echo':    result = cmdEcho(args); break;
      case 'date':    result = cmdDate(); break;
      case 'whoami':  result = cmdWhoami(); break;
      case 'skills':  result = cmdSkills(); break;
      case 'contact': result = cmdContact(); break;
      case 'help':    result = cmdHelp(); break;
      case 'clear':   output.innerHTML = ''; return;
      case '':        return;
      default:
        result = `<span class="t-error">bash: ${esc(name)}: command not found. Type <span class="t-cmd">help</span> for commands.</span>`;
    }

    if (result) appendLine(result);
    appendLine('&nbsp;');
  }

  // ── npm command dispatcher ──────────────────────────────────────────────────

  function handleNpm(args) {
    const sub = args[0]?.toLowerCase();

    if (!sub || sub === 'help') {
      appendLine(npmHelp());
      appendLine('&nbsp;');
      return;
    }

    if (sub === 'run' || sub === 'run-script') {
      const scriptName = args[1];
      if (!scriptName) { appendLine(npmListScripts()); appendLine('&nbsp;'); return; }
      runNpmScript(scriptName, args.slice(2));
      return;
    }

    if (sub === 'install' || sub === 'i' || sub === 'ci') {
      runNpmInstall(args.slice(1));
      return;
    }

    if (sub === 'start') { runNpmScript('start', []); return; }
    if (sub === 'test' || sub === 't') { runNpmScript('test', []); return; }
    if (sub === 'build') { runNpmScript('build', []); return; }

    if (sub === 'list' || sub === 'ls') {
      appendLine(npmList());
      appendLine('&nbsp;');
      return;
    }

    if (sub === 'version' || sub === '-v' || sub === '--version') {
      appendLine('<span class="t-welcome">9.8.1</span>');
      appendLine('&nbsp;');
      return;
    }

    appendLine(`<span class="t-error">npm: unknown command "${esc(sub)}". Run <span class="t-cmd">npm help</span> for usage.</span>`);
    appendLine('&nbsp;');
  }

  // ── npm run <script> — reads scripts from live package.json ────────────────

  function runNpmScript(scriptName, extraArgs) {
    const pkg = getPkg();
    const scripts = pkg.scripts || {};

    if (!(scriptName in scripts)) {
      appendLine(`<span class="t-error">npm ERR! Missing script: "${esc(scriptName)}"</span>`);
      appendLine('&nbsp;');
      appendLine(`<span class="t-dim">Available scripts:</span>`);
      const list = Object.keys(scripts).map(s => `  <span class="t-cmd">${esc(s)}</span>`).join('\n');
      appendLine(list || '  <span class="t-dim">(none)</span>');
      appendLine('&nbsp;');
      return;
    }

    const command = scripts[scriptName];
    input.disabled = true;

    // Pick the right simulation based on the script command string
    const sim = pickSimulator(scriptName, command);
    const pkgName = pkg.name || 'portfolio';
    const pkgVersion = pkg.version || '1.0.0';

    const header = [
      { text: `&nbsp;`, delay: 0 },
      { text: `<span class="t-dim">&gt; ${esc(pkgName)}@${esc(pkgVersion)} ${esc(scriptName)}</span>`, delay: 80 },
      { text: `<span class="t-dim">&gt; ${esc(command)}${extraArgs.length ? ' ' + esc(extraArgs.join(' ')) : ''}</span>`, delay: 160 },
      { text: `&nbsp;`, delay: 240 },
    ];

    const allLines = [...header, ...sim.lines];

    allLines.forEach(({ text, delay }) => {
      setTimeout(() => { appendLine(text); scrollToBottom(); }, delay);
    });

    setTimeout(() => {
      if (sim.openPreview) {
        const hint = document.createElement('div');
        hint.className = 't-line t-run-hint';
        hint.innerHTML = `  <span class="t-welcome">✓ Server ready.</span> Opening preview…`;
        output.appendChild(hint);
        scrollToBottom();
        onRunProject && onRunProject();
      }
      setTimeout(() => { input.disabled = false; input.focus(); updatePromptEl(); }, 200);
    }, sim.totalDelay);
  }

  // ── npm install simulation ──────────────────────────────────────────────────

  function runNpmInstall(pkgArgs) {
    input.disabled = true;
    const isNew = pkgArgs.length > 0;
    const pkgNames = isNew ? pkgArgs.filter(a => !a.startsWith('-')) : [];
    const isDev = pkgArgs.includes('--save-dev') || pkgArgs.includes('-D');

    const lines = isNew ? [
      { text: `<span class="t-dim">npm warn idealTree</span> found 0 vulnerabilities`, delay: 200 },
      ...pkgNames.map((p, i) => ({
        text: `<span class="t-dim">added</span> <span class="t-welcome">${esc(p)}</span>`,
        delay: 400 + i * 200,
      })),
      { text: `&nbsp;`, delay: 400 + pkgNames.length * 200 },
      { text: `<span class="t-welcome">added ${pkgNames.length} package${pkgNames.length !== 1 ? 's' : ''}</span> in 1s`, delay: 500 + pkgNames.length * 200 },
    ] : [
      { text: `<span class="t-dim">npm warn idealTree</span> found 0 vulnerabilities`, delay: 200 },
      { text: `<span class="t-dim">⠸ reify:prismjs: timing reifyNode</span>`, delay: 500 },
      { text: `<span class="t-dim">⠼ reify:vite: timing reifyNode</span>`, delay: 900 },
      { text: `&nbsp;`, delay: 1200 },
      { text: `<span class="t-welcome">added 42 packages</span><span class="t-dim">, and audited 43 packages in 3s</span>`, delay: 1400 },
      { text: `&nbsp;`, delay: 1500 },
      { text: `<span class="t-dim">found </span><span class="t-welcome">0 vulnerabilities</span>`, delay: 1600 },
    ];

    const totalDelay = lines[lines.length - 1].delay + 400;

    lines.forEach(({ text, delay }) => {
      setTimeout(() => { appendLine(text); scrollToBottom(); }, delay);
    });

    // If --save-dev or new package, update package.json content
    if (isNew && pkgNames.length) {
      setTimeout(() => {
        try {
          const pkg = getPkg();
          pkgNames.forEach(p => {
            const [name, ver] = p.split('@');
            const version = ver ? `^${ver}` : '^1.0.0';
            if (isDev) pkg.devDependencies = { ...pkg.devDependencies, [name]: version };
            else pkg.dependencies = { ...pkg.dependencies, [name]: version };
          });
          fileContents['package-json'] = JSON.stringify(pkg, null, 2);
        } catch {}
      }, totalDelay - 200);
    }

    setTimeout(() => {
      appendLine('&nbsp;');
      input.disabled = false; input.focus(); updatePromptEl();
    }, totalDelay);
  }

  // ── Script simulator registry ───────────────────────────────────────────────

  function pickSimulator(scriptName, command) {
    const cmd = command.toLowerCase();

    if (cmd.includes('vite') && !cmd.includes('build') && !cmd.includes('preview')) {
      return {
        openPreview: true,
        totalDelay: 1800,
        lines: [
          { text: `  <span class="t-welcome">VITE v5.0.0</span>  <span class="t-dim">ready in 127ms</span>`, delay: 400 },
          { text: `&nbsp;`, delay: 500 },
          { text: `  <span class="t-dim">➜  Local:   </span><a class="t-link" href="#">http://localhost:5173/</a>`, delay: 600 },
          { text: `  <span class="t-dim">➜  Network: use </span><span class="t-cmd">--host</span><span class="t-dim"> to expose</span>`, delay: 700 },
          { text: `  <span class="t-dim">➜  press </span><span class="t-cmd">h + enter</span><span class="t-dim"> to show help</span>`, delay: 800 },
          { text: `&nbsp;`, delay: 900 },
        ],
      };
    }

    if (cmd.includes('vite build') || scriptName === 'build') {
      return {
        openPreview: false,
        totalDelay: 2400,
        lines: [
          { text: `<span class="t-dim">vite v5.0.0 building for production...</span>`, delay: 300 },
          { text: `<span class="t-dim">✓ 22 modules transformed.</span>`, delay: 800 },
          { text: `<span class="t-dim">rendering chunks...</span>`, delay: 1000 },
          { text: `<span class="t-dim">computing gzip size...</span>`, delay: 1400 },
          { text: `&nbsp;`, delay: 1600 },
          { text: `<span class="t-dim">dist/index.html              </span><span class="t-welcome"> 10.79 kB</span><span class="t-dim"> │ gzip:  2.28 kB</span>`, delay: 1700 },
          { text: `<span class="t-dim">dist/assets/index.css        </span><span class="t-welcome"> 46.24 kB</span><span class="t-dim"> │ gzip:  8.28 kB</span>`, delay: 1800 },
          { text: `<span class="t-dim">dist/assets/index.js         </span><span class="t-welcome">114.24 kB</span><span class="t-dim"> │ gzip: 33.25 kB</span>`, delay: 1900 },
          { text: `&nbsp;`, delay: 2000 },
          { text: `<span class="t-welcome">✓ built in 743ms</span>`, delay: 2100 },
        ],
      };
    }

    if (cmd.includes('vite preview') || scriptName === 'preview') {
      return {
        openPreview: true,
        totalDelay: 1400,
        lines: [
          { text: `  <span class="t-welcome">VITE v5.0.0</span>  <span class="t-dim">preview server started</span>`, delay: 400 },
          { text: `&nbsp;`, delay: 500 },
          { text: `  <span class="t-dim">➜  Local:   </span><a class="t-link" href="#">http://localhost:4173/</a>`, delay: 600 },
          { text: `  <span class="t-dim">➜  Network: use </span><span class="t-cmd">--host</span><span class="t-dim"> to expose</span>`, delay: 700 },
          { text: `&nbsp;`, delay: 800 },
        ],
      };
    }

    if (cmd.includes('eslint') || scriptName === 'lint') {
      return {
        openPreview: false,
        totalDelay: 1800,
        lines: [
          { text: `<span class="t-dim">Linting src...</span>`, delay: 300 },
          { text: `<span class="t-dim">✔ No ESLint warnings or errors found.</span>`, delay: 1400 },
        ],
      };
    }

    if (cmd.includes('vitest') || cmd.includes('jest') || scriptName === 'test') {
      return {
        openPreview: false,
        totalDelay: 2600,
        lines: [
          { text: `&nbsp;`, delay: 300 },
          { text: `<span class="t-welcome"> RUN  v1.4.0</span>`, delay: 400 },
          { text: `&nbsp;`, delay: 500 },
          { text: `<span class="t-dim"> ✓ src/js/terminal.test.js </span><span class="t-welcome">(3)</span>`, delay: 900 },
          { text: `<span class="t-dim"> ✓ src/js/editor.test.js  </span><span class="t-welcome">(5)</span>`, delay: 1200 },
          { text: `<span class="t-dim"> ✓ src/js/tabs.test.js    </span><span class="t-welcome">(4)</span>`, delay: 1500 },
          { text: `&nbsp;`, delay: 1800 },
          { text: `<span class="t-dim"> Test Files  </span><span class="t-welcome">3 passed</span><span class="t-dim"> (3)</span>`, delay: 2000 },
          { text: `<span class="t-dim"> Tests       </span><span class="t-welcome">12 passed</span><span class="t-dim"> (12)</span>`, delay: 2100 },
          { text: `<span class="t-dim"> Duration    2.47s</span>`, delay: 2200 },
        ],
      };
    }

    if (cmd.includes('prettier') || scriptName === 'format') {
      return {
        openPreview: false,
        totalDelay: 1400,
        lines: [
          { text: `<span class="t-dim">Formatting files...</span>`, delay: 300 },
          { text: `<span class="t-dim">src/main.js</span>`, delay: 500 },
          { text: `<span class="t-dim">src/js/editor.js</span>`, delay: 650 },
          { text: `<span class="t-dim">src/js/terminal.js</span>`, delay: 800 },
          { text: `<span class="t-dim">src/styles/layout.css</span>`, delay: 950 },
          { text: `<span class="t-welcome">✓ 8 files formatted.</span>`, delay: 1100 },
        ],
      };
    }

    if (cmd.includes('vercel') || scriptName === 'deploy') {
      return {
        openPreview: false,
        totalDelay: 3000,
        lines: [
          { text: `<span class="t-dim">Vercel CLI 34.0.0</span>`, delay: 300 },
          { text: `<span class="t-dim">🔍  Inspect: </span><a class="t-link" href="#">https://vercel.com/sushanka/portfolio</a>`, delay: 800 },
          { text: `<span class="t-dim">⠸  Building…</span>`, delay: 1200 },
          { text: `<span class="t-dim">✓  Build Completed</span>`, delay: 1800 },
          { text: `<span class="t-dim">🔗  Production: </span><a class="t-link" href="#">https://sushanka-portfolio.vercel.app</a>`, delay: 2400 },
          { text: `<span class="t-welcome">✓  Deployed to production!</span>`, delay: 2700 },
        ],
      };
    }

    if (cmd.includes('rm') || scriptName === 'clean') {
      return {
        openPreview: false,
        totalDelay: 800,
        lines: [
          { text: `<span class="t-dim">Cleaning build artifacts...</span>`, delay: 200 },
          { text: `<span class="t-welcome">✓ Done.</span>`, delay: 600 },
        ],
      };
    }

    // Generic fallback — just runs the command and says done
    return {
      openPreview: false,
      totalDelay: 800,
      lines: [
        { text: `<span class="t-dim">$ ${esc(command)}</span>`, delay: 200 },
        { text: `<span class="t-welcome">✓ Done.</span>`, delay: 600 },
      ],
    };
  }

  // ── npm list / npm run (no args) displays ───────────────────────────────────

  function npmListScripts() {
    const pkg = getPkg();
    const scripts = pkg.scripts || {};
    if (!Object.keys(scripts).length) return '<span class="t-dim">No scripts defined in package.json</span>';
    const rows = Object.entries(scripts).map(([name, cmd]) =>
      `  <span class="t-cmd">${esc(name)}</span><span class="t-dim">:</span>\n    ${esc(cmd)}`
    ).join('\n');
    return `<span class="t-dim">Scripts available via <span class="t-cmd">npm run</span>:\n\n${rows}</span>`;
  }

  function npmList() {
    const pkg = getPkg();
    const name = pkg.name || 'portfolio';
    const ver  = pkg.version || '1.0.0';
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    const rows = Object.entries(deps).map(([n, v]) => `  <span class="t-dim">├── </span><span class="t-welcome">${esc(n)}</span><span class="t-dim">@${esc(v)}</span>`).join('\n');
    return `<span class="t-welcome">${esc(name)}@${esc(ver)}</span>\n${rows || '  <span class="t-dim">(no dependencies)</span>'}`;
  }

  function npmHelp() {
    return `<span class="t-welcome">npm</span> <span class="t-dim">9.8.1</span>

Usage: <span class="t-cmd">npm</span> &lt;command&gt;

  <span class="t-cmd">npm run</span>              list available scripts
  <span class="t-cmd">npm run &lt;script&gt;</span>    run a script from package.json
  <span class="t-cmd">npm install</span>          install all dependencies
  <span class="t-cmd">npm install &lt;pkg&gt;</span>   add a package
  <span class="t-cmd">npm list</span>             list installed packages
  <span class="t-cmd">npm start</span>            run the "start" script
  <span class="t-cmd">npm test</span>             run the "test" script
  <span class="t-cmd">npm build</span>            run the "build" script`;
  }

  function runDevSequence() {
    input.disabled = true;
    const lines = [
      { text: `<span class="t-dim">$ npm run dev</span>`, delay: 0 },
      { text: `<span class="t-dim">&gt; sushanka-portfolio@1.0.0 dev</span>`, delay: 300 },
      { text: `<span class="t-dim">&gt; vite</span>`, delay: 500 },
      { text: `&nbsp;`, delay: 700 },
      { text: `  <span class="t-welcome">VITE v5.0.0</span>  <span class="t-dim">ready in 114ms</span>`, delay: 900 },
      { text: `&nbsp;`, delay: 1000 },
      { text: `  <span class="t-dim">➜  Local:   </span><a class="t-link" href="#">http://localhost:5173/</a>`, delay: 1100 },
      { text: `  <span class="t-dim">➜  Network: http://192.168.1.1:5173/</span>`, delay: 1200 },
      { text: `&nbsp;`, delay: 1300 },
      { text: `  <span class="t-dim">press </span><span class="t-cmd">h + enter</span><span class="t-dim"> to show help</span>`, delay: 1400 },
      { text: `&nbsp;`, delay: 1500 },
    ];

    lines.forEach(({ text, delay }) => {
      setTimeout(() => {
        appendLine(text);
        scrollToBottom();
      }, delay);
    });

    // After sequence, auto-open the preview tab
    setTimeout(() => {
      const hint = document.createElement('div');
      hint.className = 't-line t-run-hint';
      hint.innerHTML = `  <span class="t-welcome">✓ Server ready.</span> Opening preview…`;
      output.appendChild(hint);
      scrollToBottom();
      onRunProject && onRunProject();
      setTimeout(() => { input.disabled = false; input.focus(); }, 300);
    }, 1600);
  }

  function bootSequence(output, input) {
    const lines = [
      { text: `<span class="t-welcome">Portfolio Terminal v1.0.0</span>`, delay: 0 },
      { text: `<span class="t-dim">Sushanka Karki · Full Stack Developer</span>`, delay: 200 },
      { text: `&nbsp;`, delay: 300 },
      { text: `<span class="t-dim">Type </span><span class="t-cmd">npm run dev</span><span class="t-dim"> and press Enter to launch the UI.</span>`, delay: 500 },
      { text: `<span class="t-dim">Type </span><span class="t-cmd">help</span><span class="t-dim"> for all commands.</span>`, delay: 650 },
      { text: `&nbsp;`, delay: 750 },
    ];

    lines.forEach(({ text, delay }) => {
      setTimeout(() => { appendLine(text); scrollToBottom(); }, delay);
    });

    // Pre-fill input with npm run dev after boot
    setTimeout(() => {
      input.value = 'npm run dev';
      input.focus();
      input.select();
    }, 900);
  }

  function appendLine(html) {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = html;
    output.appendChild(div);
  }

  function scrollToBottom() {
    const body = document.getElementById('terminalBody');
    body.scrollTop = body.scrollHeight;
  }
}



function updateStatusBar() {
  const statusbar = document.querySelector('.statusbar');
  const btn = document.createElement('button');
  btn.className = 'statusbar__item statusbar__terminal-btn';
  btn.textContent = 'Terminal';
  btn.setAttribute('title', 'Toggle Terminal (Ctrl+`)');
  btn.addEventListener('click', () => {
    const terminal = document.getElementById('terminal');
    terminal.classList.toggle('is-open');
    if (terminal.classList.contains('is-open')) {
      document.getElementById('terminalInput').focus();
    }
  });
  statusbar.insertBefore(btn, statusbar.querySelector('[style]'));
}
