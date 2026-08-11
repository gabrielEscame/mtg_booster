import { useFrame } from '@react-three/fiber'
import { useGLTF, Sparkles } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import {
  updateIdleAnimaation,
  updateMouseAnimation,
  updateOpacity
} from './utils'
import GlowGroup from './GlowGroup'

function Booster({ progress }: { progress: number }) {
  const { scene } = useGLTF('/models/booster.glb')
  const animationRef = useRef<THREE.Group | null>(null)
  const mouseRef = useRef<THREE.Group | null>(null)
  const idleRef = useRef<THREE.Group | null>(null)

  useEffect(() => {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material]

      materials.forEach((material) => {
        material.transparent = true
      })
    })
  }, [scene])

  const updateScrollAnimation = ({
    ref,
    progress
  }: {
    ref: React.RefObject<THREE.Group | null>
    progress: number
  }) => {
    const node = ref.current
    if (!node) return

    const startRiseAnimation = 0
    const endRiseAnimation = 0.1

    const riseDistance = 0.8

    const riseProgress = THREE.MathUtils.clamp(
      (progress - startRiseAnimation) / (endRiseAnimation - startRiseAnimation),
      0,
      1
    )

    const startFallAnimation = 0.15
    const endFallAnimation = 0.2

    const fallDistance = 4

    const fallProgress = THREE.MathUtils.clamp(
      (progress - startFallAnimation) / (endFallAnimation - startFallAnimation),
      0,
      1
    )

    const easeInFallProgress = fallProgress ** 1.08

    const targetY =
      riseProgress * riseDistance - easeInFallProgress * fallDistance

    node.position.y = THREE.MathUtils.lerp(node.position.y, targetY, 0.04)

    const startRotationAnimation = 0.18
    const endRotationAnimation = 0.4

    const rotationProgress = THREE.MathUtils.clamp(
      (progress - startRotationAnimation) /
        (endRotationAnimation - startRotationAnimation),
      0,
      1
    )

    const easeInRotationProgress = rotationProgress ** 1.1

    const fallRotation = Math.PI
    const targetBaseRotation = easeInRotationProgress * fallRotation

    node.rotation.z = THREE.MathUtils.lerp(
      node.rotation.z,
      -(targetBaseRotation * 2),
      0.04
    )

    node.rotation.x = THREE.MathUtils.lerp(
      node.rotation.x,
      targetBaseRotation * 4,
      0.04
    )

    const startFadeAnimation = 0.16
    const endFadeAnimation = 0.2

    const fadeProgress = THREE.MathUtils.clamp(
      (progress - startFadeAnimation) / (endFadeAnimation - startFadeAnimation),
      0,
      1
    )

    const targetOpacity = 1 - fadeProgress

    updateOpacity({ object: scene, opacity: targetOpacity })
  }

  useFrame(({ pointer, clock }) => {
    if (!animationRef.current || !mouseRef.current || !idleRef.current) return

    const isCardRevelTimeline = progress >= 0.1 && progress <= 0.2

    const motionStrength = isCardRevelTimeline ? 0 : 1

    // Mouse interaction for rotation
    updateMouseAnimation({ ref: mouseRef, pointer, strength: motionStrength })

    // Idle animation
    updateIdleAnimaation({ ref: idleRef, clock, strength: motionStrength })

    // Scroll animation based on progress
    updateScrollAnimation({ ref: animationRef, progress })
  })

  const startFadeAnimation = 0.16
  const endFadeAnimation = 0.17

  const fadeProgress = THREE.MathUtils.clamp(
    (progress - startFadeAnimation) / (endFadeAnimation - startFadeAnimation),
    0,
    1
  )

  const targetOpacity = 1 - fadeProgress

  return (
    <group ref={animationRef} position={[1.2, 0, 0]}>
      <Sparkles
        opacity={targetOpacity}
        count={40}
        scale={[1.9, 2.5, 3]}
        size={4}
        speed={0.8}
        color={'#99d4fc'}
      />

      <GlowGroup />
      <group ref={mouseRef}>
        <group ref={idleRef}>
          <primitive scale={20} object={scene} />
        </group>
      </group>
    </group>
  )
}

export default Booster
