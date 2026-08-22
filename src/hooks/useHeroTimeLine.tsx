import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { useEffect, type RefObject } from 'react'
import type { Group } from 'three'
import animateSnapToSection from '../animation/animateSnapToSection'
import animateBooster from '../animation/animateBooster'

type refElement = RefObject<HTMLElement | null>
type refDiv = RefObject<HTMLDivElement | null>

export default function useHeroTimeline({
  animationContainerRef,
  mythicSectionRef,
  boosterNode,
  cardsNode
}: {
  animationContainerRef: refDiv
  mythicSectionRef: refElement
  boosterNode: Group | null
  cardsNode: Group | null
}) {
  useEffect(() => {
    const animationContainerNode = animationContainerRef?.current
    const mythicNode = mythicSectionRef?.current

    if (!animationContainerNode || !mythicNode || !boosterNode || !cardsNode)
      return
    const tl = gsap.timeline({ paused: true })

    const trigger = ScrollTrigger.create({
      trigger: animationContainerNode,
      start: '6% top',
      onEnter: () => {
        tl.play()
      }
    })

    // slow for testing
    // tl.timeScale(0.5)

    animateSnapToSection({ tl, node: mythicNode })
    animateBooster({ tl, node: boosterNode })
    cardsNode.visible = false

    //Rise
    tl.to(
      cardsNode.position,
      {
        y: 1.25,
        duruation: 0.5,
        ease: 'power4.out'
      },
      0.8
    )

    tl.to(cardsNode, { visible: true }, 0.8)

    // Dive down
    tl.to(
      cardsNode.rotation,
      {
        x: Math.PI * 0.8,
        duration: 0.35,
        ease: 'power1.inOut'
      },
      '<+=0.25'
    )

    tl.to(
      cardsNode.position,
      {
        y: -1.25,
        z: 1,
        duration: 0.65,
        ease: 'power2.out'
      },
      '<+=0.25'
    )

    tl.to(
      cardsNode.rotation,
      {
        x: 0,
        duration: 0.7,
        ease: 'power2.inOut'
      },
      '<'
    )

    tl.to(
      cardsNode.position,
      {
        y: 0,
        z: 2,
        duration: 0.55,
        ease: 'power2.out'
      },
      '<+=0.3'
    )

    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowRight') {
        tl.restart()
      }
    })

    return () => {
      trigger.kill()
      tl.kill()
    }
  }, [window, animationContainerRef, mythicSectionRef, boosterNode, cardsNode])
}
