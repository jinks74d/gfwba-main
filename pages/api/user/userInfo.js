import axios from 'axios';
import { Buffer } from 'buffer';

export default function handler(req, res) {
    // require('dotenv').config()
    const { WILD_API, WILD_CLIENT_ID, WILD_CLIENT_SECRET, USER_EMAIL, USER_PASSWORD } = process.env
    // console.log(req.body)

    const getAccount = () => {
        const { token, id } = req.body
        // console.log('start', accessToken);
        console.log('line 12: ', token)
        axios
            .get(`https://api.wildapricot.com/v2.1/accounts/220017/contacts/${id}?$async=false`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const accounts = response.data;
                // console.log(accounts);
                let profile = { accounts, token }
                res.status(200).json(profile);
            })
            .catch((error) => {
                console.error('Error retrieving accounts:', error);
            });
    };

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

            console.log('--LINE 48: success--', response.data.access_token)
            let accessToken = response.data.access_token;
            // Do something with the access token
            if (response.data.access_token) {
                updateAccount(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const updateAccount = (accessToken) => {
        const { token, changes, id, loggedId } = req.body;
        console.log('line 62: ', changes, id, loggedId)
        // let data = { 'test': 'pending', 'leave': 'ok' };
        console.log(id == loggedId)
        if (id == loggedId) {
            // "if" statements to identify which fields were updated
            if (Object.keys(changes).length === 0) {
                console.log('The object is empty');
            } else {
                changes.Id = `${id}`
                console.log('line 71: ', changes.FieldValues[0].Value)
                console.log(changes, `https://api.wildapricot.org/v2/Accounts/191317/Contacts/${id}`);
                axios
                    .put(`https://api.wildapricot.org/v2.2/accounts/191317/contacts/${id}`, changes, {
                        headers: {
                            'User-Agent': 'MySampleApplication/0.1',
                            Accept: 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                    .then((response) => {
                        const accounts = response.data;
                        // console.log(accounts);
                        if (changes.Password) {
                            var critChange = true
                        } else if (changes.Email) {
                            var critChange = true
                        } else { var critChange = false }
                        let profile = { accounts, critChange, token }
                        res.status(200).json(profile);
                    })
                    .catch((error) => {
                        console.error('Error retrieving accounts:', error);
                    });
                // console.log(`response: ${original.FirstName}, ${original.LastName}, ${original.Status}`)
                // res.status(200).json(original)
            }
        }
    };

    if (req.method === 'POST') {
        // Process a POST request
        console.log('trigger', req.method)
        getAccount()
    } else if (req.method === 'PUT') {
        console.log('trigger', req.method)
        // updateAccount()
        getToken()
    } else {
        // Handle any other HTTP method
        console.log('trigger', req.method)
        // getToken()
        res.status(200).json(([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
    }
}