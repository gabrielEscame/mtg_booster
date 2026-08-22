import Scene from './three/Scene'
import StaticScene from './three/StaticScene'

import Hero from './components/Hero'
import MythicSection from './components/MythicSection'
import RareSection from './components/RareSection'
import CardsSection from './components/CardsSection'

import { useRef, useState } from 'react'
import useHeroTimeline from './three/hooks/useHeroTimeLine'

import { type Group } from 'three'

export default function App() {
  const cardsGroupRef = useRef<HTMLDivElement | null>(null)
  const animationContainerRef = useRef<HTMLDivElement | null>(null)
  const mythicSectionRef = useRef<HTMLElement | null>(null)

  const [boosterNode, setBoosterNode] = useState<Group | null>(null)
  
  useHeroTimeline({
    animationContainerRef,
    mythicSectionRef,
    boosterNode
  })

  return (
    <main className="app">
      <div className="relative" ref={animationContainerRef}>
        {/* 3D scene */}

        <Scene setBoosterNode={setBoosterNode} />

        {/* Sections */}
        <Hero />
        <MythicSection ref={mythicSectionRef} />
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
