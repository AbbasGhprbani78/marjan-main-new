"use client";
import Image from "next/image";
import React from "react";

export default function AboutDetail({ aboutDetail }) {
  return (
    <>
      {aboutDetail?.length > 0 &&
        aboutDetail.map((item, i) => (
          <div key={i}>
            <div className="block lg:hidden">
              <div className="w-full relative aspect-[3/2] md:aspect-[3/1.5]">
                <ImageContent url={item.image} />
              </div>
              <TextContent title={item.title} text={item.text} />
            </div>
            <div className="hidden lg:grid md:grid-cols-12">
              <div className="md:col-span-6 lg:col-span-4 h-auto flex justify-center items-center">
                {i % 2 === 0 ? (
                  <div className="md:px-40 xl:px-80">
                    <TextContent title={item.title} text={item.text} />
                  </div>
                ) : (
                  <div className="w-full  relative md:h-full lg:min-h-[327px]  ">
                    <ImageContent url={item.image} />
                  </div>
                )}
              </div>
              <div className="md:col-span-6 lg:col-span-8 h-auto flex justify-around items-center">
                {i % 2 === 0 ? (
                  <div className="w-full relative md:h-full lg:min-h-[327px]  ">
                    <ImageContent url={item.image} />
                  </div>
                ) : (
                  <div className=" w-2/4">
                    <TextContent title={item.title} text={item.text} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

function ImageContent({ url }) {
  return (
    <Image src={url} fill className="object-cover " alt="image about item" />
  );
}

function TextContent({ title, text }) {
  return (
    <div className="mb-[20px] md:mb-[40px] lg:mb-0 px-20 lg:px-0 text-[var(--color-gray-900)] lg:py-[5rem]">
      <h3 className="text-base mt-[18px] md:mt-[36px] lg:mt-0 title text-[var(--color-gray-900)] font-[500]">
        {title}
      </h3>
      <p className="text-[1rem] md:text-base mt-[15px] text-justify md:max-h-[230px] md:overflow-y-auto">
        {text}
      </p>
    </div>
  );
}
