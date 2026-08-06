import FadeUp from './animation/FadeUp'

const RareSection = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/images/rare_bg.webp')] bg-no-repeat bg-[length:auto_100%] bg-left lg:bg-[length:205%]">
      {/* Background gradients */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0)_70%)]" />

      {/* Mythic content */}
      <FadeUp className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-end w-[70%]">
        <div className="w-content flex flex-col justify-center">
          <h1 className="text-title max-w-[470px]">
            RADAGAST <br /> OF RHOSGOBEL
          </h1>

          <p className="text-body mt-[22px] max-w-[470px]">
            No road through Middle-earth is meant to be traveled alone. From the
            wild paths of Rhosgobel comes Radagast, a steadfast friend whose
            wisdom calls new companions to your side when the journey needs them
            most. With every ally who answers the call, even the darkest road
            becomes one worth traveling.
          </p>

          <p className="text-explanation text-[0.8rem] mt-[22px] max-w-[470px]">
            RARE — A remarkable companion, waiting beyond the common paths of a
            Play Booster. Rare cards appear in the booster’s rare-or-mythic
            slot, making every pack a chance to discover a powerful new ally for
            the adventures ahead.
          </p>
        </div>
      </FadeUp>
    </section>
  )
}

export default RareSection
