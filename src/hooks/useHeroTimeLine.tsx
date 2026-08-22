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
    const tl = gsap.timeline({ paused: true })

    const trigger = ScrollTrigger.create({
      trigger: animationContainerNode,
      start: '6% top',
      onEnter: () => {
        tl.play()
      }
    })

    animateSnapToSection({ tl, node: mythicNode })
    animateBooster({ tl, node: boosterNode })

    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowUp') {
        tl.restart()
      }
    })

    return () => {
      trigger.kill()
      tl.kill()
    }
  }, [window, animationContainerRef, mythicSectionRef, boosterNode])
}
