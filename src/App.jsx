import { useState } from 'react'
import Terminal from './components/Terminal'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [mode, setMode] = useState('ui') // 'ui' or 'terminal'

  if (mode === 'terminal') {
    return <Terminal setMode={setMode} />
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navigation setMode={setMode} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer setMode={setMode} />
    </div>
  )
}

export default App
