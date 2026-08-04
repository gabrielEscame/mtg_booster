import * as THREE from 'three'

const updateIdleAnimaation = ({
  ref,
  clock
}: {
  ref: React.RefObject<THREE.Group | null>
  clock: THREE.Clock
}) => {
  const node = ref.current
  if (!node) return

  const elapsedTime = clock.getElapsedTime()

  const idleXTranslationAmplitude = 0.0015
  const idleXTranslationSpeed = 4

  node.position.y =
    Math.sin(elapsedTime * idleXTranslationSpeed) * idleXTranslationAmplitude

  const idleXRotationAmplitude = 0.06
  const idleXRotationSpeed = 0.8

  node.rotation.x =
    Math.sin(elapsedTime * idleXRotationSpeed) * idleXRotationAmplitude

  const idleZRotationAmplitude = 0.06
  const idleZRotationSpeed = 0.8

  node.rotation.z =
    Math.sin(elapsedTime * idleZRotationSpeed) * idleZRotationAmplitude
}

const updateMouseAnimation = ({
  ref,
  pointer
}: {
  ref: React.RefObject<THREE.Group | null>
  pointer: THREE.Vector2
}) => {
  const node = ref.current
  if (!node) return

  node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, pointer.x * 0.6, 0.05)

  node.rotation.x = THREE.MathUtils.lerp(
    node.rotation.x,
    -pointer.y * 0.1,
    0.05
  )
}

const updateOpacity = ({
  object,
  opacity
}: {
  object: THREE.Object3D
  opacity: number
}) => {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material]

    materials.forEach((material) => {
      material.transparent = true
      material.opacity = opacity
    })
  })
}

export { updateIdleAnimaation, updateMouseAnimation, updateOpacity }
