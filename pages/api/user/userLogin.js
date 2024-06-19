import axios from 'axios';
import { Buffer } from 'buffer';

export default function handler(req, res) {
    // require('dotenv').config()
    const { WILD_API, WILD_CLIENT_ID, WILD_CLIENT_SECRET, USER_EMAIL, USER_PASSWORD } = process.env
    let accessToken = '';
    let accountId = '';
    // console.log(req.body)
    const { username, password } = req.body

    const getToken = async () => {
        try {
            const authHeader = `Basic ${Buffer.from(`${WILD_CLIENT_ID}:${WILD_CLIENT_SECRET}`).toString('base64')}`;
            // console.log(`grant_type=password&username=${username}&password=${password}&scope=auto`);

            const response = await axios.post(
                'https://oauth.wildapricot.org/auth/token',
                `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&scope=auto`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: authHeader,
                    },
                }
            );

            accessToken = response.data.access_token;
            // Do something with the access token
            if (response.data.access_token) {
                getAccounts(accessToken)
            }
        } catch (error) {
            // Handle any errors
            // console.error('Error retrieving access token:', error);
            // console.log('Error retrieving access token:', error.response.data.error_description);
            res.status(401).json(error.response.data);
        }
    };

    const getAccounts = (token) => {
        // console.log('start', accessToken);
        axios
            .get(`https://api.wildapricot.com/v2.1/accounts/191317/contacts/me?$async=false`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const accounts = response.data;
                // Do something with the accounts
                // console.log(accounts);
                let profile = { accounts, token }
                res.status(200).json(profile);
                // localStorage.setItem("WAUSER", JSON.stringify(profile));
            })
            .catch((error) => {
                // Handle any errors
                // console.error('Error retrieving accounts:', error);
                res.status(401).json(error);
            });
    };

    if (req.method === 'POST') {
        // Process a POST request
        console.log('trigger')
        getToken(req)
    } else {
        // Handle any other HTTP method
        // console.log('trigger')
        // getToken()
        res.status(200).json(([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
    }
}