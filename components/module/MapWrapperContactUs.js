"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const MapContactus = dynamic(() => import("./MapContactus"), { ssr: false });

export default function MapWrapperContactUs({
  province,
  focusedLocation,
  onLocationFocus,
}) {
  return <MapContactus province={province} focusedLocation={focusedLocation} />;
}
