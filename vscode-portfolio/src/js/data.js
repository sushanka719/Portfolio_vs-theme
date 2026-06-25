export const fileStructure = {
  id: 'root',
  name: 'portfolio',
  type: 'folder',
  expanded: true,
  children: [
    {
      id: 'node-modules',
      name: 'node_modules',
      type: 'folder',
      expanded: false,
      children: [
        {
          id: 'nm-react',
          name: 'react',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'nm-react-pkg', name: 'package.json', type: 'file', ext: 'json', path: 'node_modules/react/package.json' },
            { id: 'nm-react-idx', name: 'index.js',     type: 'file', ext: 'js',   path: 'node_modules/react/index.js'     },
          ],
        },
        {
          id: 'nm-react-dom',
          name: 'react-dom',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'nm-reactdom-pkg',    name: 'package.json', type: 'file', ext: 'json', path: 'node_modules/react-dom/package.json' },
            { id: 'nm-reactdom-client', name: 'client.js',    type: 'file', ext: 'js',   path: 'node_modules/react-dom/client.js'    },
          ],
        },
        {
          id: 'nm-vitejs-scope',
          name: '@vitejs',
          type: 'folder',
          expanded: false,
          children: [
            {
              id: 'nm-plugin-react',
              name: 'plugin-react',
              type: 'folder',
              expanded: false,
              children: [
                { id: 'nm-plugin-react-pkg', name: 'package.json', type: 'file', ext: 'json', path: 'node_modules/@vitejs/plugin-react/package.json' },
              ],
            },
          ],
        },
        {
          id: 'nm-vite',
          name: 'vite',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'nm-vite-pkg', name: 'package.json', type: 'file', ext: 'json', path: 'node_modules/vite/package.json' },
            {
              id: 'nm-vite-bin',
              name: 'bin',
              type: 'folder',
              expanded: false,
              children: [
                { id: 'nm-vite-cli', name: 'vite.js', type: 'file', ext: 'js', path: 'node_modules/vite/bin/vite.js' },
              ],
            },
          ],
        },
        {
          id: 'nm-eslint',
          name: 'eslint',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'nm-eslint-pkg', name: 'package.json', type: 'file', ext: 'json', path: 'node_modules/eslint/package.json' },
          ],
        },
        {
          id: 'nm-eslint-react',
          name: 'eslint-plugin-react',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'nm-eslint-react-pkg', name: 'package.json', type: 'file', ext: 'json', path: 'node_modules/eslint-plugin-react/package.json' },
          ],
        },
        {
          id: 'nm-prettier',
          name: 'prettier',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'nm-prettier-pkg', name: 'package.json', type: 'file', ext: 'json', path: 'node_modules/prettier/package.json' },
            { id: 'nm-prettier-idx', name: 'index.js',     type: 'file', ext: 'js',   path: 'node_modules/prettier/index.js'     },
          ],
        },
        {
          id: 'nm-prismjs',
          name: 'prismjs',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'nm-prismjs-pkg', name: 'package.json', type: 'file', ext: 'json', path: 'node_modules/prismjs/package.json' },
          ],
        },
      ],
    },
    {
      id: 'public-folder',
      name: 'public',
      type: 'folder',
      expanded: false,
      children: [
        { id: 'public-favicon', name: 'favicon.svg', type: 'file', ext: 'svg',  path: 'public/favicon.svg' },
        { id: 'public-robots',  name: 'robots.txt',  type: 'file', ext: 'txt',  path: 'public/robots.txt'  },
        { id: 'public-og',      name: 'og-image.png', type: 'file', ext: 'png', path: 'public/og-image.png' },
      ],
    },
    {
      id: 'src-folder',
      name: 'src',
      type: 'folder',
      expanded: false,
      children: [
        { id: 'src-main', name: 'main.jsx', type: 'file', ext: 'jsx', path: 'src/main.jsx' },
        { id: 'src-app',  name: 'App.jsx',  type: 'file', ext: 'jsx', path: 'src/App.jsx'  },
        {
          id: 'src-components',
          name: 'components',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'src-navbar',     name: 'Navbar.jsx',     type: 'file', ext: 'jsx', path: 'src/components/Navbar.jsx'     },
            { id: 'src-hero',       name: 'Hero.jsx',       type: 'file', ext: 'jsx', path: 'src/components/Hero.jsx'       },
            { id: 'src-about',      name: 'About.jsx',      type: 'file', ext: 'jsx', path: 'src/components/About.jsx'      },
            { id: 'src-projects',   name: 'Projects.jsx',   type: 'file', ext: 'jsx', path: 'src/components/Projects.jsx'   },
            { id: 'src-experience', name: 'Experience.jsx', type: 'file', ext: 'jsx', path: 'src/components/Experience.jsx' },
            { id: 'src-contact',    name: 'Contact.jsx',    type: 'file', ext: 'jsx', path: 'src/components/Contact.jsx'    },
          ],
        },
        {
          id: 'src-hooks',
          name: 'hooks',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'src-usescroll', name: 'useScrollReveal.js', type: 'file', ext: 'js', path: 'src/hooks/useScrollReveal.js' },
          ],
        },
        {
          id: 'src-data',
          name: 'data',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'src-data-projects',   name: 'projects.js',   type: 'file', ext: 'js', path: 'src/data/projects.js'   },
            { id: 'src-data-experience', name: 'experience.js', type: 'file', ext: 'js', path: 'src/data/experience.js' },
          ],
        },
        {
          id: 'src-styles',
          name: 'styles',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'src-appcss', name: 'App.css', type: 'file', ext: 'css', path: 'src/styles/App.css' },
          ],
        },
        {
          id: 'src-assets',
          name: 'assets',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'src-gitkeep', name: '.gitkeep', type: 'file', ext: 'gitignore', path: 'src/assets/.gitkeep' },
          ],
        },
      ],
    },
    { id: 'index-html',    name: 'index.html',     type: 'file', ext: 'html',      path: 'index.html'     },
    { id: 'vite-config',   name: 'vite.config.js', type: 'file', ext: 'js',        path: 'vite.config.js' },
    { id: 'env-file',      name: '.env',            type: 'file', ext: 'env',       path: '.env'           },
    { id: 'gitignore',     name: '.gitignore',      type: 'file', ext: 'gitignore', path: '.gitignore'     },
    { id: 'resume-pdf',    name: 'resume.pdf',      type: 'file', ext: 'pdf',       path: 'resume.pdf'     },
    { id: 'package-json',  name: 'package.json',    type: 'file', ext: 'json',      path: 'package.json'   },
    { id: 'settings-json', name: 'settings.json',   type: 'file', ext: 'json',      path: 'settings.json'  },
  ],
};

