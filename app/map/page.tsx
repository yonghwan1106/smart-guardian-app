"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Navigation, Box } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";

export default function MapPage() {
    const [selectedRoute, setSelectedRoute] = useState<"safe" | "fast">("safe");
    const [isNavigating, setIsNavigating] = useState(false);
    const [is3DMode, setIs3DMode] = useState(false);

    return (
        <>
            <div className="flex-1 relative flex flex-col overflow-hidden bg-slate-900">
                {/* Map Container */}
                <div className="flex-1 relative z-0">
                    <MapComponent selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} is3DMode={is3DMode} />
                </div>

                {/* Overlay UI */}
                <div className="absolute top-0 left-0 w-full p-4 z-10 bg-gradient-to-b from-slate-900/80 to-transparent flex justify-between items-start">
                    <h2 className="text-lg font-bold text-white drop-shadow-md pt-2">안심 귀가 경로</h2>

                    {/* 3D Toggle Button */}
                    <button
                        onClick={() => setIs3DMode(!is3DMode)}
                        className={cn(
                            "p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg",
                            is3DMode
                                ? "bg-[#00f2ff]/20 border-[#00f2ff] text-[#00f2ff]"
                                : "bg-slate-800/80 border-white/10 text-slate-400"
                        )}
                    >
                        <Box size={24} strokeWidth={is3DMode ? 2.5 : 2} />
                        <span className="sr-only">3D Mode</span>
                    </button>
                </div>

                {/* Bottom Sheet */}
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="bg-slate-900/90 backdrop-blur-xl border-t border-white/10 p-5 rounded-t-3xl z-20 pb-8"
                >
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => setSelectedRoute("safe")}
                            className={cn(
                                "flex-1 p-3 rounded-xl border transition-all duration-300",
                                selectedRoute === "safe"
                                    ? "bg-[#00f2ff]/10 border-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                                    : "bg-slate-800 border-transparent opacity-60"
                            )}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className={cn("text-sm font-bold", selectedRoute === "safe" ? "text-[#00f2ff]" : "text-slate-400")}>안심 경로</span>
                                <Shield size={16} className={selectedRoute === "safe" ? "text-[#00f2ff]" : "text-slate-500"} />
                            </div>
                            <div className="text-xl font-bold text-white">12분</div>
                        </button>

                        <button
                            onClick={() => setSelectedRoute("fast")}
                            className={cn(
                                "flex-1 p-3 rounded-xl border transition-all duration-300",
                                selectedRoute === "fast"
                                    ? "bg-red-500/10 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                                    : "bg-slate-800 border-transparent opacity-60"
                            )}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className={cn("text-sm font-bold", selectedRoute === "fast" ? "text-red-400" : "text-slate-400")}>최단 경로</span>
                                <Clock size={16} className={selectedRoute === "fast" ? "text-red-400" : "text-slate-500"} />
                            </div>
                            <div className="text-xl font-bold text-white">10분</div>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsNavigating(true)}
                        className="w-full py-4 bg-[#00f2ff] text-slate-900 font-bold text-lg rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                        <Navigation size={20} />
                        {isNavigating ? "안내 중..." : "안내 시작"}
                    </button>
                </motion.div>
            </div>
            <BottomNav />
        </>
    );
}
