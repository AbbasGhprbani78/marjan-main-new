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
    <div className="w-full max-w-4xl mx-auto">
      <iframe
        ref={iframeRef}
        src={`https://www.aparat.com/video/video/embed/videohash/${videoHash}/vt/frame`}
        allowFullScreen
        webkitAllowFullScreen
        mozAllowFullScreen
        className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] "
        style={{
          display: "block",
        }}
      ></iframe>
    </div>
  );
}
