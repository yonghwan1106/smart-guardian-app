"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, PhoneCall, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SOSPage() {
    const [count, setCount] = useState(3);
    const [sent, setSent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setSent(true);
        }
    }, [count]);

    return (
        <main className="flex-1 flex flex-col items-center justify-center bg-[#2a0a0a] relative overflow-hidden">
            {/* Background Pulse */}
            <motion.div
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute inset-0 bg-red-600 z-0"
            />

            <div className="z-10 text-center w-full px-6">
                {!sent ? (
                    <>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-10"
                        >
                            <h1 className="text-white text-2xl font-bold mb-2">긴급 신고 전송 중</h1>
                            <p className="text-red-200">위급 상황이 아니라면 취소하세요.</p>
                        </motion.div>

                        <div className="text-[120px] font-black text-white mb-12 tabular-nums leading-none">
                            {count}
                        </div>

                        <Link href="/">
                            <button className="w-full py-4 bg-white text-red-600 font-bold text-lg rounded-full shadow-xl active:scale-95 transition-transform">
                                취소 (오작동)
                            </button>
                        </Link>
                    </>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                            <PhoneCall className="text-white w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">신고 접수 완료</h2>
                        <p className="text-slate-300 mb-6">
                            경찰과 관제센터에<br />
                            현재 위치가 전송되었습니다.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 bg-black/20 py-2 rounded-lg mb-8">
                            <MapPin size={16} />
                            <span>서울시 중구 세종대로 110</span>
                        </div>
                        <Link href="/">
                            <button className="w-full py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors">
                                메인으로 돌아가기
                            </button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
