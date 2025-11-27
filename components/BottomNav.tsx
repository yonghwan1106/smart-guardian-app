"use client";

import { Home, Map, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: "홈", href: "/" },
        { icon: Map, label: "지도", href: "/map" },
        { icon: Bell, label: "알림", href: "/alerts" },
        { icon: User, label: "MY", href: "/profile" },
    ];

    return (
        <nav className="bg-slate-900/90 backdrop-blur-md border-t border-white/10 p-4 pb-6 flex justify-between items-center z-50">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center gap-1 transition-colors duration-300",
                            isActive ? "text-[#00f2ff]" : "text-slate-400 hover:text-slate-200"
                        )}
                    >
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
