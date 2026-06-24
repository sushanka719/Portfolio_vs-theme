import { fileContents } from './data.js';

export function initActivityBar(fileStructure) {
  const btns = document.querySelectorAll('.activity-bar__btn');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.dataset.panel;
      const sidebar = document.getElementById('sidebar');

      // If clicking the already-active panel, toggle sidebar collapse
      if (btn.classList.contains('is-active')) {
        document.querySelector('.workspace').classList.toggle('sidebar-collapsed');
        return;
      }

      // Remove active from all, set on clicked
      btns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Show corresponding panel
      document.querySelectorAll('.sidebar__panel').forEach(p => p.classList.remove('is-active'));
      const target = document.getElementById(`panel-${panel}`);
      if (target) target.classList.add('is-active');

      // Ensure sidebar is visible
      document.querySelector('.workspace').classList.remove('sidebar-collapsed');
    });
  });

  // Search panel — live search across file contents
  const searchInput = document.getElementById('sidebarSearchInput');
  const searchResults = document.getElementById('sidebarSearchResults');

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      if (!query || query.length < 2) return;

      const allFiles = flattenFiles(fileStructure);
      let matchCount = 0;

      for (const file of allFiles) {
        if (matchCount >= 20) break;
        const content = fileContents[file.id];
        if (!content) continue;

        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const idx = line.toLowerCase().indexOf(query);
          if (idx === -1) continue;

          const before = escHtml(line.slice(0, idx));
          const match = escHtml(line.slice(idx, idx + query.length));
          const after = escHtml(line.slice(idx + query.length, idx + query.length + 60));

          const el = document.createElement('div');
          el.className = 'sidebar-search__match';
          el.innerHTML = `
            <span class="sidebar-search__match-file">${file.name} · line ${i + 1}</span>
            <span class="sidebar-search__match-line">${before}<mark>${match}</mark>${after}</span>
          `;
          el.addEventListener('click', () => {
            import('./tabs.js').then(({ openTab }) => openTab(file));
          });
          searchResults.appendChild(el);
          matchCount++;
          if (matchCount >= 20) break;
        }
      }

      if (matchCount === 0) {
        searchResults.innerHTML = `<div style="padding:12px 6px;color:var(--color-text-secondary);font-size:12px">No results for "${escHtml(query)}"</div>`;
      }
    });
  }
}

function flattenFiles(node, acc = []) {
  if (node.type === 'file') { acc.push(node); return acc; }
  if (node.children) node.children.forEach(c => flattenFiles(c, acc));
  return acc;
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
