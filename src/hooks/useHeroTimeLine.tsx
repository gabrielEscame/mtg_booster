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
  HeroSectionRef,
  mythicSectionRef,
  boosterNode,
  cardsNode
}: {
  animationContainerRef: refDiv
  HeroSectionRef: refElement
  mythicSectionRef: refElement
  boosterNode: Group | null
  cardsNode: Group | null
}) {
  useEffect(() => {
    const animationContainerNode = animationContainerRef?.current
    const mythicNode = mythicSectionRef?.current
    const heroNode = HeroSectionRef?.current

    if (
      !animationContainerNode ||
      !mythicNode ||
      !heroNode ||
      !boosterNode ||
      !cardsNode
    )
      return
    const tlIntro = gsap.timeline({ paused: true })

    animateSnapToSection({ tl: tlIntro, node: mythicNode })
    animateBooster({ tl: tlIntro, node: boosterNode })
    animateCards.intro({ tl: tlIntro, node: cardsNode })

    const tlDownward = gsap.timeline({ paused: true })
    animateSnapToSection({ tl: tlDownward, node: mythicNode })
    animateCards.downwards({ tl: tlDownward, node: cardsNode })

    let hasPlayedIntro = false

    const triggerDownward = ScrollTrigger.create({
      trigger: animationContainerNode,
      start: '6% top',
      onEnter: () => {
        if (!hasPlayedIntro) {
          console.log(' INTRO ')
          tlIntro.play()
          hasPlayedIntro = true

          return
        }

        tlDownward.restart()
      }
    })

    const tlUpward = gsap.timeline({ paused: true })
    animateSnapToSection({ tl: tlUpward, node: heroNode })
    animateCards.upwards({ tl: tlUpward, node: cardsNode })

    const triggerUpward = ScrollTrigger.create({
      trigger: animationContainerNode,
      start: '26.3% top',
      onLeaveBack: () => tlUpward.restart()
    })

    return () => {
      triggerDownward.kill()
      tlIntro.kill()
      tlDownward.kill()
      triggerUpward.kill()
    }
  }, [
    window,
    animationContainerRef,
    HeroSectionRef,
    mythicSectionRef,
    boosterNode,
    cardsNode
  ])
}
