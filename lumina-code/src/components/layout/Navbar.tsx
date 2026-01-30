import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLangStore } from '@/store/langStore';

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
