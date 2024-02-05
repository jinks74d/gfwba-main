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
        // console.log('start', accessToken);
        axios
            .get(`https://api.wildapricot.com/v2.2/accounts/191317/contacts?%24async=false&%24filter=Status%20eq%20'Active'`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },

            })
            .then((response) => {
                const accounts = response.data;
                // Do something with the accounts
                // console.log(typeof accounts);
                // accounts.Contacts.forEach(contact => {
                //     if (contact.FieldValues[49].Value !== '') {
                //         let image = contact.FieldValues[49].Value.Url
                //         getDataBlob(image);
                //         async function getDataBlob(url) {
                //             var res = await fetch(`${url}?%24async=false`, {
                //                 headers: {
                //                     'User-Agent': 'MySampleApplication/0.1',
                //                     Accept: 'application/json',
                //                     Authorization: `Bearer ${token}`,
                //                 },

                //             });
                // var blob = await res.blob();
                //     contact.FieldValues[49].Blob = blob
                // res.send(blob);
                // console.log('77: ', image, blob);
                // }
                // }
                // async function parseURI(d) {
                //     var reader = new FileReader();
                //     reader.readAsDataURL(d);
                //     return new Promise((res, rej) => {
                //         reader.onload = (e) => {
                //             res(e.target.result);
                //         };
                //     });
                // }
                // })
                res.status(200).send(accounts);
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