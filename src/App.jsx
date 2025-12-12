function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 dark:bg-black/30 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold text-xl tracking-tight">Rojeets</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#projects" className="hover:text-primary">Projects</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </nav>
        <a href="#contact" className="md:inline-flex hidden px-3 py-2 rounded-md bg-primary text-white hover:bg-primary-dark">Get in touch</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Creative Frontend Developer
            </h1>
            <p className="mt-4 text-lg text-black/70 dark:text-white/70">
              Building responsive, accessible, and delightful web experiences with React & Tailwind.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#projects" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark">View Work</a>
              <a href="#contact" className="px-4 py-2 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10">Contact</a>
            </div>
          </div>
          <div className="md:block hidden">
            <div className="aspect-square rounded-2xl bg-gradient-to-tr from-primary/20 via-accent/20 to-purple-400/20 border border-black/5 dark:border-white/10" />
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-black/70 dark:text-white/70">{subtitle}</p>}
    </div>
  )
}

function About() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title="About Me" subtitle="I craft modern UIs with performance and accessibility in mind." />
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Responsive UIs',
              desc: 'Mobile-first layouts, fluid grids, and adaptive components.',
            },
            { title: 'Performance', desc: 'Optimized assets, code-splitting, and best practices.' },
            { title: 'Accessibility', desc: 'Semantic HTML, ARIA, and keyboard-friendly interactions.' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const projects = [
    { title: 'Landing Page', tags: ['React', 'Tailwind'], link: '#' },
    { title: 'Dashboard UI', tags: ['React', 'Charts'], link: '#' },
    { title: 'Portfolio', tags: ['Vite', 'SPA'], link: '#' },
  ]
  return (
    <section id="projects" className="py-16 sm:py-20 bg-black/5 dark:bg-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title="Featured Projects" subtitle="A selection of recent works and experiments." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <a key={p.title} href={p.link} className="group block rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
              <div className="h-40 bg-gradient-to-br from-primary/20 via-accent/20 to-purple-400/20" />
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-primary">{p.title}</h3>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs rounded-full bg-black/5 dark:bg-white/10">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title="Let’s Work Together" subtitle="Have a project in mind? I’m available for freelance and collaborations." />
        <form className="mt-8 max-w-xl mx-auto grid gap-4">
          <input className="px-4 py-3 rounded-md border border-black/10 dark:border-white/20 bg-white/70 dark:bg-white/10" placeholder="Your name" />
          <input className="px-4 py-3 rounded-md border border-black/10 dark:border-white/20 bg-white/70 dark:bg-white/10" placeholder="Your email" />
          <textarea className="px-4 py-3 rounded-md border border-black/10 dark:border-white/20 bg-white/70 dark:bg-white/10" rows={4} placeholder="Tell me about your project" />
          <button type="button" className="px-4 py-3 rounded-md bg-primary text-white hover:bg-primary-dark">Send Message</button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between text-sm">
        <p className="text-black/60 dark:text-white/60">© {new Date().getFullYear()} Rojeets</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">GitHub</a>
          <a href="#" className="hover:text-primary">LinkedIn</a>
          <a href="#" className="hover:text-primary">Twitter/X</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh bg-white dark:bg-black text-black dark:text-white">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
