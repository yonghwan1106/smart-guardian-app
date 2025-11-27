"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Map, Bell, User, Phone, Zap, Navigation, Heart } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function Home() {
  const { user, login, isCompanionActive, toggleCompanion } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => login(), 800);
  }, [login]);

  if (!mounted) return null;

  return (
    <>
      <main className="flex-1 p-6 pb-24 overflow-y-auto relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00f2ff] to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)]">
              <Shield className="w-5 h-5 text-slate-900" fill="currentColor" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-wide text-white">Smart<span className="text-[#00f2ff]">Guardian</span></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full glass-panel flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-300">Connected</span>
            </div>
            <Link href="/profile">
              <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center overflow-hidden border border-white/20">
                <User size={20} className="text-slate-300" />
              </div>
            </Link>
          </div>
        </header>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light text-white leading-tight tracking-tight">
            Hello, <br />
            <span className="font-bold text-[#00f2ff] text-glow">{user.name || "Guest"}</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Your safety is active and monitored.</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* SOS Button - Large Item */}
          <motion.div
            className="bento-item-large glass-panel rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/sos" className="absolute inset-0 z-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff2e63]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Emergency SOS</h3>
                <p className="text-red-200 text-sm">Tap for immediate help</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ff2e63] flex items-center justify-center shadow-[0_0_30px_rgba(255,46,99,0.5)] animate-pulse-glow">
                <Phone className="text-white" size={24} fill="currentColor" />
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[#ff2e63] font-medium text-sm">
              <Zap size={14} fill="currentColor" />
              <span>Instant Police Dispatch</span>
            </div>
          </motion.div>

          {/* Safe Route */}
          <Link href="/map" className="block">
            <motion.div
              className="glass-panel glass-panel-hover rounded-3xl p-5 h-full flex flex-col justify-between"
              whileHover={{ y: -5 }}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#00f2ff]/20 flex items-center justify-center text-[#00f2ff] mb-3">
                <Map size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-none mb-1">Safe Route</h3>
                <p className="text-slate-400 text-xs">AI-optimized path</p>
              </div>
            </motion.div>
          </Link>

          {/* Virtual Companion */}
          <motion.div
            className={cn(
              "glass-panel glass-panel-hover rounded-3xl p-5 h-full flex flex-col justify-between cursor-pointer transition-all duration-300",
              isCompanionActive ? "border-[#00f2ff]/50 bg-[#00f2ff]/5" : ""
            )}
            onClick={toggleCompanion}
            whileHover={{ y: -5 }}
          >
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center mb-3 transition-colors",
              isCompanionActive ? "bg-[#00f2ff] text-slate-900 shadow-[0_0_20px_rgba(0,242,255,0.4)]" : "bg-slate-700/50 text-slate-400"
            )}>
              <Shield size={20} fill={isCompanionActive ? "currentColor" : "none"} />
            </div>
            <div>
              <h3 className={cn("text-lg font-bold leading-none mb-1", isCompanionActive ? "text-[#00f2ff]" : "text-white")}>
                Guardian
              </h3>
              <p className="text-slate-400 text-xs">{isCompanionActive ? "Active Monitoring" : "Tap to Activate"}</p>
            </div>
          </motion.div>

          {/* Status Card - Large */}
          <div className="bento-item-large glass-panel rounded-3xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center relative">
                <Heart className="text-pink-500" size={20} fill="currentColor" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Heart Rate</div>
                <div className="text-xl font-bold text-white">72 <span className="text-sm font-normal text-slate-500">BPM</span></div>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-slate-400 text-right">Battery</div>
                <div className="text-xl font-bold text-white text-right">94%</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <Zap className="text-yellow-400" size={20} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

      </main>
      <BottomNav />
    </>
  );
}
