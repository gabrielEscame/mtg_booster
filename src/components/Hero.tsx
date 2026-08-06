import { motion, useScroll, useTransform, easeIn } from 'motion/react'
import { useRef } from 'react'

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const gradientStop = useTransform(scrollYProgress, [0, 0.3], ['35%', '150%'], {
    ease: easeIn
  })

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full bg-[url('/images/hero_bg.jpg')] bg-no-repeat bg-[length:auto_100%] bg-left lg:bg-[length:204%]"
    >
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(102,102,102,0)_0%,_rgba(0,0,0,0.7)_70%)]" />

      {/* Animated bottom gradient */}
      <motion.div
        className="absolute inset-0 z-10"
        style={
          {
            '--gradient-stop': gradientStop,
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, transparent var(--gradient-stop))'
          } as React.CSSProperties
        }
      />

      {/* Hero content */}
      <div className="absolute top-[55px] left-[67px] z-30 flex w-[460px] flex-col justify-center">
        <img
          src="/images/mtg_logo.webp"
          alt="Magic: The Gathering"
          className="h-auto w-[460px]"
        />

        <p className="text-caption text-[0.7rem]">AVAILABLE AUGUST 14</p>

        <h1 className="text-title mt-[14px] w-fit">
          UNSEAL <br /> THE ADVENTURE
        </h1>

        <p className="text-body mt-[22px]">
          Join Bilbo’s journey through Middle-earth, with heroes to discover,
          treasures to uncover, and unexpected adventures waiting in every pack.
          Open your boosters, reveal the cards within, and see where the road
          takes you.
        </p>
      </div>

      <div className="absolute bottom-[50px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center opacity-60">
        <span className="block h-[67px] w-[1px] bg-[linear-gradient(to_bottom,transparent,var(--color-caption))]" />

        <p className="text-caption mt-[12px] text-[0.7rem]">SCROLL TO OPEN</p>
      </div>
    </section>
  )
}

export default Hero
