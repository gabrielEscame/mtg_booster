import { useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

export default function useIdleAnimation(
  ref: React.RefObject<THREE.Group | null>,
  strength = 1
) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    node.position.y = -0.05

    const positionTween = gsap.to(node.position, {
      y: 0.05,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    node.rotation.x = -0.05

    const rotationXTween = gsap.to(node.rotation, {
      x: 0.05,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    node.rotation.z = -0.08

    const rotationZTween = gsap.to(node.rotation, {
      z: 0.08,
      duration: 4.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    return () => {
      positionTween.kill()
      rotationXTween.kill()
      rotationZTween.kill()
    }
  }, [ref, strength])
}
