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
    <section id="home" className="pt-16 sm:pt-20">
      <div className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-[url('/img/img.avif')] bg-cover bg-center" />
        <div className="relative z-10 backdrop-blur-md p-8 sm:p-10 rounded-2xl bg-black/30">
          <h1 className="text-3xl sm:text-5xl font-bold">Hi, I'm Rojit</h1>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl">Freelance Developer & Enthusiast</p>
          <a href="/img/Resume.pdf" download className="mt-6 inline-block px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark">Download Resume</a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex justify-end gap-2 mt-2">
          {[
            { href: 'https://www.facebook.com/profile.php?id=100087936281420', src: '/img/face.png', alt: 'Facebook' },
            { href: 'https://www.instagram.com/rojit_404/?hl=en', src: '/img/insta.png', alt: 'Instagram' },
            { href: 'https://github.com/Rojeets', src: '/img/git.png', alt: 'GitHub' },
            { href: 'https://np.linkedin.com/in/rojit-pokharel-250957313', src: '/img/link.png', alt: 'LinkedIn' },
          ].map((s) => (
            <a key={s.alt} href={s.href} className="inline-block">
              <img src={s.src} alt={s.alt} className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
          ))}
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
        <SectionTitle title="About Me" />
        <div className="mt-8 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-lg text-black/80 dark:text-white/80">
              I am a versatile freelance developer with expertise in various technologies. My skills span frontend,
              backend, and systems programming.
            </p>
            <h3 className="mt-6 text-2xl font-semibold">What I Know</h3>
            <p className="mt-3 text-black/80 dark:text-white/80">
              On the frontend, I craft engaging user interfaces using HTML and CSS. In backend development, my proficiency
              lies in JavaScript for dynamic and scalable applications. With PHP and MySQL, I design and manage databases
              efficiently. I’m comfortable across Windows, Linux, and Kali Linux. I also have cybersecurity awareness with
              tools like Wireshark and GitHub. My knowledge extends to C and C++, enabling performance-minded solutions.
            </p>
          </div>
          <div className="md:w-2/3 md:justify-self-center">
            <img src="/img/about.jpg" alt="About" className="rounded-xl w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const projects = [
    { title: 'SimToolkit (STK)', img: '/img/simtoolkit.png', link: 'https://github.com/Rojeets/Simtoolkit', desc: 'Simple web app sim toolkit for account operations.' },
    { title: 'Console Based Tic_Tac_Toe', img: '/img/tic_tac_toe.png', link: '#', desc: 'Text-based Tic Tac Toe in C++ with win checks.' },
    { title: 'Chat Bot', img: '/img/bot.png', link: 'https://github.com/Rojeets/Chat-bot/tree/main', desc: 'Python chatbot using Gemini API and Flask.' },
    { title: 'Fire Detection', img: '/img/fire.jpg', link: 'https://github.com/Rojeets/Fire_detection_AI_ML_project_with_python/tree/main', desc: 'ML-based fire detection in video feeds.' },
    { title: 'Lave (Real estate)', img: '/img/lave.jpg', link: '#', desc: 'Clean property listing UI with categories and cards.' },
    { title: 'Rista (Dating App)', img: '/img/Rista.png', link: '#', desc: 'Secure PHP MVC app with privacy-first features.' },
    { title: 'LearnAI', img: '/img/learnai_logoo.png', link: 'https://rojeets.github.io/learn-test/', desc: 'AI-powered platform giving personalized feedback.' },
    { title: 'Movie Management', img: '/img/movie-management.png', link: 'https://github.com/yourusername/movie-management-system', desc: 'CRUD system to manage movie records.' },
  ]
  return (
    <section id="projects" className="py-16 sm:py-20 bg-black/5 dark:bg-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title="Projects" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <a key={p.title} href={p.link} className="group block rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
              <div className="h-40 flex items-center justify-center bg-white dark:bg-white/10">
                <img src={p.img} alt={p.title} className="h-16 w-auto" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">{p.desc}</p>
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
        <p className="text-black/60 dark:text-white/60">© 2024 <a className="underline hover:text-primary" href="https://www.linkedin.com/in/rojit-pokharel-250957313/?originalSubdomain=np">Rojit Pokharel</a>. All rights reserved.</p>
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
