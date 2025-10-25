"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper({
  reps = [],
  allrepresentives,
  userLocation,
  focusedRep,
}) {
  return (
    <Map
      reps={reps}
      allrepresentives={allrepresentives}
      userLocation={userLocation}
      focusedRep={focusedRep}
    />
  );
}
