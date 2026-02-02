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
    X,
    Check,
    Edit2,
    AlertTriangle,
    User,
    Shield,
    CreditCard,
    Mail,
    Key,
    Sparkles,
    Plus,
    Folder,
    Trash2,
    FileCode,
    Box
} from 'lucide-react';

import { useLangStore } from '@/store/langStore';
import { supabase } from '@/lib/supabase';
import { useProjectStore } from '@/store/projectStore';
import { BlockbenchGuide } from './BlockbenchGuide';
import { AvatarUpload } from '@/components/profile/AvatarUpload';
import { KnowledgeBase } from '@/components/docs/KnowledgeBase';


const ProjectsView = () => {
    const { projects, fetchProjects, createProject, deleteProject, loading } = useProjectStore();
    const { setView } = useViewStore();
    const { language } = useLangStore();
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [template, setTemplate] = useState('script');

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreate = async () => {
        if (!newProjectTitle.trim()) return;
        const project = await createProject({
            title: newProjectTitle,
            type: template as any,
            content: template === 'script' ? '// Start coding your mod...' : '{}'
        });
        if (project) {
            setIsCreating(false);
            setNewProjectTitle('');
            setView('studio', { projectId: project.id });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Folder className="text-liquid-primary" />
                        {language === 'en' ? 'Project Portfolio' : 'Portfólio de Projetos'}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {language === 'en' ? 'Manage your personal mods and scripts.' : 'Gerencie seus mods e scripts pessoais.'}
                    </p>
                </div>
                <FluidButton onClick={() => setIsCreating(true)} variant="primary" className="gap-2">
                    <Plus size={18} />
                    {language === 'en' ? 'New Project' : 'Novo Projeto'}
                </FluidButton>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => (
                    <div key={project.id} className="group p-4 rounded-xl bg-black/40 border border-white/10 hover:border-liquid-primary transition-all hover:bg-white/5 relative cursor-pointer" onClick={() => setView('studio', { projectId: project.id })}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 rounded-lg bg-liquid-primary/10 text-liquid-primary">
                                <FileCode size={20} />
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); if (confirm('Delete?')) deleteProject(project.id); }}
                                className="text-white/20 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <h4 className="text-white font-bold mb-1">{project.title}</h4>
                        <div className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded inline-block mb-4 uppercase tracking-wider">
                            {project.type}
                        </div>
                        <p className="text-xs text-gray-400 mb-4">
                            Last edited: {new Date(project.updated_at).toLocaleDateString()}
                        </p>
                        <FluidButton
                            variant="glass"
                            className="w-full justify-center pointer-events-none group-hover:bg-white/10"
                        >
                            {language === 'en' ? 'Open Studio' : 'Abrir Studio'}
                        </FluidButton>
                    </div>
                ))}

                {projects.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">
                        <p>{language === 'en' ? 'No projects found. Initialize a new operation.' : 'Nenhum projeto encontrado. Inicie uma nova operação.'}</p>
                    </div>
                )}
            </div>

            {/* Modal Simples (Inline) */}
            {isCreating && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-left">
                    <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-white mb-4">{language === 'en' ? 'Create New Project' : 'Criar Novo Projeto'}</h3>

                        <div className="flex gap-2 mb-4">
                            {['script', 'item', 'block'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTemplate(t)}
                                    className={`px-3 py-1 text-xs rounded-full border transition-colors uppercase ${template === t
                                        ? 'bg-liquid-primary text-black border-liquid-primary font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]'
                                        : 'bg-black/40 border-white/20 text-gray-400 hover:border-white/50'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <input
                            autoFocus
                            type="text"
                            placeholder={language === 'en' ? "Project Name" : "Nome do Projeto"}
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-liquid-primary outline-none"
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleCreate();
                                if (e.key === 'Escape') setIsCreating(false);
                            }}
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setIsCreating(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                {language === 'en' ? 'Cancel' : 'Cancelar'}
                            </button>
                            <FluidButton onClick={handleCreate} disabled={!newProjectTitle.trim()} variant="primary">
                                {language === 'en' ? 'Create' : 'Criar'}
                            </FluidButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

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
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetConfirmText, setResetConfirmText] = useState('');
    const [isResetting, setIsResetting] = useState(false);

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
                    <NavButton icon={<Box size={20} />} label={language === 'en' ? 'Blockbench Guide' : 'Manual Blockbench'} active={activeTab === 'blockbench'} onClick={() => { setActiveTab('blockbench'); setIsSidebarOpen(false); }} />
                    <NavButton icon={<BookOpen size={20} />} label={t('dash.nav.docs')} active={activeTab === 'docs'} onClick={() => { setActiveTab('docs'); setIsSidebarOpen(false); }} />
                    <NavButton icon={<Settings size={20} />} label={t('dash.nav.settings')} active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} />
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/10 space-y-2">
                {/* Discord Invite */}
                <a
                    href="https://discord.gg/v2uanJ8PGf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white transition-colors w-full p-2 rounded-lg bg-[#5865F2]/20 border border-[#5865F2]/30 hover:bg-[#5865F2]/30"
                >
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span className="font-medium">Discord</span>
                </a>
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

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    const handleUpdateUsername = async () => {
        if (!usernameInput.trim() || !user) return;
        setIsUpdatingProfile(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ username: usernameInput })
                .eq('id', user.id);

            if (error) throw error;

            await useAuthStore.getState().refreshProfile();
            setIsEditingUsername(false);
        } catch (error) {
            console.error('Error updating username:', error);
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleResetProgress = async () => {
        if (resetConfirmText !== 'Resetar' || !user) return;

        setIsResetting(true);
        try {
            // 1. Delete all user progress records from database
            const { error: progressError } = await supabase
                .from('user_progress')
                .delete()
                .eq('user_id', user.id);

            if (progressError) throw progressError;

            // 2. Reset profile XP and streak
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ xp: 0, streak: 0, level: 1 })
                .eq('id', user.id);

            if (profileError) throw profileError;

            // 3. Clear local state in stores
            useCourseStore.getState().resetUserProgress();
            await useAuthStore.getState().refreshProfile();

            // 4. Close modal and reset form
            setShowResetModal(false);
            setResetConfirmText('');

            console.log('[Dashboard] Progress reset successfully!');
        } catch (err) {
            console.error('[Dashboard] Error resetting progress:', err);
        } finally {
            setIsResetting(false);
        }
    };

    const SettingsView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Identity */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="text-liquid-primary" />
                    {language === 'en' ? 'Identity Protocol' : 'Protocolo de Identidade'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center justify-center min-h-[180px]">
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">
                            {language === 'en' ? 'PROFILE PICTURE' : 'FOTO DE PERFIL'}
                        </div>
                        <AvatarUpload currentAvatarUrl={profile?.avatar_url} />
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex justify-between items-center">
                            CODENAME
                            {!isEditingUsername ? (
                                <button onClick={() => { setUsernameInput(profile?.username || ''); setIsEditingUsername(true); }} className="text-liquid-primary hover:text-white transition-colors">
                                    <Edit2 size={14} />
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={handleUpdateUsername} disabled={isUpdatingProfile} className="text-green-500 hover:text-green-400">
                                        <Check size={14} />
                                    </button>
                                    <button onClick={() => setIsEditingUsername(false)} className="text-white/50 hover:text-white">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            value={isEditingUsername ? usernameInput : (profile?.username || user?.user_metadata?.username || 'Agent')}
                            readOnly={!isEditingUsername}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            className={`w-full bg-transparent text-white font-mono border-b outline-none py-1 transition-colors ${isEditingUsername ? 'border-liquid-primary' : 'border-white/20'
                                }`}
                        />
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Shield className="text-green-500" />
                    {language === 'en' ? 'Security Clearance' : 'Credenciais de Segurança'}
                </h3>
                <div className="p-6 rounded-xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <Mail className="text-gray-500" />
                        <div className="flex-1 w-full">
                            <div className="text-xs text-gray-500 uppercase">Registered Email</div>
                            <div className="text-white font-mono">{user?.email}</div>
                        </div>
                        <FluidButton variant="secondary" className="w-full md:w-auto text-xs">
                            {language === 'en' ? 'Update Email' : 'Atualizar Email'}
                        </FluidButton>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <Key className="text-gray-500" />
                        <div className="flex-1 w-full">
                            <div className="text-xs text-gray-500 uppercase">Access Key</div>
                            <div className="text-white font-mono">••••••••••••••••</div>
                        </div>
                        <FluidButton variant="secondary" className="w-full md:w-auto text-xs">
                            {language === 'en' ? 'Rotate Key' : 'Redefinir Senha'}
                        </FluidButton>
                    </div>
                </div>
            </div>

            {/* Plan */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="text-yellow-500" />
                    {language === 'en' ? 'Operation Status' : 'Status Operacional'}
                </h3>
                <div className="relative p-6 rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-bold border border-yellow-500/30">
                            FREE TIER
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <Sparkles className="text-yellow-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">Lumina Agent</div>
                            <div className="text-yellow-500/80 text-sm">Level 1 Clearance</div>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 max-w-lg">
                        {language === 'en'
                            ? 'You have basic access to all training modules and standard cloud storage.'
                            : 'Você tem acesso básico a todos os módulos de treinamento e armazenamento padrão na nuvem.'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Running on local instances</span>
                        <span>•</span>
                        <span>Valid until 2077</span>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-4 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
                    <AlertTriangle className="text-red-500" />
                    {language === 'en' ? 'Danger Zone' : 'Zona de Perigo'}
                </h3>
                <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-white font-bold mb-1">
                            {language === 'en' ? 'Factory Reset' : 'Reset Geral'}
                        </h4>
                        <p className="text-red-400/80 text-sm">
                            {language === 'en'
                                ? 'Irreversible action. Wipes all progress and local data.'
                                : 'Ação irreversível. Apaga todo o progresso e dados locais.'}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowResetModal(true)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg transition-colors font-bold text-sm whitespace-nowrap"
                    >
                        {language === 'en' ? 'INITIATE WIPE' : 'INICIAR RESET'}
                    </button>
                </div>
            </div>
        </div>
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
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {activeTab === 'settings'
                                        ? (language === 'en' ? 'System Settings' : 'Configurações do Sistema')
                                        : activeTab === 'projects'
                                            ? (language === 'en' ? 'Project Portfolio' : 'Portfólio de Projetos')
                                            : activeTab === 'blockbench'
                                                ? (language === 'en' ? 'Blockbench Guide' : 'Manual de Modelagem')
                                                : activeTab === 'docs'
                                                    ? (language === 'en' ? 'Knowledge Base' : 'Base de Conhecimento')
                                                    : t('dash.command_center')}
                                </h1>
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

                        {activeTab === 'overview' && (
                            <>
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
                                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                                {language === 'en'
                                                    ? (activeCourse?.title || t('dash.loading'))
                                                    : ((activeCourse as any)?.title_pt || activeCourse?.title || t('dash.loading'))}
                                            </h2>
                                            <p className="text-gray-300 max-w-xl mb-6 text-sm md:text-base">
                                                {language === 'en'
                                                    ? (activeCourse?.description || t('dash.syncing'))
                                                    : ((activeCourse as any)?.description_pt || activeCourse?.description || t('dash.syncing'))}
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
                                                            <div className="text-gray-400 font-medium truncate">
                                                                {language === 'en' ? (module.title_en || module.title) : module.title}
                                                            </div>
                                                            <div className="text-xs text-gray-600 truncate">
                                                                {locked ? t('dash.locked') : t('dash.unlocked')}
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
                            </>
                        )}

                        {activeTab === 'settings' && <SettingsView />}

                        {activeTab === 'projects' && <ProjectsView />}

                        {activeTab === 'blockbench' && <BlockbenchGuide />}

                        {(activeTab === 'docs') && <KnowledgeBase />}
                    </div>
                </main>
            </div>

            {/* Reset Progress Modal */}
            <AnimatePresence>
                {showResetModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setShowResetModal(false); setResetConfirmText(''); }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                        >
                            <div className="bg-[#1a1a2e] border border-red-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            {language === 'en' ? 'Reset All Progress' : 'Resetar Todo Progresso'}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {language === 'en' ? 'This action cannot be undone' : 'Esta ação não pode ser desfeita'}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-4">
                                    {language === 'en'
                                        ? 'This will permanently delete all your progress, XP, and streak data.'
                                        : 'Isso irá deletar permanentemente todo seu progresso, XP e dados de streak.'}
                                </p>

                                <div className="mb-4">
                                    <label className="block text-sm text-gray-400 mb-2">
                                        {language === 'en'
                                            ? 'Type "Resetar" to confirm:'
                                            : 'Digite "Resetar" para confirmar:'}
                                    </label>
                                    <input
                                        type="text"
                                        value={resetConfirmText}
                                        onChange={(e) => setResetConfirmText(e.target.value)}
                                        placeholder="Resetar"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => { setShowResetModal(false); setResetConfirmText(''); }}
                                        className="flex-1 px-4 py-3 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                                    >
                                        {language === 'en' ? 'Cancel' : 'Cancelar'}
                                    </button>
                                    <button
                                        onClick={handleResetProgress}
                                        disabled={resetConfirmText !== 'Resetar' || isResetting}
                                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${resetConfirmText === 'Resetar' && !isResetting
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-red-500/20 text-red-500/50 cursor-not-allowed'
                                            }`}
                                    >
                                        {isResetting
                                            ? (language === 'en' ? 'Resetting...' : 'Resetando...')
                                            : (language === 'en' ? 'Reset Progress' : 'Resetar Progresso')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
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

