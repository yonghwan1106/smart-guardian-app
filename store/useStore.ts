import { create } from 'zustand';

interface AppState {
    user: {
        name: string;
        isLoggedIn: boolean;
    };
    isEmergency: boolean;
    isCompanionActive: boolean;
    login: () => void;
    setEmergency: (status: boolean) => void;
    toggleCompanion: () => void;
}

export const useStore = create<AppState>((set) => ({
    user: {
        name: '김국민',
        isLoggedIn: false,
    },
    isEmergency: false,
    isCompanionActive: false,
    login: () => set((state) => ({ user: { ...state.user, isLoggedIn: true } })),
    setEmergency: (status) => set({ isEmergency: status }),
    toggleCompanion: () => set((state) => ({ isCompanionActive: !state.isCompanionActive })),
}));
