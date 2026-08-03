import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Cards = () => {
  const { scene } = useGLTF('/models/mythic_card.glb')
  const mouseRef = useRef<THREE.Group | null>(null)

  const updateMouseAnimation = ({
    ref,
    pointer
  }: {
    ref: React.RefObject<THREE.Group | null>
    pointer: THREE.Vector2
  }) => {
    const node = ref.current
    if (!node) return

    node.rotation.y = THREE.MathUtils.lerp(
      node.rotation.y,
      pointer.x * 5,
      0.05
    )

    node.rotation.x = THREE.MathUtils.lerp(
      node.rotation.x,
      -pointer.y * 5,
      0.05
    )
  }

  useFrame(({ pointer }) => {
    if (!mouseRef.current) return

    // Mouse interaction for rotation
    updateMouseAnimation({ ref: mouseRef, pointer })
  })
  return (
    <group ref={mouseRef} position={[0, 0, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

export default Cards
