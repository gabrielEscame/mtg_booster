import { useGLTF } from '@react-three/drei'
import { useRef  } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useMouseAnimation from '../hooks/useMouseAnimation'
import useIdleAnimation from '../hooks/useIdleAnimation'
import type { SetGroup } from '../types'

gsap.registerPlugin(ScrollTrigger)

function Booster({ setBoosterNode }: { setBoosterNode: SetGroup }) {
  const { scene } = useGLTF('/models/booster.glb')
  const mouseRef = useRef<THREE.Group | null>(null)
  const idleRef = useRef<THREE.Group | null>(null)

  useMouseAnimation(mouseRef)
  useIdleAnimation(idleRef)

  return (
    <group ref={(node) => setBoosterNode(node)} position={[1.2, 0, 0]}>
      <group ref={mouseRef}>
        <group ref={idleRef}>
          <primitive scale={20} object={scene} />
        </group>
      </group>
    </group>
  )
}

export default Booster
