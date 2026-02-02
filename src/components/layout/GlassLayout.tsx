import React from 'react';

interface GlassLayoutProps {
    children: React.ReactNode;
}

export const GlassLayout: React.FC<GlassLayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-transparent text-white selection:bg-liquid-primary/30 font-sans">
            {/* Animated Orbs/Aurora */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-liquid-accent/20 blur-[120px] animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-liquid-primary/20 blur-[120px] animate-float [animation-delay:2s]" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="fixed inset-0 z-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Scanline/Noise Overlay (Optional, keep subtle) */}
            <div className="fixed inset-0 z-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Content */}
            <main className="relative z-10 flex flex-col min-h-screen">
                {children}
            </main>
        </div>
    );
};
