import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Booster() {
  const { scene } = useGLTF('/models/booster.glb')
  const boosterRef = useRef<THREE.Group>(null)

  useFrame(({ pointer }) => {
    if (!boosterRef.current) return

    boosterRef.current.rotation.y = THREE.MathUtils.lerp(
      boosterRef.current.rotation.y,
      pointer.x * 0.15,
      0.05
    )

    boosterRef.current.rotation.x = THREE.MathUtils.lerp(
      boosterRef.current.rotation.x,
      -pointer.y * 0.1,
      0.05
    )
  })

  return (
    <group ref={boosterRef} position={[0.08, 0, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/images/hero_bg.jpg')] bg-no-repeat bg-[length:auto_100%] bg-left lg:bg-[length:204%]">
      {/* Background gradients */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(102,102,102,0)_0%,_rgba(0,0,0,0.7)_70%)]" />

      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_rgba(102,102,102,0)_35%)]" />

      {/* 3D scene */}
      <div className="absolute inset-0 z-20">
        <Canvas
          camera={{
            position: [0, 0, 0.3],
            fov: 40
          }}
        >
          <ambientLight intensity={0.05} />

          <directionalLight position={[3, 4, 5]} intensity={0.5} />

          <Booster />

          <Environment preset="studio" environmentIntensity={0.4} />
        </Canvas>
      </div>

      {/* Hero content */}
      <div className="absolute top-[55px] left-[67px] z-30 flex w-[558px] flex-col justify-center">
        <img
          src="/images/mtg_logo.webp"
          alt="Magic: The Gathering"
          className="h-auto w-[460px]"
        />

        <p className="text-caption text-[0.8rem]">AVAILABLE AUGUST 14</p>

        <h1 className="text-title mt-[14px] w-fit">UNSEAL THE ADVENTURE</h1>

        <p className="text-body mt-[22px]">
          Join Bilbo’s journey through Middle-earth, with heroes to discover,
          treasures to uncover, and unexpected adventures waiting in every pack.
          Open your boosters, reveal the cards within, and see where the road
          takes you.
        </p>
      </div>

      <div className="absolute bottom-[50px] z-10 opacity-60 flex flex-col items-center left-1/2 -translate-x-1/2">
        <span className="block h-[67px] w-[1px] bg-[linear-gradient(to_bottom,transparent,var(--color-caption))]"></span>
        <p className="text-caption text-[0.8rem] mt-[12px]">SCROLL TO OPEN</p>
      </div>
    </section>
  )
}

const MythicSection = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/images/mythic_bg.webp')] bg-no-repeat bg-cover bg-center">
      {/* Background gradients */}
      <div className="absolute inset-0 z-10 opacity-80 bg-[radial-gradient(circle_at_center,_rgba(102,102,102,0)_0%,_rgba(0,0,0,0.7)_70%)]" />

      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,_rgba(0,0,0,1)_0%,_rgba(102,102,102,0)_50%)]" />

      {/* Mythic content */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 flex w-[70%] flex-col justify-center">
        <h1 className="text-title max-w-[470px]">
          SMAUG <br />
          THE MAGNIFICENT
        </h1>

        <p className="text-body mt-[22px] max-w-[470px]">
          Beneath the Lonely Mountain lies more than gold. From the depths of
          your journey emerges Smaug the Magnificent—the fearsome Dragon whose
          hoard is matched only by his hunger for conquest. Draw near, if you
          dare, and claim a legend worthy of any adventurer’s collection.
        </p>

        <p className="text-explanation text-[1rem] mt-[22px] max-w-[470px]">
          Beneath the Lonely Mountain lies more than gold. From the depths of
          your journey emerges Smaug the Magnificent—the fearsome Dragon whose
          hoard is matched only by his hunger for conquest. Draw near, if you
          dare, and claim a legend worthy of any adventurer’s collection.
        </p>
      </div>
    </section>
  )
}

const RareSection = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/images/rare_bg.webp')] bg-no-repeat bg-[length:auto_100%] bg-left lg:bg-[length:205%]">
      {/* Background gradients */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0)_70%)]" />

      {/* Mythic content */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-end w-[70%]">
        <div className="w-content flex flex-col justify-center">
          <h1 className="text-title max-w-[470px]">
            RADAGAST <br /> OF RHOSGOBEL
          </h1>

          <p className="text-body mt-[22px] max-w-[470px]">
            No road through Middle-earth is meant to be traveled alone. From the
            wild paths of Rhosgobel comes Radagast, a steadfast friend whose
            wisdom calls new companions to your side when the journey needs them
            most. With every ally who answers the call, even the darkest road
            becomes one worth traveling.
          </p>

          <p className="text-explanation text-[1rem] mt-[22px] max-w-[470px]">
            RARE — A remarkable companion, waiting beyond the common paths of a
            Play Booster. Rare cards appear in the booster’s rare-or-mythic
            slot, making every pack a chance to discover a powerful new ally for
            the adventures ahead.
          </p>
        </div>
      </div>
    </section>
  )
}

const CardsSection = () => {
  return (
    <section className="relative h-screen w-full pb-[67px] pt-[67px] flex flex-col items-center bg-[linear-gradient(to_top,var(--color-dark-green),var(--color-light-green))]">
      <h1 className="text-title text-center w-[82%] max-w-[940px]">
        EVERY JOURNEY IS SHAPED BY THOSE WHO WALK BESIDE YOU
      </h1>
      <p className="text-body mt-[22px] text-center w-[90%] max-w-[1046px]">
        Beyond the rarest treasures lie the companions, creatures, places, and
        unexpected discoveries that bring every adventure to life. From quiet
        paths through the Shire to the shadows beneath the Lonely Mountain,
        every card carries a piece of the story—and every new discovery brings
        the company closer to its destination. Gather your allies, uncover the
        tales hidden within each card, and see where the road leads when the
        entire pack is finally revealed.
      </p>

      <p className="absolute bottom-[32px] left-1/2 -translate-x-1/2 text-explanation text-[1rem]">
        Images are digital renderings, not actual cards.
      </p>
    </section>
  )
}

export default function App() {
  return (
    <main className="app">
      <Hero />
      <MythicSection />
      <RareSection />
      <CardsSection />
    </main>
  )
}
