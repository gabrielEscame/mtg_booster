import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import RestBoosterCards from './RestBoosterCards'
import { useEffect, useState, type RefObject } from 'react'
import * as THREE from 'three'

const Scene = ({
  cardsGroupRef
}: {
  cardsGroupRef: RefObject<HTMLDivElement | null>
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = cardsGroupRef.current

      if (!section) return

      const rect = section.getBoundingClientRect()

      const scrollDistance = section.offsetHeight - window.innerHeight

      const currentScroll = -rect.top

      const progress = THREE.MathUtils.clamp(
        currentScroll / scrollDistance,
        0,
        1
      )

      setProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="absolute h-screen w-screen inset-0 z-20">
      <Canvas
        eventSource={document.body}
        camera={{
          position: [0, 0, 0.3],
          fov: 40
        }}
      >
        <ambientLight intensity={0.05} />

        <directionalLight position={[3, 4, 5]} intensity={0.5} />

        <RestBoosterCards progress={progress} />

        <Environment preset="studio" environmentIntensity={0.4} />
      </Canvas>
    </div>
  )
}

export default Scene
