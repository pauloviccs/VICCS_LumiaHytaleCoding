import { GlassLayout } from '@/components/layout/GlassLayout';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Globe
} from 'lucide-react';
import { useViewStore } from '@/store/viewStore';
import { useLangStore } from '@/store/langStore';
import { KnowledgeBase } from '@/components/docs/KnowledgeBase';

export default function Documentation() {
    const { setView } = useViewStore();
    const { language, setLanguage } = useLangStore();

    return (
        <GlassLayout>
            <div className="flex flex-col h-screen">
                {/* Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
                    <button
                        onClick={() => setView('dashboard')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">{language === 'en' ? 'Back' : 'Voltar'}</span>
                    </button>

                    <h1 className="text-xl font-bold text-white hidden md:block">
                        {language === 'en' ? 'Documentation' : 'Documentação'}
                    </h1>

                    <button
                        onClick={() => setLanguage(language === 'en' ? 'pt-br' : 'en')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-wider text-white"
                    >
                        <Globe size={14} />
                        {language === 'en' ? 'EN' : 'PT'}
                    </button>
                </div>

                {/* Knowledge Base Content */}
                <motion.div
                    className="flex-1 overflow-hidden p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <KnowledgeBase />
                </motion.div>
            </div>
        </GlassLayout>
    );
}
