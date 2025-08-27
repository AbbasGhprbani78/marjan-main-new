"use client";
import Image from "next/image";
import React, { useEffect } from "react";

export default function BlogVideo({ singleBlog }) {
  //singleBlog?.aparat_video
  useEffect(() => {
    if (singleBlog?.aparat_video) {
      const script = document.createElement("script");
      script.src = `https://www.aparat.com/embed/wiu74j6?data[rnddiv]=aparat-video-container&data[responsive]=yes`;
      script.async = true;
      document.getElementById("aparat-video-container")?.appendChild(script);
    }
  }, [singleBlog?.aparat_video]);

  return (
    <div className="relative w-full mt-[1rem] md:mt-[2rem] md:w-2/3 md:mx-auto">
      {singleBlog?.aparat_video ? (
        <div className="w-full aspect-video relative overflow-hidden">
          <div
            id="aparat-video-container"
            className="w-full h-full"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          ></div>
        </div>
      ) : singleBlog?.media ? (
        <div className="w-full aspect-[3/2] relative overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${singleBlog.media}`}
            fill
            alt="blog media"
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
