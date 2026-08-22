import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { useEffect, type RefObject } from 'react'
import type { Group } from 'three'

type refElement = RefObject<HTMLElement | null>
type refDiv = RefObject<HTMLDivElement | null>

const mythicSectionSnapAnimation = ({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: HTMLElement
}) => {
  tl.to(window, {
    duration: 1.2,
    scrollTo: {
      y: node,
      autoKill: false
    },
    ease: 'power2.inOut'
  }, 0)
}

const boosterAnimation = ({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: Group
}) => {
  const { position, rotation } = node
  // Rise
  tl.to(position, {
    y: 0.8,
    duration: 0.5,
    ease: 'power3.out'
  }, 0)

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

export default function useHeroTimeline({
  animationContainerRef,
  mythicSectionRef,
  boosterNode
}: {
  animationContainerRef: refDiv
  mythicSectionRef: refElement
  boosterNode: Group | null
}) {
  useEffect(() => {
    const animationContainerNode = animationContainerRef?.current
    const mythicNode = mythicSectionRef?.current

    if (!animationContainerNode || !mythicNode || !boosterNode) return
    console.log('Entrou na função!')
    const tl = gsap.timeline({ paused: true })

    const trigger = ScrollTrigger.create({
      trigger: animationContainerNode,
      start: '8% top',
      onEnter: () => {
        console.log(' ENTROU ')
        tl.play()
      }
    })

    mythicSectionSnapAnimation({ tl, node: mythicNode })
    boosterAnimation({ tl, node: boosterNode })

    // window.addEventListener('keydown', (event) => {
    //   if (event.code === 'ArrowUp') {
    //     tl.restart()
    //   }
    // })

    return () => {
      trigger.kill()
      tl.kill()
    }
  }, [window, animationContainerRef, mythicSectionRef, boosterNode])
}
