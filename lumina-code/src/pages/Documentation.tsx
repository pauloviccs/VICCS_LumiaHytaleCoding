import { useState } from 'react';
import { GlassLayout } from '@/components/layout/GlassLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Book,
    Code,
    Box,
    ArrowLeft,
    ChevronRight,
    FileText,
    Globe,
    Menu,
    X
} from 'lucide-react';
import { useViewStore } from '@/store/viewStore';
import { useLangStore } from '@/store/langStore';

// Mock Data - In a real app this would be fetched or in a separate file
const DOCS_DATA = {
    en: {
        'Getting Started': {
            title: 'Getting Started',
            content: '## Environment Setup\n\nTo build Hytale mods, you need:\n- **Java 25** (Adoptium recommended)\n- **Maven 3.9.12+**\n- **HytaleServer.jar** (Manually installed)\n\n### Installation Command\n```powershell\nmvn install:install-file -Dfile="PATH/HytaleServer.jar" -DgroupId="com.hypixel.hytale" ...\n```',
            example: 'System.out.println("Hytale Environment Ready");'
        },
        'Event System': {
            title: 'Event System',
            content: '## Event Architecture\n\nHytale uses three types of events:\n1. **Sync (`IEvent`)**: Main thread. Safe to modify world.\n2. **Async (`IAsyncEvent`)**: Background thread. **Read-only** access.\n3. **ECS (`EcsEvent`)**: Entity interactions.\n\n> [!CAUTION]\n> Never modify the world state inside an Async Event.',
            example: '@Subscribe\npublic void onPlayerJoin(PlayerJoinEvent event) {\n  // Handle join\n}'
        },
        'Prefabs': {
            title: 'Prefabs',
            content: '## Building Structures\n\nPrefabs are static structures created in-game.\n\n1. `/editprefab new <name>`\n2. Build your structure\n3. Select with Brush\n4. `/prefab save`\n5. `/prefab load` to test',
            example: '/prefab load my_castle'
        },
        'Entity API': {
            title: 'Entity API',
            content: '## Entities\n\nThe `Entity` class is the core of Hytale actors.\n\n- **Spawning**: Use `PrefabSpawnerModule`.\n- **Components**: Attach behavior components.',
            example: 'entity.addComponent(new AIComponent());'
        }
    },
    'pt-br': {
        'Getting Started': {
            title: 'Começando',
            content: '## Configuração do Ambiente\n\nPara criar mods de Hytale, você precisa de:\n- **Java 25** (Recomendado Adoptium)\n- **Maven 3.9.12+**\n- **HytaleServer.jar** (Instalado manualmente)\n\n### Comando de Instalação\n```powershell\nmvn install:install-file -Dfile="CAMINHO/HytaleServer.jar" ...\n```',
            example: 'System.out.println("Ambiente Hytale Pronto");'
        },
        'Event System': {
            title: 'Sistema de Eventos',
            content: '## Arquitetura de Eventos\n\nHytale usa três tipos de eventos:\n1. **Sync (`IEvent`)**: Thread principal. Seguro para modificar o mundo.\n2. **Async (`IAsyncEvent`)**: Thread secundária. Acesso **somente leitura**.\n3. **ECS (`EcsEvent`)**: Interações de Entidades.\n\n> [!CAUTION]\n> Nunca modifique o estado do mundo dentro de um Evento Async.',
            example: '@Subscribe\npublic void onPlayerJoin(PlayerJoinEvent event) {\n  // Manipular entrada\n}'
        },
        'Prefabs': {
            title: 'Prefabs',
            content: '## Construindo Estruturas\n\nPrefabs são estruturas estáticas criadas no jogo.\n\n1. `/editprefab new <nome>`\n2. Construa sua estrutura\n3. Selecione com o Pincel\n4. `/prefab save`\n5. `/prefab load` para testar',
            example: '/prefab load meu_castelo'
        },
        'Entity API': {
            title: 'API de Entidades',
            content: '## Entidades\n\nA classe `Entity` é o núcleo dos atores do Hytale.\n\n- **Spawning**: Use `PrefabSpawnerModule`.\n- **Componentes**: Anexe componentes de comportamento.',
            example: 'entity.addComponent(new AIComponent());'
        }
    }
};

const CATEGORIES = [
    { id: 'start', name: 'Basics', icon: <Book size={18} />, items: ['Getting Started', 'Prefabs'] },
    { id: 'api', name: 'Core API', icon: <Code size={18} />, items: ['Event System', 'Entity API'] },
    { id: 'assets', name: 'Assets', icon: <Box size={18} />, items: ['Models', 'Textures'] } // Placeholder
];

