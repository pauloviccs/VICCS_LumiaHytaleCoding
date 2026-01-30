import type { Database } from './supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type CourseDef = Database['public']['Tables']['courses']['Row'];
export type ModuleDef = Database['public']['Tables']['modules']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];

// Extended types with relationships
export interface Module extends ModuleDef {
    lessons?: Lesson[];
    is_locked?: boolean; // UI state
}

export interface Course extends CourseDef {
    modules: Module[];
}
