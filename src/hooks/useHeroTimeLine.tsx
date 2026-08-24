import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { useEffect } from 'react'
import type { Group } from 'three'
import animateSnapToSection from '../animation/animateSnapToSection'
import animateBooster from '../animation/animateBooster'
import animateCards from '../animation/animateCards'

import type { refDiv, refElement } from '../types'

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

    animateSnapToSection({ tl, node: mythicNode })
    animateBooster({ tl, node: boosterNode })
    animateCards({ tl, node: cardsNode })

    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowRight') {
        tl.restart()
      }
    })

    const trigger = ScrollTrigger.create({
      trigger: animationContainerNode,
      start: '6% top',
      onEnter: () => {
        tl.play()
      }
    })

    return () => {
      trigger.kill()
      tl.kill()
    }
  }, [window, animationContainerRef, mythicSectionRef, boosterNode, cardsNode])
}
