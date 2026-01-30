import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface Module {
    id: string;
    title: string;
    description: string;
    order_index: number;
    is_locked: boolean;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    modules: Module[];
}

interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;
    fetchCourses: () => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    loading: false,
    error: null,

    fetchCourses: async () => {
        set({ loading: true });
        try {
            const { data, error } = await supabase
                .from('courses')
                .select(`
          *,
          modules (
            id,
            title,
            description,
            order_index,
            is_locked
          )
        `)
                .order('created_at', { ascending: true });

            if (error) throw error;

            // Sort modules by order_index
            const formattedData = data?.map(course => ({
                ...course,
                modules: course.modules.sort((a: Module, b: Module) => a.order_index - b.order_index)
            }));

            set({ courses: formattedData || [], loading: false });
        } catch (err: any) {
            console.error('Error fetching courses:', err);
            set({ error: err.message, loading: false });
        }
    },
}));
