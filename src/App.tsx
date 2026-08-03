import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'

function Booster() {
  const { scene } = useGLTF('/models/booster.glb')

  return <primitive object={scene} scale={1} position={[-0.05, 0, 0]} />
}

function Card() {
  const { scene } = useGLTF('/models/card.glb')

  return <primitive object={scene} scale={1} position={[0.05, 0, 0]} />
}

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/images/hero_bg.jpg')] bg-no-repeat  bg-[length:auto_100%] bg-left lg:bg-[length:204%]">
      <div className="absolute inset-0 h-screen w-full bg-[radial-gradient(circle_at_center,_rgba(102,102,102,0)_0%,_rgba(0,0,0,0.7)_70%)] bg-center" />
      <div className="absolute inset-0 h-screen w-full bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_rgba(102,102,102,0)_25%)] bg-center" />
      <div className="absolute top-[55px] left-[67px] flex w-fit flex-col justify-center">
        <img
          src="/images/mtg_logo.webp"
          alt="Hero Image"
          className="w-[460px] h-auto"
        />
        <p className="text-caption text-[0.8rem]">AVAILABLE AUGUST 14</p>
        <h1 className="text-title mt-14px">UNSEAL THE ADVENTURE</h1>
        <p className="text-body mt-22px max-w-[460px] z">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="app">
      <Hero />
      {/* <Canvas
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
      </Canvas> */}
    </main>
  )
}
