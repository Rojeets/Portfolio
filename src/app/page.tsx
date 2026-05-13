'use client'
import { useState, useEffect } from 'react'
import Terminal from '../components/Terminal'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import GitHubRepos from '../components/GitHubRepos'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const [mode, setMode] = useState('ui')

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [])

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
      <GitHubRepos />
      <Contact />
      <Footer setMode={setMode} />
    </div>
  )
}
