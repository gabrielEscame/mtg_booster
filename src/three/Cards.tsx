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

  const rareAndStackRef = useRef<THREE.Group | null>(null)

  const mythicCardRef = useRef<THREE.Group | null>(null)
  const rareCardRef = useRef<THREE.Group | null>(null)

  const updateCardsScrollAnimation = ({
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

    const approachDistance = viewport.width * 0.3
    const approachRotation = Math.PI

    const approachProgress = THREE.MathUtils.clamp(
      (progress - startApproachAnimation) /
        (endApproachAnimation - startApproachAnimation),
      0,
      1
    )

    const easeInApproachProgress = approachProgress ** 5

    // Z rotation
    const targerZRotatiton = easeInApproachProgress * approachRotation

    node.rotation.y = THREE.MathUtils.lerp(
      node.rotation.y,
      -(targerZRotatiton * 2),
      0.04
    )

    // Z movement
    const targetZ = easeInApproachProgress * approachDistance

    node.position.z = THREE.MathUtils.lerp(node.position.z, targetZ, 0.05)

    // X movement
    const initialX = 0.08
    const finalX = 0.05

    const targetX = THREE.MathUtils.lerp(
      initialX,
      finalX,
      easeInApproachProgress
    )

    node.position.x = THREE.MathUtils.lerp(node.position.x, targetX, 0.05)
  }

  const updateMythicScrollAnimation = ({
    ref
  }: {
    ref: React.RefObject<THREE.Group | null>
  }) => {
    const node = ref.current

    if (!node) return

    const mythicStopProgress = 0.33

    const mythicLockProgress = THREE.MathUtils.clamp(
      (progress - mythicStopProgress) / (1 - mythicStopProgress),
      0,
      1
    )

    const continuedFallDistance = 0.3

    const mythicCounterY = mythicLockProgress * continuedFallDistance

    node.position.y = THREE.MathUtils.lerp(node.position.y, mythicCounterY, 0.3)
  }

  useFrame(({ pointer, clock, viewport }) => {
    if (!cardsMouseRef.current || !cardsIdleRef || !mythicCardRef) return

    // updateIdleAnimaation({ ref: cardsMouseRef, clock })
    // updateMouseAnimation({ ref: cardsIdleRef, pointer })

    updateCardsScrollAnimation({ ref: cardsScrollRef, progress, viewport })
    updateMythicScrollAnimation({ ref: mythicCardRef })
  })

  return (
    <group ref={cardsScrollRef} position={[0.08, 0, 0]}>
      <group ref={cardsMouseRef}>
        <group ref={cardsIdleRef}>
          {/* Mythic becomes independent */}
          <group ref={mythicCardRef}>
            <primitive object={mythicCard} scale={1} />
          </group>

          {/* Rare and Stack continue together */}
          <group ref={rareAndStackRef}>
            <group ref={rareCardRef}>
              <primitive
                object={rareCard}
                scale={1}
                position={[0, 0, -0.0005]}
              />
            </group>

            <Stack cardScene={stackCard} />
          </group>
        </group>
      </group>
    </group>
  )
}

export default Cards
