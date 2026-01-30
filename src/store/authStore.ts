import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;
    initialize: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    loading: true,

    initialize: async () => {
        try {
            // Get initial session
            const { data: { session } } = await supabase.auth.getSession();
            set({ session, user: session?.user ?? null, loading: false });

            // Listen for changes
            supabase.auth.onAuthStateChange((_event, session) => {
                set({ session, user: session?.user ?? null, loading: false });
            });
        } catch (error) {
            console.error('Auth initialization error:', error);
            set({ loading: false });
        }
    },

    signOut: async () => {
        await supabase.auth.signOut();
        set({ session: null, user: null });
    },
}));
