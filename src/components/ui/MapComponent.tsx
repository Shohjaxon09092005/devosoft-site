// components/MapComponent.tsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Leaflet ikonlari uchun zarur sozlash
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useTranslation } from "react-i18next";

let DefaultIcon = L.divIcon({
  html: `<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">📍</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  position?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

export default function MapComponent({
  position = [41.2995, 69.2401], // Toshkent koordinatalari
  zoom = 13,
  height = "500px",
  className = "",
}: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation("contact");
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        className={`w-full bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Xarita yuklanmoqda...</h3>
          <p className="text-muted-foreground">Iltimos kuting</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    >
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://share.google/wM6siBrYQiRNb46iD">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <strong>{t("offices.title")}</strong>
              <br />
              Guliston, O'zbekiston
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
