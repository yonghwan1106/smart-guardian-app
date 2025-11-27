"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, Shield, AlertTriangle, Info, Check, Trash2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useStore, Notification } from "@/store/useStore";
import { cn } from "@/lib/utils";

const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
        case "guardian": return <Shield className="w-5 h-5" />;
        case "safety": return <Check className="w-5 h-5" />;
        case "alert": return <AlertTriangle className="w-5 h-5" />;
        case "system": return <Info className="w-5 h-5" />;
        default: return <Bell className="w-5 h-5" />;
    }
};

const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
        case "guardian": return "bg-[#EDE9FE] text-[#7C3AED]";
        case "safety": return "bg-[#D1FAE5] text-[#10B981]";
        case "alert": return "bg-[#FEF3C7] text-[#F59E0B]";
        case "system": return "bg-[#F1F5F9] text-[#64748B]";
        default: return "bg-[#F1F5F9] text-[#64748B]";
    }
};

const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return minutes + "분 전";
    if (hours < 24) return hours + "시간 전";
    return days + "일 전";
};

export default function AlertsPage() {
    const { notifications, markNotificationRead, clearNotifications } = useStore();
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <>
            <main className="flex-1 flex flex-col px-5 pt-8 pb-28 overflow-y-auto bg-[#F8FAFC]">
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1E293B] mb-1">알림</h1>
                        <p className="text-sm text-[#64748B]">
                            {unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : "모든 알림을 확인했습니다"}
                        </p>
                    </div>
                    {notifications.length > 0 && (
                        <button
                            onClick={clearNotifications}
                            className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#EF4444] transition-colors shadow-sm"
                            aria-label="모든 알림 삭제"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </header>

                {/* Notifications List */}
                {notifications.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-5">
                            <Bell className="w-10 h-10 text-[#94A3B8]" />
                        </div>
                        <h2 className="text-lg font-semibold text-[#1E293B] mb-2">알림이 없습니다</h2>
                        <p className="text-sm text-[#64748B]">새로운 알림이 오면 여기에 표시됩니다.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {notifications.map((notification, index) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => markNotificationRead(notification.id)}
                                    className={cn(
                                        "bg-white rounded-2xl p-4 cursor-pointer transition-all duration-300 border shadow-sm",
                                        !notification.read ? "border-[#7C3AED] border-l-4" : "border-[#E2E8F0]"
                                    )}
                                >
                                    <div className="flex gap-4">
                                        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0", getNotificationColor(notification.type))}>
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className={cn("font-semibold text-sm", notification.read ? "text-[#64748B]" : "text-[#1E293B]")}>
                                                    {notification.title}
                                                </h3>
                                                <span className="text-xs text-[#94A3B8] flex-shrink-0">
                                                    {formatTime(notification.timestamp)}
                                                </span>
                                            </div>
                                            <p className={cn("text-sm mt-1 leading-relaxed", notification.read ? "text-[#94A3B8]" : "text-[#64748B]")}>
                                                {notification.message}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
            <BottomNav />
        </>
    );
}
