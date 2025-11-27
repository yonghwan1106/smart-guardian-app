"use client";

import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const safeRouteColor = "#00f2ff"; // Mint
const fastRouteColor = "#ef4444"; // Red/Gray

interface MapInnerProps {
    selectedRoute: "safe" | "fast" | null;
    onSelectRoute: (route: "safe" | "fast") => void;
}

export default function MapInner({ selectedRoute, onSelectRoute }: MapInnerProps) {
    const center: [number, number] = [37.5665, 126.9780]; // Seoul City Hall

    // Mock Routes
    const fastRoute: [number, number][] = [
        [37.5665, 126.9780],
        [37.5655, 126.9770],
        [37.5645, 126.9760],
        [37.5635, 126.9750],
    ];

    const safeRoute: [number, number][] = [
        [37.5665, 126.9780],
        [37.5660, 126.9790], // Detour to main road
        [37.5650, 126.9795],
        [37.5640, 126.9785],
        [37.5635, 126.9750],
    ];

    return (
        <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%", background: "#0f172a" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Fast Route */}
            <Polyline
                positions={fastRoute}
                pathOptions={{
                    color: fastRouteColor,
                    weight: 4,
                    opacity: selectedRoute === "fast" ? 1 : 0.3,
                    dashArray: "10, 10"
                }}
                eventHandlers={{ click: () => onSelectRoute("fast") }}
            />

            {/* Safe Route */}
            <Polyline
                positions={safeRoute}
                pathOptions={{
                    color: safeRouteColor,
                    weight: 6,
                    opacity: selectedRoute === "safe" ? 1 : 0.5
                }}
                eventHandlers={{ click: () => onSelectRoute("safe") }}
            />

            <Marker position={center} />
            <Marker position={[37.5635, 126.9750]} />
        </MapContainer>
    );
}
