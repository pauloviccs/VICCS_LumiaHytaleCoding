import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, X } from 'lucide-react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    xpGained: number;
    title: string;
}

export const SuccessModal = ({ isOpen, onClose, onNext, xpGained, title }: SuccessModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#0f1115] border border-liquid-primary/30 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_-12px_rgba(0,255,157,0.3)] text-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-20 bg-liquid-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <Trophy size={40} className="text-liquid-primary" />
                        </motion.div>

                        <motion.h2
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            Mission Complete!
                        </motion.h2>

                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-400 mb-8"
                        >
                            You've successfully completed <span className="text-liquid-primary font-bold">"{title}"</span>.
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/5 rounded-xl p-4 mb-8 border border-white/5"
                        >
                            <span className="block text-sm text-gray-400 uppercase tracking-wider mb-1">Rewards</span>
                            <span className="text-2xl font-bold text-yellow-400">+{xpGained} XP</span>
                        </motion.div>

                        <motion.button
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            onClick={onNext}
                            className="w-full py-4 bg-liquid-primary text-black font-bold rounded-xl hover:bg-liquid-primary/90 transition-colors flex items-center justify-center gap-2 group"
                        >
                            Next Mission
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
