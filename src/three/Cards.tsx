import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import {
  updateIdleAnimaation,
  updateMouseAnimation,
  updateOpacity
} from './utils'

import Stack from './Stack'

interface CardsProps {
  progress: number
}

const Cards = ({ progress }: CardsProps) => {
  const { scene: mythicCard } = useGLTF('/models/mythic_card.glb')
  const { scene: rareCard } = useGLTF('/models/rare_card.glb')
  const { scene: stackCard } = useGLTF('/models/rare_card.glb')

  const cardsMouseRef = useRef<THREE.Group | null>(null)
  const cardsIdleRef = useRef<THREE.Group | null>(null)
  const cardsScrollRef = useRef<THREE.Group | null>(null)

  const mythicCardRef = useRef<THREE.Group | null>(null)
  const rareCardRef = useRef<THREE.Group | null>(null)

  const updateScrollAnimation = ({
    ref,
    progress
  }: {
    ref: React.RefObject<THREE.Group | null>
    progress: number
  }) => {
    const node = ref.current

    if (!node) return

    const startFadeInAnimation = 0.01
    const endFadeInAnimation = 0.011

    const fadeInProgress = THREE.MathUtils.clamp(
      (progress - startFadeInAnimation) /
        (endFadeInAnimation - startFadeInAnimation),
      0,
      1
    )

    const targetOpacity = fadeInProgress

    updateOpacity({
      object: mythicCard,
      opacity: targetOpacity
    })

    updateOpacity({
      object: rareCard,
      opacity: targetOpacity
    })

    updateOpacity({
      object: stackCard,
      opacity: targetOpacity
    })

    const starRiseAnimation = 0.01
    const endRiseAnimation = 0.05

    const riseDistance = 0.06

    const riseProgress = THREE.MathUtils.clamp(
      (progress - starRiseAnimation) / (endRiseAnimation - starRiseAnimation),
      0,
      1
    )

    const startFallAnimation = 0.055
    const endFallAnimation = 0.2

    const fallDistance = 0.1

    const fallProgress = THREE.MathUtils.clamp(
      (progress - startFallAnimation) / (endFallAnimation - startFallAnimation),
      0,
      1
    )

    const targetY = riseProgress * riseDistance - fallProgress * fallDistance

    node.position.y = THREE.MathUtils.lerp(node.position.y, targetY, 0.05)
  }

  useFrame(({ pointer, clock }) => {
    if (!cardsMouseRef.current || !cardsIdleRef) return

    // updateIdleAnimaation({ ref: cardsMouseRef, clock })
    // updateMouseAnimation({ ref: cardsIdleRef, pointer })

    updateScrollAnimation({ ref: cardsScrollRef, progress })
  })

  return (
    <group ref={cardsScrollRef} position={[0.08, 0, 0]}>
      <group ref={cardsMouseRef}>
        <group ref={cardsIdleRef}>
          <group ref={mythicCardRef}>
            <primitive object={mythicCard} scale={1} />
          </group>

          <group ref={rareCardRef}>
            <primitive object={rareCard} scale={1} position={[0, 0, -0.0005]} />
          </group>

          <Stack cardScene={stackCard} />
        </group>
      </group>
    </group>
  )
}

export default Cards
