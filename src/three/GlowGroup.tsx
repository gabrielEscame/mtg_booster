import { Billboard, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function Glow({
  rotation,
  position,
  offset,
  speed
}: {
  rotation: [number, number, number]
  position: [number, number, number]
  offset: number
  speed: number
}) {
  const material = useRef<THREE.ShaderMaterial>(null)

  const texture = useTexture('/images/glow.jpg')

  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uOffset: { value: offset },
      uSpeed: { value: speed }
    }),
    [texture, offset, speed]
  )

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  return (
    <Billboard>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[4, 1.5]} />

        <shaderMaterial
          ref={material}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          toneMapped={false}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </Billboard>
  )
}

export default function GlowGroup() {
  return (
    <group position={[0, 0, -0.4]}>
      <Glow
        rotation={[0, 0, Math.PI]}
        position={[0, 1.6, 0]}
        offset={0.15}
        speed={0.8}
      />

      <Glow
        rotation={[0, 0, Math.PI / 1.3]}
        position={[0.7, 1.2, 0]}
        offset={0.35}
        speed={0.8}
      />

      <Glow
        rotation={[0, 0, -(Math.PI / 1.3)]}
        position={[-0.7, 1.25, 0]}
        offset={0.2}
        speed={0.8}
      />

      <Glow
        rotation={[0, 0, Math.PI / 1.75]}
        position={[0.9, 0.5, 0]}
        offset={0.05}
        speed={0.8}
      />

      <Glow
        rotation={[0, 0, -(Math.PI / 1.75)]}
        position={[-0.9, 0.5, 0]}
        offset={0.3}
        speed={0.8}
      />
    </group>
  )
}

const vertexShader = `
varying vec2 vUv;

void main() {

    vUv = uv;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(position, 1.0);

}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uOffset;
uniform float uSpeed;

varying vec2 vUv;

void main() {

//----------------------------------
// Texture alpha
//----------------------------------

float tex = texture2D(
    uTexture,
    vUv
).r;


//----------------------------------
// Animation timeline
//----------------------------------

// Each glow starts almost together.
// uOffset should only have tiny differences
// between planes (ex: 0.00, 0.03, 0.06...)
float pulse =
    0.5 +
    0.5 *
    sin(
        uTime * uSpeed +
        uOffset
    );


// Controls when the fade begins/ends
float fade = smoothstep(
    0.3,
    0.8,
    pulse
);


//----------------------------------
// Color transition
//----------------------------------

vec3 white = vec3(1.0);

vec3 blue = vec3(
    0.60,
    0.70,
    0.85
);


vec3 color = mix(
    white,
    blue,
    fade
);


//----------------------------------
// Light fading ramp
//----------------------------------

// Slow natural light decay
float lightFade = 1.0 - pow(
    fade,
    2.5
);

float alpha = tex * lightFade;


//----------------------------------
// Output
//----------------------------------

color *= tex;

gl_FragColor = vec4(
    color,
    alpha
);

}
`
