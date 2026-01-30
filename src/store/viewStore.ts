import { create } from 'zustand';

type View = 'dashboard' | 'studio' | 'documentation';

interface ViewState {
    currentView: View;
    setView: (view: View) => void;
}

export const useViewStore = create<ViewState>((set) => ({
    currentView: 'dashboard',
    setView: (view) => set({ currentView: view }),
}));
