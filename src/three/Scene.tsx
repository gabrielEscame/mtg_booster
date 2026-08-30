import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import Booster from './Booster'
import Cards from './Cards'

import type { SetGroup } from '../types'

interface SceneProps {
  setBoosterNode: SetGroup
  setMythicCardNode: SetGroup
  setRareStackNode: SetGroup
  setCardsNode: SetGroup
}

const Scene = ({ sceneProps }: { sceneProps: SceneProps }) => {

  const { setBoosterNode, setCardsNode, setMythicCardNode, setRareStackNode } = sceneProps

  const cardsProps = {
    setMythicCardNode,
    setRareStackNode,
    setCardsNode
  }

  return (
    <div className="fixed inset-0 z-20">
      <Canvas
        camera={{
          position: [0, 0, 5.8],
          fov: 40
        }}
      >
        <ambientLight intensity={0.03} />

        <directionalLight position={[3, 4, 5]} intensity={0.4} rotateY={Math.PI / 2} />

        <Booster setBoosterNode={setBoosterNode} />

        <Cards cardsProps={cardsProps} />

        <Environment preset="city" environmentIntensity={1.2} />
      </Canvas>
    </div>
  )
}

export default Scene
