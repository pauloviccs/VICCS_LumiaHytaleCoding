import { motion } from 'framer-motion';
import { FluidCard, FluidButton } from '@/components/ui/FluidDesign';
import { ExternalLink, Paintbrush, Box, Layers, Info, Ruler, Triangle, Globe, Sparkles } from 'lucide-react';
import { useLangStore } from '@/store/langStore';

const GuideSection = ({ title, children, id }: { title: string, children: React.ReactNode, id?: string }) => (
    <section id={id} className="space-y-6 pt-8 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-8 bg-gradient-to-b from-liquid-primary to-purple-500 rounded-full inline-block" />
            {title}
        </h2>
        <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
            {children}
        </div>
    </section>
);

const GuideSubSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-3 pt-4">
        <h3 className="text-xl font-bold text-liquid-primary/90">
            {title}
        </h3>
        <div className="text-gray-300 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const GuideImage = ({ src, caption, alt, fullWidth = false }: { src: string, caption?: string, alt?: string, fullWidth?: boolean }) => (
    <div className={`rounded-xl overflow-hidden border border-white/10 my-8 group bg-black/40 shadow-2xl ${fullWidth ? 'w-full' : 'max-w-4xl mx-auto'}`}>
        <div className="relative overflow-hidden">
            <img
                src={src}
                alt={alt || caption}
                className="w-full h-auto transition-transform duration-700 hover:scale-[1.02]"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {caption && (
            <div className="bg-black/60 p-3 text-sm text-gray-400 text-center backdrop-blur-md border-t border-white/5">
                {caption}
            </div>
        )}
    </div>
);

