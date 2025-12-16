import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { Logo } from './Logo';

interface LandingPageProps {
    onRSVPClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onRSVPClick }) => {
    return (
        <motion.div 
            className="flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto px-6 py-10 md:py-16 text-center text-nude"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex flex-col items-center max-w-2xl w-full space-y-10">
                <header className="w-full flex justify-center pb-4">
                    <motion.div 
                        className="drop-shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <Logo className="w-40 md:w-52 h-auto" />
                    </motion.div>
                </header>

                <motion.div 
                    className="space-y-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-nude/90 text-sm md:text-lg lg:text-xl font-light leading-relaxed max-w-lg mx-auto tracking-wide">
                        Celebrate the beginning of a journey. Connect with our essence and discover the power of VYVRA firsthand.
                    </p>
                    
                    <div className="pt-2 flex justify-center">
                        <button 
                            onClick={onRSVPClick}
                            className="relative group overflow-hidden bg-nude text-wine rounded-full px-8 py-4 md:px-12 md:py-5 shadow-[0_0_30px_-5px_rgba(234,222,218,0.15)] transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(234,222,218,0.4)] hover:scale-[1.02]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3 font-semibold text-[10px] md:text-xs tracking-[0.15em] uppercase whitespace-nowrap">
                                Secure My Invitation
                            </span>
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    className="w-px h-7 bg-gradient-to-b from-transparent via-nude/20 to-transparent"
                    initial={{ height: 0 }}
                    animate={{ height: 28 }}
                    transition={{ delay: 0.6 }}
                />

                <motion.div 
                    className="flex flex-col items-center w-full space-y-10 mb-40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    {/* Date Section */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-[10px] md:text-xs tracking-[0.3em] text-nude/60 uppercase">When</span>
                        <div className="flex items-center gap-4 text-lg md:text-2xl font-medium tracking-[0.1em] uppercase text-nude">
                            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-nude/80 stroke-[1.5]" />
                            <span>OCT 24 • 8PM</span>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="flex flex-col items-center gap-4 w-full max-w-md pb-16">
                        <span className="text-[10px] md:text-xs tracking-[0.3em] text-nude/60 uppercase">Where</span>
                        <div className="w-full bg-nude/5 border border-nude/10 p-1 rounded-lg backdrop-blur-sm shadow-2xl">
                            <div className="relative w-full aspect-[5/2] bg-[#2E0014]/40 rounded overflow-hidden">
                                {/* Embedded Google Map */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8282829705535!2d-0.1499!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwOCc1OS42Ilc!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk&style=feature:all|element:all|saturation:-100|lightness:20&style=feature:water|element:geometry|color:0x1a000b&style=feature:landscape|element:geometry|color:0x2E0014&style=feature:road|element:geometry|color:0x5e2a3b"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(100%) brightness(0.6)' }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-wine/80 to-transparent pointer-events-none" />
                                <div className="absolute bottom-3 left-0 right-0 z-10 flex flex-col items-center gap-2 pointer-events-none">
                                    <MapPin className="w-6 h-6 text-nude drop-shadow-lg" />
                                    <span className="text-[10px] md:text-xs tracking-widest uppercase text-nude drop-shadow-md font-semibold">
                                        Mayfair Gallery, London
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.footer 
                    className="absolute bottom-10 w-full flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-nude/40 font-medium">
                        Exclusive Access • Limited Spots
                    </p>
                </motion.footer>
            </div>
        </motion.div>
    );
};