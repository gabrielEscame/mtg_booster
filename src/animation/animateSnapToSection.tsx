export default function animateSnapToSection({
  tl,
  node
}: {
  tl: gsap.core.Timeline
  node: HTMLElement
}) {
  tl.to(
    window,
    {
      duration: 1.2,
      scrollTo: {
        y: node,
        autoKill: false
      },
      ease: 'power2.inOut'
    },
    0
  )
}
