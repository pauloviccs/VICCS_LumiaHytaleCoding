import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            username,
                            avatar_url: `https://api.dicebear.com/7.x/shapes/svg?seed=${username}`
                        }
                    }
                });
                if (error) throw error;
            }
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-liquid-bg border border-liquid-border rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Liquid Background Effect inside Modal */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-liquid-primary/10 to-transparent pointer-events-none" />
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-liquid-accent/20 blur-[50px] rounded-full pointer-events-none" />

                        <div className="relative p-8">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    {isLogin ? 'Welcome Back' : 'Join the Corps'}
                                </h2>
                                <p className="text-gray-400 mt-2">
                                    {isLogin ? 'Enter your credentials to access the terminal.' : 'Begin your journey into the code.'}
                                </p>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-500 text-sm">
                                    <AlertCircle size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {!isLogin && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
                                        <div className="relative group">
                                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-liquid-primary transition-colors" size={18} />
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-liquid-primary/50 transition-all"
                                                placeholder="AgentName"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-liquid-primary transition-colors" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-liquid-primary/50 transition-all"
                                            placeholder="agent@lumina.code"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-liquid-primary transition-colors" size={18} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-liquid-primary/50 transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-liquid-primary text-black font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 mt-6 shadow-[0_0_20px_rgba(0,243,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                                    ) : (
                                        <>
                                            {isLogin ? 'AUTHENTICATE' : 'INITIALIZE'} <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-liquid-bg text-gray-500">Or continue with</span></div>
                                </div>

                                <button
                                    onClick={async () => {
                                        try {
                                            const { error } = await supabase.auth.signInWithOAuth({
                                                provider: 'discord',
                                                options: {
                                                    redirectTo: window.location.origin,
                                                },
                                            });
                                            if (error) throw error;
                                        } catch (err: any) {
                                            setError(err.message);
                                        }
                                    }}
                                    className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-lg transition-colors shadow-lg shadow-[#5865F2]/20"
                                >
                                    <svg width="20" height="20" viewBox="0 0 127 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                        <path d="M107.704 0.500019C118.5 0.500019 126.5 8.50002 126.5 19.3V76.9C126.5 87.7 118.5 95.7 107.7 95.7H19.296C8.5 95.7 0.5 87.7 0.5 76.9V19.3C0.5 8.50002 8.5 0.500019 19.3 0.500019H107.704ZM44.204 22.8C25.304 22.8 19.304 35.3 19.304 35.3C19.304 59.8 30.604 70.3 30.604 70.3C30.604 70.3 46.504 70.3 53.604 63.2C49.904 62.2 46.704 60.5 44.204 58.7C55.004 64.9 66.804 64.9 77.504 58.7C75.004 60.5 71.804 62.2 68.104 63.2C75.204 70.3 91.104 70.3 91.104 70.3C91.104 70.3 102.404 59.8 102.404 35.3C102.404 35.3 96.404 22.8 77.504 22.8C77.504 22.8 71.904 20.3 60.904 20.3C49.904 20.3 44.204 22.8 44.204 22.8ZM50.604 39.8C54.404 39.8 57.504 42.9 57.504 46.7C57.504 50.5 54.404 53.6 50.604 53.6C46.804 53.6 43.704 50.5 43.704 46.7C43.704 42.9 46.804 39.8 50.604 39.8ZM71.204 39.8C75.004 39.8 78.104 42.9 78.104 46.7C78.104 50.5 75.004 53.6 71.204 53.6C67.404 53.6 64.304 50.5 64.304 46.7C64.304 42.9 67.404 39.8 71.204 39.8Z" fill="white" />
                                    </svg>
                                    Login with Discord
                                </button>
                            </div>

                            <div className="mt-8 text-center text-sm text-gray-500">
                                {isLogin ? "Don't have access?" : "Already an agent?"}
                                <button
                                    onClick={() => { setIsLogin(!isLogin); setError(null); }}
                                    className="ml-2 text-liquid-primary hover:text-liquid-accent transition-colors font-medium underline-offset-4 hover:underline"
                                >
                                    {isLogin ? 'Request Clearance' : 'Log In'}
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
