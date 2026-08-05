import Scene from './three/Scene'
import StaticScene from './three/StaticScene'

import Hero from './components/Hero'
import MythicSection from './components/MythicSection'
import RareSection from './components/RareSection'
import CardsSection from './components/CardsSection'

export default function App() {
  return (
    <main className="app">
      <div className="relative">
        {/* 3D scene */}

        <Scene />

        {/* Sections */}
        <Hero />
        <MythicSection />
        <RareSection />
      </div>

      <div className="relative">
        <StaticScene />
        <CardsSection />
      </div>
    </main>
  )
}
