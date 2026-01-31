import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';

interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;

    fetchProjects: () => Promise<void>;
    createProject: (project: Pick<Project, 'title' | 'type'> & Partial<Project>) => Promise<Project | null>;
    updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
    projects: [],
    loading: false,
    error: null,

    fetchProjects: async () => {
        set({ loading: true });
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            set({ projects: data as Project[] || [], loading: false });
        } catch (err: any) {
            console.error('Error fetching projects:', err);
            set({ error: err.message, loading: false });
        }
    },

    createProject: async (project) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const newProject = {
                ...project,
                user_id: user.id
            };

            const { data, error } = await supabase
                .from('projects')
                .insert(newProject)
                .select()
                .single();

            if (error) throw error;

            const created = data as Project;
            set(state => ({ projects: [created, ...state.projects] }));
            return created;
        } catch (err: any) {
            console.error('Error creating project:', err);
            return null;
        }
    },

    updateProject: async (id, updates) => {
        try {
            const { error } = await supabase
                .from('projects')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;

            set(state => ({
                projects: state.projects.map(p =>
                    p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
                )
            }));
        } catch (err: any) {
            console.error('Error updating project:', err);
        }
    },

    deleteProject: async (id) => {
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) throw error;

            set(state => ({
                projects: state.projects.filter(p => p.id !== id)
            }));
        } catch (err: any) {
            console.error('Error deleting project:', err);
        }
    }
}));
