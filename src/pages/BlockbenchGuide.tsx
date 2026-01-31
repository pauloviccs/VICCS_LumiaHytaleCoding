import { motion } from 'framer-motion';
import { FluidCard, FluidButton } from '@/components/ui/FluidDesign';
import { ExternalLink, Paintbrush, Box, Layers, Info, Ruler, Triangle, Globe, Sparkles } from 'lucide-react';

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
                            Official Guide
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            An Introduction to<br />Making Models for <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-primary to-blue-500">Hytale</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
                            Master the art of Hytale's unique visual style. From blocky proportions to hand-painted textures.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Intro Content */}
            <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed">
                    Hytale is a vast game containing many universes and themes. You could be visiting Orbis, end up in minigames shooting aliens, or riding dinosaurs in a prehistoric world!
                </p>
                <p className="text-gray-400">
                    No matter what you see in-game, we aim at building a consistent and emblematic art style across all game modes and media we craft (Concept art, UI, Modelling, Animation, VFX, Level Design) and a lot of thought has been put into it. We want players to feel like what they are experiencing is part of the same universe: the world of Hytale.
                </p>
            </div>

            <GuideSection title="ONE ART STYLE TO BIND THEM ALL">
                <GuideImage src="/assets/blockbench/banner_1.jpg" caption="The unifying art style of Hytale" fullWidth />

                <GuideSubSection title="Hytale Art Style">
                    <p className="text-xl italic text-gray-400 border-l-2 border-white/20 pl-4 my-4">
                        "A modern, stylized voxel game, with retro pixel-art textures"
                    </p>
                    <p>
                        Hytale art style was born of a combination of influences. By fully leveraging modern game engine capabilities while preserving the charm of our old-school pixel art, we are at the intersection of low-definition pixel art and hand-painted 3D.
                    </p>
                </GuideSubSection>

                <GuideSubSection title="The Art Pillars">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                        <FluidCard className="border-white/10 hover:border-liquid-primary/30">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                                <Globe size={20} className="text-green-400" /> Immersive
                            </h4>
                            <p className="text-sm text-gray-400">
                                We aspire to make our world feel alive. Wind blows in the leaves. Creatures wander around. Clouds travel and let light pierce through. The world reacts to the player.
                            </p>
                        </FluidCard>
                        <FluidCard className="border-white/10 hover:border-liquid-primary/30">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                                <Sparkles size={20} className="text-purple-400" /> Fantasy
                            </h4>
                            <p className="text-sm text-gray-400">
                                Hytale is deeply Fantasy. Our Art style remains recognizable and consistent across universes. Each character has a unique personality and twist.
                            </p>
                        </FluidCard>
                        <FluidCard className="border-white/10 hover:border-liquid-primary/30">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                                <Paintbrush size={20} className="text-pink-400" /> Stylized
                            </h4>
                            <p className="text-sm text-gray-400">
                                Simplicity is key. Our models aim to be iconic and easily identifiable. We carefully select which parts of the geometry to preserve and which to discard.
                            </p>
                        </FluidCard>
                        <FluidCard className="border-white/10 hover:border-liquid-primary/30">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                                <Box size={20} className="text-yellow-400" /> Flexible
                            </h4>
                            <p className="text-sm text-gray-400">
                                Models are composed of primitive shapes like cubes and quads. Easy to understand, easy to make yours!
                            </p>
                        </FluidCard>
                    </div>
                    <GuideImage src="/assets/blockbench/banner_2.jpg" caption="The 4 Art Pillars in action" />
                </GuideSubSection>

                <GuideSubSection title="The Hytale Renderer">
                    <p>
                        The game wouldn't look as great without the technology bringing everything together. Our engine is designed to run efficiently on older computers, prioritizing speed to allow playability for as many people as possible.
                    </p>
                    <Callout icon={Layers}>
                        We aren't using the industry standard PBR workflows (roughness, normal maps, displacement, etc) - it is really tailored to elevate the art style in its unique way.
                    </Callout>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>We paint lights and shadows inside textures and use real lights/shadows to bring everything together.</li>
                        <li>We rely on in-house light propagation techniques instead of complex material effects.</li>
                        <li>We apply a selective set of shaders: Bloom, Depth of Field, and Ambient Occlusion.</li>
                    </ul>
                    <GuideImage src="/assets/blockbench/banner_3.jpg" caption="In-house renderer enhancing the voxel aesthetic" />
                </GuideSubSection>
            </GuideSection>

            <GuideSection title="MAKING MODELS FOR HYTALE - GETTING STARTED!">
                <GuideSubSection title="Blockbench Plugin">
                    <p>
                        To help you build models, we are releasing a Blockbench plugin tailored to our engine's needs. This helps maintain consistent pixel ratios and correct export formats.
                    </p>
                    <div className="flex gap-4 my-4 flex-wrap">
                        <FluidButton variant="primary" className="gap-2" onClick={() => window.open('https://www.blockbench.net/', '_blank')}>
                            <ExternalLink size={16} /> Download Blockbench
                        </FluidButton>
                        <FluidButton variant="secondary" className="gap-2" onClick={() => window.open('https://www.blockbench.net/plugins/hytale_plugin', '_blank')}>
                            <Box size={16} /> Get Hytale Plugin
                        </FluidButton>
                    </div>
                </GuideSubSection>
                <GuideImage src="/assets/blockbench/banner_4.jpg" caption="Hytale Plugin running in Blockbench" />

                <GuideSubSection title="Our Geometry Constraints">
                    <p>When making models, we only use 2 primitives:</p>
                    <div className="flex gap-8 justify-center my-8">
                        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                            <Box size={48} className="mx-auto mb-3 text-liquid-primary" />
                            <div className="font-bold text-white">CUBES</div>
                            <div className="text-sm text-gray-500">6 Sides</div>
                        </div>
                        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                            <Layers size={48} className="mx-auto mb-3 text-purple-400" />
                            <div className="font-bold text-white">QUADS</div>
                            <div className="text-sm text-gray-500">2 Sides</div>
                        </div>
                    </div>
                    <p>
                        No edge loops, no special topology, no triangles, pyramids. This ensures all models are easy to make, unwrap, and animate, and don't require a 3D Art degree to get started!
                    </p>
                    <GuideImage src="/assets/blockbench/banner_5.jpg" caption="Simple geometry constraints" />
                </GuideSubSection>

                <GuideSubSection title="The Hytale Proportions">
                    <p>
                        The character bodies are far from realistic. They are small, bulky, and cartoony. This supports the cartoony, chunky style used in every other element of the game. Similarly, blocks and furniture are "toylike" and have pure and iconic shapes.
                    </p>
                    <Callout icon={Ruler}>
                        <strong>Don't forget:</strong> No spheres allowed!
                    </Callout>
                    <GuideImage src="/assets/blockbench/banner_6.jpg" caption="Example of player node hierarchy" />
                </GuideSubSection>

                <GuideSubSection title="How Many Triangles Do I Put In My Model?">
                    <p>
                        We work as simply as possible, then slightly increase geometry and polygon count when needed to improve the silhouette. This is also for performance reasons.
                    </p>
                    <GuideImage src="/assets/blockbench/banner_7.jpg" caption="Optimized geometry examples" />
                </GuideSubSection>

                <GuideSubSection title="What Size Should My Textures Be?">
                    <p>
                        Textures can be non-square and must be multiples of 32px (32, 64, 96, 128, etc.).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="p-4 bg-liquid-primary/10 border border-liquid-primary/30 rounded-lg">
                            <h4 className="font-bold text-white mb-1">Character / Attachment</h4>
                            <p className="text-sm text-gray-400">Cosmetic, Tool, Weapon, Food</p>
                            <div className="text-2xl font-mono text-liquid-primary mt-2">64px / unit</div>
                        </div>
                        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <h4 className="font-bold text-white mb-1">Prop / Block</h4>
                            <p className="text-sm text-gray-400">Everything else (cubes, furniture)</p>
                            <div className="text-2xl font-mono text-purple-400 mt-2">32px / unit</div>
                        </div>
                    </div>
                    <GuideImage src="/assets/blockbench/banner_8.jpg" caption="Texture density comparison" />
                    <p className="text-sm text-gray-400 italic mt-2">
                        *Higher density for characters allows for details on skin, tattoos, makeup, eye and mouth motion.
                    </p>
                    <GuideImage src="/assets/blockbench/banner_9.jpg" caption="Detailed character textures vs world blocks" />
                    <GuideImage src="/assets/blockbench/banner_10.png" caption="Facial expressions enabled by higher density" />
                </GuideSubSection>
            </GuideSection>

            <GuideSection title="ADVANCED TECHNIQUES">
                <GuideSubSection title="Stretching!">
                    <p>
                        We allow stretching geometry (and pixels!) to do fine adjustments or avoid Z-fighting.
                    </p>
                    <Callout icon={Triangle}>
                        <strong>Limit:</strong> Avoid going under 0.7X and over 1.3X stretch to keep the visual consistency.
                    </Callout>
                    <GuideImage src="/assets/blockbench/banner_12.gif" caption="Stretching pixels in action" />
                </GuideSubSection>

                <GuideSubSection title="Which Brush Should I Use?">
                    <p>
                        Use any painting software! Photoshop, Gimp, Clip Studio, Affinity, Krita, Blockbench or Procreate.
                    </p>
                    <ul className="space-y-2 mt-4">
                        <li className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-liquid-primary rounded-full" />
                            <strong>Pencil brush (opacity on):</strong> For details.
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-liquid-primary rounded-full" />
                            <strong>Round soft brush (opacity pressure):</strong> For softening surfaces and creating volume.
                        </li>
                    </ul>
                    <GuideImage src="/assets/blockbench/banner_13.gif" caption="Painting workflow demonstration" />
                </GuideSubSection>

                <GuideSubSection title="Picking Good Colors">
                    <p>
                        Avoid pure white and pure black. We tend to add color in our shadows - they are never purely desaturated. For example, a hint of purple in the shadows makes a model more vibrant.
                    </p>
                    <GuideImage src="/assets/blockbench/banner_14.gif" caption="Color palette selection" />
                </GuideSubSection>

                <GuideSubSection title="Shading Mode and Material">
                    <p>
                        If you are working on a character, we recommend disabling side shadows in Blockbench to avoid hard edge effects on organic volumes.
                    </p>
                    <GuideImage src="/assets/blockbench/banner_15.jpg" caption="Shading modes comparison" />
                    <div className="grid grid-cols-2 gap-4">
                        <GuideImage src="/assets/blockbench/banner_16.jpg" caption="Material details" />
                        <GuideImage src="/assets/blockbench/banner_17.jpg" caption="Final render result" />
                    </div>
                </GuideSubSection>
            </GuideSection>

            <div className="flex justify-center pt-12 border-t border-white/10">
                <FluidButton variant="primary" className="px-8 py-4 text-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Box className="mr-2" /> Start Modeling
                </FluidButton>
            </div>
        </div>
    );
};
