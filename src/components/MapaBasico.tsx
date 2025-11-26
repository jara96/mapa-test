import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importante

function ClickCapture({ setPosicion }: any) {
  useMapEvents({
    click(e) {
      const nueva = [e.latlng.lat, e.latlng.lng] as [number, number];
      console.log("Nueva posición:", nueva);
      setPosicion(nueva);
    },
  });

  return null;
}

const MapaBasico = () => {
  const [posicion, setPosicion] = useState<[number, number] | null>(null);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <MapContainer
        center={[-32.89, -68.844]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}  // 👈 ESTO ES LO QUE FALTABA
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickCapture setPosicion={setPosicion} />
        {posicion && <Marker position={posicion} />}
      </MapContainer>
    </div>
  );
};

export default MapaBasico;
