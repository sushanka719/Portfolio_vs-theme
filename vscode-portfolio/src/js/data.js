export const fileStructure = {
  id: 'root',
  name: 'Portfolio',
  type: 'folder',
  expanded: true,
  children: [
    { id: 'home-html',   name: 'home.html',   type: 'file', ext: 'html', path: 'home.html'   },
    { id: 'about-html',  name: 'about.html',  type: 'file', ext: 'html', path: 'about.html'  },
    { id: 'contact-me',  name: 'contactMe.html', type: 'file', ext: 'html', path: 'contactMe.html' },
    {
      id: 'projects-folder',
      name: 'Projects',
      type: 'folder',
      expanded: false,
      children: [
        {
          id: 'project-ecommerce',
          name: 'ecommerce-app',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'proj1-overview', name: 'overview.md',   type: 'file', ext: 'md',   path: 'projects/ecommerce-app/overview.md'   },
            { id: 'proj1-features', name: 'features.json', type: 'file', ext: 'json', path: 'projects/ecommerce-app/features.json' },
          ],
        },
        {
          id: 'project-dating',
          name: 'dating-app',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'proj2-overview', name: 'overview.md', type: 'file', ext: 'md', path: 'projects/dating-app/overview.md' },
          ],
        },
        {
          id: 'project-teenpatti',
          name: 'teen-patti-game',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'proj3-overview', name: 'overview.md', type: 'file', ext: 'md', path: 'projects/teen-patti-game/overview.md' },
          ],
        },
      ],
    },
    {
      id: 'experience-folder',
      name: 'Experience',
      type: 'folder',
      expanded: false,
      children: [
        { id: 'skills-json',    name: 'skills.json',    type: 'file', ext: 'json', path: 'experience/skills.json'    },
        { id: 'timeline-json',  name: 'timeline.json',  type: 'file', ext: 'json', path: 'experience/timeline.json'  },
        { id: 'education-json', name: 'education.json', type: 'file', ext: 'json', path: 'experience/education.json' },
      ],
    },
    { id: 'env-file',       name: '.env',           type: 'file', ext: 'env',  path: '.env'           },
    { id: 'gitignore',     name: '.gitignore',     type: 'file', ext: 'gitignore', path: '.gitignore' },
    { id: 'resume-pdf',     name: 'resume.pdf',     type: 'file', ext: 'pdf',  path: 'resume.pdf'     },
    { id: 'package-json',  name: 'package.json',  type: 'file', ext: 'json', path: 'package.json'  },
    { id: 'settings-json', name: 'settings.json', type: 'file', ext: 'json', path: 'settings.json' },
  ],
};

const GH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;

