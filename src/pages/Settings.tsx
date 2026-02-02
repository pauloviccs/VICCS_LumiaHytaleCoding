import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useViewStore } from '@/store/viewStore';
import { useLangStore } from '@/store/langStore';
import { supabase } from '@/lib/supabase';
import { AvatarUpload } from '@/components/profile/AvatarUpload';

type Lang = 'en' | 'pt-br';

const content: Record<Lang, {
    title: string;
    profile: string;
    username: string;
    usernamePlaceholder: string;
    email: string;
    avatar: string;
    language: string;
    save: string;
    saving: string;
    saved: string;
    back: string;
    dangerZone: string;
    signOut: string;
}> = {
    en: {
        title: 'Settings',
        profile: 'Profile',
        username: 'Username',
        usernamePlaceholder: 'Enter your username',
        email: 'Email',
        avatar: 'Profile Picture',
        language: 'Language',
        save: 'Save Changes',
        saving: 'Saving...',
        saved: 'Saved!',
        back: 'Back to Dashboard',
        dangerZone: 'Danger Zone',
        signOut: 'Sign Out',
    },
    'pt-br': {
        title: 'Configurações',
        profile: 'Perfil',
        username: 'Nome de Usuário',
        usernamePlaceholder: 'Digite seu nome de usuário',
        email: 'Email',
        avatar: 'Foto de Perfil',
        language: 'Idioma',
        save: 'Salvar Alterações',
        saving: 'Salvando...',
        saved: 'Salvo!',
        back: 'Voltar ao Dashboard',
        dangerZone: 'Zona de Perigo',
        signOut: 'Sair da Conta',
    }
};

export default function Settings() {
    const { user, profile, signOut, refreshProfile } = useAuthStore();
    const { setView } = useViewStore();
    const { language, setLanguage } = useLangStore();
    const t = content[language];


    const [username, setUsername] = useState(profile?.username || '');
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    useEffect(() => {
        if (profile?.username) {
            setUsername(profile.username);
        }
    }, [profile]);

    const handleSaveProfile = async () => {
        if (!user) return;

        setSaving(true);
        setSaveStatus('saving');

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ username })
                .eq('id', user.id);

            if (error) throw error;

            await refreshProfile();
            setSaveStatus('saved');

            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err) {
            console.error('Error saving profile:', err);
            setSaveStatus('idle');
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        setView('dashboard');
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-xl border-b border-white/5 z-50">
                <div className="max-w-4xl mx-auto h-full px-6 flex items-center justify-between">
                    <button
                        onClick={() => setView('dashboard')}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t.back}
                    </button>
                    <h1 className="text-lg font-semibold">{t.title}</h1>
                    <div className="w-24" /> {/* Spacer */}
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-6">
                <div className="max-w-2xl mx-auto space-y-8">

                    {/* Profile Section */}
                    <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-liquid-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {t.profile}
                        </h2>

                        <div className="space-y-6">
                            {/* Avatar */}
                            <div>
                                <label className="block text-sm text-white/60 mb-3">{t.avatar}</label>
                                <AvatarUpload currentAvatarUrl={profile?.avatar_url} />
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-sm text-white/60 mb-2">{t.username}</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder={t.usernamePlaceholder}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-liquid-primary/50 focus:outline-none focus:ring-1 focus:ring-liquid-primary/30 transition-colors"
                                />
                            </div>

                            {/* Email (read-only) */}
                            <div>
                                <label className="block text-sm text-white/60 mb-2">{t.email}</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/50 cursor-not-allowed"
                                />
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={handleSaveProfile}
                                disabled={saving || username === profile?.username}
                                className={`
                                    w-full py-3 rounded-xl font-medium transition-all duration-300
                                    ${saveStatus === 'saved'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-liquid-primary text-black hover:bg-liquid-primary/90'
                                    }
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                `}
                            >
                                {saveStatus === 'saving' ? t.saving : saveStatus === 'saved' ? t.saved : t.save}
                            </button>
                        </div>
                    </section>

                    {/* Language Section */}
                    <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-liquid-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            {t.language}
                        </h2>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setLanguage('pt-br')}
                                className={`
                                    flex-1 py-3 rounded-xl font-medium transition-all duration-300
                                    ${language === 'pt-br'
                                        ? 'bg-liquid-primary text-black'
                                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                                    }
                                `}
                            >
                                🇧🇷 Português
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`
                                    flex-1 py-3 rounded-xl font-medium transition-all duration-300
                                    ${language === 'en'
                                        ? 'bg-liquid-primary text-black'
                                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                                    }
                                `}
                            >
                                🇺🇸 English
                            </button>
                        </div>

                    </section>

                    {/* Danger Zone */}
                    <section className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                        <h2 className="text-xl font-semibold mb-6 text-red-400 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {t.dangerZone}
                        </h2>

                        <button
                            onClick={handleSignOut}
                            className="w-full py-3 rounded-xl font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                            {t.signOut}
                        </button>
                    </section>

                </div>
            </main>
        </div>
    );
}
