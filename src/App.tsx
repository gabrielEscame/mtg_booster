import { Canvas } from '@react-three/fiber'
import {
  Environment,
  OrbitControls,
  useGLTF,
} from '@react-three/drei'

function Booster() {
  const { scene } = useGLTF(
    '/models/booster.glb'
  )

  return (
    <primitive
      object={scene}
      scale={1}
      position={[-0.05, 0, 0]}
    />
  )
}

function Card() {
  const { scene } = useGLTF(
    '/models/card.glb'
  )

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0.05, 0, 0]}
    />
  )
}

export default function App() {
  return (
    <main className="app">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}
      >
        <ambientLight intensity={0.15} />

        <directionalLight
          position={[3, 4, 5]}
          intensity={1.5}
        />

        <Booster />

        <Card />

        <Environment
          preset="studio"
          environmentIntensity={0.4}
        />

        <OrbitControls />
      </Canvas>
    </main>
  )
}