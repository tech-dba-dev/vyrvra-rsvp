import React, { useState } from 'react';
import { Background } from './components/Background';
import { LandingPage } from './components/LandingPage';
import { RSVPForm } from './components/RSVPForm';
import { ConfirmationPage } from './components/ConfirmationPage';
import { ViewState, RSVPFormData } from './types';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>('LANDING');
    const [formData, setFormData] = useState<RSVPFormData>({
        fullName: '',
        email: '',
        guests: '1'
    });

    const handleOpenRSVP = () => {
        setView('RSVP');
    };

    const handleCloseRSVP = () => {
        setView('LANDING');
    };

    const handleSubmitRSVP = async (data: RSVPFormData) => {
        setFormData(data);

        try {
            const response = await fetch('/api/klaviyo-subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Erro ao enviar RSVP:', result);
            } else {
                console.log('RSVP enviado com sucesso:', result);
            }

            setView('CONFIRMATION');
        } catch (error) {
            console.error('Erro na requisição:', error);
            setView('CONFIRMATION');
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden font-sans selection:bg-nude selection:text-wine">
            <Background />
            
            <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {view === 'LANDING' && (
                        <LandingPage key="landing" onRSVPClick={handleOpenRSVP} />
                    )}
                    {view === 'RSVP' && (
                        <RSVPForm 
                            key="rsvp" 
                            onClose={handleCloseRSVP} 
                            onSubmit={handleSubmitRSVP} 
                        />
                    )}
                    {view === 'CONFIRMATION' && (
                        <ConfirmationPage key="confirmation" />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default App;