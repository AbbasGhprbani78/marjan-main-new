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

export default function Map({
  reps = [],
  allrepresentives,
  userLocation,
  focusedRep,
}) {
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    if (focusedRep && focusedRep.x && focusedRep.y) {
      setMapCenter([focusedRep.x, focusedRep.y]);
    } else if (reps.length > 0) {
      const firstValidRep = reps.find((rep) => rep.x != null && rep.y != null);

      if (firstValidRep) {
        setMapCenter([firstValidRep.x, firstValidRep.y]);
      }
    } else if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [reps, userLocation, focusedRep]);

  const firstValidRep = reps.find((rep) => rep.x != null && rep.y != null);

  const center =
    mapCenter ||
    (firstValidRep ? [firstValidRep.x, firstValidRep.y] : [77.6892, 51.389]);

  const zoom = focusedRep ? 15 : reps.length > 0 ? 10 : 10;

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
      </MapContainer>
    </div>
  );
}

function MapCenter({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center && center.length === 2 && center[0] && center[1]) {
      map.setView(center, zoom, {
        animate: true,
        duration: 0.8,
        easeLinearity: 0.1,
      });
    }
  }, [center, zoom, map]);

  return null;
}
