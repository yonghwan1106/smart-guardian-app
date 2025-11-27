"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Map, User, Phone, Zap, Heart, MapPin, ChevronRight } from "lucide-react";
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
      <main className="flex-1 px-5 pt-8 pb-28 overflow-y-auto bg-[#F8FAFC]">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-purple-200">
              <Shield className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <span className="font-outfit font-bold text-lg text-[#1E293B]">Smart<span className="text-[#7C3AED]">Guardian</span></span>
          </div>
          <Link href="/profile">
            <div className="w-11 h-11 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm">
              <User size={20} className="text-[#64748B]" />
            </div>
          </Link>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 mb-6 border border-[#E2E8F0] shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm mb-1">안녕하세요</p>
              <h1 className="text-2xl font-bold text-[#1E293B]">{user.name || "Guest"}님</h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-sm text-[#10B981] font-medium">안전 모니터링 중</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#7C3AED]" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <Link href="/sos">
            <div className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-2xl p-6 shadow-lg shadow-red-200 active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">긴급 SOS</h3>
                  <p className="text-red-100 text-sm">탭하여 즉시 도움 요청</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Phone className="text-white w-6 h-6" fill="currentColor" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-white/90 text-sm">
                <Zap size={14} fill="currentColor" />
                <span>112 즉시 연결 · 위치 자동 공유</span>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
          <h2 className="text-base font-bold text-[#1E293B] mb-4">빠른 기능</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/map">
              <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm active:scale-[0.98] transition-transform h-full">
                <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] flex items-center justify-center mb-4">
                  <Map size={22} className="text-[#7C3AED]" />
                </div>
                <h3 className="text-base font-bold text-[#1E293B] mb-1">안심 경로</h3>
                <p className="text-sm text-[#64748B]">CCTV 밀집 경로</p>
              </div>
            </Link>

            <div
              onClick={toggleCompanion}
              className={cn(
                "bg-white rounded-2xl p-5 border shadow-sm cursor-pointer active:scale-[0.98] transition-all h-full",
                isCompanionActive ? "border-[#7C3AED] bg-[#FAF5FF]" : "border-[#E2E8F0]"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                isCompanionActive ? "bg-[#7C3AED] shadow-lg shadow-purple-200" : "bg-[#F1F5F9]"
              )}>
                <Shield size={22} className={isCompanionActive ? "text-white" : "text-[#64748B]"} fill={isCompanionActive ? "currentColor" : "none"} />
              </div>
              <h3 className={cn("text-base font-bold mb-1", isCompanionActive ? "text-[#7C3AED]" : "text-[#1E293B]")}>가상 동행</h3>
              <p className="text-sm text-[#64748B]">{isCompanionActive ? "모니터링 중" : "탭하여 활성화"}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-base font-bold text-[#1E293B] mb-4">내 상태</h2>
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] flex items-center justify-center">
                  <Heart className="text-[#EF4444] w-5 h-5" fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm text-[#64748B] mb-0.5">심박수</p>
                  <p className="text-xl font-bold text-[#1E293B]">72 <span className="text-sm font-normal text-[#94A3B8]">BPM</span></p>
                </div>
              </div>
              <div className="w-px h-12 bg-[#E2E8F0]" />
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-[#64748B] mb-0.5 text-right">배터리</p>
                  <p className="text-xl font-bold text-[#1E293B] text-right">94%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
                  <Zap className="text-[#F59E0B] w-5 h-5" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
                  <MapPin className="text-[#3B82F6] w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">현재 위치</p>
                  <p className="text-sm font-medium text-[#1E293B]">{user.address || "위치 확인 중..."}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#94A3B8]" />
            </div>
          </div>
        </motion.div>
      </main>
      <BottomNav />
    </>
  );
}
