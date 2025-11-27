"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Navigation, Box, Home, Map, Bell, User } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MapPage() {
    const [selectedRoute, setSelectedRoute] = useState<"safe" | "fast">("safe");
    const [isNavigating, setIsNavigating] = useState(false);
    const [is3DMode, setIs3DMode] = useState(false);

    return (
        <div className="flex-1 relative flex flex-col overflow-hidden bg-[#F8FAFC]">
            <div className="flex-1 relative z-0">
                <MapComponent selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} is3DMode={is3DMode} />
            </div>

            <div className="absolute top-0 left-0 w-full p-4 z-10 bg-gradient-to-b from-white/90 to-transparent flex justify-between items-start">
                <h2 className="text-lg font-bold text-[#1E293B] pt-2">안심 귀가 경로</h2>
                <button
                    onClick={() => setIs3DMode(!is3DMode)}
                    className={cn(
                        "p-3 rounded-xl border transition-all duration-300 shadow-sm",
                        is3DMode ? "bg-[#7C3AED] border-[#7C3AED] text-white" : "bg-white border-[#E2E8F0] text-[#64748B]"
                    )}
                >
                    <Box size={22} strokeWidth={is3DMode ? 2.5 : 2} />
                </button>
            </div>

            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-white border-t border-[#E2E8F0] p-5 rounded-t-3xl shadow-lg">
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => setSelectedRoute("safe")}
                        className={cn(
                            "flex-1 p-4 rounded-xl border transition-all duration-300",
                            selectedRoute === "safe" ? "bg-[#EDE9FE] border-[#7C3AED]" : "bg-[#F8FAFC] border-[#E2E8F0]"
                        )}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className={cn("text-sm font-bold", selectedRoute === "safe" ? "text-[#7C3AED]" : "text-[#64748B]")}>안심 경로</span>
                            <Shield size={16} className={selectedRoute === "safe" ? "text-[#7C3AED]" : "text-[#94A3B8]"} />
                        </div>
                        <div className="text-xl font-bold text-[#1E293B]">12분</div>
                    </button>

                    <button
                        onClick={() => setSelectedRoute("fast")}
                        className={cn(
                            "flex-1 p-4 rounded-xl border transition-all duration-300",
                            selectedRoute === "fast" ? "bg-[#FEE2E2] border-[#EF4444]" : "bg-[#F8FAFC] border-[#E2E8F0]"
                        )}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className={cn("text-sm font-bold", selectedRoute === "fast" ? "text-[#EF4444]" : "text-[#64748B]")}>최단 경로</span>
                            <Clock size={16} className={selectedRoute === "fast" ? "text-[#EF4444]" : "text-[#94A3B8]"} />
                        </div>
                        <div className="text-xl font-bold text-[#1E293B]">10분</div>
                    </button>
                </div>

                <button
                    onClick={() => setIsNavigating(true)}
                    className="w-full py-4 bg-[#7C3AED] text-white font-bold text-base rounded-xl shadow-lg shadow-purple-200 active:scale-95 transition-transform flex items-center justify-center gap-2 mb-4"
                >
                    <Navigation size={20} />
                    {isNavigating ? "안내 중..." : "안내 시작"}
                </button>

                <div className="rounded-2xl py-3 px-2 flex justify-around items-center bg-white border border-[#E2E8F0] shadow-sm">
                    <Link href="/" className="flex flex-col items-center gap-1 px-4 py-1 text-[#94A3B8]">
                        <Home size={22} strokeWidth={2} />
                        <span className="text-[10px] font-medium">홈</span>
                    </Link>
                    <Link href="/map" className="flex flex-col items-center gap-1 px-4 py-1 relative text-[#7C3AED]">
                        <div className="absolute -top-1 w-10 h-10 rounded-full bg-[#7C3AED] opacity-[0.12]" />
                        <Map size={22} strokeWidth={2.5} className="relative z-10" />
                        <span className="text-[10px] font-semibold relative z-10">지도</span>
                        <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#7C3AED]" />
                    </Link>
                    <Link href="/alerts" className="flex flex-col items-center gap-1 px-4 py-1 text-[#94A3B8]">
                        <Bell size={22} strokeWidth={2} />
                        <span className="text-[10px] font-medium">알림</span>
                    </Link>
                    <Link href="/profile" className="flex flex-col items-center gap-1 px-4 py-1 text-[#94A3B8]">
                        <User size={22} strokeWidth={2} />
                        <span className="text-[10px] font-medium">내정보</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
