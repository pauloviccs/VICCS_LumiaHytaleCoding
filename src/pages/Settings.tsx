import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useViewStore } from '@/store/viewStore';
import { useLangStore } from '@/store/langStore';
import { supabase } from '@/lib/supabase';
import { AvatarUpload } from '@/components/profile/AvatarUpload';
import { Eye, EyeOff, Copy, Check, Gift, Shield, Key, User, Globe, AlertTriangle } from 'lucide-react';

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
    securityClearance: string;
    accessKey: string;
    reveal: string;
    hide: string;
    copy: string;
    copied: string;
    operationStatus: string;
    freeTier: string;
    devTier: string;
    freeTierDesc: string;
    devTierDesc: string;
    giftCode: string;
    giftCodePlaceholder: string;
    redeem: string;
    redeeming: string;
    redeemSuccess: string;
    redeemError: string;
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
        securityClearance: 'Security Clearance',
        accessKey: 'Access Key',
        reveal: 'Reveal',
        hide: 'Hide',
        copy: 'Copy',
        copied: 'Copied!',
        operationStatus: 'Operation Status',
        freeTier: 'FREE TIER',
        devTier: 'DEV TIER',
        freeTierDesc: 'You have basic access to training modules and standard cloud storage.',
        devTierDesc: 'Full access to all training modules, source code, and exclusive content.',
        giftCode: 'Gift Code',
        giftCodePlaceholder: 'Enter your gift code',
        redeem: 'Redeem',
        redeeming: 'Redeeming...',
        redeemSuccess: 'Code redeemed successfully!',
        redeemError: 'Failed to redeem code',
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
        securityClearance: 'Credencial de Segurança',
        accessKey: 'Chave de Acesso',
        reveal: 'Revelar',
        hide: 'Ocultar',
        copy: 'Copiar',
        copied: 'Copiado!',
        operationStatus: 'Status da Operação',
        freeTier: 'TIER GRATUITO',
        devTier: 'TIER DEV',
        freeTierDesc: 'Você tem acesso básico aos módulos de treinamento e armazenamento padrão.',
        devTierDesc: 'Acesso completo a todos os módulos, código fonte e conteúdo exclusivo.',
        giftCode: 'Código de Presente',
        giftCodePlaceholder: 'Digite seu código de presente',
        redeem: 'Resgatar',
        redeeming: 'Resgatando...',
        redeemSuccess: 'Código resgatado com sucesso!',
        redeemError: 'Falha ao resgatar código',
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

    // Access Key state
    const [showAccessKey, setShowAccessKey] = useState(false);
    const [accessKeyCopied, setAccessKeyCopied] = useState(false);

    // Gift Code state
    const [giftCode, setGiftCode] = useState('');
    const [redeemingCode, setRedeemingCode] = useState(false);
    const [redeemStatus, setRedeemStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [redeemMessage, setRedeemMessage] = useState('');

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

    const handleCopyAccessKey = async () => {
        if (!user?.id) return;

        try {
            await navigator.clipboard.writeText(user.id);
            setAccessKeyCopied(true);
            setTimeout(() => setAccessKeyCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleRedeemGiftCode = async () => {
        if (!giftCode.trim() || redeemingCode) return;

        setRedeemingCode(true);
        setRedeemStatus('idle');
        setRedeemMessage('');

        try {
            const { data, error } = await supabase.functions.invoke('redeem-giftcode', {
                body: { code: giftCode.trim() }
            });

            if (error) throw error;

            if (data?.success) {
                setRedeemStatus('success');
                setRedeemMessage(data.message || t.redeemSuccess);
                setGiftCode('');
                // Refresh profile to get updated tier
                await refreshProfile();
            } else {
                throw new Error(data?.error || 'Unknown error');
            }
        } catch (err: any) {
            console.error('Failed to redeem code:', err);
            setRedeemStatus('error');
            setRedeemMessage(err.message || t.redeemError);
        } finally {
            setRedeemingCode(false);
            setTimeout(() => {
                setRedeemStatus('idle');
                setRedeemMessage('');
            }, 5000);
        }
    };

    const currentTier = profile?.tier || 'free';
    const isPremium = currentTier === 'dev';

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
                    <div className="w-24" />
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-6">
                <div className="max-w-2xl mx-auto space-y-8">

                    {/* Security Clearance Section */}
                    <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-green-400">
                            <Shield className="w-5 h-5" />
                            {t.securityClearance}
                        </h2>

                        <div className="space-y-4">
                            {/* Email */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5">
                                        <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/40 uppercase tracking-wide">Registered Email</div>
                                        <div className="text-white/80">{user?.email}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Access Key */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="p-2 rounded-lg bg-white/5">
                                        <Key className="w-4 h-4 text-white/60" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs text-white/40 uppercase tracking-wide">{t.accessKey}</div>
                                        <div className="text-white/80 font-mono text-sm truncate">
                                            {showAccessKey ? user?.id : '••••••••••••••••••••••••••••••••••••'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => setShowAccessKey(!showAccessKey)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                        title={showAccessKey ? t.hide : t.reveal}
                                    >
                                        {showAccessKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={handleCopyAccessKey}
                                        className={`p-2 rounded-lg transition-colors ${accessKeyCopied
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                        title={accessKeyCopied ? t.copied : t.copy}
                                    >
                                        {accessKeyCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Operation Status Section */}
                    <section className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-yellow-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {t.operationStatus}
                        </h2>

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className={`p-3 rounded-xl ${isPremium ? 'bg-liquid-primary/20' : 'bg-yellow-500/20'}`}>
                                <svg className={`w-6 h-6 ${isPremium ? 'text-liquid-primary' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-white">Lumina Agent</h3>
                                        <p className={`text-sm ${isPremium ? 'text-liquid-primary' : 'text-yellow-400'}`}>
                                            Level 1 Clearance
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPremium
                                            ? 'bg-liquid-primary text-black'
                                            : 'bg-white/10 text-white/70 border border-white/20'
                                        }`}>
                                        {isPremium ? t.devTier : t.freeTier}
                                    </span>
                                </div>
                                <p className="text-sm text-white/50 mt-2">
                                    {isPremium ? t.devTierDesc : t.freeTierDesc}
                                </p>
                                <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                                    <span>Running on local instances</span>
                                    <span>•</span>
                                    <span>Valid until 2077</span>
                                </div>
                            </div>
                        </div>

                        {/* Gift Code Input */}
                        <div className="mt-6 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="flex items-center gap-2 mb-3">
                                <Gift className="w-4 h-4 text-liquid-primary" />
                                <span className="text-sm font-medium">{t.giftCode}</span>
                            </div>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={giftCode}
                                    onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                                    placeholder={t.giftCodePlaceholder}
                                    disabled={redeemingCode}
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-liquid-primary/50 focus:outline-none focus:ring-1 focus:ring-liquid-primary/30 transition-colors font-mono uppercase tracking-wider disabled:opacity-50"
                                />
                                <button
                                    onClick={handleRedeemGiftCode}
                                    disabled={!giftCode.trim() || redeemingCode}
                                    className="px-6 py-3 rounded-xl bg-liquid-primary text-black font-medium hover:bg-liquid-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {redeemingCode ? t.redeeming : t.redeem}
                                </button>
                            </div>
                            {redeemMessage && (
                                <div className={`mt-3 text-sm ${redeemStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                    {redeemMessage}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Profile Section */}
                    <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-liquid-primary" />
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
                            <Globe className="w-5 h-5 text-liquid-primary" />
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
                            <AlertTriangle className="w-5 h-5" />
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
