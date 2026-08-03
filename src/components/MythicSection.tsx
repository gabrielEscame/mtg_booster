const MythicSection = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/images/mythic_bg.webp')] bg-no-repeat bg-cover bg-center">
      {/* Background gradients */}
      <div className="absolute inset-0 z-10 opacity-80 bg-[radial-gradient(circle_at_center,_rgba(102,102,102,0)_0%,_rgba(0,0,0,0.7)_70%)]" />

      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,_rgba(0,0,0,1)_0%,_rgba(102,102,102,0)_50%)]" />

      {/* Mythic content */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 flex w-[70%] flex-col justify-center">
        <h1 className="text-title max-w-[470px]">
          SMAUG <br />
          THE MAGNIFICENT
        </h1>

        <p className="text-body mt-[22px] max-w-[470px]">
          Beneath the Lonely Mountain lies more than gold. From the depths of
          your journey emerges Smaug the Magnificent—the fearsome Dragon whose
          hoard is matched only by his hunger for conquest. Draw near, if you
          dare, and claim a legend worthy of any adventurer’s collection.
        </p>

        <p className="text-explanation text-[1rem] mt-[22px] max-w-[470px]">
          Beneath the Lonely Mountain lies more than gold. From the depths of
          your journey emerges Smaug the Magnificent—the fearsome Dragon whose
          hoard is matched only by his hunger for conquest. Draw near, if you
          dare, and claim a legend worthy of any adventurer’s collection.
        </p>
      </div>
    </section>
  )
}

export default MythicSection