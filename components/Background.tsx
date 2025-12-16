import React from 'react';

export const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 select-none pointer-events-none">
            {/* Base Color */}
            <div className="absolute inset-0 bg-[#2E0014]" />
            
            {/* Vignette Effect - escurece os cantos e foca no centro */}
            <div 
                className="absolute inset-0" 
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.7) 85%, rgba(0, 0, 0, 0.9) 100%)'
                }}
            />
        </div>
    );
};