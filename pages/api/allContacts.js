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
                getAccounts(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const getAccounts = (token) => {
        console.log('start', accessToken);
        axios
            // .get(`https://api.wildapricot.com/v2.1/accounts`, {
            //     headers: {
            //         'User-Agent': 'MySampleApplication/0.1',
            //         Accept: 'application/json',
            //         Authorization: `Bearer ${token}`,
            //     },
            // })
            .get(`https://api.wildapricot.com/v2.1/accounts/191317/contacts?$async=false`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const accounts = response.data;
                // const contacts = accounts.Contacts.filter(contact => contact.Status !== 'Lapsed')
                // Do something with the accounts
                // console.log(accounts);
                res.status(200).json(accounts);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error retrieving accounts:', error);
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