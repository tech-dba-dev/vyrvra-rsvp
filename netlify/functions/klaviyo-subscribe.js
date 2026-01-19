const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
const KLAVIYO_LIST_ID = 'V3FZ83'; // RSVP Event Vyvra

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { fullName, email, guests } = JSON.parse(event.body);

    // Validação básica
    if (!fullName || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nome e email são obrigatórios' })
      };
    }

    // Dividir nome completo em primeiro e último nome
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // 1. Criar/atualizar perfil no Klaviyo
    const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2025-01-15'
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

    // 2. Adicionar perfil à lista (isso dispara o Flow automático)
    const subscribeResponse = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2025-01-15'
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

    // 3. Track evento customizado para analytics (opcional)
    await fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2025-01-15'
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'RSVP confirmado com sucesso!',
        profileId: profileId
      })
    };

  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erro ao processar RSVP',
        details: error.message
      })
    };
  }
};
