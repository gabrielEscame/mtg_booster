import {
  motion,
  type HTMLMotionProps
} from 'motion/react'

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

type FadeUpProps = HTMLMotionProps<'div'>

const FadeUp = ({
  children,
  ...props
}: FadeUpProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.8
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut'
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default FadeUp