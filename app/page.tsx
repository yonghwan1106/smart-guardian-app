"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Wifi, Users, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  const { user, login, isCompanionActive, toggleCompanion } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate auto-login
    setTimeout(() => login(), 1000);
  }, [login]);

  if (!mounted) return null;

  return (
    <>
      <main className="flex-1 p-6 overflow-y-auto relative bg-[radial-gradient(circle_at_50%_0%,_#1e293b_0%,_#0f172a_50%)]">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-[#00f2ff] font-bold text-lg">
            <Shield className="w-6 h-6" />
            <span>Smart Guardian</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] text-xs font-semibold flex items-center gap-2">
            <Wifi className="w-3 h-3" />
            <span>Connected</span>
          </div>
        </header>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-light text-white leading-tight">
            안녕하세요,<br />
            <span className="font-bold text-[#00f2ff]">{user.name}</span>님<br />
            안전한 밤 되세요.
          </h1>
        </motion.div>

        {/* SOS Button */}
        <div className="flex justify-center mb-12 relative">
          <div className="absolute inset-0 bg-[#ff2e63]/20 rounded-full blur-3xl animate-pulse" />
          <Link href="/sos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-40 h-40 rounded-full bg-gradient-to-br from-[#ff2e63] to-[#c21d45] text-white text-3xl font-bold shadow-[0_10px_40px_rgba(255,46,99,0.4)] border-4 border-[#ff2e63]/50 z-10 relative flex items-center justify-center"
            >
              SOS
            </motion.button>
          </Link>
        </div>

        {/* Companion Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/70 backdrop-blur-md border border-white/10 rounded-3xl p-5 mb-4"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00f2ff]">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-semibold text-white">가상 동행 서비스</span>
            </div>
            <button
              onClick={toggleCompanion}
              className={cn(
                "w-12 h-7 rounded-full transition-colors duration-300 relative",
                isCompanionActive ? "bg-[#00f2ff]" : "bg-slate-700"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white absolute top-1 transition-transform duration-300",
                  isCompanionActive ? "left-6" : "left-1"
                )}
              />
            </button>
          </div>
          <p className="text-slate-400 text-sm pl-[52px]">
            가족과 관제센터가 귀갓길을 실시간으로 모니터링합니다.
          </p>
        </motion.div>

        {/* Safe Route Card */}
        <Link href="/map">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/70 backdrop-blur-md border border-white/10 rounded-3xl p-5 active:scale-95 transition-transform"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00f2ff]">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-semibold text-white">안심 경로 찾기</span>
              </div>
              <ChevronRight className="text-slate-500" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-white/5 rounded-2xl p-3 text-center">
                <div className="text-xs text-slate-400 mb-1">집까지</div>
                <div className="text-lg font-bold text-[#00f2ff]">12분</div>
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl p-3 text-center">
                <div className="text-xs text-slate-400 mb-1">안전지수</div>
                <div className="text-lg font-bold text-emerald-400">98%</div>
              </div>
            </div>
          </motion.div>
        </Link>
      </main>
      <BottomNav />
    </>
  );
}
