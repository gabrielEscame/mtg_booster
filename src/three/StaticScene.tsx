import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import RestBoosterCards from './RestBoosterCards'

const Scene = () => {
  return (
    <div className="absolute h-screen w-screen top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
      <Canvas
        camera={{
          position: [0, 0, 0.3],
          fov: 40
        }}
      >
        <ambientLight intensity={0.05} />

        <directionalLight position={[3, 4, 5]} intensity={0.5} />

        <RestBoosterCards />

        <Environment preset="studio" environmentIntensity={0.4} />
      </Canvas>
    </div>
  )
}

export default Scene
