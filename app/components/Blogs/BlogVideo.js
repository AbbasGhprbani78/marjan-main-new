"use client";
import Image from "next/image";
import React, { useRef, useMemo } from "react";

export default function BlogVideo({ singleBlog }) {
  const iframeRef = useRef(null);

  // گرفتن hash ویدیو از URL کامل Aparat
  const videoHash = useMemo(() => {
    if (!singleBlog?.aparat_video) return null;
    const match = singleBlog.aparat_video.match(/aparat\.com\/embed\/([^?]+)/);
    return match ? match[1] : null;
  }, [singleBlog?.aparat_video]);

  const handleFullScreen = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
  };

  return (
    <div className="relative w-full mt-[1rem] md:mt-[2rem] md:w-2/3 md:mx-auto">
      {videoHash ? (
        <div className="w-full aspect-video relative overflow-hidden">
          <iframe
            ref={iframeRef}
            src={`https://www.aparat.com/video/video/embed/videohash/${videoHash}/vt/frame`}
            allowFullScreen
            className="w-full h-full cursor-pointer"
            onClick={handleFullScreen}
          ></iframe>
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
