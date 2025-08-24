"use client";

import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
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

export default function Map({ reps = [] }) {
  console.log(reps);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  const defaultCenter = [35.6892, 51.389];

  const firstValidRep = reps.find(
    (rep) =>
      rep.x !== null &&
      rep.x !== undefined &&
      rep.y !== null &&
      rep.y !== undefined
  );

  const center = firstValidRep
    ? [firstValidRep.x, firstValidRep.y]
    : defaultCenter;

  return (
    <div className="lg:min-h-[400px] h-full w-full">
      <MapContainer center={center} zoom={6} className="h-full w-full">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        <MapCenter center={center} />

        {reps.map(
          (rep) =>
            rep.x &&
            rep.y && (
              <Marker key={rep.id} position={[rep.x, rep.y]} icon={customIcon}>
                <Popup>
                  <strong>{rep.store_name}</strong>
                  <br />
                  {rep.address}
                  <br />
                  {rep.phone}
                </Popup>
              </Marker>
            )
        )}

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>موقعیت من</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

function MapCenter({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 13, { animate: true });
    }
  }, [center, map]);

  return null;
}
