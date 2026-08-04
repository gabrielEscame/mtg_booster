import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame, type Viewport } from '@react-three/fiber'
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
    progress,
    viewport
  }: {
    ref: React.RefObject<THREE.Group | null>
    progress: number
    viewport: Viewport
  }) => {
    const node = ref.current

    if (!node) return

    const showCards = 0.05

    const isVisible = progress >= showCards

    mythicCard.visible = isVisible
    rareCard.visible = isVisible
    stackCard.visible = isVisible

    const starRiseAnimation = 0.02
    const endRiseAnimation = 0.06

    const riseDistance = 0.06

    const riseProgress = THREE.MathUtils.clamp(
      (progress - starRiseAnimation) / (endRiseAnimation - starRiseAnimation),
      0,
      1
    )

    const easeInRiseProgress = riseProgress ** 3

    const startFallAnimation = 0.06
    const endFallAnimation = 0.12

    const fallDistance = 0.06

    const fallProgress = THREE.MathUtils.clamp(
      (progress - startFallAnimation) / (endFallAnimation - startFallAnimation),
      0,
      1
    )

    const easeInFallProgress = fallProgress ** 4

    const targetY =
      easeInRiseProgress * riseDistance - easeInFallProgress * fallDistance

    node.position.y = THREE.MathUtils.lerp(node.position.y, targetY, 0.05)

    const startApproachAnimation = 0.06
    const endApproachAnimation = 0.3

    const approachDistance = viewport.width * 0.35

    const approachProgress = THREE.MathUtils.clamp(
      (progress - startApproachAnimation) /
        (endApproachAnimation - startApproachAnimation),
      0,
      1
    )

    const easeInApproachProgress = approachProgress ** 5

    // Z movement
    const targetZ = easeInApproachProgress * approachDistance

    node.position.z = THREE.MathUtils.lerp(node.position.z, targetZ, 0.05)

    // X movement
    const initialX = 0.08
    const finalX = 0.04

    const targetX = THREE.MathUtils.lerp(
      initialX,
      finalX,
      easeInApproachProgress
    )

    node.position.x = THREE.MathUtils.lerp(node.position.x, targetX, 0.05)
  }

  useFrame(({ pointer, clock, viewport }) => {
    if (!cardsMouseRef.current || !cardsIdleRef) return

    // updateIdleAnimaation({ ref: cardsMouseRef, clock })
    // updateMouseAnimation({ ref: cardsIdleRef, pointer })

    updateScrollAnimation({ ref: cardsScrollRef, progress, viewport })
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
