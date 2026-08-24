import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useEffect } from 'react'

import type { refDiv } from '../types'
import type { Group } from 'three'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function useMythicSectionTimeline({
  animationContainerRef,
  mythicCardNode
}: {
  animationContainerRef: refDiv
  mythicCardNode: Group | null
}) {
  useEffect(() => {
    const aninmationContainerNode = animationContainerRef?.current
    
    if (!aninmationContainerNode || !mythicCardNode) return

    ScrollTrigger.create({
      trigger: animationContainerRef.current,
      start: '33.3% top',
      onUpdate: (self) => {
        gsap.set(mythicCardNode.position, { y: self.progress * 6 })
      }
    })
  }, [animationContainerRef, mythicCardNode])
}
