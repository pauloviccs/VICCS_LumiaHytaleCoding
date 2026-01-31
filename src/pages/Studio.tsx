import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { Play, ArrowLeft, Terminal as TerminalIcon, Info, X, Globe } from 'lucide-react';
import { useViewStore } from '@/store/viewStore';
import { useCourseStore } from '@/store/courseStore';
import { useAuthStore } from '@/store/authStore';
import { useLangStore } from '@/store/langStore';
import { supabase } from '@/lib/supabase';
import { SuccessModal } from '@/components/studio/SuccessModal';
import { FluidButton } from '@/components/ui/FluidDesign';
import type { Lesson } from '@/types';

export default function Studio() {
    const { setView, context } = useViewStore();
    const { courses, fetchLessons } = useCourseStore();
    const { user } = useAuthStore();
    const { language, setLanguage, t } = useLangStore();

    // Find active module and lesson
    // TODO: Improve this lookup, maybe normalize state or use selectors
    const activeModule = courses
        .flatMap(c => c.modules)
        .find(m => m.id === context?.moduleId);

    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState<string[]>(['> System initialized.', '> Ready for input...']);
    const [isRunning, setIsRunning] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [xpGained, setXpGained] = useState(0);
    const [isTipRevealed, setIsTipRevealed] = useState(false);

    // Dynamic Content based on Language
    // Database has: title/content/lore (PT) and title_en/content_en/lore_en (EN)
    const lessonTitle = language === 'en' ? (activeLesson?.title_en || activeLesson?.title) : activeLesson?.title;
    const lessonContent = language === 'en' ? (activeLesson?.content_en || activeLesson?.content) : activeLesson?.content;
    const lessonLore = language === 'en' ? (activeLesson?.lore_en || activeLesson?.lore) : activeLesson?.lore;
    const lessonTip = language === 'en' ? activeLesson?.tip_en : activeLesson?.tip_pt;


    // Reset tip reveal on lesson change
    useEffect(() => {
        setIsTipRevealed(false);
    }, [activeLesson?.id]);

    // Fetch lessons when module changes
    useEffect(() => {
        if (context?.moduleId) {
            fetchLessons(context.moduleId);
        }
    }, [context?.moduleId, fetchLessons]);

    // Set active lesson when data is available
    useEffect(() => {
        if (activeModule?.lessons && activeModule.lessons.length > 0) {
            // Default to first lesson if no lessonId is provided
            const lesson = context?.lessonId
                ? activeModule.lessons.find(l => l.id === context.lessonId)
                : activeModule.lessons[0];

            if (lesson) {
                setActiveLesson(lesson);
                setCode(lesson.starter_code || '');
                setOutput(['> System initialized.', '> Ready for input...', `> Loaded: ${lesson.title}`]);
            }
        }
    }, [activeModule, context?.lessonId]);

    const handleRun = async () => {
        if (!activeLesson) return;

        setIsRunning(true);
        setOutput(prev => [...prev, '> Compiling...', '> Running Main.java...']);

        // Mock delay for "compilation"
        await new Promise(resolve => setTimeout(resolve, 1000));

        let success = false;
        const logs: string[] = [];

        // Validation Logic
        if (activeLesson.validation_type === 'regex' && activeLesson.validation_value) {
            try {
                const regex = new RegExp(activeLesson.validation_value);
                if (regex.test(code)) {
                    success = true;
                    logs.push('> SYSTEM: Signal matches expected pattern.');
                    logs.push('> SYSTEM: Connection established.');
                    logs.push(`> SUCCESS: +${activeLesson.xp_reward} XP Gained!`);
                } else {
                    logs.push('> ERROR: Signal signature mismatch.');
                    logs.push('> SYSTEM: Operation failed.');
                }
            } catch (e) {
                logs.push('> SYSTEM ERROR: Invalid validation pattern.');
            }
        } else {
            // Default fallback
            logs.push('Hello World');
            logs.push('> Process finished with exit code 0.');
            success = true; // Auto-success for non-validated lessons? Or maybe manual check.
        }

        setOutput(prev => [...prev, ...logs]);
        setIsRunning(false);

        setOutput(prev => [...prev, ...logs]);
        setIsRunning(false);

        // Update Progress
        if (success) {
            setXpGained(activeLesson.xp_reward || 0);
            setShowSuccessModal(true);

            if (user) {
                try {
                    // 1. Record Progress (with proper conflict handling)
                    const { error: progressError } = await supabase.from('user_progress').upsert(
                        {
                            user_id: user.id,
                            lesson_id: activeLesson.id,
                            is_completed: true,
                            completed_at: new Date().toISOString()
                        },
                        {
                            onConflict: 'user_id, lesson_id',
                            ignoreDuplicates: false // Update on conflict
                        }
                    );

                    if (progressError) {
                        console.error('[Studio] Progress upsert error:', progressError);
                        throw progressError;
                    }

                    // 2. Update Profile Stats (XP & Streak)
                    // We fetch current profile first to ensure we have latest data
                    const { data: currentProfile, error: profileFetchError } = await supabase
                        .from('profiles')
                        .select('xp, streak, updated_at')
                        .eq('id', user.id)
                        .single();

                    console.log('[Studio] Current Profile Fetched:', currentProfile, 'Error:', profileFetchError);

                    if (currentProfile) {
                        const newXp = (currentProfile.xp || 0) + (activeLesson.xp_reward || 0);

                        // Simple Streak Logic: 
                        // If updated_at is NOT today, increment streak.
                        // (This is basic; usually you'd check if it was yesterday to maintain, else reset)
                        // For this prototype, we just increment if it's a new day or simpler: just increment.
                        // Let's do a "Same Day" check to avoid spamming streak on same day.

                        const lastUpdate = currentProfile.updated_at ? new Date(currentProfile.updated_at) : new Date(0);
                        const today = new Date();
                        const isSameDay = lastUpdate.getDate() === today.getDate() &&
                            lastUpdate.getMonth() === today.getMonth() &&
                            lastUpdate.getFullYear() === today.getFullYear();

                        const newStreak = isSameDay ? (currentProfile.streak || 0) : (currentProfile.streak || 0) + 1;

                        console.log('[Studio] Updating profile with:', { newXp, newStreak, userId: user.id });

                        const { error: updateError } = await supabase.from('profiles').update({
                            xp: newXp,
                            streak: newStreak,
                            updated_at: new Date().toISOString()
                        }).eq('id', user.id);

                        if (updateError) {
                            console.error('[Studio] Profile update error:', updateError);
                        } else {
                            console.log('[Studio] Profile updated successfully!');
                        }
                    } else {
                        console.warn('[Studio] No profile found! User might not have a profile record.');
                    }

                    // Refresh stores
                    useAuthStore.getState().refreshProfile();
                    useCourseStore.getState().fetchUserProgress(user.id);

                } catch (err) {
                    console.error('Failed to save progress', err);
                }
            }
        }
    };

    const handleNextLesson = () => {
        setShowSuccessModal(false);
        if (!activeModule || !activeLesson) return;

        // Simple logic: Find next lesson in current module
        // In real app, this should handle module transitions too
        const currentIndex = activeModule.lessons?.findIndex(l => l.id === activeLesson.id) ?? -1;
        const nextLesson = activeModule.lessons?.[currentIndex + 1];

        if (nextLesson) {
            setView('studio', { moduleId: activeModule.id, lessonId: nextLesson.id });
        } else {
            // End of module, maybe go back to dashboard or show completion screen
            // For now, go to dashboard
            setView('dashboard');
        }
    };

    if (!activeModule) {
        return <div className="h-screen flex items-center justify-center text-white">Loading module...</div>;
    }

    return (
        <div className="h-screen bg-[#0a0a0a] flex flex-col text-white overflow-hidden font-sans">
            {/* Top Bar */}
            <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-black/40 backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <FluidButton
                        onClick={() => setView('dashboard')}
                        variant="ghost"
                        className="p-2 !rounded-lg"
                    >
                        <ArrowLeft size={20} />
                    </FluidButton>
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-liquid-primary font-bold whitespace-nowrap uppercase">{activeModule.title}</span>
                        <span className="text-gray-500 hidden sm:inline">/</span>
                        <span className="text-sm font-medium hidden sm:inline truncate">{lessonTitle || 'Loading...'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'pt-br' : 'en')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-wider text-white"
                    >
                        <Globe size={14} />
                        {language === 'en' ? 'EN' : 'PT-BR'}
                    </button>

                    <button
                        onClick={() => setShowInstructions(!showInstructions)}
                        className="md:hidden p-2 text-gray-400 hover:text-white"
                    >
                        <Info size={20} />
                    </button>
                    <FluidButton
                        onClick={handleRun}
                        disabled={isRunning}
                        variant="primary"
                        className="px-3 md:px-4 py-1.5 text-xs md:text-sm disabled:opacity-50 !rounded bg-green-600 hover:bg-green-500 shadow-none border-none"
                    >
                        <Play size={14} fill="currentColor" />
                        {isRunning ? t('studio.compiling') : t('studio.run')}
                    </FluidButton>
                </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                {/* Left Panel: Content */}
                <div className={`${showInstructions ? 'flex' : 'hidden'} md:flex w-full md:w-[400px] border-b md:border-b-0 md:border-r border-white/10 flex-col bg-black/20 absolute md:relative z-20 inset-0 md:inset-auto bg-black/95 md:bg-transparent`}>
                    <div className="p-4 md:p-8 overflow-y-auto relative h-full">
                        <button
                            onClick={() => setShowInstructions(false)}
                            className="absolute top-4 right-4 md:hidden text-gray-400"
                        >
                            <X size={24} />
                        </button>

                        <h1 className="text-2xl font-bold mb-4 mt-8 md:mt-0">{lessonTitle}</h1>

                        {activeLesson?.lore && (
                            <div className="mb-6 p-4 bg-liquid-accent/10 border-l-4 border-liquid-accent text-gray-300 italic text-sm">
                                "{lessonLore}"
                            </div>
                        )}

                        <div className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base prose prose-invert max-w-none">
                            <ReactMarkdown>{lessonContent || 'No content available.'}</ReactMarkdown>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h3 className="font-bold text-sm text-gray-300 uppercase tracking-wider">{t('studio.objectives')}</h3>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                                <div className="mt-0.5 shrink-0"><div className="w-4 h-4 rounded border border-gray-500" /></div>
                                <span className="text-gray-300">
                                    {t('studio.complete_xp').replace('{xp}', String(activeLesson?.xp_reward || 10))}
                                </span>
                            </div>
                        </div>

                        <div
                            className={`p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm transition-all duration-300 cursor-pointer ${isTipRevealed ? 'filter-none' : 'blur-sm hover:blur-0'}`}
                            onClick={() => setIsTipRevealed(!isTipRevealed)}
                        >
                            <strong>{t('studio.tip')}:</strong> {lessonTip || '...'}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Editor & Terminal */}
                <div className="flex-1 flex flex-col relative min-w-0">
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            defaultLanguage="java"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: 'JetBrains Mono, monospace',
                                padding: { top: 20 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    {/* Terminal */}
                    <div className="h-48 md:h-48 border-t border-white/10 bg-black flex flex-col shrink-0">
                        <div className="h-8 flex items-center px-4 bg-white/5 border-b border-white/5 gap-2">
                            <TerminalIcon size={14} className="text-gray-500" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('studio.console')}</span>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm text-gray-300 overflow-y-auto space-y-1">
                            {output.map((line, i) => (
                                <div key={i} className={line.startsWith('>') ? 'text-gray-500' : 'text-white'}>
                                    {line}
                                </div>
                            ))}
                            {isRunning && <span className="animate-pulse">_</span>}
                        </div>
                    </div>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                onNext={handleNextLesson}
                xpGained={xpGained}
                title={lessonTitle || 'Mission'}
            />
        </div>
    );
}
