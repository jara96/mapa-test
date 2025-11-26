import { useState } from "react";
import MapaModal from "./components/MapaModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [direccion, setDireccion] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Formulario con mapa</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>Dirección</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          style={{ display: "block", padding: "8px", width: "100%", marginTop: "5px" }}
        />
      </div>

      <button
        style={{
          background: "green",
          color: "white",
          padding: "10px 15px",
          cursor: "pointer",
          border: "none",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Elegir ubicación en el mapa
      </button>

      <p style={{ marginTop: "20px" }}>
        <strong>Latitud:</strong> {lat} <br />
        <strong>Longitud:</strong> {lng}
      </p>

      <MapaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectLocation={(latSel, lngSel, dirSel) => {
          setLat(latSel);
          setLng(lngSel);
          setDireccion(dirSel);
        }}
      />
    </div>
  );
}
