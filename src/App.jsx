import { useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import Terminal from './components/Terminal'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

function App() {
  const [mode, setMode] = useState('ui') // 'ui' or 'terminal'
  const [pinnedTech, setPinnedTech] = useState(null)

  if (mode === 'terminal') {
    return <Terminal setMode={setMode} />
  }

  return (
    <div className="min-h-screen bg-primary">
      <LayoutGroup>
        <Navigation setMode={setMode} />
        <Hero />
        <About />
        <Skills pinnedTech={pinnedTech} onPinTech={setPinnedTech} />
        <Projects />
        <Contact />
        <Footer setMode={setMode} />
        <Sidebar pinnedTech={pinnedTech} onClose={() => setPinnedTech(null)} />
      </LayoutGroup>
    </div>
  )
}

export default App
