import type {Group} from 'three'

export default function boosterAnimation  ({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: Group
})  {
  const { position, rotation } = node
  // Rise
  tl.to(
    position,
    {
      y: 0.8,
      duration: 0.5,
      ease: 'power3.out'
    },
    0
  )

  tl.to(
    rotation,
    {
      y: Math.PI,
      duration: 0.5,
      ease: 'power1.out'
    },
    '<'
  )

  // Fall
  tl.to(
    position,
    {
      y: -5,
      duration: 0.6,
      ease: 'power2.in'
    },
    '>+=0.07'
  )

  tl.to(
    rotation,
    {
      z: -Math.PI * 1.5,
      duration: 0.8,
      ease: 'power2.in'
    },
    '<+=0.12'
  )

  tl.to(
    rotation,
    {
      x: Math.PI,
      duration: 0.8,
      ease: 'power2.in'
    },
    '<'
  )

  tl.to(
    position,
    {
      x: 12,
      duration: 0.6,
      ease: 'power3.in'
    },
    '<+=0.01'
  )

  tl.to(
    position,
    {
      z: -3,
      duration: 0.5,
      ease: 'power2.in'
    },
    '<'
  )
}