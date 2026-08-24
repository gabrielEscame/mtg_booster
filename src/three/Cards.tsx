import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

import Stack from './Stack'
import type { SetGroup } from '../types'
import useMouseAnimation from '../hooks/useMouseAnimation'
import useIdleAnimation from '../hooks/useIdleAnimation'

interface CardsProps {
  setMythicCardNode: SetGroup
  setRareStackNode: SetGroup
  setCardsNode: SetGroup
}

const Cards = ({ cardsProps }: { cardsProps: CardsProps }) => {
  const { setMythicCardNode, setCardsNode, setRareStackNode } = cardsProps

  const { scene: mythicCard } = useGLTF('/models/mythic_card.glb')
  const { scene: stackCard } = useGLTF('/models/rare_card.glb')

  const cardsMouseRef = useRef<THREE.Group | null>(null)
  const cardsIdleRef = useRef<THREE.Group | null>(null)

  useMouseAnimation(cardsMouseRef)
  useIdleAnimation(cardsIdleRef)

  return (
    <group ref={(node) => setCardsNode(node)} position={[1.2, 0, -0.2]}>
      <group ref={cardsMouseRef}>
        <group ref={cardsIdleRef}>
          <group ref={(node) => setMythicCardNode(node)}>
            <primitive object={mythicCard} scale={20} />
          </group>

          <group ref={(node) => setRareStackNode(node)}>
            <Stack cardScene={stackCard} />
          </group>
        </group>
      </group>
    </group>
  )
}

export default Cards
