"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useRef } from "react";

interface MapaContactoProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
}

export default function MapaContacto({
  lat,
  lng,
  zoom = 10,
  height = "400px",
}: MapaContactoProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      // Configurar el icono por defecto de Leaflet
      // eslint-disable-next-line
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl,
        iconUrl: iconUrl,
        shadowUrl: shadowUrl,
      });

      // Crear el mapa
      const map = L.map(mapContainer.current).setView([lat, lng], zoom);

      // Agregar la capa de tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Agregar el marcador
      L.marker([lat, lng]).addTo(map).bindPopup("Nay's Dreams").openPopup();

      // Limpiar el mapa cuando el componente se desmonte
      return () => {
        map.remove();
      };
    }
  }, [lat, lng, zoom]);

  return (
    <div className="rounded-lg overflow-hidden z-0">
      <div
        ref={mapContainer}
        style={{
          height,
          zIndex: 0, // Aseguramos que el contenedor tenga z-index 0
        }}
        className="z-0"
      />
    </div>
  );
}
