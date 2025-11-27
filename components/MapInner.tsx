"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons for safety facilities
const createCustomIcon = (color: string, emoji: string) => L.divIcon({
    className: "custom-marker",
    html: "<div style=\"background:" + color + ";width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)\">" + emoji + "</div>",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const cctvIcon = createCustomIcon("#3b82f6", "📹");
const policeIcon = createCustomIcon("#ef4444", "👮");
const storeIcon = createCustomIcon("#22c55e", "🏪");
const currentLocationIcon = createCustomIcon("#00f2ff", "📍");
const destinationIcon = createCustomIcon("#f59e0b", "🏠");

const safeRouteColor = "#00f2ff";
const fastRouteColor = "#ef4444";

// Safety facility data (mock - Seoul area)
const safetyFacilities = {
    cctv: [
        { id: 1, position: [37.5670, 126.9785] as [number, number], name: "CCTV #1 - 시청역 앞" },
        { id: 2, position: [37.5658, 126.9775] as [number, number], name: "CCTV #2 - 덕수궁 앞" },
        { id: 3, position: [37.5648, 126.9790] as [number, number], name: "CCTV #3 - 서울광장" },
        { id: 4, position: [37.5655, 126.9760] as [number, number], name: "CCTV #4 - 을지로입구" },
    ],
    police: [
        { id: 1, position: [37.5660, 126.9770] as [number, number], name: "중구경찰서 시청지구대" },
        { id: 2, position: [37.5640, 126.9755] as [number, number], name: "을지로 파출소" },
    ],
    stores: [
        { id: 1, position: [37.5663, 126.9792] as [number, number], name: "CU 시청역점 (여성안심지킴이)" },
        { id: 2, position: [37.5652, 126.9768] as [number, number], name: "GS25 덕수궁점 (여성안심지킴이)" },
        { id: 3, position: [37.5645, 126.9780] as [number, number], name: "세븐일레븐 서울광장점" },
    ],
};

interface MapInnerProps {
    selectedRoute: "safe" | "fast" | null;
    onSelectRoute: (route: "safe" | "fast") => void;
    is3DMode: boolean;
}

function LocationTracker({ onLocationUpdate }: { onLocationUpdate: (pos: [number, number]) => void }) {
    const map = useMap();

    useEffect(() => {
        if (!navigator.geolocation) return;

        const defaultPos: [number, number] = [37.5665, 126.9780];
        onLocationUpdate(defaultPos);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos: [number, number] = [position.coords.latitude, position.coords.longitude];
                onLocationUpdate(pos);
                map.setView(pos, 16);
            },
            () => {
                onLocationUpdate(defaultPos);
            }
        );
    }, [map, onLocationUpdate]);

    return null;
}

export default function MapInner({ selectedRoute, onSelectRoute, is3DMode }: MapInnerProps) {
    const [currentLocation, setCurrentLocation] = useState<[number, number]>([37.5665, 126.9780]);
    const center: [number, number] = [37.5665, 126.9780];

    const fastRoute: [number, number][] = [
        [37.5665, 126.9780],
        [37.5655, 126.9770],
        [37.5645, 126.9760],
        [37.5635, 126.9750],
    ];

    const safeRoute: [number, number][] = [
        [37.5665, 126.9780],
        [37.5660, 126.9790],
        [37.5650, 126.9795],
        [37.5640, 126.9785],
        [37.5635, 126.9750],
    ];

    const transformStyle = is3DMode ? "rotateX(45deg) scale(1.2)" : "rotateX(0deg)";
    const perspectiveStyle = is3DMode ? "1000px" : "none";
    const scaleClass = is3DMode ? "scale-110" : "";

    return (
        <div className={"w-full h-full transition-transform duration-1000 " + scaleClass} style={{ perspective: perspectiveStyle }}>
            <div className="w-full h-full transition-transform duration-1000" style={{ transform: transformStyle, transformStyle: "preserve-3d" }}>
                <MapContainer center={center} zoom={16} style={{ height: "100%", width: "100%", background: "#0f172a" }} zoomControl={false}>
                    <TileLayer attribution="OpenStreetMap" url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                    <LocationTracker onLocationUpdate={setCurrentLocation} />
                    <Marker position={currentLocation} icon={currentLocationIcon}><Popup><strong>현재 위치</strong></Popup></Marker>
                    <Circle center={currentLocation} radius={30} pathOptions={{ color: "#00f2ff", fillColor: "#00f2ff", fillOpacity: 0.2, weight: 2 }} />
                    {safetyFacilities.cctv.map((cctv) => (<Marker key={"cctv-" + cctv.id} position={cctv.position} icon={cctvIcon}><Popup><strong>📹 {cctv.name}</strong><p style={{fontSize: "11px", color: "#666"}}>24시간 감시 중</p></Popup></Marker>))}
                    {safetyFacilities.police.map((police) => (<Marker key={"police-" + police.id} position={police.position} icon={policeIcon}><Popup><strong>👮 {police.name}</strong><p style={{fontSize: "11px", color: "#666"}}>긴급시 연락: 112</p></Popup></Marker>))}
                    {safetyFacilities.stores.map((store) => (<Marker key={"store-" + store.id} position={store.position} icon={storeIcon}><Popup><strong>🏪 {store.name}</strong><p style={{fontSize: "11px", color: "#22c55e"}}>안심 귀가 협력점</p></Popup></Marker>))}
                    <Polyline positions={fastRoute} pathOptions={{ color: fastRouteColor, weight: 4, opacity: selectedRoute === "fast" ? 1 : 0.3, dashArray: "10, 10" }} eventHandlers={{ click: () => onSelectRoute("fast") }} />
                    <Polyline positions={safeRoute} pathOptions={{ color: safeRouteColor, weight: 6, opacity: selectedRoute === "safe" ? 1 : 0.5 }} eventHandlers={{ click: () => onSelectRoute("safe") }} />
                    <Marker position={[37.5635, 126.9750]} icon={destinationIcon}><Popup><strong>🏠 목적지</strong></Popup></Marker>
                </MapContainer>
            </div>
        </div>
    );
}
