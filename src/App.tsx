import Scene from './three/Scene'
import StaticScene from './three/StaticScene'

import Hero from './components/Hero'
import MythicSection from './components/MythicSection'
import RareSection from './components/RareSection'
import CardsSection from './components/CardsSection'

import { useRef } from 'react'

export default function App() {
  const cardsGroupRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  return (
    <main className="app">
      <div className="relative" ref={sectionRef}>
        {/* 3D scene */}

        <Scene animationSection={sectionRef.current}/>

        {/* Sections */}
        <Hero />
        <MythicSection />
        <RareSection />
      </div>

      <div className="relative h-[200vh]" ref={cardsGroupRef}>
        <div className="sticky top-0 h-screen">
          <CardsSection />
          <StaticScene cardsGroupRef={cardsGroupRef} />
        </div>
      </div>
    </main>
  )
}
