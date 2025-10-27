"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const customIcon = L.icon({
  iconUrl: "/images/location.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export default function MapContactus({ province, focusedLocation }) {
  const [mapCenter, setMapCenter] = useState(null);

  const cities = province?.cities || [];

  useEffect(() => {
    if (focusedLocation && focusedLocation.x && focusedLocation.y) {
      setMapCenter([focusedLocation.x, focusedLocation.y]);
    } else if (cities.length > 0) {
      const firstValidCity = cities.find(
        (city) => city.x != null && city.y != null
      );
      if (firstValidCity) {
        setMapCenter([firstValidCity.x, firstValidCity.y]);
      }
    }
  }, [cities, focusedLocation]);

  const firstValidCity = cities.find(
    (city) => city.x != null && city.y != null
  );

  const center =
    mapCenter ||
    (firstValidCity
      ? [firstValidCity.x, firstValidCity.y]
      : [32.626021, 51.66114]);

  const zoom = focusedLocation ? 15 : cities.length > 0 ? 12 : 12;

  return (
    <div className="lg:min-h-[400px] h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {cities.map((city, index) => (
          <Marker key={index} position={[city.x, city.y]} icon={customIcon}>
            <Popup>
              <div>
                <h3 className="font-bold text-lg mb-2">{city.name}</h3>
                <p className="text-sm mb-1">
                  <strong>آدرس:</strong> {city.address}
                </p>
                <p className="text-sm mb-1">
                  <strong>تلفن:</strong> {city.phone}
                </p>
                <p className="text-sm mb-1">
                  <strong>ایمیل:</strong> {city.email}
                </p>
                <a
                  href={city.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  مشاهده در نقشه گوگل
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapCenter center={center} zoom={zoom} />
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
