import Scene from './three/Scene'
import StaticScene from './three/StaticScene'

import Hero from './components/Hero'
import MythicSection from './components/MythicSection'
import RareSection from './components/RareSection'
import CardsSection from './components/CardsSection'

import { useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function App() {
  const cardsGroupRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const mythicSectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current || !mythicSectionRef.current) return

    const tl = gsap.timeline({ paused: true })

    tl.to(window, {
      duration: 1.2,
      scrollTo: {
        y: mythicSectionRef.current,
        autoKill: false
      },
      ease: 'power2.inOut'
    })

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '10% top',
      onEnter: () => {
        console.log('PLAY CARAIO')
        tl.restart()
      }
    })

    return () => {
      trigger.kill()
      tl.kill()
    }
  }, [window, sectionRef, mythicSectionRef])

  return (
    <main className="app">
      <div className="relative" ref={sectionRef}>
        {/* 3D scene */}

        <Scene sectionRef={sectionRef} />

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
