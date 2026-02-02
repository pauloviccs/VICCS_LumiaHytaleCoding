import { useState, useEffect } from 'react';
import { GlassLayout } from '@/components/layout/GlassLayout';
import { Navbar } from '@/components/layout/Navbar';
import { AuthModal } from '@/components/auth/AuthModal';
import { FluidButton, FluidCard } from '@/components/ui/FluidDesign';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Gamepad2, Database, Zap, ArrowRight, Shield, Code } from 'lucide-react';
import { useViewStore } from '@/store/viewStore';
import { useLangStore } from '@/store/langStore';

const backgrounds = [
    '/assets/backgrounds/background_7.jpg',
    '/assets/backgrounds/background_8.jpg',
    '/assets/backgrounds/background_9.jpg'
];

function LandingPage() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { setView } = useViewStore();
    const { t, language } = useLangStore();
    const [currentBgIndex, setCurrentBgIndex] = useState(0);

    // Background Cycle Effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
        }, 8000); // Faster cycle for Hero (8s)
        return () => clearInterval(timer);
    }, []);

    // Mouse Parallax Logic
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / 50; // Sensitivity
        const moveY = (clientY - window.innerHeight / 2) / 50;
        setMousePosition({ x: moveX, y: moveY });
    };

    return (
        <GlassLayout>
            <div className="relative z-50">
                <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
            </div>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

            {/* Hero Section */}
            <section
                onMouseMove={handleMouseMove}
                className="relative min-h-screen flex items-center pt-20 overflow-hidden"
            >
                {/* Mouse Tracking Background */}
                <motion.div
                    className="absolute inset-0 z-0 overflow-hidden"
                    animate={{
                        x: mousePosition.x * -1,
                        y: mousePosition.y * -1,
                        scale: 1.1 // Increased scale for safe parallax edges
                    }}
                    transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
                >
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentBgIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <img
                                src={backgrounds[currentBgIndex]}
                                alt="Hero Background"
                                className="w-full h-full object-cover opacity-60 filter blur-[6px] mix-blend-screen"
                            />
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10 pointer-events-none" />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8 relative z-20"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs md:text-sm font-mono text-liquid-primary">
                            <span className="animate-pulse w-2 h-2 rounded-full bg-liquid-primary" />
                            {t('hero.system_online')}
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none">
                            {language === 'en' ? (
                                <>
                                    CODE <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-primary via-white to-liquid-accent">
                                        LIQUID
                                    </span> <br />
                                    BUILD <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-accent via-white to-liquid-primary">
                                        WORLDS
                                    </span>
                                </>
                            ) : (
                                <>
                                    CÓDIGO <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-primary via-white to-liquid-accent">
                                        LÍQUIDO
                                    </span> <br />
                                    CRIE <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-accent via-white to-liquid-primary">
                                        MUNDOS
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed drop-shadow-md">
                            {t('hero.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                            <FluidButton
                                onClick={() => setIsAuthOpen(true)}
                                variant="primary"
                                className="w-full sm:w-auto text-lg tracking-wider"
                            >
                                {t('hero.start_mission')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </FluidButton>

                            <FluidButton
                                onClick={() => setView('documentation')}
                                variant="glass"
                                className="w-full sm:w-auto text-lg tracking-wider"
                            >
                                {t('hero.view_docs')}
                            </FluidButton>
                        </div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                            {/* Floating Code Card */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 z-20"
                            >
                                <div className="glass-panel p-6 rounded-xl border border-liquid-primary/30 shadow-[0_0_50px_rgba(0,243,255,0.15)] bg-black/60 backdrop-blur-xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                        <div className="ml-auto text-xs text-gray-500 font-mono">HytaleMod.java</div>
                                    </div>
                                    <pre className="font-mono text-sm text-gray-300 overflow-hidden">
                                        <code>
                                            {`@HytaleMod(
  name = "LiquidSword",
  version = "1.0.0"
)
public class LiquidSword extends Item {
  
  @Override
  public void onAttack(Entity target) {
     // Dealers 500 damage
     target.damage(500); 
     
     // Plays particle effect
     FX.spawn("liquid_splash", target.pos);
  }
}`}
                                        </code>
                                    </pre>
                                </div>
                            </motion.div>

                            {/* Background Glows */}
                            <div className="absolute inset-[-20%] bg-gradient-to-tr from-liquid-accent/30 to-liquid-primary/30 rounded-full blur-[100px] animate-pulse-glow -z-10" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 relative bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('features.title')}</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">{t('features.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Terminal className="w-8 h-8 text-liquid-primary" />}
                            title={t('feature.ide')}
                            description={t('feature.ide.desc')}
                        />
                        <FeatureCard
                            icon={<Gamepad2 className="w-8 h-8 text-liquid-accent" />}
                            title={t('feature.gamified')}
                            description={t('feature.gamified.desc')}
                        />
                        <FeatureCard
                            icon={<Database className="w-8 h-8 text-green-400" />}
                            title={t('feature.api')}
                            description={t('feature.api.desc')}
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-yellow-400" />}
                            title={t('feature.feedback')}
                            description={t('feature.feedback.desc')}
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-blue-500" />}
                            title={t('feature.cloud')}
                            description={t('feature.cloud.desc')}
                        />
                        <FeatureCard
                            icon={<Code className="w-8 h-8 text-pink-500" />}
                            title={t('feature.portfolio')}
                            description={t('feature.portfolio.desc')}
                        />
                    </div>
                </div>
            </section>
        </GlassLayout>
    )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <FluidCard className="group">
        <div className="mb-6 p-4 bg-white/5 rounded-lg w-fit group-hover:bg-white/10 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-liquid-primary transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed">
            {description}
        </p>
    </FluidCard>
)

export default LandingPage