export const fileContents = {

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
    description: "VSCode-themed interactive developer portfolio built with React + Vite",
    author: "Sushanka Karki <karkisushanka719@gmail.com>",
    license: "MIT",
    private: true,
    scripts: {
      dev:     "vite",
      build:   "vite build",
      preview: "vite preview",
      lint:    "eslint src --ext .js,.jsx --fix",
      test:    "vitest run",
      format:  "prettier --write \"src/**/*.{js,jsx,css}\"",
      clean:   "rm -rf dist node_modules/.vite",
      deploy:  "npm run build && vercel --prod",
    },
    dependencies: {
      react:    "^18.3.1",
      "react-dom": "^18.3.1",
    },
    devDependencies: {
      "@vitejs/plugin-react": "^4.3.1",
      vite:      "^5.0.0",
      eslint:    "^8.57.0",
      "eslint-plugin-react": "^7.34.3",
      "eslint-plugin-react-hooks": "^4.6.2",
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
    keywords: ["portfolio", "vscode", "react", "vite", "fullstack"],
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

  'index-html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sushanka Karki — Full Stack Developer portfolio" />
    <title>Sushanka Karki — Full Stack Developer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,

  'vite-config': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})`,

  'src-main': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,

  'src-app': `import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}`,

  'src-navbar': `import { useState, useEffect } from 'react'

