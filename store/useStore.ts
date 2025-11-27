import { create } from 'zustand';

export interface Notification {
    id: string;
    type: 'guardian' | 'safety' | 'alert' | 'system';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
}

export interface EmergencyContact {
    id: string;
    name: string;
    phone: string;
    relationship: string;
}

interface AppState {
    user: {
        name: string;
        isLoggedIn: boolean;
        phone: string;
        address: string;
    };
    emergencyContacts: EmergencyContact[];
    isEmergency: boolean;
    isCompanionActive: boolean;
    companionStartTime: Date | null;
    companionCheckInInterval: number;
    notifications: Notification[];
    login: () => void;
    setEmergency: (status: boolean) => void;
    toggleCompanion: () => void;
    startCompanion: () => void;
    stopCompanion: () => void;
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
    markNotificationRead: (id: string) => void;
    clearNotifications: () => void;
    updateEmergencyContact: (contact: EmergencyContact) => void;
    addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
    removeEmergencyContact: (id: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
    user: {
        name: '김국민',
        isLoggedIn: false,
        phone: '010-1234-5678',
        address: '서울시 관악구',
    },
    emergencyContacts: [
        { id: '1', name: '어머니', phone: '010-1234-5678', relationship: '가족' },
        { id: '2', name: '아버지', phone: '010-8765-4321', relationship: '가족' },
    ],
    isEmergency: false,
    isCompanionActive: false,
    companionStartTime: null,
    companionCheckInInterval: 10,
    notifications: [
        {
            id: '1',
            type: 'system',
            title: 'Smart Guardian 시작',
            message: '앱이 정상적으로 시작되었습니다. 안전한 귀가를 응원합니다!',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            read: true,
        },
        {
            id: '2',
            type: 'safety',
            title: '안심 귀가 경로 업데이트',
            message: '주변 CCTV 5대가 새로 설치되어 안심 경로가 업데이트되었습니다.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            read: false,
        },
        {
            id: '3',
            type: 'alert',
            title: '야간 안전 알림',
            message: '현재 시간대(22:00~06:00)는 안심 경로 이용을 권장합니다.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
            read: false,
        },
    ],
    login: () => set((state) => ({ user: { ...state.user, isLoggedIn: true } })),
    setEmergency: (status) => set({ isEmergency: status }),
    toggleCompanion: () => {
        const { isCompanionActive } = get();
        if (isCompanionActive) {
            get().stopCompanion();
        } else {
            get().startCompanion();
        }
    },
    startCompanion: () => {
        set({ isCompanionActive: true, companionStartTime: new Date() });
        get().addNotification({
            type: 'guardian',
            title: '가상 동행 시작',
            message: '위치가 비상 연락처에 공유되기 시작했습니다. 10분마다 체크인 알림이 전송됩니다.',
        });
    },
    stopCompanion: () => {
        set({ isCompanionActive: false, companionStartTime: null });
        get().addNotification({
            type: 'guardian',
            title: '가상 동행 종료',
            message: '안전하게 도착하셨군요! 위치 공유가 중단되었습니다.',
        });
    },
    addNotification: (notification) => set((state) => ({
        notifications: [
            { ...notification, id: Date.now().toString(), timestamp: new Date(), read: false },
            ...state.notifications,
        ],
    })),
    markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
    })),
    clearNotifications: () => set({ notifications: [] }),
    updateEmergencyContact: (contact) => set((state) => ({
        emergencyContacts: state.emergencyContacts.map((c) => c.id === contact.id ? contact : c),
    })),
    addEmergencyContact: (contact) => set((state) => ({
        emergencyContacts: [...state.emergencyContacts, { ...contact, id: Date.now().toString() }],
    })),
    removeEmergencyContact: (id) => set((state) => ({
        emergencyContacts: state.emergencyContacts.filter((c) => c.id !== id),
    })),
}));
