import * as THREE from 'three'

const updateIdleAnimaation = ({
  ref,
  clock,
  strength = 1,
  phaseOut = 0
}: {
  ref: React.RefObject<THREE.Group | null>
  clock: THREE.Clock
  strength?: number
  phaseOut?: number
}) => {
  const node = ref.current
  if (!node) return

  const elapsedTime = clock.getElapsedTime() + phaseOut

  const idleXTranslationAmplitude = 0.0015
  const idleXTranslationSpeed = 4

  node.position.y =
    Math.sin(elapsedTime * idleXTranslationSpeed) *
    (idleXTranslationAmplitude * strength)

  const idleXRotationAmplitude = 0.06
  const idleXRotationSpeed = 0.8

  node.rotation.x =
    Math.sin(elapsedTime * idleXRotationSpeed) * (idleXRotationAmplitude * strength)

  const idleZRotationAmplitude = 0.06
  const idleZRotationSpeed = 0.8

  node.rotation.z =
    Math.sin(elapsedTime * idleZRotationSpeed) *
    (idleZRotationAmplitude * strength)
}

const updateMouseAnimation = ({
  ref,
  pointer,
  strength = 1
}: {
  ref: React.RefObject<THREE.Group | null>
  pointer: THREE.Vector2
  strength?: number
}) => {
  const node = ref.current
  if (!node) return

  const rotationY = pointer.x * 0.6
  const rotationX = pointer.x * 0.2

  node.rotation.y = THREE.MathUtils.lerp(
    node.rotation.y,
    rotationY * strength,
    0.05
  )

  node.rotation.x = THREE.MathUtils.lerp(
    node.rotation.x,
    rotationX * strength,
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
