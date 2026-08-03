const CardsSection = () => {
  return (
    <section className="relative h-screen w-full pb-[67px] pt-[67px] flex flex-col items-center bg-[linear-gradient(to_top,var(--color-dark-green),var(--color-light-green))]">
      <h1 className="text-title text-center w-[82%] max-w-[940px]">
        EVERY JOURNEY IS SHAPED BY THOSE WHO WALK BESIDE YOU
      </h1>
      <p className="text-body mt-[22px] text-center w-[90%] max-w-[1046px]">
        Beyond the rarest treasures lie the companions, creatures, places, and
        unexpected discoveries that bring every adventure to life. From quiet
        paths through the Shire to the shadows beneath the Lonely Mountain,
        every card carries a piece of the story—and every new discovery brings
        the company closer to its destination. Gather your allies, uncover the
        tales hidden within each card, and see where the road leads when the
        entire pack is finally revealed.
      </p>

      <p className="absolute bottom-[32px] left-1/2 -translate-x-1/2 text-explanation text-[1rem]">
        Images are digital renderings, not actual cards.
      </p>
    </section>
  )
}

export default CardsSection