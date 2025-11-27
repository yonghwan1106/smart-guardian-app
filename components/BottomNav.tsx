"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Map, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: "Home", href: "/" },
        { icon: Map, label: "Map", href: "/map" },
        { icon: Bell, label: "Alerts", href: "/alerts" },
        { icon: User, label: "Profile", href: "/profile" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full p-4 z-50">
            <div className="glass-panel rounded-3xl p-4 flex justify-between items-center shadow-2xl backdrop-blur-xl bg-slate-900/80">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-all duration-300 relative px-4",
                                isActive ? "text-[#00f2ff]" : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            {isActive && (
                                <div className="absolute -top-8 w-8 h-8 bg-[#00f2ff]/20 rounded-full blur-xl animate-pulse" />
                            )}
                            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            {/* <span className="text-[10px] font-medium">{item.label}</span> */}
                            {isActive && (
                                <div className="absolute -bottom-2 w-1 h-1 bg-[#00f2ff] rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
