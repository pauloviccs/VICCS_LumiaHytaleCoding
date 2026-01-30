import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Course, UserProgress } from '@/types';

// Extended type for View usage (includes joined data)
export interface EnrichedProgress extends UserProgress {
    lessons?: {
        title: string;
        xp_reward: number;
        modules?: {
            title: string;
        }
    }
}

interface CourseState {
    courses: Course[];
    userProgress: EnrichedProgress[]; // Actual progress records
    loading: boolean;
    error: string | null;
    fetchCourses: () => Promise<void>;
    fetchLessons: (moduleId: string) => Promise<void>;
    fetchUserProgress: (userId: string) => Promise<void>;

    // Helpers
    getRecentActivity: (limit?: number) => EnrichedProgress[];
    getCourseProgress: (courseId: string) => number;
    isModuleLocked: (moduleId: string) => boolean;
    getNextLesson: (courseId: string) => string | undefined; // Returns ID of next playable lesson
}

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: [],
    userProgress: [],
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
                        lessons: [], // Loaded separately or via fetchLessons
                        is_locked: false // Will be calculated by UI using isModuleLocked helper
                    }))
            }));

            set({ courses: formattedData as Course[] || [], loading: false });
        } catch (err: any) {
            console.error('Error fetching courses:', err);
            set({ error: err.message, loading: false });
        }
    },

    fetchLessons: async (moduleId: string) => {
        try {
            const { data, error } = await supabase
                .from('lessons')
                .select('*')
                .eq('module_id', moduleId)
                .order('order_index', { ascending: true });

            if (error) throw error;

            set(state => ({
                courses: state.courses.map(course => ({
                    ...course,
                    modules: course.modules.map(module =>
                        module.id === moduleId
                            ? { ...module, lessons: data as any[] }
                            : module
                    )
                }))
            }));
        } catch (err: any) {
            console.error('Error fetching lessons:', err);
        }
    },

    fetchUserProgress: async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_progress')
                .select(`
                    *,
                    lessons (
                        title,
                        xp_reward,
                        order_index,
                        module_id,
                        modules (
                            title,
                            course_id,
                            order_index
                        )
                    )
                `)
                .eq('user_id', userId)
                .eq('is_completed', true)
                .order('completed_at', { ascending: false });

            if (error) throw error;
            set({ userProgress: data as any[] });
        } catch (err) {
            console.error('Error fetching user progress:', err);
        }
    },

    getRecentActivity: (limit = 3) => {
        const { userProgress } = get();
        return userProgress.slice(0, limit);
    },

    getCourseProgress: (courseId: string) => {
        // This is an approximation since we don't have total lessons count easily available 
        // without fetching all lessons. For now, we'll return a calculated value if we have the data,
        // or a placeholder if we haven't loaded everything.
        // Ideally, specific counts should be stored on the course or module record, OR we fetch all lessons IDs.

        // For this prototype, we will check how many unique lessons for this course are in userProgress.
        // And compare against a hardcoded total or just return the count of completed lessons.
        // Improving logic: We'll count completed lessons for this courseId.

        const { userProgress } = get();
        // userProgress -> lessons -> modules -> course_id

        const completedForCourse = userProgress.filter(p =>
            (p.lessons as any)?.modules?.course_id === courseId
        );

        // Mocking total lessons for now as 10 per course to give a %
        // In a real app, 'courses' table would have 'total_lessons' field.
        const totalEstimated = 10;
        const pct = Math.min(100, Math.round((completedForCourse.length / totalEstimated) * 100));

        return pct;
    },

    isModuleLocked: (moduleId: string) => {
        const { courses, userProgress } = get();

        // Find the course and module
        let targetModule: any = null;
        let prevModule: any = null;

        for (const c of courses) {
            const idx = c.modules.findIndex(m => m.id === moduleId);
            if (idx !== -1) {
                targetModule = c.modules[idx];
                if (idx > 0) prevModule = c.modules[idx - 1];
                break;
            }
        }

        if (!targetModule) return false; // Should likely not happen?
        if (!prevModule) return false; // First module is always unlocked

        // Check if prevModule is completed
        // A module is completed if all its lessons are completed.
        // Validating "All Lessons" requires knowing all lessons of prevModule.
        // For this prototype, we'll assume a module is complete if at least 1 lesson from it is done
        // (Simplified logic to allow progression) OR we enforce fetching lessons for prevModule.

        // Flexible Logic: Module is unlocked if the LAST lesson of the previous module is completed.
        // We need to know what the last lesson ID is.
        // Without fetching all lessons, we can't be 100% sure.

        // Strategy: Check if *any* lesson from the previous module is present in userProgress.
        // If yes, we consider it "unlocked" for now to avoid blocking testing.
        // TODO: Implement strict "all lessons completed" check when we have total_lessons count.

        const hasProgressInPrev = userProgress.some(p =>
            (p.lessons as any)?.module_id === prevModule.id
        );

        return !hasProgressInPrev;
    },

    getNextLesson: (_courseId: string) => {
        // Intelligent Resume: Find the first uncompleted lesson.
        // Requires all lessons to be known.
        // If not loaded, we fallback to just opening the studio.
        return undefined;
    }
}));
