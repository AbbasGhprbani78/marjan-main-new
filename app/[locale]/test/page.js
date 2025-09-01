"use client";
import React from "react";

export default function VideoAparat() {
  return (
    <div className="w-full max-w-4xl mx-auto ">
      <iframe
        src="https://www.aparat.com/video/video/embed/videohash/wiu74j6/vt/frame"
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