const Callout = ({ children, icon: Icon = Info }: { children: React.ReactNode, icon?: any }) => (
    <div className="p-6 rounded-xl bg-liquid-primary/5 border-l-4 border-liquid-primary my-6 flex gap-4">
        <div className="shrink-0 mt-1">
            <Icon className="text-liquid-primary" size={24} />
        </div>
        <div className="text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

export const BlockbenchGuide = () => {
    const { language } = useLangStore();
    const t = GUIDE_CONTENT[language === 'en' ? 'en' : 'pt'];

    return (
        <div className="max-w-5xl mx-auto pb-20 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl shadow-liquid-primary/10">
                <img src="/assets/blockbench/banner_0.jpg" alt="Hytale Model Maker" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-liquid-primary/20 text-liquid-primary text-xs font-bold mb-4 border border-liquid-primary/30 backdrop-blur-md uppercase tracking-wider">
                            {t.badge}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            {t.hero_title_1}<br />{t.hero_title_2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-primary to-blue-500">Hytale</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
                            {t.hero_subtitle}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Intro Content */}
            <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed">
                    {t.intro_p1}
                </p>
                <p className="text-gray-400">
                    {t.intro_p2}
                </p>
            </div>

            <GuideSection title={t.section_1_title}>
                <GuideImage src="/assets/blockbench/banner_1.jpg" caption={t.img_1_caption} fullWidth />

                <GuideSubSection title={t.s1_sub_1_title}>
                    <p className="text-xl italic text-gray-400 border-l-2 border-white/20 pl-4 my-4">
                        "{t.s1_sub_1_quote}"
                    </p>
                    <p>{t.s1_sub_1_text}</p>
                </GuideSubSection>

                <GuideSubSection title={t.s1_sub_2_title}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                        <FluidCard className="border-white/10 hover:border-liquid-primary/30">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                                <Globe size={20} className="text-green-400" /> {t.pillar_1}
                            </h4>
                            <p className="text-sm text-gray-400">{t.pillar_1_desc}</p>
                        </FluidCard>
                        <FluidCard className="border-white/10 hover:border-liquid-primary/30">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                                <Sparkles size={20} className="text-purple-400" /> {t.pillar_2}
                            </h4>
                            <p className="text-sm text-gray-400">{t.pillar_2_desc}</p>
                        </FluidCard>
                        <FluidCard className="border-white/10 hover:border-liquid-primary/30">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                                <Paintbrush size={20} className="text-pink-400" /> {t.pillar_3}
                            </h4>
                            <p className="text-sm text-gray-400">{t.pillar_3_desc}</p>
                        </FluidCard>
                        <FluidCard className="border-white/10 hover:border-liquid-primary/30">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                                <Box size={20} className="text-yellow-400" /> {t.pillar_4}
                            </h4>
                            <p className="text-sm text-gray-400">{t.pillar_4_desc}</p>
                        </FluidCard>
                    </div>
                    <GuideImage src="/assets/blockbench/banner_2.jpg" caption={t.img_2_caption} />
                </GuideSubSection>

                <GuideSubSection title={t.s1_sub_3_title}>
                    <p>{t.s1_sub_3_text}</p>
                    <Callout icon={Layers}>
                        {t.callout_1}
                    </Callout>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>{t.list_1_1}</li>
                        <li>{t.list_1_2}</li>
                        <li>{t.list_1_3}</li>
                    </ul>
                    <GuideImage src="/assets/blockbench/banner_3.jpg" caption={t.img_3_caption} />
                </GuideSubSection>
            </GuideSection>

            <GuideSection title={t.section_2_title}>
                <GuideSubSection title={t.s2_sub_1_title}>
                    <p>{t.s2_sub_1_text}</p>
                    <div className="flex gap-4 my-4 flex-wrap">
                        <FluidButton variant="primary" className="gap-2" onClick={() => window.open('https://www.blockbench.net/', '_blank')}>
                            <ExternalLink size={16} /> {t.btn_download}
                        </FluidButton>
                        <FluidButton variant="secondary" className="gap-2" onClick={() => window.open('https://www.blockbench.net/plugins/hytale_plugin', '_blank')}>
                            <Box size={16} /> {t.btn_plugin}
                        </FluidButton>
                    </div>
                </GuideSubSection>
                <GuideImage src="/assets/blockbench/banner_4.jpg" caption={t.img_4_caption} />

                <GuideSubSection title={t.s2_sub_2_title}>
                    <p>{t.s2_sub_2_text}</p>
                    <div className="flex gap-8 justify-center my-8">
                        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                            <Box size={48} className="mx-auto mb-3 text-liquid-primary" />
                            <div className="font-bold text-white">{t.cubes}</div>
                            <div className="text-sm text-gray-500">{t.cubes_sides}</div>
                        </div>
                        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                            <Layers size={48} className="mx-auto mb-3 text-purple-400" />
                            <div className="font-bold text-white">{t.quads}</div>
                            <div className="text-sm text-gray-500">{t.quads_sides}</div>
                        </div>
                    </div>
                    <p>{t.s2_sub_2_p2}</p>
                    <GuideImage src="/assets/blockbench/banner_5.jpg" caption={t.img_5_caption} />
                </GuideSubSection>

                <GuideSubSection title={t.s2_sub_3_title}>
                    <p>{t.s2_sub_3_text}</p>
                    <Callout icon={Ruler}>
                        <strong>{t.callout_2_label}</strong> {t.callout_2_text}
                    </Callout>
                    <GuideImage src="/assets/blockbench/banner_6.jpg" caption={t.img_6_caption} />
                </GuideSubSection>

                <GuideSubSection title={t.s2_sub_4_title}>
                    <p>{t.s2_sub_4_text}</p>
                    <GuideImage src="/assets/blockbench/banner_7.jpg" caption={t.img_7_caption} />
                </GuideSubSection>

                <GuideSubSection title={t.s2_sub_5_title}>
                    <p>{t.s2_sub_5_text}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="p-4 bg-liquid-primary/10 border border-liquid-primary/30 rounded-lg">
                            <h4 className="font-bold text-white mb-1">{t.tex_card_1_title}</h4>
                            <p className="text-sm text-gray-400">{t.tex_card_1_desc}</p>
                            <div className="text-2xl font-mono text-liquid-primary mt-2">64px / unit</div>
                        </div>
                        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <h4 className="font-bold text-white mb-1">{t.tex_card_2_title}</h4>
                            <p className="text-sm text-gray-400">{t.tex_card_2_desc}</p>
                            <div className="text-2xl font-mono text-purple-400 mt-2">32px / unit</div>
                        </div>
                    </div>
                    <GuideImage src="/assets/blockbench/banner_8.jpg" caption={t.img_8_caption} />
                    <p className="text-sm text-gray-400 italic mt-2">
                        {t.s2_sub_5_note}
                    </p>
                    <GuideImage src="/assets/blockbench/banner_9.jpg" caption={t.img_9_caption} />
                    <GuideImage src="/assets/blockbench/banner_10.png" caption={t.img_10_caption} />
                </GuideSubSection>
            </GuideSection>

            <GuideSection title={t.section_3_title}>
                <GuideSubSection title={t.s3_sub_1_title}>
                    <p>{t.s3_sub_1_text}</p>
                    <Callout icon={Triangle}>
                        <strong>{t.callout_3_label}</strong> {t.callout_3_text}
                    </Callout>
                    <GuideImage src="/assets/blockbench/banner_12.gif" caption={t.img_12_caption} />
                </GuideSubSection>

                <GuideSubSection title={t.s3_sub_2_title}>
                    <p>{t.s3_sub_2_text}</p>
                    <ul className="space-y-2 mt-4">
                        <li className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-liquid-primary rounded-full" />
                            <strong>{t.list_2_1_label}</strong> {t.list_2_1_desc}
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-liquid-primary rounded-full" />
                            <strong>{t.list_2_2_label}</strong> {t.list_2_2_desc}
                        </li>
                    </ul>
                    <GuideImage src="/assets/blockbench/banner_13.gif" caption={t.img_13_caption} />
                </GuideSubSection>

                <GuideSubSection title={t.s3_sub_3_title}>
                    <p>{t.s3_sub_3_text}</p>
                    <GuideImage src="/assets/blockbench/banner_14.gif" caption={t.img_14_caption} />
                </GuideSubSection>

                <GuideSubSection title={t.s3_sub_4_title}>
                    <p>{t.s3_sub_4_text}</p>
                    <GuideImage src="/assets/blockbench/banner_15.jpg" caption={t.img_15_caption} />
                    <div className="grid grid-cols-2 gap-4">
                        <GuideImage src="/assets/blockbench/banner_16.jpg" caption={t.img_16_caption} />
                        <GuideImage src="/assets/blockbench/banner_17.jpg" caption={t.img_17_caption} />
                    </div>
                </GuideSubSection>
            </GuideSection>

            <div className="flex justify-center pt-12 border-t border-white/10">
                <FluidButton variant="primary" className="px-8 py-4 text-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Box className="mr-2" /> {t.btn_start}
                </FluidButton>
            </div>
        </div>
    );
};

const GUIDE_CONTENT = {
    en: {
        hero_title_1: "An Introduction to",
        hero_title_2: "Making Models for",
        hero_subtitle: "Master the art of Hytale's unique visual style. From blocky proportions to hand-painted textures.",
        badge: "Official Guide",
        intro_p1: "Hytale is a vast game containing many universes and themes. You could be visiting Orbis, end up in minigames shooting aliens, or riding dinosaurs in a prehistoric world!",
        intro_p2: "No matter what you see in-game, we aim at building a consistent and emblematic art style across all game modes and media we craft (Concept art, UI, Modelling, Animation, VFX, Level Design) and a lot of thought has been put into it. We want players to feel like what they are experiencing is part of the same universe: the world of Hytale.",
        section_1_title: "ONE ART STYLE TO BIND THEM ALL",
        img_1_caption: "The unifying art style of Hytale",
        s1_sub_1_title: "Hytale Art Style",
        s1_sub_1_quote: "A modern, stylized voxel game, with retro pixel-art textures",
        s1_sub_1_text: "Hytale art style was born of a combination of influences. By fully leveraging modern game engine capabilities while preserving the charm of our old-school pixel art, we are at the intersection of low-definition pixel art and hand-painted 3D.",
        s1_sub_2_title: "The Art Pillars",
        pillar_1: "Immersive",
        pillar_1_desc: "We aspire to make our world feel alive. Wind blows in the leaves. Creatures wander around. Clouds travel and let light pierce through. The world reacts to the player.",
        pillar_2: "Fantasy",
        pillar_2_desc: "Hytale is deeply Fantasy. Our Art style remains recognizable and consistent across universes. Each character has a unique personality and twist.",
        pillar_3: "Stylized",
        pillar_3_desc: "Simplicity is key. Our models aim to be iconic and easily identifiable. We carefully select which parts of the geometry to preserve and which to discard.",
        pillar_4: "Flexible",
        pillar_4_desc: "Models are composed of primitive shapes like cubes and quads. Easy to understand, easy to make yours!",
        img_2_caption: "The 4 Art Pillars in action",
        s1_sub_3_title: "The Hytale Renderer",
        s1_sub_3_text: "The game wouldn't look as great without the technology bringing everything together. Our engine is designed to run efficiently on older computers, prioritizing speed to allow playability for as many people as possible.",
        callout_1: "We aren't using the industry standard PBR workflows (roughness, normal maps, displacement, etc) - it is really tailored to elevate the art style in its unique way.",
        list_1_1: "We paint lights and shadows inside textures and use real lights/shadows to bring everything together.",
        list_1_2: "We rely on in-house light propagation techniques instead of complex material effects.",
        list_1_3: "We apply a selective set of shaders: Bloom, Depth of Field, and Ambient Occlusion.",
        img_3_caption: "In-house renderer enhancing the voxel aesthetic",
        section_2_title: "MAKING MODELS FOR HYTALE - GETTING STARTED!",
        s2_sub_1_title: "Blockbench Plugin",
        s2_sub_1_text: "To help you build models, we are releasing a Blockbench plugin tailored to our engine's needs. This helps maintain consistent pixel ratios and correct export formats.",
        btn_download: "Download Blockbench",
        btn_plugin: "Get Hytale Plugin",
        img_4_caption: "Hytale Plugin running in Blockbench",
        s2_sub_2_title: "Our Geometry Constraints",
        s2_sub_2_text: "When making models, we only use 2 primitives:",
        cubes: "CUBES",
        cubes_sides: "6 Sides",
        quads: "QUADS",
        quads_sides: "2 Sides",
        s2_sub_2_p2: "No edge loops, no special topology, no triangles, pyramids. This ensures all models are easy to make, unwrap, and animate, and don't require a 3D Art degree to get started!",
        img_5_caption: "Simple geometry constraints",
        s2_sub_3_title: "The Hytale Proportions",
        s2_sub_3_text: "The character bodies are far from realistic. They are small, bulky, and cartoony. This supports the cartoony, chunky style used in every other element of the game. Similarly, blocks and furniture are 'toylike' and have pure and iconic shapes.",
        callout_2_label: "Don't forget:",
        callout_2_text: "No spheres allowed!",
        img_6_caption: "Example of player node hierarchy",
        s2_sub_4_title: "How Many Triangles Do I Put In My Model?",
        s2_sub_4_text: "We work as simply as possible, then slightly increase geometry and polygon count when needed to improve the silhouette. This is also for performance reasons.",
        img_7_caption: "Optimized geometry examples",
        s2_sub_5_title: "What Size Should My Textures Be?",
        s2_sub_5_text: "Textures can be non-square and must be multiples of 32px (32, 64, 96, 128, etc.).",
        tex_card_1_title: "Character / Attachment",
        tex_card_1_desc: "Cosmetic, Tool, Weapon, Food",
        tex_card_2_title: "Prop / Block",
        tex_card_2_desc: "Everything else (cubes, furniture)",
        img_8_caption: "Texture density comparison",
        s2_sub_5_note: "*Higher density for characters allows for details on skin, tattoos, makeup, eye and mouth motion.",
        img_9_caption: "Detailed character textures vs world blocks",
        img_10_caption: "Facial expressions enabled by higher density",
        section_3_title: "ADVANCED TECHNIQUES",
        s3_sub_1_title: "Stretching!",
        s3_sub_1_text: "We allow stretching geometry (and pixels!) to do fine adjustments or avoid Z-fighting.",
        callout_3_label: "Limit:",
        callout_3_text: "Avoid going under 0.7X and over 1.3X stretch to keep the visual consistency.",
        img_12_caption: "Stretching pixels in action",
        s3_sub_2_title: "Which Brush Should I Use?",
        s3_sub_2_text: "Use any painting software! Photoshop, Gimp, Clip Studio, Affinity, Krita, Blockbench or Procreate.",
        list_2_1_label: "Pencil brush (opacity on):",
        list_2_1_desc: "For details.",
        list_2_2_label: "Round soft brush (opacity pressure):",
        list_2_2_desc: "For softening surfaces and creating volume.",
        img_13_caption: "Painting workflow demonstration",
        s3_sub_3_title: "Picking Good Colors",
        s3_sub_3_text: "Avoid pure white and pure black. We tend to add color in our shadows - they are never purely desaturated. For example, a hint of purple in the shadows makes a model more vibrant.",
        img_14_caption: "Color palette selection",
        s3_sub_4_title: "Shading Mode and Material",
        s3_sub_4_text: "If you are working on a character, we recommend disabling side shadows in Blockbench to avoid hard edge effects on organic volumes.",
        img_15_caption: "Shading modes comparison",
        img_16_caption: "Material details",
        img_17_caption: "Final render result",
        btn_start: "Start Modeling"
    },
    pt: {
        hero_title_1: "Uma Introdução à",
        hero_title_2: "Criação de Modelos para",
        hero_subtitle: "Domine a arte do estilo visual único do Hytale. Das proporções em blocos às texturas pintadas à mão.",
        badge: "Guia Oficial",
        intro_p1: "Hytale é um jogo vasto contendo muitos universos e temas. Você pode estar visitando Orbis, acabando em minigames atirando em alienígenas, ou montando dinossauros num mundo pré-histórico!",
        intro_p2: "Não importa o que você veja no jogo, visamos construir um estilo artístico consistente e emblemático em todos os modos e mídias que criamos (Concept art, UI, Modelagem, Animação, VFX, Level Design) e muito pensamento foi colocado nisso. Queremos que os jogadores sintam que o que estão experimentando faz parte do mesmo universo: o mundo de Hytale.",
        section_1_title: "UM ESTILO ARTÍSTICO PARA UNIR A TODOS",
        img_1_caption: "O estilo artístico unificador de Hytale",
        s1_sub_1_title: "Estilo Artístico do Hytale",
        s1_sub_1_quote: "Um jogo voxel moderno e estilizado, com texturas retrô em pixel-art",
        s1_sub_1_text: "O estilo artístico do Hytale nasceu de uma combinação de influências. Ao aproveitar totalmente as capacidades das engines modernas enquanto preservamos o charme da nossa pixel art old-school, estamos na interseção entre pixel art de baixa definição e 3D pintado à mão.",
        s1_sub_2_title: "Os Pilares Artísticos",
        pillar_1: "Imersivo",
        pillar_1_desc: "Aspiramos tornar nosso mundo vivo. O vento sopra nas folhas. Criaturas vagam. Nuvens viajam e deixam a luz passar. O mundo reage ao jogador.",
        pillar_2: "Fantasia",
        pillar_2_desc: "Hytale é profundamente Fantasia. Nosso estilo permanece reconhecível e consistente através de universos. Cada personagem tem uma personalidade única.",
        pillar_3: "Estilizado",
        pillar_3_desc: "Simplicidade é a chave. Nossos modelos visam ser icônicos e facilmente identificáveis. Selecionamos cuidadosamente quais partes da geometria preservar e quais descartar.",
        pillar_4: "Flexível",
        pillar_4_desc: "Modelos são compostos de formas primitivas como cubos e quads. Fácil de entender, fácil de tornar seu!",
        img_2_caption: "Os 4 Pilares Artísticos em ação",
        s1_sub_3_title: "O Renderizador Hytale",
        s1_sub_3_text: "O jogo não pareceria tão bom sem a tecnologia unindo tudo. Nossa engine é projetada para rodar eficientemente em computadores mais antigos, priorizando velocidade para permitir jogabilidade para o maior número possível de pessoas.",
        callout_1: "Nós não usamos fluxos de trabalho PBR padrão da indústria (roughness, normal maps, displacement, etc) - é realmente feito sob medida para elevar o estilo artístico de sua maneira única.",
        list_1_1: "Pintamos luzes e sombras dentro das texturas e usamos luzes/sombras reais para unir tudo.",
        list_1_2: "Confiamos em técnicas internas de propagação de luz em vez de efeitos materiais complexos.",
        list_1_3: "Aplicamos um conjunto seletivo de shaders: Bloom, Profundidade de Campo e Oclusão de Ambiente.",
        img_3_caption: "Renderizador interno aprimorando a estética voxel",
        section_2_title: "CRIANDO MODELOS PARA HYTALE - COMEÇANDO!",
        s2_sub_1_title: "Plugin Blockbench",
        s2_sub_1_text: "Para te ajudar a construir modelos, estamos lançando um plugin Blockbench feito sob medida para as necessidades da nossa engine. Isso ajuda a manter proporções de pixel consistentes e formatos de exportação corretos.",
        btn_download: "Baixar Blockbench",
        btn_plugin: "Obter Plugin Hytale",
        img_4_caption: "Plugin Hytale rodando no Blockbench",
        s2_sub_2_title: "Nossas Restrições Geométricas",
        s2_sub_2_text: "Ao criar modelos, usamos apenas 2 primitivas:",
        cubes: "CUBOS",
        cubes_sides: "6 Lados",
        quads: "QUADS",
        quads_sides: "2 Lados",
        s2_sub_2_p2: "Sem edge loops, sem topologia especial, sem triângulos, pirâmides. Isso garante que todos os modelos sejam fáceis de fazer, mapear e animar, e não exigem um diploma em Arte 3D para começar!",
        img_5_caption: "Restrições geométricas simples",
        s2_sub_3_title: "As Proporções Hytale",
        s2_sub_3_text: "Os corpos dos personagens estão longe de ser realistas. São pequenos, robustos e cartunescos. Isso apoia o estilo cartunesco e 'chunky' usado em todos os outros elementos do jogo. Similarmente, blocos e móveis são como brinquedos e têm formas puras e icônicas.",
        callout_2_label: "Não esqueça:",
        callout_2_text: "Esferas não são permitidas!",
        img_6_caption: "Exemplo de hierarquia de nodes do jogador",
        s2_sub_4_title: "Quantos Triângulos Ponho no Meu Modelo?",
        s2_sub_4_text: "Trabalhamos da forma mais simples possível, depois aumentamos levemente a geometria e contagem de polígonos quando necessário para melhorar a silhueta. Isso também é por razões de performance.",
        img_7_caption: "Exemplos de geometria otimizada",
        s2_sub_5_title: "Qual Tamanho Minhas Texturas Devem Ter?",
        s2_sub_5_text: "Texturas podem não ser quadradas e devem ser múltiplos de 32px (32, 64, 96, 128, etc.).",
        tex_card_1_title: "Personagem / Anexo",
        tex_card_1_desc: "Cosmético, Ferramenta, Arma, Comida",
        tex_card_2_title: "Prop / Bloco",
        tex_card_2_desc: "Todo o resto (cubos, móveis)",
        img_8_caption: "Comparação de densidade de textura",
        s2_sub_5_note: "*Maior densidade para personagens permite detalhes na pele, tatuagens, maquiagem, movimento de olhos e boca.",
        img_9_caption: "Texturas detalhadas de persongens vs blocos do mundo",
        img_10_caption: "Expressões faciais habilitadas por maior densidade",
        section_3_title: "TÉCNICAS AVANÇADAS",
        s3_sub_1_title: "Esticando!",
        s3_sub_1_text: "Permitimos esticar a geometria (e pixels!) para fazer ajustes finos ou evitar Z-fighting.",
        callout_3_label: "Limite:",
        callout_3_text: "Evite ir abaixo de 0.7X e acima de 1.3X de estiramento para manter a consistência visual.",
        img_12_caption: "Esticando pixels em ação",
        s3_sub_2_title: "Qual Pincel Devo Usar?",
        s3_sub_2_text: "Use qualquer software de pintura! Photoshop, Gimp, Clip Studio, Affinity, Krita, Blockbench ou Procreate.",
        list_2_1_label: "Pincel Lápis (opacidade on):",
        list_2_1_desc: "Para detalhes.",
        list_2_2_label: "Pincel redondo suave (pressão de opacidade):",
        list_2_2_desc: "Para suavizar superfícies e criar volume.",
        img_13_caption: "Demonstração do fluxo de pintura",
        s3_sub_3_title: "Escolhendo Boas Cores",
        s3_sub_3_text: "Evite branco puro e preto puro. Tendemos a adicionar cor em nossas sombras - elas nunca são puramente dessaturadas. Por exemplo, um toque de roxo nas sombras torna um modelo mais vibrante.",
        img_14_caption: "Seleção de paleta de cores",
        s3_sub_4_title: "Modo de Sombreamento e Material",
        s3_sub_4_text: "Se você está trabalhando em um personagem, recomendamos desativar sombras laterais no Blockbench para evitar efeitos de borda dura em volumes orgânicos.",
        img_15_caption: "Comparação de modos de sombreamento",
        img_16_caption: "Detalhes de material",
        img_17_caption: "Resultado final da renderização",
        btn_start: "Começar a Modelar"
    }
};

