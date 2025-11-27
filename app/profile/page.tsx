"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Shield, Bell, Settings, ChevronRight, Plus, Trash2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const { user, emergencyContacts, isCompanionActive, toggleCompanion, addEmergencyContact, removeEmergencyContact } = useStore();
    const [isAddingContact, setIsAddingContact] = useState(false);
    const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });

    const handleAddContact = () => {
        if (newContact.name && newContact.phone) {
            addEmergencyContact(newContact);
            setNewContact({ name: "", phone: "", relationship: "" });
            setIsAddingContact(false);
        }
    };

    return (
        <>
            <main className="flex-1 flex flex-col px-5 pt-6 pb-28 overflow-y-auto bg-[#F8FAFC]">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 pt-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-200">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E293B] mb-1">{user.name}</h1>
                    <p className="text-[#64748B] text-sm flex items-center justify-center gap-2">
                        <MapPin size={14} /> {user.address}
                    </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-5 mb-6 border border-[#E2E8F0] shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", isCompanionActive ? "bg-[#EDE9FE]" : "bg-[#F1F5F9]")}>
                                <Shield className={cn("w-6 h-6", isCompanionActive ? "text-[#7C3AED]" : "text-[#94A3B8]")} fill={isCompanionActive ? "currentColor" : "none"} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-base text-[#1E293B]">가상 동행</h3>
                                <p className="text-sm text-[#64748B]">{isCompanionActive ? "활성화됨" : "비활성화됨"}</p>
                            </div>
                        </div>
                        <button onClick={toggleCompanion} className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all", isCompanionActive ? "bg-[#FEE2E2] text-[#EF4444]" : "bg-[#EDE9FE] text-[#7C3AED]")}>
                            {isCompanionActive ? "종료" : "시작"}
                        </button>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#1E293B]">비상 연락처</h2>
                        <button onClick={() => setIsAddingContact(true)} className="p-2.5 rounded-xl bg-[#EDE9FE] text-[#7C3AED]"><Plus size={20} /></button>
                    </div>
                    {isAddingContact && (
                        <div className="bg-white rounded-2xl p-5 mb-4 space-y-3 border border-[#E2E8F0] shadow-sm">
                            <input type="text" placeholder="이름" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#7C3AED]" />
                            <input type="tel" placeholder="전화번호" value={newContact.phone} onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#7C3AED]" />
                            <input type="text" placeholder="관계" value={newContact.relationship} onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#7C3AED]" />
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setIsAddingContact(false)} className="flex-1 py-3 rounded-xl bg-[#F1F5F9] text-[#64748B] text-sm font-medium">취소</button>
                                <button onClick={handleAddContact} className="flex-1 py-3 rounded-xl bg-[#7C3AED] text-white font-semibold text-sm">추가</button>
                            </div>
                        </div>
                    )}
                    <div className="space-y-3">
                        {emergencyContacts.map((contact) => (
                            <div key={contact.id} className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-[#FBCFE8] flex items-center justify-center"><Phone size={18} className="text-[#F472B6]" /></div>
                                        <div>
                                            <div className="font-semibold text-sm text-[#1E293B]">{contact.name}</div>
                                            <div className="text-sm text-[#64748B]">{contact.phone}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-[#64748B] px-2.5 py-1 bg-[#F1F5F9] rounded-full">{contact.relationship}</span>
                                        <button onClick={() => removeEmergencyContact(contact.id)} className="p-2 text-[#94A3B8] hover:text-[#EF4444] transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3">
                    <h2 className="text-lg font-bold text-[#1E293B] mb-4">설정</h2>
                    {[{ icon: Bell, label: "알림 설정", desc: "푸시 알림" },{ icon: Shield, label: "보안 설정", desc: "생체인증" },{ icon: Settings, label: "앱 설정", desc: "테마" }].map((item, index) => (
                        <button key={index} className="w-full bg-white rounded-2xl p-4 flex items-center justify-between border border-[#E2E8F0] shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-[#F1F5F9] flex items-center justify-center"><item.icon size={18} className="text-[#64748B]" /></div>
                                <div className="text-left">
                                    <div className="font-semibold text-sm text-[#1E293B]">{item.label}</div>
                                    <div className="text-xs text-[#94A3B8]">{item.desc}</div>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-[#94A3B8]" />
                        </button>
                    ))}
                </motion.div>
            </main>
            <BottomNav />
        </>
    );
}