export default function Documentation() {
    const { setView } = useViewStore();
    const { language, setLanguage } = useLangStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDocId, setSelectedDocId] = useState<string | null>('Getting Started');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const currentDocs = DOCS_DATA[language === 'pt-br' ? 'pt-br' : 'en'];
    const selectedContent = selectedDocId && currentDocs[selectedDocId as keyof typeof currentDocs];

    // Filter categories
    const filteredCategories = CATEGORIES.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (currentDocs[item as keyof typeof currentDocs]?.title.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    })).filter(cat => cat.items.length > 0);

    const SidebarContent = () => (
        <div className="p-6 h-full flex flex-col">
            <button
                onClick={() => setView('dashboard')} // Fallback, though typically we might want to check if user needs to go to Landing
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group shrink-0"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">{language === 'en' ? 'Back' : 'Voltar'}</span>
            </button>

            <div className="relative mb-8 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="text"
                    placeholder={language === 'en' ? "Search docs..." : "Buscar docs..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-liquid-primary/50 transition-colors"
                />
            </div>

            <nav className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {filteredCategories.map(category => (
                    <div key={category.id}>
                        <div className="flex items-center gap-2 text-liquid-primary text-xs font-bold uppercase tracking-wider mb-3 px-2">
                            {category.icon}
                            {category.name}
                        </div>
                        <ul className="space-y-1">
                            {category.items.map(item => (
                                <li key={item}>
                                    <button
                                        onClick={() => { setSelectedDocId(item); setIsSidebarOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${selectedDocId === item
                                            ? 'bg-white/10 text-white font-medium'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {currentDocs[item as keyof typeof currentDocs]?.title || item}
                                        {selectedDocId === item && <ChevronRight size={14} className="text-liquid-primary" />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </div>
    );

    return (
        <GlassLayout>
            <div className="flex h-screen pt-20 overflow-hidden relative">

                {/* Mobile Header with Toggle */}
                <div className="absolute top-0 left-0 right-0 z-40 p-4 md:hidden flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-white p-2">
                            <Menu size={24} />
                        </button>
                        <span className="font-bold text-white">Docs</span>
                    </div>
                    {/* Language Toggle Overlay (Mobile Position) */}
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'pt-br' : 'en')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-wider text-white"
                    >
                        <Globe size={14} />
                        {language === 'en' ? 'EN' : 'PT-BR'}
                    </button>
                </div>

                {/* Desktop Language Toggle */}
                <div className="absolute top-24 right-8 z-50 hidden md:block">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'pt-br' : 'en')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-wider text-white"
                    >
                        <Globe size={14} />
                        {language === 'en' ? 'EN' : 'PT-BR'}
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden top-20" // content starts at pt-20
                            />
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 20 }}
                                className="fixed inset-y-0 left-0 w-72 bg-liquid-bg border-r border-white/10 z-50 md:hidden flex flex-col pt-20"
                            >
                                <div className="absolute top-[88px] right-4">
                                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400">
                                        <X size={24} />
                                    </button>
                                </div>
                                <SidebarContent />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Desktop Sidebar */}
                <aside className="w-72 border-r border-white/10 bg-black/20 backdrop-blur-md hidden md:flex flex-col shrink-0">
                    <SidebarContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-12 pt-24 md:pt-12 custom-scrollbar">
                    <div className="max-w-4xl mx-auto">
                        {selectedContent ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={selectedDocId}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-liquid-primary/10">
                                        <FileText className="text-liquid-primary" size={24} />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white break-words">{selectedContent.title}</h1>
                                </div>

                                <div className="prose prose-invert prose-lg max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-300">
                                        {selectedContent.content.split('\n').map((line, i) => {
                                            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
                                            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>;
                                            if (line.startsWith('- ')) return <li key={i} className="ml-4 text-gray-300">{line.replace('- ', '')}</li>;
                                            if (line.startsWith('```')) return null;
                                            return <p key={i} className="mb-2">{line}</p>;
                                        })}
                                    </div>

                                    {selectedContent.example && (
                                        <div className="not-prose grid grid-cols-1 gap-4 my-8">
                                            <div className="p-4 rounded-lg bg-black/40 border border-white/10 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="text-xs text-gray-500 bg-black/80 px-2 py-1 rounded">Java</div>
                                                </div>
                                                <div className="text-xs text-liquid-primary uppercase font-bold mb-2 tracking-widest">Code Example</div>
                                                <code className="text-sm font-mono text-gray-300 block overflow-x-auto">
                                                    <pre>{selectedContent.example}</pre>
                                                </code>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[70vh] text-center opacity-50">
                                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">
                                    <Book size={48} className="text-gray-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{language === 'en' ? 'Select a Topic' : 'Selecione um Tópico'}</h2>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </GlassLayout>
    );
}
