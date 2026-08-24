import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useEffect } from 'react'

import type { refDiv, refElement } from '../types'
import type { Group } from 'three'
import animateSnapToSection from '../animation/animateSnapToSection'
import animateRareStack from '../animation/animateRareStack'
import animateCounterMovement from '../animation/animateCounterMovement'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function useMythicSectionTimeline({
  animationContainerRef,
  mythicSectionRef,
  rareSectionRef,
  mythicCardNode,
  rareStackNode
}: {
  animationContainerRef: refDiv
  mythicSectionRef: refElement
  rareSectionRef: refElement
  mythicCardNode: Group | null
  rareStackNode: Group | null
}) {
  useEffect(() => {
    const aninmationContainerNode = animationContainerRef?.current
    const rareSectionNode = rareSectionRef?.current
    const mythicSectionNode = mythicSectionRef?.current

    if (
      !aninmationContainerNode ||
      !mythicSectionNode ||
      !rareSectionNode ||
      !mythicCardNode ||
      !rareStackNode
    )
      return

    animateCounterMovement({
      start: '33.3% top',
      strenght: 6,
      containerNode: animationContainerRef,
      node: mythicCardNode
    })

    animateCounterMovement({
      start: '66.6% top',
      strenght: 3,
      containerNode: animationContainerRef,
      node: rareStackNode
    })

    const tlDownward = gsap.timeline({ paused: true })

    animateSnapToSection({ tl: tlDownward, node: rareSectionNode })
    animateRareStack.downward({ tl: tlDownward, node: rareStackNode })

    const triggerDownward = ScrollTrigger.create({
      trigger: animationContainerRef.current,
      start: '39.3% top',
      onEnter: () => {
        tlDownward.restart()
      },
    })

    const tlUpward = gsap.timeline({ paused: true })

    animateSnapToSection({ tl: tlUpward, node: mythicSectionNode })
    animateRareStack.upward({ tl: tlUpward, node: rareStackNode })


    const triggerUpward = ScrollTrigger.create({
      trigger: animationContainerRef.current,
      start: '94% bottom',
      onLeaveBack: () => {
        tlUpward.restart()
      }
    })

    return () => {
      triggerDownward.kill()
      triggerUpward.kill()
      tlDownward.kill()
      tlUpward.kill()
    }
  }, [
    animationContainerRef,
    mythicSectionRef,
    rareSectionRef,
    mythicCardNode,
    rareStackNode
  ])
}
