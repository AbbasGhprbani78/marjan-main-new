<div className="min-h-screen flex flex-col">
  <section className="relative w-full flex-grow flex items-center justify-center mt-[130px] lg:mt-0  ">
    <Image
      src={`${process.env.NEXT_PUBLIC_API_URL}${singleData?.default_image}`}
      fill
      alt="image project"
      className="object-cover"
      style={{ width: "100%" }}
      unoptimized
      quality={100}
    />

    {singleData?.name && (
      <p
        className={`w-max text-white font-normal text-[1.5rem] md:text-[2rem] z-10 ${
          ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
        }`}
      >
        {singleData?.name}
      </p>
    )}
  </section>
  <div className="flex flex-col gap-[1rem] px-20 md:px-40 lg:px-80 mt-[2.5rem] bg-white">
    {singleData?.name && (
      <p className="font-medium text-[1.1rem]">{singleData?.name}</p>
    )}

    {singleData?.location && (
      <p className="font-medium text-[1.1rem]">
        <span>{dict["City"]}: </span>
        {singleData?.location}
      </p>
    )}

    {singleData?.env && (
      <p className="font-medium text-[1.1rem]">
        <span>{dict["Usage"]}: </span>
        {singleData?.env}
      </p>
    )}

    {singleData?.products?.length > 0 && (
      <p className="font-medium text-[1.1rem]">
        <span>{dict["Products"]}: </span>
        {singleData?.products?.map((p) => p?.title).join(" / ")}
      </p>
    )}
  </div>
</div>;
