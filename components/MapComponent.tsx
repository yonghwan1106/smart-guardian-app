"use client";

import dynamic from "next/dynamic";

interface MapComponentProps {
    selectedRoute: "safe" | "fast";
    onSelectRoute: (route: "safe" | "fast") => void;
    is3DMode: boolean;
}

const MapInner = dynamic(() => import("./MapInner"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-slate-500">지도를 불러오는 중...</div>,
});

export default function MapComponent(props: MapComponentProps) {
    return <MapInner {...props} />;
}
