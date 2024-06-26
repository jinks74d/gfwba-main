import axios from 'axios';
import { Buffer } from 'buffer';

export default function handler(req, res) {
    // require('dotenv').config()
    const { WILD_API, WILD_CLIENT_ID, WILD_CLIENT_SECRET } = process.env
    let accessToken = '';
    // console.log(req.params)
    console.log('line 9: ', req.query)

    const getToken = async () => {
        try {
            const apiKey = 'YOUR_API_KEY';
            const authHeader = `Basic ${Buffer.from(`APIKEY:${WILD_API}`).toString('base64')}`;

            const response = await axios.post(
                'https://oauth.wildapricot.org/auth/token',
                'grant_type=client_credentials&scope=auto',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: authHeader,
                    },
                }
            );

            accessToken = response.data.access_token;
            // console.log('success', accessToken)
            // Do something with the access token
            if (response.data.access_token) {
                getEvent(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const getEvent = (token) => {
        console.log('start', accessToken == token);
        console.log('line 41: ', req.query.id)
        axios
            .get(`https://api.wildapricot.com/v2.2/accounts/191317/events/${req.query.id}?$async=false`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const event = response.data;
                // Do something with the event
                axios
                    .get(`https://api.wildapricot.com/v2.2/accounts/191317/eventregistrations?eventId=${req.query.id}&includeDetails=true&includeWaitlist=false&async=false`, {
                        headers: {
                            'User-Agent': 'MySampleApplication/0.1',
                            Accept: 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response2) => {
                        event.registrations = response2.data
                        console.log('line 63: ', event);
                        res.status(200).json(event);
                    })
                console.log(event);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error retrieving event:', error);
            });
    };

    // const getLogo = (img_url, token) => {
    //     // Fetch image data with authorization
    //     const imageResponse = await fetch(img_url, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });

    //     const imageData = await imageResponse.blob();

    //     return {
    //         props: {
    //             imageData,
    //         },
    //     };
    // };

    if (req.method === 'POST') {
        // Process a POST request
    } else {
        // Handle any other HTTP method
        // console.log('trigger', accessToken)
        getToken()
        // res.status(200).json(([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
    }
}