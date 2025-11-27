"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Map, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: "홈", href: "/" },
        { icon: Map, label: "지도", href: "/map" },
        { icon: Bell, label: "알림", href: "/alerts" },
        { icon: User, label: "내정보", href: "/profile" },
    ];

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-4 pt-2 z-50">
            <div className="rounded-2xl py-3 px-2 flex justify-around items-center bg-white border border-[#E2E8F0] shadow-lg">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-all duration-200 relative px-4 py-1",
                                isActive ? "text-[#7C3AED]" : "text-[#94A3B8]"
                            )}
                        >
                            {isActive && (
                                <div className="absolute -top-1 w-10 h-10 rounded-full bg-[#7C3AED] opacity-[0.12]" />
                            )}
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                            <span className={cn("text-[10px] relative z-10", isActive ? "font-semibold" : "font-medium")}>{item.label}</span>
                            {isActive && (
                                <div className="absolute -bottom-0.5 w-1 h-1 bg-[#7C3AED] rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
