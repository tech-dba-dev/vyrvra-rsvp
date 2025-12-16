import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Ticket, ArrowRight, Loader2 } from 'lucide-react';
import { RSVPFormData, GUEST_OPTIONS } from '../types';
import { FormLogo } from './FormLogo';

interface RSVPFormProps {
    onClose: () => void;
    onSubmit: (data: RSVPFormData) => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState<RSVPFormData>({
        fullName: '',
        email: '',
        guests: '1'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<RSVPFormData>>({});

    const validate = (): boolean => {
        const newErrors: Partial<RSVPFormData> = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            // Artificial delay to show loading state
            setTimeout(() => {
                onSubmit(formData);
            }, 1500);
        }
    };

    return (
        <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="w-full max-w-md bg-wine border border-nude/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden relative"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-nude/40 hover:text-nude transition-colors p-2 z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 md:p-10 space-y-8">
                    <div className="text-center space-y-2 flex flex-col items-center">
                        <FormLogo className="h-8 w-auto mb-2" />
                        <div className="h-px w-12 bg-nude/20 mx-auto my-3" />
                        <p className="text-xs tracking-[0.2em] text-nude/60 italic font-serif">Exclusive Access</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-nude/60 font-medium ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-nude/40 group-focus-within:text-nude transition-colors">
                                    <User className="w-4 h-4" />
                                </div>
                                <input 
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    placeholder="Enter your full name"
                                    className={`w-full bg-nude/5 border ${errors.fullName ? 'border-red-400/50' : 'border-nude/10'} rounded-lg py-3 pl-10 pr-4 text-sm text-nude placeholder:text-nude/20 focus:outline-none focus:border-nude/40 focus:bg-nude/10 transition-all`}
                                />
                            </div>
                            {errors.fullName && <p className="text-[10px] text-red-300 ml-1">{errors.fullName}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-nude/60 font-medium ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-nude/40 group-focus-within:text-nude transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="Enter your email address"
                                    className={`w-full bg-nude/5 border ${errors.email ? 'border-red-400/50' : 'border-nude/10'} rounded-lg py-3 pl-10 pr-4 text-sm text-nude placeholder:text-nude/20 focus:outline-none focus:border-nude/40 focus:bg-nude/10 transition-all`}
                                />
                            </div>
                            {errors.email && <p className="text-[10px] text-red-300 ml-1">{errors.email}</p>}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full relative group overflow-hidden bg-nude text-wine rounded-lg py-4 mt-4 shadow-[0_0_20px_-5px_rgba(234,222,218,0.1)] transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(234,222,218,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <span className="font-semibold text-xs tracking-[0.2em] uppercase">Confirm RSVP</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};