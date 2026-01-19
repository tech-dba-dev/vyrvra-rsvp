import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
const KLAVIYO_LIST_ID = 'V3FZ83';

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do build
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint para RSVP
app.post('/api/klaviyo-subscribe', async (req, res) => {
    try {
        const { fullName, email, guests } = req.body;

        if (!fullName || !email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios' });
        }

        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '';

        // 1. Criar/atualizar perfil no Klaviyo
        const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
            method: 'POST',
            headers: {
                'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                'Content-Type': 'application/json',
                'revision': '2024-10-15'
            },
            body: JSON.stringify({
                data: {
                    type: 'profile',
                    attributes: {
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                        properties: {
                            guests: guests || '1',
                            event_name: 'VYVRA Exclusive Event',
                            rsvp_date: new Date().toISOString(),
                            rsvp_source: 'website'
                        }
                    }
                }
            })
        });

        if (!profileResponse.ok) {
            const errorData = await profileResponse.text();
            console.error('Erro ao criar perfil:', errorData);
            throw new Error('Falha ao criar perfil no Klaviyo');
        }

        const profileData = await profileResponse.json();
        const profileId = profileData.data.id;
        console.log('Perfil criado:', profileId);

        // 2. Adicionar perfil à lista
        const subscribeResponse = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
            method: 'POST',
            headers: {
                'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                'Content-Type': 'application/json',
                'revision': '2024-10-15'
            },
            body: JSON.stringify({
                data: {
                    type: 'profile-subscription-bulk-create-job',
                    attributes: {
                        profiles: {
                            data: [{
                                type: 'profile',
                                id: profileId,
                                attributes: {
                                    email: email,
                                    subscriptions: {
                                        email: {
                                            marketing: {
                                                consent: 'SUBSCRIBED'
                                            }
                                        }
                                    }
                                }
                            }]
                        }
                    },
                    relationships: {
                        list: {
                            data: {
                                type: 'list',
                                id: KLAVIYO_LIST_ID
                            }
                        }
                    }
                }
            })
        });

        if (!subscribeResponse.ok) {
            const errorData = await subscribeResponse.text();
            console.error('Erro ao adicionar à lista:', errorData);
            throw new Error('Falha ao adicionar à lista do Klaviyo');
        }

        console.log('Inscrito na lista com sucesso!');

        // 3. Track evento customizado
        await fetch('https://a.klaviyo.com/api/events/', {
            method: 'POST',
            headers: {
                'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                'Content-Type': 'application/json',
                'revision': '2024-10-15'
            },
            body: JSON.stringify({
                data: {
                    type: 'event',
                    attributes: {
                        profile: {
                            data: {
                                type: 'profile',
                                id: profileId
                            }
                        },
                        metric: {
                            data: {
                                type: 'metric',
                                attributes: {
                                    name: 'RSVP Confirmed'
                                }
                            }
                        },
                        properties: {
                            guests: guests || '1',
                            full_name: fullName,
                            event_name: 'VYVRA Exclusive Event'
                        },
                        time: new Date().toISOString()
                    }
                }
            })
        });

        console.log('Evento rastreado com sucesso!');

        res.json({
            success: true,
            message: 'RSVP confirmado com sucesso!',
            profileId: profileId
        });

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({
            error: 'Erro ao processar RSVP',
            details: error.message
        });
    }
});

// Todas as outras rotas servem o React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
