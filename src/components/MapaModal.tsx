import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (lat: number, lng: number, direccion: string) => void;
}

export default function MapaModal({ isOpen, onClose, onSelectLocation }: Props) {
  const [latlng, setLatlng] = useState<[number, number] | null>(null);
  const [direccion, setDireccion] = useState("");

  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setLatlng([lat, lng]);

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
        const resp = await fetch(url);
        const data = await resp.json();

        setDireccion(data.display_name || "Dirección no encontrada");
      },
    });

    return null;
  }

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "15px",
          width: "90%",
          maxWidth: "700px",
          height: "500px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Seleccionar ubicación</h2>

        <div style={{ width: "100%", height: "350px", marginTop: "10px" }}>
          <MapContainer
            center={[-32.89, -68.85]}
            zoom={14}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
            {latlng && <Marker position={latlng} />}
          </MapContainer>
        </div>

        <p>
          <strong>Dirección detectada:</strong> {direccion}
        </p>

        <button
          disabled={!latlng}
          style={{
            background: latlng ? "blue" : "gray",
            color: "white",
            padding: "10px",
            width: "100%",
            marginTop: "10px",
            border: "none",
            cursor: latlng ? "pointer" : "not-allowed",
          }}
          onClick={() => {
            if (latlng) {
              onSelectLocation(latlng[0], latlng[1], direccion);
              onClose();
            }
          }}
        >
          Usar esta dirección
        </button>
      </div>
    </div>
  );
}
