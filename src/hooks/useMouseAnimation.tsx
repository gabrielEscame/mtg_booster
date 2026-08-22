import { useEffect } from "react"
import * as THREE from 'three'
import gsap from 'gsap'

export default function useMouseAnimation(
  ref: React.RefObject<THREE.Group | null>
) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1

      gsap.to(node.rotation, {
        x: y * 0.2,
        y: x * 0.2,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: true
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [ref])
}