"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "/images/location.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export default function Map({ targetLocation = [35.6892, 51.389] }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  const path = userLocation ? [userLocation, targetLocation] : [];

  return (
    <div className="h-full w-full ">
      <MapContainer center={targetLocation} zoom={13} className="h-full w-full">
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        {/* <TileLayer url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png" /> */}
        {/* <TileLayer url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg" /> */}

        <Marker position={targetLocation} icon={customIcon}>
          <Popup>موقعیت مقصد</Popup>
        </Marker>

        {userLocation && (
          <>
            <Marker position={userLocation}>
              <Popup>موقعیت من</Popup>
            </Marker>
            <Polyline positions={path} color="blue" />
          </>
        )}
      </MapContainer>
    </div>
  );
}
