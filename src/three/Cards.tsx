import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { updateIdleAnimaation, updateMouseAnimation } from './utils'
import  Stack from './Stack'

const Cards = () => {
  const { scene: mythicCard } = useGLTF('/models/mythic_card.glb')
  const { scene: rareCard } = useGLTF('/models/rare_card.glb')
  const cardsMouseRef = useRef<THREE.Group | null>(null)
  const cardsIdleRef = useRef<THREE.Group | null>(null)
  const mythicCardRef = useRef<THREE.Group | null>(null)
  const rareCardRef = useRef<THREE.Group | null>(null)

  useFrame(({ pointer, clock }) => {
    if (!cardsMouseRef.current || !cardsIdleRef) return

    updateIdleAnimaation({ ref: cardsMouseRef, clock })
    updateMouseAnimation({ ref: cardsIdleRef, pointer })
  })

  return (
    <group ref={cardsMouseRef} position={[0.08, 0, 0]}>
      <group ref={cardsIdleRef}>
        <group ref={mythicCardRef}>
          <primitive object={mythicCard} scale={1} />
        </group>

        <group ref={rareCardRef}>
          <primitive object={rareCard} scale={1} position={[0, 0, -0.0005]} />
        </group>

        <Stack />
      </group>
    </group>
  )
}

export default Cards
