"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "/images/location.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export default function Map({ reps = [] }) {
  const [userLocation, setUserLocation] = useState(null);
  const [initialCenter, setInitialCenter] = useState(null);

  useEffect(() => {
    fetch("/api/ip")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.latitude && data.longitude) {
          setInitialCenter([data.latitude, data.longitude]);
        } else {
        }
      })
      .catch(() => {});

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  const firstValidRep = reps.find((rep) => rep.x != null && rep.y != null);

  const center = firstValidRep
    ? [firstValidRep.x, firstValidRep.y]
    : initialCenter;

  const zoom = reps.length === 1 ? 15 : 10;

  return (
    <div className="lg:min-h-[400px] h-full w-full">
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        <MapCenter center={center} zoom={zoom} />

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

function MapCenter({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);

  return null;
}
