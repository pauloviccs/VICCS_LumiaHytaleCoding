import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Course, Module } from '@/types';

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
            order_index,
            created_at,
            course_id
          )
        `)
                .order('created_at', { ascending: true });

            if (error) throw error;

            // Sort modules by order_index and format
            const formattedData = data?.map(course => ({
                ...course,
                modules: course.modules
                    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                    .map(m => ({
                        ...m,
                        lessons: [], // Loaded separately or we could join them
                        is_locked: false // Logic to be added based on progress
                    }))
            }));

            set({ courses: formattedData as Course[] || [], loading: false });
        } catch (err: any) {
            console.error('Error fetching courses:', err);
            set({ error: err.message, loading: false });
        }
    },
}));
