import axios from 'axios';
import { Buffer } from 'buffer';

export default function handler(req, res) {
    // require('dotenv').config()
    const { WILD_API, WILD_CLIENT_ID, WILD_CLIENT_SECRET, USER_EMAIL, USER_PASSWORD } = process.env
    // console.log(req.body)

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

            console.log('success', response.data.access_token)
            let accessToken = response.data.access_token;
            // Do something with the access token
            if (response.data.access_token) {
                createAccount(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const createAccount = (accessToken) => {
        const { body } = req.body;
        // console.log('line 39: ', body)
        axios
            .post(`https://api.wildapricot.org/v2.2/accounts/191317/contacts/`, body, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                const account = response.data;
                console.log(account);
                res.status(200).json(account);
            })
            .catch((error) => {
                console.error('Error creating account:', error);
            });
        // res.status(200).json(original)
    }
    // };

    if (req.method === 'POST') {
        // Process a POST request
        console.log('trigger', req.method)
        getToken()
    } else {
        // Handle any other HTTP method
        console.log('trigger', req.method)
        // getToken()
        res.status(200).json(([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
    }
}