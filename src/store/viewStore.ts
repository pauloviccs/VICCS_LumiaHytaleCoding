import { create } from 'zustand';

type View = 'dashboard' | 'studio' | 'documentation';

interface ViewContext {
    moduleId?: string;
    lessonId?: string;
    projectId?: string;
}

interface ViewState {
    currentView: View;
    context: ViewContext | null;
    setView: (view: View, context?: ViewContext) => void;
}

export const useViewStore = create<ViewState>((set) => ({
    currentView: 'dashboard',
    context: null,
    setView: (view, context) => set({ currentView: view, context: context || null }),
}));
