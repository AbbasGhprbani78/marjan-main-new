"use client";
import React, { useRef, useMemo } from "react";

export default function VideoContainer({ video }) {
  const iframeRef = useRef(null);

  const videoHash = useMemo(() => {
    if (!video) return null;
    const match = video.match(/aparat\.com\/embed\/([^?]+)/);
    return match ? match[1] : null;
  }, [video]);

  const handleFullScreen = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  if (!videoHash) return null;

  return (
    <div className="overflow-hidden">
      <iframe
        ref={iframeRef}
        src={`https://www.aparat.com/video/video/embed/videohash/${videoHash}/vt/frame`}
        allowFullScreen
        className="w-full h-[220px] lg:h-[500px] cursor-pointer"
        onClick={handleFullScreen}
      ></iframe>
    </div>
  );
}
