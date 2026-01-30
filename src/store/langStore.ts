import { create } from 'zustand';

type Language = 'en' | 'pt-br';

interface LangState {
    language: Language;
    setLanguage: (lang: Language) => void;
    // Simple dictionary for key phrases. For a larger app, we'd use proper i18n files, 
    // but this fits the "Vibe Coding" single-file preference for now.
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        // Landing Page
        'hero.system_online': 'SYSTEM ONLINE',
        'hero.code_liquid': 'CODE LIQUID',
        'hero.build_worlds': 'BUILD WORLDS',
        'hero.subtitle': 'Master Java through modding. Deploy to Hytale. Build your legacy.',
        'hero.start_mission': 'START MISSION',
        'hero.view_docs': 'VIEW DOCS',
        'features.title': 'SYSTEM MODULES',
        'features.subtitle': 'High-performance learning tools designed for the modern modder.',
        'feature.ide': 'Browser IDE',
        'feature.ide.desc': 'Write Java directly in the browser with Monaco Editor.',
        'feature.gamified': 'Gamified Progression',
        'feature.gamified.desc': 'Earn XP, maintain streaks, and unlock achievements.',
        'feature.api': 'Hytale API Sync',
        'feature.api.desc': 'Always up-to-date documentation and mock APIs.',
        'feature.feedback': 'Instant Feedback',
        'feature.feedback.desc': 'Real-time syntax checking and logic validation.',
        'feature.cloud': 'Cloud Save',
        'feature.cloud.desc': 'Your progress is synced everywhere via Supabase.',
        'feature.portfolio': 'Project Portfolio',
        'feature.portfolio.desc': 'Build a real portfolio of mods. Show off your work.',

        // Auth & Dash
        'auth.welcome': 'Welcome Back',
        'auth.join': 'Join the Corps',

        // Dashboard
        'dash.command_center': 'Command Center',
        'dash.welcome': 'Welcome back, Agent. Systems operational.',
        'dash.streak': 'Day Streak',
        'dash.xp': 'XP Earned',
        'dash.nav.overview': 'Overview',
        'dash.nav.projects': 'My Projects',
        'dash.nav.docs': 'Knowledge Base',
        'dash.nav.settings': 'Settings',
        'dash.nav.disconnect': 'Disconnect',
        'dash.objective': 'CURRENT OBJECTIVE',
        'dash.loading': 'Loading Protocol...',
        'dash.syncing': 'Synchronizing with central mainframe...',
        'dash.resume': 'Resume Protocol',
        'dash.mission_log': 'Mission Log',
        'dash.view_all': 'View All',
        'dash.completed': 'Completed',
        'dash.ago': 'hours ago',
        'dash.upcoming': 'Upcoming Modules',
        'dash.locked': 'Locked',
        'dash.no_modules': 'No additional modules detected.',

        // Studio
        'studio.run': 'RUN',
        'studio.objectives': 'OBJECTIVES',
        'studio.console': 'CONSOLE OUTPUT',
        'studio.tip': 'TIP',
        'studio.success': 'MISSION COMPLETE',
        'studio.next': 'NEXT MISSION',
    },
    'pt-br': {
        // Landing Page
        'hero.system_online': 'SISTEMA ONLINE',
        'hero.code_liquid': 'CÓDIGO LÍQUIDO',
        'hero.build_worlds': 'CRIE MUNDOS',
        'hero.subtitle': 'Domine Java através de mods. Publique no Hytale. Construa seu legado.',
        'hero.start_mission': 'INICIAR MISSÃO',
        'hero.view_docs': 'VER DOCS',
        'features.title': 'MÓDULOS DO SISTEMA',
        'features.subtitle': 'Ferramentas de aprendizado de alto desempenho para o modder moderno.',
        'feature.ide': 'IDE no Navegador',
        'feature.ide.desc': 'Escreva Java diretamente no navegador com Monaco Editor.',
        'feature.gamified': 'Progressão Gamificada',
        'feature.gamified.desc': 'Ganhe XP, mantenha sequências e desbloqueie conquistas.',
        'feature.api': 'Sincronização API Hytale',
        'feature.api.desc': 'Documentação sempre atualizada e APIs mockadas.',
        'feature.feedback': 'Feedback Instantâneo',
        'feature.feedback.desc': 'Verificação de sintaxe e validação lógica em tempo real.',
        'feature.cloud': 'Salvo na Nuvem',
        'feature.cloud.desc': 'Seu progresso sincronizado em qualquer lugar via Supabase.',
        'feature.portfolio': 'Portfólio de Projetos',
        'feature.portfolio.desc': 'Construa um portfólio real de mods. Mostre seu trabalho.',

        // Auth & Dash
        'auth.welcome': 'Bem-vindo de Volta',
        'auth.join': 'Junte-se à Tropa',

        // Dashboard
        'dash.command_center': 'Central de Comando',
        'dash.welcome': 'Bem-vindo de volta, Agente. Sistemas operacionais.',
        'dash.streak': 'Dias de Sequência',
        'dash.xp': 'XP Ganho',
        'dash.nav.overview': 'Visão Geral',
        'dash.nav.projects': 'Meus Projetos',
        'dash.nav.docs': 'Base de Conhecimento',
        'dash.nav.settings': 'Configurações',
        'dash.nav.disconnect': 'Desconectar',
        'dash.objective': 'OBJETIVO ATUAL',
        'dash.loading': 'Carregando Protocolo...',
        'dash.syncing': 'Sincronizando com mainframe central...',
        'dash.resume': 'Retomar Protocolo',
        'dash.mission_log': 'Registro da Missão',
        'dash.view_all': 'Ver Tudo',
        'dash.completed': 'Completado',
        'dash.ago': 'horas atrás',
        'dash.upcoming': 'Próximos Módulos',
        'dash.locked': 'Bloqueado',
        'dash.no_modules': 'Nenhum módulo adicional detectado.',

        // Studio
        'studio.run': 'EXECUTAR',
        'studio.objectives': 'OBJETIVOS',
        'studio.console': 'SAÍDA DO CONSOLE',
        'studio.tip': 'DICA',
        'studio.success': 'MISSÃO CUMPRIDA',
        'studio.next': 'PRÓXIMA MISSÃO',
    }
};

export const useLangStore = create<LangState>((set, get) => ({
    language: 'en',
    setLanguage: (lang) => set({ language: lang }),
    t: (key) => {
        const lang = get().language;
        return translations[lang][key] || key;
    }
}));
