import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
    return (
        <>
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-slate-700 rounded-full mb-4 border-2 border-[#00f2ff]" />
                <h1 className="text-xl font-bold text-white mb-1">김국민</h1>
                <p className="text-slate-400 text-sm mb-6">서울시 관악구</p>

                <div className="w-full max-w-xs bg-slate-800 rounded-xl p-4 text-left mb-4">
                    <div className="text-xs text-slate-500 mb-1">비상 연락처</div>
                    <div className="text-white">010-1234-5678 (어머니)</div>
                </div>
            </main>
            <BottomNav />
        </>
    );
}
