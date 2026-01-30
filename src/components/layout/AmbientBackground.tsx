import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = [
    '/assets/backgrounds/background_7.jpg',
    '/assets/backgrounds/background_8.jpg',
    '/assets/backgrounds/background_9.jpg'
];

export function AmbientBackground() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % backgrounds.length);
        }, 15000); // Cycle every 15 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
            {/* Overlay Gradient for consistency */}
            <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />

            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={backgrounds[index]}
                        alt="Ambient Background"
                        className="w-full h-full object-cover opacity-70 filter blur-[6px] scale-105"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
