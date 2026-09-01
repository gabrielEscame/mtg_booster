import { useGLTF } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

import Stack from './Stack'
import type { SetGroup } from '../types'
import useMouseAnimation from '../hooks/useMouseAnimation'
import useIdleAnimation from '../hooks/useIdleAnimation'
import { useEffect } from 'react'

interface CardsProps {
  setMythicCardNode: SetGroup
  setRareStackNode: SetGroup
  setCardsNode: SetGroup
}

const Cards = ({ cardsProps }: { cardsProps: CardsProps }) => {
  const { setMythicCardNode, setCardsNode, setRareStackNode } = cardsProps

  const { scene: mythicCard } = useGLTF('/models/smaug_card.glb')
  const { scene: stackCard } = useGLTF('/models/rare_card.glb')

  const cardsMouseRef = useRef<THREE.Group | null>(null)
  const cardsIdleRef = useRef<THREE.Group | null>(null)

  useMouseAnimation(cardsMouseRef)
  useIdleAnimation(cardsIdleRef)

  const foilMask = useTexture('/textures/smaug_card_foil_mask.jpg')
  foilMask.colorSpace = THREE.NoColorSpace

  useEffect(() => {
    mythicCard.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      const material = child.material

      if (!(material instanceof THREE.MeshStandardMaterial)) return

      material.onBeforeCompile = (shader) => {
        shader.uniforms.uFoilMask = {
          value: foilMask
        }

        // -------------------------
        // Vertex shader
        // -------------------------

        shader.vertexShader = shader.vertexShader.replace(
          '#include <common>',
          `
      #include <common>

      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
    `
        )

        shader.vertexShader = shader.vertexShader.replace(
          '#include <worldpos_vertex>',
          `
      #include <worldpos_vertex>

      vWorldPosition = worldPosition.xyz;
      vWorldNormal = normalize(mat3(modelMatrix) * normal);
    `
        )

        // -------------------------
        // Fragment shader
        // -------------------------

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <common>',
          `
      #include <common>

      uniform sampler2D uFoilMask;

      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
    `
        )

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <dithering_fragment>',
          `
      // View direction
      vec3 viewDirection = normalize(
        cameraPosition - vWorldPosition
      );

      // How directly the surface faces the camera
      float facing = dot(
        normalize(vWorldNormal),
        viewDirection
      );

      // Repeat the rainbow over a smaller angle range
      float t = fract(facing * 3.0);

      // Rainbow
      vec3 foilColor = vec3(
        0.5 + 0.5 * cos(6.28318 * (t + 0.0)),
        0.5 + 0.5 * cos(6.28318 * (t + 0.33)),
        0.5 + 0.5 * cos(6.28318 * (t + 0.66))
      );

      // Your black/white foil mask
      float foilMask = texture2D(
        uFoilMask,
        vec2(vMapUv.x, 1.0 - vMapUv.y)
      ).r;

      // Preserve the original PBR color
      vec3 cardColor = gl_FragColor.rgb;

      // Mix original card + foil
      gl_FragColor.rgb = mix(
        cardColor,
        foilColor,
        foilMask * 0.2
      );

      #include <dithering_fragment>
    `
        )
      }

      material.needsUpdate = true
    })
  }, [mythicCard, foilMask])

  return (
    <group ref={(node) => setCardsNode(node)} position={[1.5, 0, -0.2]}>
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
