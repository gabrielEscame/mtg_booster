import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { refDiv } from '../types'
import type { Group } from 'three'

export default function animateCounterMovement({
  start,
  strenght,
  containerNode,
  node
}: {
  start: string
  strenght: number
  containerNode: refDiv
  node: Group
}) {
  ScrollTrigger.create({
    trigger: containerNode.current,
    start,
    onUpdate: (self) => {
      gsap.set(node.position, { y: self.progress * strenght })
    }
  })
}
