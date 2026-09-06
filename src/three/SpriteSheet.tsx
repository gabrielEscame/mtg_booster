import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

const SpriteSheet = () => {
  const texture = useLoader(
    THREE.TextureLoader,
    '/images/spritesheet.png'
  )

  const frame = useRef(0)
  const elapsed = useRef(0)

  const columns = 6
  const totalFrames = 33
  const fps = 24

  const frameSize = 1024
  const atlasSize = 6144

  texture.colorSpace = THREE.SRGBColorSpace

  // No mipmaps: prevents neighbouring frames
  // from bleeding into each other.
  texture.generateMipmaps = false

  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  // Each frame occupies exactly one 1024x1024 cell.
  texture.repeat.set(
    frameSize / atlasSize,
    frameSize / atlasSize
  )

  // Start at frame 0.
  texture.offset.set(
    0,
    (atlasSize - frameSize) / atlasSize
  )

  useFrame((_, delta) => {
    elapsed.current += delta

    if (elapsed.current >= 1 / fps) {
      elapsed.current -= 1 / fps

      frame.current += 1

      if (frame.current >= totalFrames) {
        frame.current = 0
      }

      const column = frame.current % columns
      const row = Math.floor(frame.current / columns)

      const x = column * frameSize
      const y = row * frameSize

      texture.offset.set(
        x / atlasSize,
        (atlasSize - y - frameSize) / atlasSize
      )
    }
  })

  return (
    <mesh>
      <planeGeometry args={[3, 3]} />

      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        color='#59ed7e'
      />
    </mesh>
  )
}

export default SpriteSheet