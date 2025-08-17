import React from "react";

export default function VideoContainer({ video }) {
  return (
    <div
      className="w-full  h-[50dvh]  lg:h-[70dvh] "
      style={{
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <video
        controls
        playsInline
        muted
        width="100%"
        preload="metadata"
        className="h-full object-cover"
      >
        <source
          src={`${process.env.NEXT_PUBLIC_API_URL}${video}`}
          type="video/mp4"
        />
        {/* <source src="/video/1.webm" type="video/mp4" />
        <source src="/video/1.webm" type="video/webm" />
        <source src="/video/1.ogv" type="video/ogg" /> */}
        {/* مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند. */}
      </video>
    </div>
  );
}
