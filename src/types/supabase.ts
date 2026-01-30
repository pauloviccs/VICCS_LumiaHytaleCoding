export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            courses: {
                Row: {
                    created_at: string
                    description: string | null
                    id: string
                    is_published: boolean | null
                    slug: string
                    thumbnail_url: string | null
                    title: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    is_published?: boolean | null
                    slug: string
                    thumbnail_url?: string | null
                    title: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    is_published?: boolean | null
                    slug?: string
                    thumbnail_url?: string | null
                    title?: string
                }
                Relationships: []
            }
            lessons: {
                Row: {
                    content: string | null
                    created_at: string
                    id: string
                    module_id: string
                    order_index: number | null
                    title: string
                    type: string | null
                    xp_reward: number | null
                    validation_type: string | null
                    validation_value: string | null
                    starter_code: string | null
                    lore: string | null
                    tip_en: string | null
                    tip_pt: string | null
                }
                Insert: {
                    content?: string | null
                    created_at?: string
                    id?: string
                    module_id: string
                    order_index?: number | null
                    title: string
                    type?: string | null
                    xp_reward?: number | null
                    validation_type?: string | null
                    validation_value?: string | null
                    starter_code?: string | null
                    lore?: string | null
                }
                Update: {
                    content?: string | null
                    created_at?: string
                    id?: string
                    module_id?: string
                    order_index?: number | null
                    title?: string
                    type?: string | null
                    xp_reward?: number | null
                    validation_type?: string | null
                    validation_value?: string | null
                    starter_code?: string | null
                    lore?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "lessons_module_id_fkey"
                        columns: ["module_id"]
                        isOneToOne: false
                        referencedRelation: "modules"
                        referencedColumns: ["id"]
                    },
                ]
            }
            modules: {
                Row: {
                    course_id: string
                    created_at: string
                    id: string
                    order_index: number | null
                    title: string
                }
                Insert: {
                    course_id: string
                    created_at?: string
                    id?: string
                    order_index?: number | null
                    title: string
                }
                Update: {
                    course_id?: string
                    created_at?: string
                    id?: string
                    order_index?: number | null
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "modules_course_id_fkey"
                        columns: ["course_id"]
                        isOneToOne: false
                        referencedRelation: "courses"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    currency: number | null
                    id: string
                    level: number | null
                    streak: number | null
                    updated_at: string | null
                    username: string | null
                    xp: number | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    currency?: number | null
                    id: string
                    level?: number | null
                    streak?: number | null
                    updated_at?: string | null
                    username?: string | null
                    xp?: number | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    currency?: number | null
                    id?: string
                    level?: number | null
                    streak?: number | null
                    updated_at?: string | null
                    username?: string | null
                    xp?: number | null
                }
                Relationships: []
            }
            user_progress: {
                Row: {
                    completed_at: string | null
                    id: string
                    is_completed: boolean | null
                    lesson_id: string
                    user_id: string
                }
                Insert: {
                    completed_at?: string | null
                    id?: string
                    is_completed?: boolean | null
                    lesson_id: string
                    user_id: string
                }
                Update: {
                    completed_at?: string | null
                    id?: string
                    is_completed?: boolean | null
                    lesson_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_progress_lesson_id_fkey"
                        columns: ["lesson_id"]
                        isOneToOne: false
                        referencedRelation: "lessons"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "user_progress_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}