export const fileContents = {

  'home-html': `<div class="content-home">
  <h1 class="content-home__greeting">Hi, I'm <span class="accent-blue">Sushanka Karki</span> 👋</h1>
  <p class="content-home__role">Full Stack Developer &nbsp;·&nbsp; Kausaltar, Bhaktapur</p>
  <p class="content-home__bio">
    Motivated full-stack developer with hands-on experience building real-world web applications —
    from ERP systems and e-commerce platforms to real-time multiplayer games. I write clean, scalable code
    and ship things that work.
  </p>
  <div class="content-home__links">
    <a href="https://github.com/sushanka719" target="_blank" rel="noopener" class="btn btn--primary">
      ${GH_SVG} GitHub
    </a>
    <a href="https://linkedin.com/in/sushanka-karki-73b50522b/" target="_blank" rel="noopener" class="btn btn--secondary">LinkedIn</a>
    <a href="mailto:karkisushanka719@gmail.com" class="btn btn--ghost">karkisushanka719@gmail.com</a>
  </div>
</div>`,

  'about-html': `<div class="content-about">
  <h2 class="content-section__title"><span class="comment">// </span>about_me.html</h2>
  <div class="content-about__grid">
    <div class="content-about__text">
      <p>I'm <strong>Sushanka Karki</strong>, a full-stack developer based in Kausaltar, Bhaktapur with a strong foundation in both frontend and backend development.</p>
      <p>Currently working at <span class="accent-blue">CSTC Pvt. Ltd</span> maintaining and enhancing ERP systems, and upgrading legacy apps to modern .NET MVC architecture. Previously at <span class="accent-type">Phoenix-Doorje</span> contributing to <em>Doorje.com</em> and the <em>PanditJi App</em>.</p>
      <p>I enjoy building everything from real-time multiplayer games to full-stack e-commerce platforms. I work best with <span class="accent-yellow">React</span>, <span class="accent-green">Node.js</span>, and <span class="accent-blue">Next.js</span> — and I'm always picking up new tools.</p>
    </div>
    <div class="content-about__tags">
      <span class="tag">JavaScript</span>
      <span class="tag">TypeScript</span>
      <span class="tag">React</span>
      <span class="tag">Next.js</span>
      <span class="tag">Node.js</span>
      <span class="tag">Express.js</span>
      <span class="tag">NestJS</span>
      <span class="tag">PostgreSQL</span>
      <span class="tag">MongoDB</span>
      <span class="tag">Redis</span>
      <span class="tag">Prisma</span>
      <span class="tag">Socket.IO</span>
      <span class="tag">Docker</span>
      <span class="tag">JWT / OAuth</span>
    </div>
  </div>
</div>`,

  'contact-me': `<div class="content-contact">
  <h2 class="content-section__title"><span class="comment">// </span>contactMe.html</h2>
  <p class="contact-intro">
    I'm open to new opportunities — freelance, full-time, or collaboration.<br>
    Drop me a message and I'll get back to you.
  </p>

  <div class="contact-layout">
    <form class="contact-form" id="contactForm" onsubmit="handleContactSubmit(event)">
      <div class="form-group">
        <label class="form-label" for="cf-name">Name</label>
        <input class="form-input" id="cf-name" type="text" placeholder="Your name" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-email">Email</label>
        <input class="form-input" id="cf-email" type="email" placeholder="you@example.com" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-subject">Subject</label>
        <input class="form-input" id="cf-subject" type="text" placeholder="What's this about?" />
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-message">Message</label>
        <textarea class="form-input form-textarea" id="cf-message" rows="5" placeholder="Your message..." required></textarea>
      </div>
      <button type="submit" class="btn btn--primary form-submit">Send Message</button>
      <div id="cf-status" class="form-status"></div>
    </form>

    <div class="contact-sidebar">
      <p class="contact-sidebar__label"><span class="comment">// </span>or reach me directly</p>
      <div class="contact-links">
        <a href="mailto:karkisushanka719@gmail.com" class="contact-item">
          <span class="contact-item__icon">✉</span>
          <span class="contact-item__label">karkisushanka719@gmail.com</span>
        </a>
        <a href="tel:+9779844396037" class="contact-item">
          <span class="contact-item__icon">📞</span>
          <span class="contact-item__label">(984) 439-6037</span>
        </a>
        <a href="https://github.com/sushanka719" target="_blank" rel="noopener" class="contact-item">
          <span class="contact-item__icon">${GH_SVG}</span>
          <span class="contact-item__label">github.com/sushanka719</span>
        </a>
        <a href="https://linkedin.com/in/sushanka-karki-73b50522b/" target="_blank" rel="noopener" class="contact-item">
          <span class="contact-item__icon" style="font-weight:800;font-size:11px;">in</span>
          <span class="contact-item__label">sushanka-karki-73b50522b</span>
        </a>
      </div>
      <div class="contact-status-badge">
        <span class="status-dot"></span>
        Available for new projects
      </div>
    </div>
  </div>

  <script>
    function handleContactSubmit(e) {
      e.preventDefault();
      const status = document.getElementById('cf-status');
      const btn = e.target.querySelector('.form-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        status.textContent = '✓ Message sent! I\\'ll get back to you soon.';
        status.className = 'form-status form-status--success';
        btn.textContent = 'Send Message';
        btn.disabled = false;
        e.target.reset();
      }, 1200);
    }
  </script>
</div>`,

  'proj1-overview': `# E-Commerce Web Application

Full-stack eCommerce platform built with the MERN stack.

## Tech Stack
- React, Node.js, Express, MongoDB
- JWT Authentication + Nodemailer (email verification)
- Stripe Payment Integration

## Features
- User auth with email verification
- Product catalog with full CRUD
- Admin Panel — product management & order tracking
- Add to cart, checkout, and real-time order status updates
- Stripe payment gateway integration

## GitHub
github.com/sushanka719`,

  'proj1-features': JSON.stringify({
    auth: 'JWT + email verification via Nodemailer',
    payments: 'Stripe integration',
    adminPanel: ['Product CRUD', 'Order management', 'User management'],
    userFeatures: ['Cart', 'Checkout', 'Real-time order tracking'],
    stack: { frontend: 'React', backend: 'Node.js + Express', database: 'MongoDB' },
  }, null, 2),

  'proj2-overview': `# Dating App

Full-stack dating application with smart matching and real-time chat.

## Tech Stack
- React, Node.js, Express, MongoDB
- Socket.IO (real-time chat)
- JWT Authentication

## Features
- JWT auth + profile image uploads
- Smart matching algorithm based on preferences & proximity
- Swipe mechanic — match requests and accepts
- Real-time 1-on-1 chat via Socket.IO
- Profile editing and admin panel

## GitHub
github.com/sushanka719`,

  'proj3-overview': `# Teen Patti Game (Freelance)

Real-time multiplayer card game — Teen Patti.

## Role
Freelance Backend Developer (Remote) · Jan 2025 – Feb 2025

## Tech Stack
- Backend: NestJS, REST APIs, game logic
- Frontend: React, TypeScript, Tailwind CSS
- Real-time: Socket.IO

## Responsibilities
- Implemented secure backend APIs and game logic in NestJS
- Built responsive game UI in React + TypeScript
- Managed real-time player communication with Socket.IO`,

  'skills-json': JSON.stringify({
    languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'PHP', 'C', 'C#'],
    frontend: ['React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'NestJS', 'Prisma', 'REST APIs', 'WebSocket', 'OAuth', 'JWT'],
    databases: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL', 'SSMS'],
    tools: ['Git', 'GitHub', 'GitLab', 'Docker', 'Postman', 'VS Code', 'npm', 'yarn', 'ESLint'],
    integrations: ['Stripe', 'Socket.IO', 'Nodemailer', 'Payment Integration'],
  }, null, 2),

  'timeline-json': JSON.stringify([
    {
      period: 'Dec 2025 – Present',
      role: 'Full-Stack Developer',
      company: 'CSTC Pvt. Ltd',
      type: 'On-site',
      highlights: [
        'Maintaining and enhancing ERP system using HTML, CSS, JavaScript',
        'Upgrading legacy applications to modern .NET MVC architecture',
        'Database operations with SSMS and MySQL',
        'Agile team collaboration for scalable, stable systems',
      ],
    },
    {
      period: 'Mar 2025 – Dec 2025',
      role: 'Full-Stack Developer',
      company: 'Phoenix-Doorje',
      type: 'On-site',
      highlights: [
        'Contributed to Doorje.com frontend using Next.js',
        'Worked on PanditJi App with PostgreSQL, Prisma, and Next.js',
        'Adopted Agile methodologies in a professional dev workflow',
        'Hands-on with React, Next.js, and backend integration',
      ],
    },
    {
      period: 'Jan 2025 – Feb 2025',
      role: 'Freelance Backend Developer',
      company: 'Teen Patti Game',
      type: 'Remote',
      highlights: [
        'Built real-time multiplayer Teen Patti card game backend',
        'Implemented secure APIs and game logic with NestJS',
        'Frontend: React, TypeScript, Tailwind CSS + Socket.IO',
      ],
    },
  ], null, 2),

  'education-json': JSON.stringify({
    degrees: [
      {
        title: 'Bachelors in Computer Application (BCA)',
        institution: 'TU Affiliated College',
        location: 'Bhaktapur, Nepal',
        period: 'Jan 2021 – Present',
        status: 'In Progress',
        highlights: ['Data Structures & Algorithms', 'Database Management', 'Web Technologies', 'Software Engineering'],
      },
      {
        title: '+2 Science',
        institution: 'Higher Secondary School',
        location: 'Bhaktapur, Nepal',
        period: 'Dec 2018 – 2020',
        status: 'Completed',
      },
    ],
  }, null, 2),

  'gitignore': `# Dependencies
node_modules/
.pnp
.pnp.js

# Build output
dist/
build/
.vite/

# !! ALWAYS add .env to .gitignore !!
# Never commit secrets to version control.
.env
.env.local
.env.*.local
.env.production

# Editor
.vscode/settings.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log
`,

  'env-file': `# 🔐 Environment Variables
# !! This file is in .gitignore — NEVER commit it to git !!
# If you're reading this... you found the easter egg 🎉
#
# Rule #1 of dev club: .env goes in .gitignore
# Rule #2 of dev club: .env goes in .gitignore
# Rule #3: Rotate your keys if you ever accidentally push them.

VITE_APP_NAME="Sushanka Portfolio"
VITE_APP_VERSION="1.0.0"

# API Keys (fake, obviously 😄)
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_CONTACT_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Database (not a real one!)
DATABASE_URL=postgresql://sushanka:hunter2@localhost:5432/portfolio

# Secrets
JWT_SECRET=this-is-not-my-real-secret-lol
SESSION_SECRET=please-dont-hardcode-secrets-in-code

# 🥚 Easter Egg
EASTER_EGG="Nice find! You know your way around a codebase 👀"
HIRE_ME=true
COFFEE_PREFERENCE="Black, no sugar"
`,

  'package-json': JSON.stringify({
    name: "sushanka-portfolio",
    version: "1.0.0",
    description: "VSCode-themed interactive developer portfolio",
    author: "Sushanka Karki <karkisushanka719@gmail.com>",
    license: "MIT",
    private: true,
    scripts: {
      dev:     "vite",
      build:   "vite build",
      preview: "vite preview",
      lint:    "eslint src --ext .js --fix",
      test:    "vitest run",
      format:  "prettier --write \"src/**/*.{js,css,html}\"",
      clean:   "rm -rf dist node_modules/.vite",
      deploy:  "npm run build && vercel --prod",
    },
    dependencies: {
      prismjs: "^1.29.0",
    },
    devDependencies: {
      vite:      "^5.0.0",
      eslint:    "^8.57.0",
      prettier:  "^3.2.5",
      vitest:    "^1.4.0",
      vercel:    "^34.0.0",
    },
    engines: {
      node: ">=18.0.0",
      npm:  ">=9.0.0",
    },
    repository: {
      type: "git",
      url:  "https://github.com/sushanka719/portfolio",
    },
    keywords: ["portfolio", "vscode", "react", "nextjs", "fullstack"],
  }, null, 2),

  'settings-json': JSON.stringify({
    'editor.fontFamily': "'Monaco', 'Menlo', monospace",
    'editor.fontSize': 13,
    'editor.tabSize': 2,
    'workbench.colorTheme': 'Default Dark+',
    'portfolio.version': '1.0.0',
    'portfolio.author': 'Sushanka Karki',
    'portfolio.email': 'karkisushanka719@gmail.com',
    'portfolio.github': 'github.com/sushanka719',
    'portfolio.openToWork': true,
  }, null, 2),
};
