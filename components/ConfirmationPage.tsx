import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Logo } from './Logo';

export const ConfirmationPage: React.FC = () => {
    return (
        <motion.div 
            className="flex flex-col items-center justify-center w-full min-h-screen text-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col items-center space-y-12 max-w-lg w-full">
                {/* Brand Logo Small */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-8"
                >
                    <Logo className="h-16 md:h-20 w-auto" />
                </motion.div>

                {/* Success Icon */}
                <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.8, delay: 0.4 }}
                    className="relative"
                >
                    <div className="w-20 h-20 rounded-full border border-nude/20 flex items-center justify-center bg-nude/5 backdrop-blur-sm">
                        <Check className="w-8 h-8 text-nude" />
                    </div>
                    <div className="absolute inset-0 rounded-full border border-nude/10 animate-[ping_2s_ease-in-out_infinite]" />
                </motion.div>

                {/* Text Content */}
                <div className="space-y-6">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-serif text-nude italic"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        Attendance Confirmed
                    </motion.h1>
                    
                    <motion.div 
                        className="h-px w-24 bg-gradient-to-r from-transparent via-nude/30 to-transparent mx-auto"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ delay: 0.7 }}
                    />

                    <motion.p 
                        className="text-nude/70 text-xs md:text-sm font-light leading-relaxed tracking-wide max-w-xs mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        We look forward to celebrating the new era of VYVRA with you. 
                        Additional details and your exclusive QR code will be sent to your email shortly.
                    </motion.p>
                </div>

                {/* Footer */}
                <motion.footer 
                    className="absolute bottom-10 w-full flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-nude/40 font-medium">
                        Exclusive Access • Limited Spots
                    </p>
                </motion.footer>
            </div>
        </motion.div>
    );
};