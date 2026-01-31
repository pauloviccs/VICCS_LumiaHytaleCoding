import { useState, useEffect } from 'react';
import { GlassLayout } from '@/components/layout/GlassLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FluidButton, FluidCard } from '@/components/ui/FluidDesign'; // Import Fluid Components
import { useAuthStore } from '@/store/authStore';
import { useViewStore } from '@/store/viewStore';
import { useCourseStore } from '@/store/courseStore';
import {
    Dna,
    Terminal,
    BookOpen,
    Settings,
    LogOut,
    Trophy,
    Flame,
    Play,
    ChevronRight,
    Lock,
    Globe,
    Menu,
    X
} from 'lucide-react';
import { useLangStore } from '@/store/langStore';

export default function Dashboard() {
    const { user, profile, signOut } = useAuthStore();
    const { setView } = useViewStore();
    const {
        courses,
        fetchCourses,
        fetchLessons,
        fetchUserProgress,
        getRecentActivity,
        getCourseProgress,
        isModuleLocked,
        getLastActiveCourseId,
        getNextLesson
    } = useCourseStore();
    const { t, language, setLanguage } = useLangStore();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchCourses();
        if (user) {
            fetchUserProgress(user.id);
            // Also refresh profile to get latest XP/streak from database
            useAuthStore.getState().refreshProfile();
        }
    }, [fetchCourses, fetchUserProgress, user]);

    // Fetch lessons for all modules when courses are loaded (for progress calculation)
    useEffect(() => {
        if (courses.length > 0) {
            courses.forEach(course => {
                course.modules.forEach(module => {
                    if (!module.lessons || module.lessons.length === 0) {
                        fetchLessons(module.id);
                    }
                });
            });
        }
    }, [courses, fetchLessons]);

    // Dynamic Active Course
    const lastActiveDetails = getLastActiveCourseId();
    const activeCourse = courses.find(c => c.id === lastActiveDetails) || courses[0];

    const SidebarContent = () => (
        <>
            <div className="px-6 pb-6">
                <div className="flex items-center gap-3 mb-8 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-liquid-primary to-liquid-accent p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                            <img
                                src={profile?.avatar_url || user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${user?.email}`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-white text-sm truncate max-w-[120px]">{profile?.username || user?.user_metadata?.username || 'Agent'}</div>
                        <div className="text-xs text-liquid-primary">Lvl {profile?.level || 1} Initiate</div>
                    </div>
                </div>

                <nav className="space-y-2">
                    <NavButton icon={<Dna size={20} />} label={t('dash.nav.overview')} active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }} />
                    <NavButton icon={<Terminal size={20} />} label={t('dash.nav.projects')} active={activeTab === 'projects'} onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }} />
                    <NavButton icon={<BookOpen size={20} />} label={t('dash.nav.docs')} active={activeTab === 'docs'} onClick={() => { setActiveTab('docs'); setIsSidebarOpen(false); }} />
                    <NavButton icon={<Settings size={20} />} label={t('dash.nav.settings')} active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} />
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/10">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full p-2 rounded-lg hover:bg-white/5"
                >
                    <LogOut size={20} />
                    <span className="font-medium">{t('dash.nav.disconnect')}</span>
                </button>
            </div>
        </>
    );

    return (
        <GlassLayout>
            <div className="flex h-screen overflow-hidden relative">
                {/* Mobile Header Toggle */}
                <div className="absolute top-0 left-0 right-0 z-40 p-4 md:hidden flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10">
                    <div className="font-bold text-lg text-white">LUMINA<span className="text-liquid-primary">CODE</span></div>
                    <button onClick={() => setIsSidebarOpen(true)} className="text-white p-2">
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
                            />
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 20 }}
                                className="fixed inset-y-0 left-0 w-64 bg-liquid-bg border-r border-white/10 z-50 md:hidden flex flex-col pt-4"
                            >
                                <div className="absolute top-4 right-4">
                                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400">
                                        <X size={24} />
                                    </button>
                                </div>
                                <SidebarContent />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Desktop Sidebar */}
                <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-md hidden md:flex flex-col pt-20">
                    <SidebarContent />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-24 relative scrollbar-hide">
                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t('dash.command_center')}</h1>
                                <p className="text-gray-400 text-sm md:text-base">{t('dash.welcome')}</p>
                            </div>
                            <div className="flex gap-4 items-center self-end md:self-auto">
                                {/* Language Toggle */}
                                <button
                                    onClick={() => setLanguage(language === 'en' ? 'pt-br' : 'en')}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-wider text-white"
                                >
                                    <Globe size={14} />
                                    {language === 'en' ? 'EN' : 'PT-BR'}
                                </button>
                                <div className="hidden md:block h-6 w-px bg-white/10" />
                                <StatCard icon={<Flame className="text-orange-500" />} value={profile?.streak || 0} label={t('dash.streak')} />
                                <StatCard icon={<Trophy className="text-yellow-500" />} value={profile?.xp || 0} label={t('dash.xp')} />
                            </div>
                        </div>

                        {/* Next Lesson Card (Hero for Dashboard) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative p-6 md:p-8 rounded-2xl border border-liquid-primary/30 overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-liquid-primary/10 to-transparent transition-opacity group-hover:opacity-80" />
                            <div className="absolute inset-0 backdrop-blur-sm -z-10" />

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="w-full">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-liquid-primary/10 text-liquid-primary text-xs font-bold mb-4 border border-liquid-primary/20">
                                        {t('dash.objective')}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeCourse?.title || t('dash.loading')}</h2>
                                    <p className="text-gray-300 max-w-xl mb-6 text-sm md:text-base">
                                        {activeCourse?.description || t('dash.syncing')}
                                    </p>
                                    <FluidButton
                                        onClick={() => {
                                            // Use intelligent resume: find next uncompleted lesson
                                            const nextLesson = activeCourse ? getNextLesson(activeCourse.id) : undefined;
                                            if (nextLesson) {
                                                setView('studio', { moduleId: nextLesson.moduleId, lessonId: nextLesson.lessonId });
                                            } else if (activeCourse?.modules?.[0]?.id) {
                                                // Fallback to first module if no next lesson found
                                                setView('studio', { moduleId: activeCourse.modules[0].id });
                                            } else {
                                                setView('studio');
                                            }
                                        }}
                                        variant="secondary"
                                        className="w-full md:w-auto text-black"
                                    >
                                        <Play size={18} fill="currentColor" /> {t('dash.resume')}
                                    </FluidButton>
                                </div>

                                {/* Visual Progress Ring */}
                                <div className="hidden lg:block relative w-32 h-32 shrink-0">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray="364"
                                            strokeDashoffset={364 - (364 * (getCourseProgress(activeCourse?.id) / 100))}
                                            className="text-liquid-primary drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-2xl font-bold text-white">{getCourseProgress(activeCourse?.id)}%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Activity */}
                            <FluidCard className="border border-white/10">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg md:text-xl font-bold text-white">{t('dash.mission_log')}</h3>
                                    <button className="text-xs text-liquid-primary hover:underline">{t('dash.view_all')}</button>
                                </div>
                                <div className="space-y-4">
                                    {getRecentActivity().map((activity, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center border border-white/10 group-hover:border-liquid-primary/50 transition-colors shrink-0">
                                                <Terminal size={18} className="text-gray-400 group-hover:text-liquid-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-white font-medium text-sm truncate">
                                                    {t('dash.completed')} "{activity.lessons?.title || 'Unknown'}"
                                                </div>
                                                <div className="text-gray-500 text-xs">
                                                    {new Date(activity.completed_at || '').toLocaleDateString()} • +{activity.lessons?.xp_reward || 0} XP
                                                </div>
                                            </div>
                                            <ChevronRight size={16} className="ml-auto text-gray-600 group-hover:text-white shrink-0" />
                                        </div>
                                    ))}
                                    {getRecentActivity().length === 0 && (
                                        <div className="text-gray-500 text-sm text-center py-4">{t('dash.no_activity')}</div>
                                    )}
                                </div>
                            </FluidCard>

                            {/* Locked Modules */}
                            <FluidCard className="border border-white/10 opacity-70">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-6">{t('dash.upcoming')}</h3>
                                <div className="space-y-4">
                                    {activeCourse?.modules.slice(1).map((module: any) => {
                                        const locked = isModuleLocked(module.id);
                                        return (
                                            <div key={module.id} className={`p-4 border border-white/5 rounded-lg bg-black/20 flex items-center gap-4 ${locked ? 'opacity-50' : ''}`}>
                                                {locked ? <Lock className="text-gray-600 shrink-0" size={20} /> : <div className="w-5 h-5 rounded-full border border-green-500/50 bg-green-500/20" />}
                                                <div className="min-w-0">
                                                    <div className="text-gray-400 font-medium truncate">{module.title}</div>
                                                    <div className="text-xs text-gray-600 truncate">
                                                        {locked ? t('dash.locked') : 'Unlocked'}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }) || (
                                            <div className="text-gray-500 text-sm">{t('dash.no_modules')}</div>
                                        )}
                                </div>
                            </FluidCard>
                        </div>
                    </div>
                </main>
            </div>
        </GlassLayout>
    );
}

// Subcomponents
const NavButton = ({ icon, label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 text-left ${active
            ? 'bg-liquid-primary/10 text-white border border-liquid-primary/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
    >
        <span className={`shrink-0 ${active ? 'text-liquid-primary' : ''}`}>{icon}</span>
        <span className="font-medium text-sm flex-1 leading-tight">{label}</span>
    </button>
);

const StatCard = ({ icon, value, label }: any) => (
    <div className="flex items-center gap-3 px-3 md:px-4 py-2 rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm">
        <span className="shrink-0">{icon}</span>
        <div>
            <div className="text-white font-bold leading-none">{value}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
        </div>
    </div>
);

