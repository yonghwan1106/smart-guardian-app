"use client";

import dynamic from "next/dynamic";

const MapInner = dynamic(() => import("./MapInner"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-slate-500">지도를 불러오는 중...</div>,
});

export default function MapComponent(props: any) {
    return <MapInner {...props} />;
}
