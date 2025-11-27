import BottomNav from "@/components/BottomNav";

export default function AlertsPage() {
    return (
        <>
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🔔</span>
                </div>
                <h1 className="text-xl font-bold text-white mb-2">알림 센터</h1>
                <p className="text-slate-400">새로운 알림이 없습니다.</p>
            </main>
            <BottomNav />
        </>
    );
}
