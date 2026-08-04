import { useGLTF } from '@react-three/drei'

const CARDS_OFFSETS = [
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

const Stack = () => {
  const { scene: cardScene } = useGLTF('/models/mythic_card.glb')

  const cardSpacing = 0.0005
  const stackStart = 0.001

  return (
    <group>
      {CARDS_OFFSETS.map((offset, index) => (
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

export default Stack
