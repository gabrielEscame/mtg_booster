import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { updateIdleAnimaation, updateMouseAnimation } from './utils'

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
    const endRiseAnimation = 0.01

    const riseDistance = 0.02

    const riseProgress = THREE.MathUtils.clamp(
      (progress - startRiseAnimation) / (endRiseAnimation - startRiseAnimation),
      0,
      1
    )

    const startFallAnimation = 0.04
    const endFallAnimation = 0.2

    const fallDistance = 0.3

    const fallProgress = THREE.MathUtils.clamp(
      (progress - startFallAnimation) / (endFallAnimation - startFallAnimation),
      0,
      1
    )

    const targetY = riseProgress * riseDistance - fallProgress * fallDistance

    node.position.y = THREE.MathUtils.lerp(node.position.y, targetY, 0.05)

    const startRotationAnimation = 0.06
    const endRotationAnimation = 0.3

    const rotationProgress = THREE.MathUtils.clamp(
      (progress - startRotationAnimation) /
        (endRotationAnimation - startRotationAnimation),
      0,
      1
    )

    const fallRotation = Math.PI
    const targetBaseRotation = rotationProgress * fallRotation

    node.rotation.z = THREE.MathUtils.lerp(
      node.rotation.z,
      -(targetBaseRotation * 2),
      0.05
    )

    node.rotation.x = THREE.MathUtils.lerp(
      node.rotation.x,
      targetBaseRotation * 8,
      0.05
    )

    const startFadeAnimation = 0.06
    const endFadeAnimation = 0.092

    const fadeProgress = THREE.MathUtils.clamp(
      (progress - startFadeAnimation) / (endFadeAnimation - startFadeAnimation),
      0,
      1
    )

    const targetOpacity = 1 - fadeProgress

    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material]

      materials.forEach((material) => {
        material.opacity = targetOpacity
      })
    })
  }

  useFrame(({ pointer, clock }) => {
    if (!animationRef.current || !mouseRef.current || !idleRef.current) return

    // Mouse interaction for rotation
    updateMouseAnimation({ ref: mouseRef, pointer })

    // Idle animation
    updateIdleAnimaation({ ref: idleRef, clock })

    // Scroll animation based on progress
    updateScrollAnimation({ ref: animationRef, progress })
  })

  return (
    <group ref={animationRef} position={[0.08, 0, 0]}>
      <group ref={mouseRef}>
        <group ref={idleRef}>
          <primitive object={scene} scale={1} />
        </group>
      </group>
    </group>
  )
}

export default Booster
