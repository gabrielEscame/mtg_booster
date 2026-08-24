import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useEffect } from 'react'

import type { refDiv, refElement } from '../types'
import type { Group } from 'three'
import animateSnapToSection from '../animation/animateSnapToSection'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function useMythicSectionTimeline({
  animationContainerRef,
  rareSectionRef,
  mythicCardNode,
  rareStackNode
}: {
  animationContainerRef: refDiv
  rareSectionRef: refElement
  mythicCardNode: Group | null
  rareStackNode: Group | null
}) {
  useEffect(() => {
    const aninmationContainerNode = animationContainerRef?.current
    const rareSectionNode = rareSectionRef?.current

    if (
      !aninmationContainerNode ||
      !rareSectionNode ||
      !mythicCardNode ||
      !rareStackNode
    )
      return

    const tl = gsap.timeline({ paused: true })

    animateSnapToSection({ tl, node: rareSectionNode })

    //Counter movement trigger
    ScrollTrigger.create({
      trigger: animationContainerRef.current,
      start: '33.3% top',
      onUpdate: (self) => {
        gsap.set(mythicCardNode.position, { y: self.progress * 6 })
      }
    })

    const trigger = ScrollTrigger.create({
      trigger: animationContainerRef.current,
      start: '39.3% top',
      onUpdate: () => {
        tl.play()
      }
    })

    return () => {
      trigger.kill()
      tl.kill()
    }
  }, [animationContainerRef, rareSectionRef, mythicCardNode, rareStackNode])
}
