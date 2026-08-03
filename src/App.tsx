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
    <section className="relative h-screen w-full overflow-hidden bg-[url('/images/hero_bg.jpg')] bg-no-repeat bg-[length:auto_100%] bg-left lg:bg-[length:204%]">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(102,102,102,0)_0%,_rgba(0,0,0,0.7)_70%)]" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_rgba(102,102,102,0)_25%)]" />

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

export default function App() {
  return (
    <main className="app">
      <Hero />
    </main>
  )
}
