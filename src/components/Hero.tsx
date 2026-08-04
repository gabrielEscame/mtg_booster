const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/images/hero_bg.jpg')] bg-no-repeat bg-[length:auto_100%] bg-left lg:bg-[length:204%]">
      {/* Background gradients */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(102,102,102,0)_0%,_rgba(0,0,0,0.7)_70%)]" />

      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_rgba(102,102,102,0)_35%)]" />

      {/* Hero content */}
      <div className="absolute top-[55px] left-[67px] z-30 flex w-[460px] flex-col justify-center">
        <img
          src="/images/mtg_logo.webp"
          alt="Magic: The Gathering"
          className="h-auto w-[460px]"
        />

        <p className="text-caption text-[0.7rem]">AVAILABLE AUGUST 14</p>

        <h1 className="text-title mt-[14px] w-fit">UNSEAL <br/> THE ADVENTURE</h1>

        <p className="text-body mt-[22px]">
          Join Bilbo’s journey through Middle-earth, with heroes to discover,
          treasures to uncover, and unexpected adventures waiting in every pack.
          Open your boosters, reveal the cards within, and see where the road
          takes you.
        </p>
      </div>

      <div className="absolute bottom-[50px] z-10 opacity-60 flex flex-col items-center left-1/2 -translate-x-1/2">
        <span className="block h-[67px] w-[1px] bg-[linear-gradient(to_bottom,transparent,var(--color-caption))]"></span>
        <p className="text-caption text-[0.7rem] mt-[12px]">SCROLL TO OPEN</p>
      </div>
    </section>
  )
}

export default Hero