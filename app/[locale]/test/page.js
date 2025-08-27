"use client";
import React, { useEffect } from "react";

export default function Page({ video }) {
  console.log(video);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.aparat.com/embed/wiu74j6?data[rnddiv]=37667025165&data[responsive]=yes";
    script.async = true;
    document.getElementById("37667025165")?.appendChild(script);
  }, []);

  return (
    <div className="mt-[100px] w-full h-[5vh]">
      <div id="37667025165" className="w-full h-full"></div>
    </div>
  );
}
