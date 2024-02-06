import axios from 'axios';
import { Buffer } from 'buffer';

export default function handler(req, res) {
    // require('dotenv').config()
    const { WILD_API, WILD_CLIENT_ID, WILD_CLIENT_SECRET } = process.env
    let accessToken = '';

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
                getEvents(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const getEvents = (token) => {
        console.log('start', accessToken);
        let currentDate = new Date().toISOString();
        console.log('-----CURRENT DATE------', currentDate)
        axios
            .get(`https://api.wildapricot.com/v2.1/accounts/191317/events?$async=true&%24filter=IsUpcoming%20eq%20true`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                (console.log('triggered'))
                const events = response.data;
                function compare(a, b) {
                    if (a.EndDate < b.EndDate) {
                        return -1;
                    }
                    if (a.EndDate > b.EndDate) {
                        return 1;
                    }
                    return 0;
                }

                // console.log(events)
                let eventArr = events.Events.sort(compare);
                let event = eventArr.slice(0, 5)
                res.status(200).json(event);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error retrieving events:', error);
            });
    };

    if (req.method === 'POST') {
        // Process a POST request
    } else {
        // Handle any other HTTP method
        // console.log('trigger', accessToken)
        getToken()
        // res.status(200).json(([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
    }
}