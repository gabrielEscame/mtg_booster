import type { Group } from 'three'

export default function animateCards({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: Group
}) {
  let { visible, position, rotation } = node
  visible = false

  //Rise
  tl.to(
    position,
    {
      y: 1.25,
      duruation: 0.5,
      ease: 'power4.out'
    },
    0.8
  )

  tl.to(node, { visible: true }, 0.8)

  // Dive down
  tl.to(
    rotation,
    {
      x: Math.PI * 0.8,
      duration: 0.35,
      ease: 'power1.inOut'
    },
    '<+=0.25'
  )

  tl.to(
    position,
    {
      y: -1.25,
      z: 1,
      duration: 0.65,
      ease: 'power2.out'
    },
    '<+=0.25'
  )

  tl.to(
    rotation,
    {
      x: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    },
    '<'
  )

  tl.to(
    position,
    {
      y: 0,
      z: 2,
      duration: 0.55,
      ease: 'power2.out'
    },
    '<+=0.3'
  )
}
