import type { Group } from 'three'

const animateCardsIntro = ({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: Group
}) => {
  node.visible = false

  const { position, rotation } = node

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
      z: 0.75,
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
      z: 1.5,
      x: 1.35,
      duration: 0.55,
      ease: 'power2.out'
    },
    '<+=0.3'
  )
}

const animateCardsDownward = ({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: Group
}) => {
  const { position, rotation } = node

  tl.to(
    rotation,
    {
      y: 0,
      duration: 1.2,
      ease: 'power2.inOut'
    },
    0
  )

  tl.to(
    position,
    {
      x: 1.35,
      z: 1.5,
      duration: 1.2,
      ease: 'power2.out'
    },
    '<'
  )
}

const animateCardsUpwards = ({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: Group
}) => {
  node.visible = false

  const { position, rotation } = node

  tl.to(
    rotation,
    {
      y: Math.PI * 2,
      duration: 1.2,
      ease: 'power2.inOut'
    },
    0
  )

  tl.to(
    position,
    {
      x: 1.5,
      z: 1.5,
      duration: 1.2,
      ease: 'power2.out'
    },
    '<'
  )
}

export default {
  intro: animateCardsIntro,
  downwards: animateCardsDownward,
  upwards: animateCardsUpwards
}
