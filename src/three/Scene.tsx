import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'

import Booster from './Booster'
import Cards from './Cards'

const Scene = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const animationHeight = window.innerHeight * 3
      const progress = THREE.MathUtils.clamp(
        window.scrollY / animationHeight,
        0,
        1
      )

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-20">
      <Canvas
        camera={{
          position: [0, 0, 5.8],
          fov: 40
        }}
      >
        <ambientLight intensity={0.03} />

        <directionalLight position={[3, 4, 5]} intensity={0.4} />

        <Booster progress={scrollProgress} />

        <Cards progress={scrollProgress} />

        <Environment preset="studio" environmentIntensity={0.35} />
      </Canvas>
    </div>
  )
}

export default Scene
