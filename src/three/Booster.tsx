import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useMouseAnimation from './hooks/useMouseAnimation'
import useIdleAnimation from './hooks/useIdleAnimation'

gsap.registerPlugin(ScrollTrigger)

function Booster({
  sectionRef
}: {
  sectionRef: RefObject<HTMLDivElement | null>
}) {
  const { scene } = useGLTF('/models/booster.glb')
  const animationRef = useRef<THREE.Group | null>(null)
  const mouseRef = useRef<THREE.Group | null>(null)
  const idleRef = useRef<THREE.Group | null>(null)

  useEffect(() => {
    if (!animationRef.current) return

    const node = animationRef.current

    const tl = gsap.timeline({ paused: true })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '10% top',
      onEnter: () => {
        console.log('PLAY')
        tl.play()
      }
    })

    // Rise
    tl.to(node.position, {
      y: 0.8,
      duration: 0.5,
      ease: 'power3.out'
    })

    tl.to(
      node.rotation,
      {
        y: Math.PI,
        duration: 0.5,
        ease: 'power1.out'
      },
      '<'
    )

    // Fall
    tl.to(
      node.position,
      {
        y: -5,
        duration: 0.6,
        ease: 'power2.in'
      },
      '>+=0.07'
    )

    tl.to(
      node.rotation,
      {
        z: -Math.PI * 1.5,
        duration: 0.8,
        ease: 'power2.in'
      },
      '<+=0.12'
    )

    tl.to(
      node.rotation,
      {
        x: Math.PI,
        duration: 0.8,
        ease: 'power2.in'
      },
      '<'
    )

    tl.to(
      node.position,
      {
        x: 12,
        duration: 0.6,
        ease: 'power3.in'
      },
      '<+=0.01'
    )

    tl.to(
      node.position,
      {
        z: -3,
        duration: 0.5,
        ease: 'power2.in'
      },
      '<'
    )

    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowUp') {
        tl.restart()
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  useMouseAnimation(mouseRef)
  useIdleAnimation(idleRef)

  return (
    <group ref={animationRef} position={[1.2, 0, 0]}>
      <group ref={mouseRef}>
        <group ref={idleRef}>
          <primitive scale={20} object={scene} />
        </group>
      </group>
    </group>
  )
}

export default Booster
