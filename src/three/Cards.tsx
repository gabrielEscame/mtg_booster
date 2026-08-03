import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CardsStack = () => {
  const { scene: cardScene } = useGLTF('/models/mythic_card.glb')

  const cardSpacing = 0.0005
  const stackStart = 0.001

  const cardOffsets = [
    {
      x: -0.00022043,
      y: -0.00001296,
      rotationZ: -0.052257
    },
    {
      x: -0.00008567,
      y: 0.00007567,
      rotationZ: -0.056294
    },
    {
      x: -0.00005375,
      y: 0.00007717,
      rotationZ: -0.070747
    },
    {
      x: -0.00019823,
      y: 0.0000338,
      rotationZ: -0.079947
    },
    {
      x: -0.00019385,
      y: 0.00000222,
      rotationZ: -0.065607
    },
    {
      x: -0.00011521,
      y: -0.00000141,
      rotationZ: -0.051551
    },
    {
      x: -0.00013007,
      y: 0.00009503,
      rotationZ: -0.044394
    },
    {
      x: -0.00009426,
      y: 0.00004548,
      rotationZ: -0.047118
    },
    {
      x: -0.00002853,
      y: 0.00002574,
      rotationZ: -0.078974
    },
    {
      x: -0.00009237,
      y: 0,
      rotationZ: -0.071652
    },
    {
      x: -0.00023533,
      y: -0.00002894,
      rotationZ: -0.064534
    },
    {
      x: -0.00019641,
      y: -0.00000519,
      rotationZ: -0.068448
    }
  ]

  return (
    <group>
      {cardOffsets.map((offset, index) => (
        <primitive
          key={index}
          object={cardScene.clone()}
          scale={1}
          position={[offset.x, offset.y, -(stackStart + index * cardSpacing)]}
          rotation={[0, 0, offset.rotationZ]}
        />
      ))}
    </group>
  )
}

const Cards = () => {
  const { scene: mythicCard } = useGLTF('/models/mythic_card.glb')
  const { scene: rareCard } = useGLTF('/models/rare_card.glb')
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

    node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, pointer.x * 5, 0.05)

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
      <primitive object={mythicCard} scale={1} />
      <primitive object={rareCard} scale={1} position={[0, 0, -0.0005]} />
      <CardsStack />
    </group>
  )
}

export default Cards
