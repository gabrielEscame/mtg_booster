import { useGLTF } from '@react-three/drei'

import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { updateIdleAnimaation, updateMouseAnimation } from './utils'

const RestBoosterCards = ({ progress }: { progress: number }) => {
  const { scene: azogCard } = useGLTF('/models/azog_card.glb')
  const { scene: bifurCard } = useGLTF('/models/bifur_card.glb')
  const { scene: bilboCard } = useGLTF('/models/bilbo_card.glb')
  const { scene: eagleCard } = useGLTF('/models/eagle_card.glb')
  const { scene: gandalfCard } = useGLTF('/models/gandalf_card.glb')
  const { scene: gollumCard } = useGLTF('/models/gollum_card.glb')
  const { scene: hauntCard } = useGLTF('/models/haunt_card.glb')
  const { scene: landCard } = useGLTF('/models/land_card.glb')
  const { scene: smiteCard } = useGLTF('/models/smite_card.glb')
  const { scene: treasureCard } = useGLTF('/models/treasure_card.glb')
  const { scene: trollCard } = useGLTF('/models/troll_card.glb')
  const { scene: warCard } = useGLTF('/models/war_card.glb')
  const { scene: whisperCard } = useGLTF('/models/whisper_card.glb')

  const azogRefIdle = useRef<THREE.Group | null>(null)
  const bifurRefIdle = useRef<THREE.Group | null>(null)
  const bilboRefIdle = useRef<THREE.Group | null>(null)
  const eagleRefIdle = useRef<THREE.Group | null>(null)
  const gandalfRefIdle = useRef<THREE.Group | null>(null)
  const gollumRefIdle = useRef<THREE.Group | null>(null)
  const hauntRefIdle = useRef<THREE.Group | null>(null)
  const landRefIdle = useRef<THREE.Group | null>(null)
  const smiteRefIdle = useRef<THREE.Group | null>(null)
  const treasureRefIdle = useRef<THREE.Group | null>(null)
  const trollRefIdle = useRef<THREE.Group | null>(null)
  const warRefIdle = useRef<THREE.Group | null>(null)
  const whisperRefIdle = useRef<THREE.Group | null>(null)

  const restBoosterCardsMouseRef = useRef<THREE.Group | null>(null)
  const restBoosterCardsAnimationRef = useRef<THREE.Group | null>(null)

  const REST_OF_BOOSTER_CARDS = [
    { object: azogCard, idleRef: azogRefIdle },
    { object: bifurCard, idleRef: bifurRefIdle },
    { object: bilboCard, idleRef: bilboRefIdle },
    { object: eagleCard, idleRef: eagleRefIdle },
    { object: gandalfCard, idleRef: gandalfRefIdle },
    { object: gollumCard, idleRef: gollumRefIdle },
    { object: hauntCard, idleRef: hauntRefIdle },
    { object: landCard, idleRef: landRefIdle },
    { object: smiteCard, idleRef: smiteRefIdle },
    {
      object: treasureCard,

      idleRef: treasureRefIdle
    },
    { object: trollCard, idleRef: trollRefIdle },
    { object: warCard, idleRef: warRefIdle },
    { object: whisperCard, idleRef: whisperRefIdle }
  ]

  const restBoosterCardsSpacing = 0.07
  const restBoosterCardsStart = -0.1

  const updateScrollAnimation = ({
    ref,
    progress
  }: {
    ref: RefObject<THREE.Group<THREE.Object3DEventMap> | null>
    progress: number
  }) => {
    const node = ref.current

    if (!node) return

    const start = 0.2
    const end = 1

    const animationProgress = THREE.MathUtils.clamp(
      (progress - start) / (end - start),
      0,
      1
    )

    const distance = -0.65

    const easeInProgress = animationProgress ** 1.2
    const targetX = easeInProgress * distance

    node.position.x = THREE.MathUtils.lerp(node.position.x, targetX, 0.05)
  }

  useFrame(({ pointer, clock }) => {
    if (!restBoosterCardsAnimationRef || !restBoosterCardsMouseRef) return

    REST_OF_BOOSTER_CARDS.forEach(({ idleRef }, index) => {
      updateIdleAnimaation({
        ref: idleRef,
        clock,
        strength: 0.5,
        phaseOut: index * 1.2
      })
    })

    updateMouseAnimation({
      ref: restBoosterCardsMouseRef,
      pointer,
      strength: 0.1
    })

    updateScrollAnimation({ ref: restBoosterCardsAnimationRef, progress })
  })

  return (
    <group ref={restBoosterCardsAnimationRef}>
      <group ref={restBoosterCardsMouseRef}>
        {REST_OF_BOOSTER_CARDS.map(({ object, idleRef }, idx) => (
          <group key={idx} ref={idleRef}>
            <primitive
              key={idx}
              object={object}
              scale={1}
              position={[
                restBoosterCardsStart + idx * restBoosterCardsSpacing,
                -0.03,
                0
              ]}
              rotation={[0, 0, 0]}
            />
          </group>
        ))}
      </group>
    </group>
  )
}

export default RestBoosterCards
