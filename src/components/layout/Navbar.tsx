import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLangStore } from '@/store/langStore';

// Discord SVG icon
const DiscordIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
);

interface NavbarProps {
    onOpenAuth?: () => void;
}

export const Navbar = ({ onOpenAuth }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language, setLanguage } = useLangStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-liquid-bg/80 backdrop-blur-md border-b border-white/5 py-4'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <span className="text-2xl font-bold tracking-tighter text-liquid-primary">
                            &lt;VICCS&gt;
                        </span>
                        <span className="text-2xl font-bold tracking-tighter text-white">
                            LUMINA<span className="text-liquid-primary">CODE</span>
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="#features">Features</NavLink>
                        <NavLink href="#curriculum">Curriculum</NavLink>
                        <NavLink href="#pricing">Pricing</NavLink>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'pt-br' : 'en')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-wider text-white"
                        >
                            <Globe size={14} />
                            {language === 'en' ? 'EN' : 'PT-BR'}
                        </button>

                        {/* Discord Invite */}
                        <a
                            href="https://discord.gg/v2uanJ8PGf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/30 text-xs font-bold hover:bg-[#5865F2]/30 transition-colors text-white"
                        >
                            <DiscordIcon size={14} />
                            Discord
                        </a>

                        <div className="h-6 w-px bg-white/10" />

                        <button
                            onClick={onOpenAuth}
                            className="text-gray-300 hover:text-white font-medium transition-colors"
                        >
                            Log In
                        </button>
                        <button
                            onClick={onOpenAuth}
                            className="relative px-6 py-2 bg-white/5 border border-white/10 rounded-sm overflow-hidden group hover:border-liquid-primary/50 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-liquid-primary/20 to-liquid-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative font-bold tracking-wide text-white group-hover:text-liquid-primary transition-colors">
                                START CODING
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-liquid-bg/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6"
                    >
                        <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="#features">Features</MobileNavLink>
                        <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="#curriculum">Curriculum</MobileNavLink>
                        <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="#pricing">Pricing</MobileNavLink>

                        <div className="h-px bg-white/10 my-2" />

                        {/* Mobile Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'pt-br' : 'en')}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-wider"
                        >
                            <Globe size={16} />
                            {language === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
                        </button>

                        {/* Mobile Discord Invite */}
                        <a
                            href="https://discord.gg/v2uanJ8PGf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#5865F2]/20 border border-[#5865F2]/30 text-sm font-bold text-white hover:bg-[#5865F2]/30 transition-colors"
                        >
                            <DiscordIcon size={18} />
                            Discord Community
                        </a>

                        <button className="w-full py-4 text-center font-bold text-lg border border-white/10 rounded-lg hover:bg-white/5 active:scale-95 transition-all">
                            Log In
                        </button>
                        <button className="w-full py-4 text-center font-bold text-lg bg-liquid-primary/20 text-liquid-primary border border-liquid-primary/30 rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.2)] active:scale-95 transition-all">
                            START CODING
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        className="text-gray-400 hover:text-white font-medium transition-colors relative group"
    >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-liquid-primary group-hover:w-full transition-all duration-300" />
    </a>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
    <a
        href={href}
        onClick={onClick}
        className="text-2xl font-bold text-gray-300 hover:text-white hover:pl-4 transition-all duration-300"
    >
        {children}
    </a>
);
