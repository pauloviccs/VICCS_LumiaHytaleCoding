import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps, Transition } from 'framer-motion';

// iOS-style Spring Physics
const springTransition: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 15,
    mass: 1
};

const tapScale = 0.95;
const hoverScale = 1.02;

// --- Fluid Button ---
interface FluidButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
}

export const FluidButton = React.forwardRef<HTMLButtonElement, FluidButtonProps>(
    ({ children, className = '', variant = 'primary', ...props }, ref) => {

        const baseStyles = "relative px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 overflow-hidden";

        let variantStyles = "";
        switch (variant) {
            case 'primary':
                variantStyles = "bg-liquid-primary text-black hover:bg-white shadow-[0_0_20px_rgba(0,243,255,0.3)]";
                break;
            case 'secondary':
                variantStyles = "bg-white text-black hover:bg-gray-200";
                break;
            case 'glass':
                variantStyles = "bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/30";
                break;
            case 'ghost':
                variantStyles = "bg-transparent text-gray-400 hover:text-white hover:bg-white/5";
                break;
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: hoverScale }}
                whileTap={{ scale: tapScale }}
                transition={springTransition}
                className={`${baseStyles} ${variantStyles} ${className}`}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

// --- Fluid Card ---
interface FluidCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

export const FluidCard = React.forwardRef<HTMLDivElement, FluidCardProps>(
    ({ children, className = '', ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={springTransition}
                className={`glass-card p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-liquid-primary/30 transition-colors ${className}`}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

// --- Fluid Container (for Lists) ---
export const FluidContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        layout
        className={className}
        transition={springTransition}
    >
        {children}
    </motion.div>
);
