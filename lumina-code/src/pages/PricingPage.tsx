import { useState } from 'react';
import { GlassLayout } from '@/components/layout/GlassLayout';
import { Navbar } from '@/components/layout/Navbar';
import { AuthModal } from '@/components/auth/AuthModal';
import { FluidButton, FluidCard } from '@/components/ui/FluidDesign';
import { motion } from 'framer-motion';
import { Check, X, Zap, Code, Rocket } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useLangStore } from '@/store/langStore';
import { supabase } from '@/lib/supabase';

export default function PricingPage() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { user } = useAuthStore();
    const { language } = useLangStore();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        if (!user) {
            setIsAuthOpen(true);
            return;
        }

        setLoading(true);
        try {
            // Verificar se há sessão ativa
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !session) {
                console.error('No active session:', sessionError);
                setIsAuthOpen(true);
                return;
            }

            console.log('[Payment] Session found, invoking Edge Function...');

            // O supabase.functions.invoke já inclui o token automaticamente
            // NÃO passe headers customizados pois isso substitui o default
            const { data, error } = await supabase.functions.invoke('create-preference', {
                body: {
                    user_id: user.id,
                    email: user.email
                }
            });

            if (error) {
                console.error('[Payment] Function error:', error);
                throw error;
            }

            console.log('[Payment] Preference created, redirecting...');
            if (data?.init_point) {
                window.location.href = data.init_point;
            } else {
                throw new Error('No init_point in response');
            }
        } catch (err) {
            console.error('Upgrade Error:', err);
            alert('Erro ao iniciar pagamento. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassLayout>
            <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

            <div className="min-h-screen pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
                            {language === 'en' ? 'CHOOSE YOUR ' : 'ESCOLHA SEU '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-primary to-liquid-accent">
                                {language === 'en' ? 'DESTINY' : 'DESTINO'}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            {language === 'en'
                                ? 'Unlock your full potential as a Hytale Mod Developer.'
                                : 'Desbloqueie todo seu potencial como Desenvolvedor de Mods Hytale.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FluidCard className="h-full flex flex-col border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Code size={120} />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">Initiate</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-white">R$0</span>
                                            <span className="text-gray-400">/ forever</span>
                                        </div>
                                        <p className="text-gray-400 mt-4">
                                            {language === 'en' ? 'Perfect for beginners starting their journey.' : 'Perfeito para iniciantes começando a jornada.'}
                                        </p>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        <FeatureItem active>Modules 1-6 (Basics & Furnace)</FeatureItem>
                                        <FeatureItem active>Basic Community Support</FeatureItem>
                                        <FeatureItem active>Public Documentation</FeatureItem>
                                        <FeatureItem active={false}>Advanced Modules (7-10)</FeatureItem>
                                        <FeatureItem active={false}>Source Code Access</FeatureItem>
                                        <FeatureItem active={false}>Dev Badge</FeatureItem>
                                    </ul>

                                    <FluidButton
                                        variant="glass"
                                        className="w-full cursor-not-allowed opacity-50"
                                        disabled
                                    >
                                        {language === 'en' ? 'Current Plan' : 'Plano Atual'}
                                    </FluidButton>
                                </div>
                            </FluidCard>
                        </motion.div>

                        {/* Dev Plan */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <FluidCard className="h-full flex flex-col border-liquid-primary/50 relative overflow-hidden group shadow-[0_0_50px_rgba(0,243,255,0.15)]">
                                <div className="absolute inset-0 bg-gradient-to-b from-liquid-primary/5 to-transparent pointer-events-none" />
                                <div className="absolute top-0 right-0 p-4 text-liquid-primary opacity-20 group-hover:opacity-30 transition-opacity">
                                    <Rocket size={120} />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-liquid-primary text-black text-xs font-bold px-3 py-1 rounded-b-lg flex items-center gap-1">
                                        <Zap size={10} fill="currentColor" /> POPULAR
                                    </div>

                                    <div className="mb-8 mt-2">
                                        <h3 className="text-2xl font-bold text-liquid-primary mb-2">Developer</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-white">R$2,40</span>
                                            <span className="text-xl text-gray-400 line-through decoration-red-500">R$99</span>
                                        </div>
                                        <p className="text-gray-300 mt-4">
                                            {language === 'en' ? 'Complete access to master Hytale modding.' : 'Acesso completo para dominar mods de Hytale.'}
                                        </p>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        <FeatureItem active>Everything in Initiate</FeatureItem>
                                        <FeatureItem active>All Modules (1-10)</FeatureItem>
                                        <FeatureItem active>Advanced Systems (Mobs, Combat)</FeatureItem>
                                        <FeatureItem active>Full Source Code Access</FeatureItem>
                                        <FeatureItem active>Exclusive "Dev" Badge</FeatureItem>
                                        <FeatureItem active>Lifetime Updates</FeatureItem>
                                    </ul>

                                    <FluidButton
                                        variant="primary"
                                        className="w-full relative overflow-hidden"
                                        onClick={handleUpgrade}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                                        ) : (
                                            <>
                                                {language === 'en' ? 'Get Developer Access' : 'Obter Acesso Developer'}
                                            </>
                                        )}
                                    </FluidButton>
                                    <p className="text-center text-xs text-gray-500 mt-2">
                                        {language === 'en' ? 'One-time payment. Secure via Mercado Pago.' : 'Pagamento único. Seguro via Mercado Pago.'}
                                    </p>
                                </div>
                            </FluidCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </GlassLayout>
    );
}

const FeatureItem = ({ children, active }: { children: React.ReactNode; active: boolean }) => (
    <li className={`flex items-center gap-3 ${active ? 'text-gray-300' : 'text-gray-600'}`}>
        {active ? (
            <div className="p-1 rounded-full bg-liquid-primary/20 text-liquid-primary shrink-0">
                <Check size={12} />
            </div>
        ) : (
            <div className="p-1 rounded-full bg-white/5 text-gray-600 shrink-0">
                <X size={12} />
            </div>
        )}
        <span className="text-sm">{children}</span>
    </li>
);
