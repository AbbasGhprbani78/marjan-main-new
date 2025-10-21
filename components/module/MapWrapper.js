"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper({ reps = [] }) {
  return <Map reps={reps} />;
}
