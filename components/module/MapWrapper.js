"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper({ province }) {
  const reps = province?.cities || [];

  return <Map reps={reps} />;
}
