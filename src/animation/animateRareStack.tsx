import type { Group } from 'three'

const animateRareStackDownwards = ({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: Group
}) => {
  const { position, rotation } = node

  tl.to(position, { x: -2.8, duration: 1.2, ease: 'power2.inOut' }, 0)
  tl.to(
    rotation,
    { y: Math.PI * 2, duration: 0.72, ease: 'sine.out' },
    '<+=0.48'
  )
}

const animateRareStackUpwards = ({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: Group
}) => {
  const { position, rotation } = node

  tl.to(position, { x: 0, duration: 1.2, ease: 'power2.inOut' }, 0)
  tl.to(
    rotation,
    { y: 0, duration: 0.72, ease: 'sine.inOut' },
    '<'
  )
}

export default {
  downward: animateRareStackDownwards,
  upward: animateRareStackUpwards
}