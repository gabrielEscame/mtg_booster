import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Booster({ progress }: { progress: number }) {
  const { scene } = useGLTF('/models/booster.glb')
  const animationRef = useRef<THREE.Group>(null)
  const mouseRef = useRef<THREE.Group>(null)
  const idleRef = useRef<THREE.Group>(null)

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

  useFrame(({ pointer, clock }) => {
    if (!animationRef.current || !mouseRef.current || !idleRef.current) return

    // Mouse interaction for rotation
    mouseRef.current.rotation.y = THREE.MathUtils.lerp(
      mouseRef.current.rotation.y,
      pointer.x * 0.15,
      0.05
    )

    mouseRef.current.rotation.x = THREE.MathUtils.lerp(
      mouseRef.current.rotation.x,
      -pointer.y * 0.1,
      0.05
    )

    // Idle animation
    const elapsedTime = clock.getElapsedTime()

    const idleXTranslationAmplitude = 0.0015
    const idleXTranslationSpeed = 4

    idleRef.current.position.y =
      Math.sin(elapsedTime * idleXTranslationSpeed) * idleXTranslationAmplitude

    const idleXRotationAmplitude = 0.02
    const idleXRotationSpeed = 0.8

    idleRef.current.rotation.x =
      Math.sin(elapsedTime * idleXRotationSpeed) * idleXRotationAmplitude

    const idleZRotationAmplitude = 0.06
    const idleZRotationSpeed = 0.8

    idleRef.current.rotation.z =
      Math.sin(elapsedTime * idleZRotationSpeed) * idleZRotationAmplitude

    // Scroll animation based on progress
    const startRiseAnimation = 0
    const endRiseAnimation = 0.01

    const riseDistance = 0.04

    const riseProgress = THREE.MathUtils.clamp(
      (progress - startRiseAnimation) / (endRiseAnimation - startRiseAnimation),
      0,
      1
    )

    const startFallAnimation = 0.04
    const endFallAnimation = 0.2

    const fallDistance = 0.2

    const fallProgress = THREE.MathUtils.clamp(
      (progress - startFallAnimation) / (endFallAnimation - startFallAnimation),
      0,
      1
    )

    const targetY = riseProgress * riseDistance - fallProgress * fallDistance

    animationRef.current.position.y = THREE.MathUtils.lerp(
      animationRef.current.position.y,
      targetY,
      0.05
    )

    const startRotationAnimation = 0.08
    const endRotationAnimation = 0.3

    const rotationProgress = THREE.MathUtils.clamp(
      (progress - startRotationAnimation) /
        (endRotationAnimation - startRotationAnimation),
      0,
      1
    )

    const fallRotation = Math.PI
    const targetBaseRotation = rotationProgress * fallRotation

    animationRef.current.rotation.z = THREE.MathUtils.lerp(
      animationRef.current.rotation.z,
      targetBaseRotation * 4,
      0.05
    )

    animationRef.current.rotation.x = THREE.MathUtils.lerp(
      animationRef.current.rotation.x,
      targetBaseRotation * 4,
      0.05
    )

    const startFadeAnimation = 0.06
    const endFadeAnimation = 0.1405

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