const NAV_LINKS = ['About', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={\`navbar \${scrolled ? 'navbar--scrolled' : ''}\`}>
      <a href="#home" className="navbar__logo">SK</a>

      <ul className={\`navbar__links \${menuOpen ? 'is-open' : ''}\`}>
        {NAV_LINKS.map(label => (
          <li key={label}>
            <a href={\`#\${label.toLowerCase()}\`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="https://github.com/sushanka719"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta"
          >
            GitHub
          </a>
        </li>
      </ul>

      <button
        className="navbar__burger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}`,

  'src-hero': `export default function Hero() {
  return (
    <section className="hero" id="home">
      <p className="hero__greeting">Hi, I'm</p>
      <h1 className="hero__name">Sushanka Karki</h1>
      <h2 className="hero__title">Full Stack Developer</h2>
      <p className="hero__location">📍 Kausaltar, Bhaktapur, Nepal</p>
      <p className="hero__bio">
        Motivated full-stack developer with hands-on experience building real-world
        web applications — from ERP systems and e-commerce platforms to real-time
        multiplayer games. I write clean, scalable code and ship things that work.
      </p>
      <div className="hero__actions">
        <a
          href="https://github.com/sushanka719"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/sushanka-karki-73b50522b/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary"
        >
          LinkedIn
        </a>
        <a href="#contact" className="btn btn--ghost">
          Hire Me
        </a>
      </div>
    </section>
  )
}`,

  'src-about': `const SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'Express.js', 'NestJS', 'Prisma',
  'PostgreSQL', 'MongoDB', 'Redis', 'Socket.IO',
  'Docker', 'JWT / OAuth', 'Stripe', 'REST APIs',
]

export default function About() {
  return (
    <section className="about" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about__grid">
        <div className="about__text">
          <p>
            I'm <strong>Sushanka Karki</strong>, a full-stack developer based in
            Kausaltar, Bhaktapur with a strong foundation in both frontend and
            backend development.
          </p>
          <p>
            Currently working at <strong>CSTC Pvt. Ltd</strong> maintaining and
            enhancing ERP systems, and upgrading legacy apps to modern .NET MVC
            architecture. Previously at <strong>Phoenix-Doorje</strong> contributing
            to Doorje.com and the PanditJi App.
          </p>
          <p>
            I enjoy building everything from real-time multiplayer games to full-stack
            e-commerce platforms. I work best with React, Node.js, and Next.js —
            and I'm always picking up new tools.
          </p>
        </div>
        <div className="about__skills">
          {SKILLS.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}`,

  'src-projects': `const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-stack eCommerce platform with user auth, product catalog with full CRUD, ' +
      'admin panel, cart, checkout, and real-time order tracking. Stripe payment gateway.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe', 'Nodemailer'],
    github: 'https://github.com/sushanka719',
  },
  {
    id: 2,
    title: 'Dating App',
    description:
      'Smart matching dating application with swipe mechanic, proximity-based matching ' +
      'algorithm, profile image uploads, and real-time 1-on-1 chat via Socket.IO.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT'],
    github: 'https://github.com/sushanka719',
  },
  {
    id: 3,
    title: 'Teen Patti Game',
    description:
      'Real-time multiplayer Teen Patti card game. Freelance backend role — built secure ' +
      'NestJS APIs and game logic. Frontend in React + TypeScript with Socket.IO.',
    stack: ['NestJS', 'React', 'TypeScript', 'Tailwind CSS', 'Socket.IO', 'REST APIs'],
    github: 'https://github.com/sushanka719',
  },
]

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Projects</h2>
      <div className="projects__grid">
        {PROJECTS.map(project => (
          <article key={project.id} className="project-card">
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.description}</p>
            <div className="project-card__stack">
              {project.stack.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              View on GitHub →
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}`,

  'src-experience': `const TIMELINE = [
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
]

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {TIMELINE.map((job, i) => (
          <div key={i} className="timeline__item">
            <div className="timeline__track">
              <div className="timeline__dot" />
              {i < TIMELINE.length - 1 && <div className="timeline__line" />}
            </div>
            <div className="timeline__content">
              <div className="timeline__header">
                <h3 className="timeline__role">{job.role}</h3>
                <span className="timeline__badge">{job.type}</span>
              </div>
              <p className="timeline__company">{job.company}</p>
              <p className="timeline__period">{job.period}</p>
              <ul className="timeline__highlights">
                {job.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}`,

  'src-contact': `import { useState } from 'react'

const INITIAL = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent'

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    // Simulate API call
    setTimeout(() => {
      setStatus('sent')
      setForm(INITIAL)
    }, 1200)
  }

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Get In Touch</h2>
      <p className="contact__intro">
        I'm open to new opportunities — freelance, full-time, or collaboration.
        Drop me a message and I'll get back to you.
      </p>
      <div className="contact__layout">
        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={5}
              required
            />
          </div>
          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status === 'sent' && (
            <p className="contact__success">✓ Message sent! I'll get back to you soon.</p>
          )}
        </form>

        <div className="contact__sidebar">
          <p className="contact__sidebar-label">// or reach me directly</p>
          <div className="contact__links">
            <a href="mailto:karkisushanka719@gmail.com">karkisushanka719@gmail.com</a>
            <a href="tel:+9779844396037">(984) 439-6037</a>
            <a href="https://github.com/sushanka719" target="_blank" rel="noopener noreferrer">
              github.com/sushanka719
            </a>
            <a
              href="https://linkedin.com/in/sushanka-karki-73b50522b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/sushanka-karki-73b50522b
            </a>
          </div>
          <div className="contact__available">
            <span className="contact__dot" />
            Available for new projects
          </div>
        </div>
      </div>
    </section>
  )
}`,

  // ── Updated JSX components using data imports ──────────────────────────────

  'src-about': `import { SKILLS } from '../data/experience.js'

export default function About() {
  return (
    <section className="about" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about__grid">
        <div className="about__text">
          <p>
            I'm <strong>Sushanka Karki</strong>, a full-stack developer based in
            Kausaltar, Bhaktapur with a strong foundation in both frontend and
            backend development.
          </p>
          <p>
            Currently working at <strong>CSTC Pvt. Ltd</strong> maintaining and
            enhancing ERP systems, and upgrading legacy apps to modern .NET MVC
            architecture. Previously at <strong>Phoenix-Doorje</strong> contributing
            to Doorje.com and the PanditJi App.
          </p>
          <p>
            I enjoy building everything from real-time multiplayer games to full-stack
            e-commerce platforms. I work best with React, Node.js, and Next.js —
            and I'm always picking up new tools.
          </p>
        </div>
        <div className="about__skills">
          {SKILLS.all.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}`,

  'src-projects': `import { PROJECTS } from '../data/projects.js'

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Projects</h2>
      <div className="projects__grid">
        {PROJECTS.map(project => (
          <article key={project.id} className="project-card">
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.description}</p>
            <div className="project-card__stack">
              {project.stack.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              View on GitHub →
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}`,

  'src-experience': `import { TIMELINE } from '../data/experience.js'

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {TIMELINE.map((job, i) => (
          <div key={i} className="timeline__item">
            <div className="timeline__track">
              <div className="timeline__dot" />
              {i < TIMELINE.length - 1 && <div className="timeline__line" />}
            </div>
            <div className="timeline__content">
              <div className="timeline__header">
                <h3 className="timeline__role">{job.role}</h3>
                <span className="timeline__badge">{job.type}</span>
              </div>
              <p className="timeline__company">{job.company}</p>
              <p className="timeline__period">{job.period}</p>
              <ul className="timeline__highlights">
                {job.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}`,

  // ── src/data/ ───────────────────────────────────────────────────────────────

  'src-data-projects': `export const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-stack eCommerce platform with user auth (JWT + email verification), ' +
      'product catalog with full CRUD, admin panel, cart, checkout, and real-time ' +
      'order status updates. Stripe payment gateway integration.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe', 'Nodemailer'],
    github: 'https://github.com/sushanka719',
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Dating App',
    description:
      'Smart matching dating application with proximity-based matching algorithm, ' +
      'swipe mechanic, profile image uploads, and real-time 1-on-1 chat via Socket.IO.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT'],
    github: 'https://github.com/sushanka719',
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Teen Patti Game',
    description:
      'Real-time multiplayer Teen Patti card game. Freelance backend developer — ' +
      'built secure NestJS APIs and game logic. Frontend in React + TypeScript ' +
      'with real-time play via Socket.IO.',
    stack: ['NestJS', 'React', 'TypeScript', 'Tailwind CSS', 'Socket.IO', 'REST APIs'],
    github: 'https://github.com/sushanka719',
    demo: null,
    featured: true,
  },
]`,

  'src-data-experience': `export const SKILLS = {
  languages:    ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'PHP', 'C', 'C#'],
  frontend:     ['React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS'],
  backend:      ['Node.js', 'Express.js', 'NestJS', 'Prisma', 'REST APIs', 'WebSocket', 'JWT', 'OAuth'],
  databases:    ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL', 'SSMS'],
  tools:        ['Git', 'GitHub', 'GitLab', 'Docker', 'Postman', 'VS Code', 'npm', 'yarn'],
  integrations: ['Stripe', 'Socket.IO', 'Nodemailer'],
  get all() {
    return [
      ...this.languages,
      ...this.frontend,
      ...this.backend,
      ...this.databases.slice(0, 4),
      'Docker', 'Git', 'JWT', 'Stripe', 'Socket.IO',
    ]
  },
}

export const TIMELINE = [
  {
    period: 'Dec 2025 – Present',
    role: 'Full-Stack Developer',
    company: 'CSTC Pvt. Ltd',
    location: 'Bhaktapur, Nepal',
    type: 'On-site',
    current: true,
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
    location: 'Bhaktapur, Nepal',
    type: 'On-site',
    current: false,
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
    location: 'Remote',
    type: 'Remote',
    current: false,
    highlights: [
      'Built real-time multiplayer Teen Patti card game backend',
      'Implemented secure APIs and game logic with NestJS',
      'Frontend: React, TypeScript, Tailwind CSS + Socket.IO',
    ],
  },
]

export const EDUCATION = [
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
]`,

  // ── src/hooks/ ──────────────────────────────────────────────────────────────

  'src-usescroll': `import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}`,

  // ── public/ ─────────────────────────────────────────────────────────────────

  'public-favicon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="14" fill="#0d1117"/>
  <text
    x="50" y="68"
    font-family="'SF Mono', 'Fira Code', monospace"
    font-size="50"
    font-weight="800"
    fill="#58a6ff"
    text-anchor="middle"
  >SK</text>
</svg>`,

  'public-robots': `User-agent: *
Allow: /

# Sitemap
Sitemap: https://sushanka-portfolio.vercel.app/sitemap.xml

# Crawl-delay
Crawl-delay: 10`,

  'public-og': `(Binary PNG — 1200×630 Open Graph image)
Used as og:image for link previews on Twitter, LinkedIn, etc.`,

  'src-gitkeep': ``,

  // ── node_modules/ package.json files ────────────────────────────────────────

  'nm-react-pkg': JSON.stringify({
    name: 'react',
    version: '18.3.1',
    description: 'React is a JavaScript library for building user interfaces.',
    license: 'MIT',
    main: 'index.js',
    repository: { type: 'git', url: 'https://github.com/facebook/react.git', directory: 'packages/react' },
    keywords: ['react'],
    homepage: 'https://reactjs.org/',
    peerDependencies: {},
  }, null, 2),

  'nm-react-idx': `'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}`,

  'nm-reactdom-pkg': JSON.stringify({
    name: 'react-dom',
    version: '18.3.1',
    description: 'React package for working with the DOM.',
    license: 'MIT',
    main: 'index.js',
    repository: { type: 'git', url: 'https://github.com/facebook/react.git', directory: 'packages/react-dom' },
    peerDependencies: { react: '^18.3.1' },
    homepage: 'https://reactjs.org/',
  }, null, 2),

  'nm-reactdom-client': `'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

if (process.env.NODE_ENV === 'production') {
  const m = require('./cjs/react-dom-client.production.min.js');
  exports.createRoot   = m.createRoot;
  exports.hydrateRoot  = m.hydrateRoot;
} else {
  const m = require('./cjs/react-dom-client.development.js');
  exports.createRoot   = m.createRoot;
  exports.hydrateRoot  = m.hydrateRoot;
}`,

  'nm-plugin-react-pkg': JSON.stringify({
    name: '@vitejs/plugin-react',
    version: '4.3.1',
    description: 'The all-in-one Vite plugin for React projects. Supports Fast Refresh, JSX transform, Babel plugins.',
    license: 'MIT',
    main: 'dist/index.cjs',
    module: 'dist/index.mjs',
    exports: { '.': { import: './dist/index.mjs', require: './dist/index.cjs' } },
    repository: { type: 'git', url: 'https://github.com/vitejs/vite-plugin-react.git' },
    peerDependencies: { vite: '^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0' },
    dependencies: { '@babel/core': '^7.24.5', '@babel/plugin-transform-react-jsx-source': '^7.24.1' },
  }, null, 2),

  'nm-vite-pkg': JSON.stringify({
    name: 'vite',
    version: '8.1.0',
    description: 'Native-ESM powered web dev build tool',
    license: 'MIT',
    main: './dist/node/index.cjs',
    module: './dist/node/index.js',
    bin: { vite: 'bin/vite.js' },
    repository: { type: 'git', url: 'https://github.com/vitejs/vite.git' },
    keywords: ['frontend', 'hmr', 'dev-server', 'build-tool', 'vite'],
    engines: { node: '^18.0.0 || ^20.0.0 || >=22.0.0' },
    peerDependencies: { sass: '*', less: '*', stylus: '*', postcss: '>=8.1.0' },
    peerDependenciesMeta: { sass: { optional: true }, less: { optional: true }, stylus: { optional: true } },
  }, null, 2),

  'nm-vite-cli': `#!/usr/bin/env node
'use strict';

// Vite CLI entry point
// Starts the dev server, build, or preview depending on the command

const { createServer, build, preview } = require('../dist/node/index.cjs');

const command = process.argv[2];

if (command === 'build') {
  build({ root: process.cwd() });
} else if (command === 'preview') {
  preview({ root: process.cwd() });
} else {
  // Default: start dev server
  createServer({ root: process.cwd() }).then(server => server.listen());
}`,

  'nm-eslint-pkg': JSON.stringify({
    name: 'eslint',
    version: '8.57.0',
    description: 'An AST-based pattern checker for JavaScript.',
    license: 'MIT',
    main: 'lib/unsupported-api.js',
    bin: { eslint: './bin/eslint.js' },
    repository: { type: 'git', url: 'https://github.com/eslint/eslint.git' },
    keywords: ['ast', 'lint', 'javascript', 'ecmascript', 'espree'],
    engines: { node: '^12.22.0 || ^14.17.0 || >=16.0.0' },
  }, null, 2),

  'nm-eslint-react-pkg': JSON.stringify({
    name: 'eslint-plugin-react',
    version: '7.34.3',
    description: 'React specific linting rules for ESLint',
    license: 'MIT',
    main: 'index.js',
    repository: { type: 'git', url: 'https://github.com/jsx-eslint/eslint-plugin-react.git' },
    keywords: ['eslint', 'eslintplugin', 'eslint-plugin', 'react'],
    peerDependencies: { eslint: '^3 || ^4 || ^5 || ^6 || ^7 || ^8' },
  }, null, 2),

  'nm-prettier-pkg': JSON.stringify({
    name: 'prettier',
    version: '3.2.5',
    description: 'Prettier is an opinionated code formatter',
    license: 'MIT',
    main: './index.cjs',
    bin: { prettier: './bin/prettier.cjs' },
    repository: { type: 'git', url: 'https://github.com/prettier/prettier.git' },
    keywords: ['code', 'formatter', 'pretty', 'printer', 'javascript', 'css', 'html', 'json'],
    engines: { node: '>=14' },
  }, null, 2),

  'nm-prettier-idx': `'use strict';
// Re-export from the compiled CJS bundle.
// Run: require('prettier') to get the full Prettier API.
module.exports = require('./src/index.cjs');`,

  'nm-prismjs-pkg': JSON.stringify({
    name: 'prismjs',
    version: '1.30.0',
    description: 'Lightweight, robust, elegant syntax highlighting. A spin-off project from Dabblet.',
    license: 'MIT',
    main: 'prism.js',
    repository: { type: 'git', url: 'https://github.com/PrismJS/prism.git' },
    keywords: ['syntax', 'highlight', 'code'],
    homepage: 'https://prismjs.com/',
  }, null, 2),

  'src-appcss': `:root {
  --bg: #0d1117;
  --surface: #161b22;
  --surface-2: #21262d;
  --border: #30363d;
  --text: #e6edf3;
  --muted: #8b949e;
  --accent: #58a6ff;
  --accent-2: #bc8cff;
  --green: #3fb950;
  --yellow: #d29922;
  --red: #f85149;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

/* ── Buttons ────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  text-decoration: none;
}
.btn--primary  { background: var(--accent); color: #0d1117; }
.btn--primary:hover { background: #79b8ff; text-decoration: none; }
.btn--secondary { background: transparent; border-color: var(--accent); color: var(--accent); }
.btn--secondary:hover { background: rgba(88,166,255,0.1); text-decoration: none; }
.btn--ghost { background: transparent; border-color: var(--border); color: var(--text); }
.btn--ghost:hover { border-color: var(--muted); text-decoration: none; }

/* ── Section shared ─────────────────────────────────────────── */
section { padding: 100px 5% 60px; max-width: 1000px; margin: 0 auto; }
.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
  color: var(--text);
}
.section-title::before { content: '// '; color: var(--muted); font-weight: 400; }

/* ── Navbar ─────────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 5%;
  z-index: 100;
  transition: background 0.2s, border-color 0.2s;
  border-bottom: 1px solid transparent;
}
.navbar--scrolled {
  background: rgba(13,17,23,0.85);
  backdrop-filter: blur(12px);
  border-color: var(--border);
}
.navbar__logo { font-weight: 800; font-size: 20px; color: var(--accent); text-decoration: none; }
.navbar__links { display: flex; list-style: none; gap: 28px; align-items: center; }
.navbar__links a { color: var(--muted); font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.15s; }
.navbar__links a:hover { color: var(--text); }
.navbar__cta { color: var(--accent) !important; border: 1px solid var(--accent); border-radius: 6px; padding: 6px 14px; }
.navbar__cta:hover { background: rgba(88,166,255,0.1); }
.navbar__burger { display: none; }

/* ── Hero ───────────────────────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 80px;
}
.hero__greeting { color: var(--accent); font-size: 18px; margin-bottom: 8px; }
.hero__name { font-size: clamp(40px, 8vw, 72px); font-weight: 800; line-height: 1.1; margin-bottom: 8px; }
.hero__title { font-size: clamp(22px, 4vw, 36px); color: var(--muted); font-weight: 400; margin-bottom: 12px; }
.hero__location { color: var(--muted); font-size: 15px; margin-bottom: 24px; }
.hero__bio { max-width: 580px; color: var(--muted); font-size: 17px; margin-bottom: 36px; line-height: 1.7; }
.hero__actions { display: flex; gap: 12px; flex-wrap: wrap; }

/* ── About ──────────────────────────────────────────────────── */
.about__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.about__text { display: flex; flex-direction: column; gap: 16px; color: var(--muted); font-size: 16px; }
.about__text strong { color: var(--text); }
.about__skills { display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; }
.skill-tag {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--accent);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
}

/* ── Projects ───────────────────────────────────────────────── */
.projects__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s, transform 0.2s;
}
.project-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.project-card__title { font-size: 18px; font-weight: 700; }
.project-card__desc { color: var(--muted); font-size: 14px; flex: 1; line-height: 1.6; }
.project-card__stack { display: flex; flex-wrap: wrap; gap: 6px; }
.tech-tag { background: var(--surface-2); color: var(--accent-2); padding: 2px 10px; border-radius: 12px; font-size: 12px; }
.project-card__link { color: var(--accent); font-size: 13px; font-weight: 600; margin-top: 4px; }

/* ── Experience / Timeline ──────────────────────────────────── */
.timeline { display: flex; flex-direction: column; gap: 0; }
.timeline__item { display: grid; grid-template-columns: 28px 1fr; gap: 20px; }
.timeline__track { display: flex; flex-direction: column; align-items: center; }
.timeline__dot { width: 12px; height: 12px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: 4px; }
.timeline__line { flex: 1; width: 2px; background: var(--border); margin: 6px 0; }
.timeline__content { padding-bottom: 40px; }
.timeline__header { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
.timeline__role { font-size: 18px; font-weight: 700; }
.timeline__badge { background: var(--surface-2); border: 1px solid var(--border); color: var(--muted); padding: 2px 10px; border-radius: 12px; font-size: 12px; }
.timeline__company { color: var(--accent); font-weight: 600; margin-bottom: 2px; }
.timeline__period { color: var(--muted); font-size: 13px; margin-bottom: 12px; }
.timeline__highlights { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.timeline__highlights li { color: var(--muted); font-size: 14px; padding-left: 16px; position: relative; }
.timeline__highlights li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); }

/* ── Contact ────────────────────────────────────────────────── */
.contact__intro { color: var(--muted); margin-bottom: 40px; max-width: 560px; }
.contact__layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.contact__form { display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 13px; color: var(--muted); }
.contact__form input,
.contact__form textarea {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.15s;
}
.contact__form input:focus,
.contact__form textarea:focus { outline: none; border-color: var(--accent); }
.contact__success { color: var(--green); font-size: 14px; }
.contact__sidebar { display: flex; flex-direction: column; gap: 20px; padding-top: 28px; }
.contact__sidebar-label { color: var(--muted); font-size: 13px; }
.contact__links { display: flex; flex-direction: column; gap: 10px; }
.contact__links a { color: var(--muted); font-size: 14px; transition: color 0.15s; }
.contact__links a:hover { color: var(--accent); text-decoration: none; }
.contact__available { display: flex; align-items: center; gap: 8px; color: var(--green); font-size: 14px; }
.contact__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; flex-shrink: 0; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .about__grid, .contact__layout { grid-template-columns: 1fr; }
  .navbar__links { display: none; }
  .navbar__links.is-open {
    display: flex; flex-direction: column;
    position: fixed; inset: 0;
    background: var(--bg);
    justify-content: center; align-items: center;
    gap: 32px; font-size: 20px;
  }
  .navbar__burger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
  .navbar__burger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; }
}`,
};
