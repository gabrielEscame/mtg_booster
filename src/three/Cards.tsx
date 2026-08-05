import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame, type Viewport } from '@react-three/fiber'
import * as THREE from 'three'

import { updateIdleAnimaation, updateMouseAnimation } from './utils'

import Stack from './Stack'

interface CardsProps {
  progress: number
}

const Cards = ({ progress }: CardsProps) => {
  const { scene: mythicCard } = useGLTF('/models/mythic_card.glb')
  const { scene: rareCard } = useGLTF('/models/rare_card.glb')
  const { scene: stackCard } = useGLTF('/models/rare_card.glb')

  const cardsVisibilityRef = useRef<THREE.Group | null>(null)
  const cardsMouseRef = useRef<THREE.Group | null>(null)
  const cardsIdleRef = useRef<THREE.Group | null>(null)
  const cardsScrollRef = useRef<THREE.Group | null>(null)

  const rareAndStackIdleRef = useRef<THREE.Group | null>(null)
  const rareAndStackCounterRef = useRef<THREE.Group | null>(null)
  const rareAndStackAnimationRef = useRef<THREE.Group | null>(null)
  const rareAndStackLastCounterRef = useRef<THREE.Group | null>(null)

  const mythicCardRef = useRef<THREE.Group | null>(null)

  const updateCardsVisibility = ({
    ref,
    progress
  }: {
    ref: React.RefObject<THREE.Group | null>
    progress: number
  }) => {
    const node = ref.current

    if (!node) return

    const showCards = 0.16

    const isVisible = progress >= showCards

    node.visible = isVisible
  }

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

    const starRiseAnimation = 0.13
    const endRiseAnimation = 0.17

    const riseDistance = 0.06

    const riseProgress = THREE.MathUtils.clamp(
      (progress - starRiseAnimation) / (endRiseAnimation - starRiseAnimation),
      0,
      1
    )

    const easeInRiseProgress = riseProgress ** 3

    const startFallAnimation = 0.17
    const endFallAnimation = 0.23

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

    const startApproachAnimation = 0.18
    const endApproachAnimation = 0.3

    const approachDistance = viewport.width * 0.2
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
    const finalX = 0.06

    const targetX = THREE.MathUtils.lerp(
      initialX,
      finalX,
      easeInApproachProgress
    )

    node.position.x = THREE.MathUtils.lerp(node.position.x, targetX, 0.05)
  }

  const updateMythicCounterMove = ({
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

  const updateRareAndStackCounterMove = ({
    ref,
    progress
  }: {
    ref: React.RefObject<THREE.Group | null>
    progress: number
  }) => {
    const node = ref.current

    if (!node) return

    const counterStart = 0.33
    const counterEnd = 0.5

    // Stop reproducing the mythic movement after 0.5
    const cappedProgress = Math.min(progress, counterEnd)

    // Use the same timeline as the mythic animation
    const counterProgress = THREE.MathUtils.clamp(
      (cappedProgress - counterStart) / (1 - counterStart),
      0,
      1
    )

    // Must match the mythic counter distance
    const parentFallDistance = 0.3

    const targetY = counterProgress * parentFallDistance

    node.position.y = THREE.MathUtils.lerp(node.position.y, targetY, 0.3)
  }

  const updateRareAndStackAnimation = ({
    ref,
    progress
  }: {
    ref: React.RefObject<THREE.Group | null>
    progress: number
  }) => {
    const node = ref.current

    if (!node) return

    const start = 0.3
    const end = 0.65

    const animationProgress = THREE.MathUtils.clamp(
      (progress - start) / (end - start),
      0,
      1
    )

    const easeInProgress = animationProgress ** 3

    const fallDistance = -0.08
    const repositionDitance = -0.115

    const targetY = easeInProgress * fallDistance
    const targetX = easeInProgress * repositionDitance

    node.position.y = THREE.MathUtils.lerp(node.position.y, targetY, 0.05)

    node.position.x = THREE.MathUtils.lerp(node.position.x, targetX, 0.05)

    // Z rotation

    const rotationStart = 0.62
    const rotationEnd = 0.65

    const rotationProgress = THREE.MathUtils.clamp(
      (progress - rotationStart) / (rotationEnd - rotationStart),
      0,
      1
    )

    const easeInRotationProgress = rotationProgress ** 1.5

    const targerZRotatiton = easeInRotationProgress * Math.PI

    const isReversingRotation = progress < rotationEnd

    const rotationLerp = isReversingRotation ? 0.15 : 0.04

    node.rotation.y = THREE.MathUtils.lerp(
      node.rotation.y,
      -(targerZRotatiton * 2),
      rotationLerp
    )
  }

  const updateRareAndStackLastCounterMove = ({
    ref,
    progress
  }: {
    ref: React.RefObject<THREE.Group | null>
    progress: number
  }) => {
    const node = ref.current

    if (!node) return

    const counterStart = 0.65

    const counterProgress = THREE.MathUtils.clamp(
      (progress - counterStart) / (1 - counterStart),
      0,
      1
    )

    // Must match the mythic counter distance
    const parentFallDistance = 0.15

    const targetY = counterProgress * parentFallDistance

    node.position.y = THREE.MathUtils.lerp(node.position.y, targetY, 0.3)
  }

  useFrame(({ pointer, clock, viewport }) => {
    if (
      !cardsMouseRef ||
      !cardsIdleRef ||
      !mythicCardRef ||
      !rareAndStackCounterRef ||
      !rareAndStackLastCounterRef ||
      !cardsVisibilityRef
    )
      return
    updateCardsVisibility({ ref: cardsVisibilityRef, progress })

    updateIdleAnimaation({ ref: cardsIdleRef, clock })
    updateMouseAnimation({ ref: mythicCardRef, pointer })
    updateMouseAnimation({ ref: rareAndStackIdleRef, pointer })

    updateCardsScrollAnimation({ ref: cardsScrollRef, progress, viewport })

    updateMythicCounterMove({ ref: mythicCardRef })

    updateRareAndStackCounterMove({ ref: rareAndStackCounterRef, progress })
    updateRareAndStackAnimation({ ref: rareAndStackAnimationRef, progress })
    updateRareAndStackLastCounterMove({
      ref: rareAndStackLastCounterRef,
      progress
    })
  })

  return (
    <group ref={cardsVisibilityRef}>
      <group ref={cardsScrollRef} position={[0.08, 0, 0]}>
        <group ref={cardsMouseRef}>
          <group ref={cardsIdleRef}>
            <group ref={mythicCardRef}>
              <primitive object={mythicCard} scale={1} />
            </group>

            <group ref={rareAndStackCounterRef}>
              <group ref={rareAndStackAnimationRef}>
                <group ref={rareAndStackLastCounterRef}>
                  <group ref={rareAndStackIdleRef}>
                    <primitive
                      object={rareCard}
                      scale={1}
                      position={[0, 0, -0.0005]}
                    />

                    <Stack cardScene={stackCard} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default Cards
