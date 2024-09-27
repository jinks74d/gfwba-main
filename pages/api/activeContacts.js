import axios from 'axios';
import { Buffer } from 'buffer';
// const ContactImage = require("./models/contactImage");

export default async function handler(req, res) {
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
                getAccounts(accessToken, res)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const getAccounts = async (token, res) => {
        // console.log('start', accessToken);
        // axios
        //     .get(`https://api.wildapricot.com/v2.2/accounts/191317/contacts?%24async=false&%24filter=Status%20eq%20'Active'`, {
        //         headers: {
        //             'User-Agent': 'MySampleApplication/0.1',
        //             Accept: 'application/json',
        //             Authorization: `Bearer ${token}`,
        //         },
        //         timeout: 15000
        //     })
        //     .then((response) => {
        //         const accounts = response.data;
        //         console.log(accounts.Contacts[0])
        //         let contacts = accounts.Contacts;
        //         const promises = contacts.map(async (contact) => {
        //             const existingImage = await ContactImage.findOne({
        //                 wildapricotUserId: contact.Id,
        //             });
        //             console.log(existingImage)
        //             if (existingImage) {
        //                 contact.logo = existingImage;
        //                 console.log(contact.DisplayName);
        //             }
        //         });
        //         await Promise.all(promises);
        //         res.status(200).send(accounts);
        //     })

        // .catch((error) => {
        //     // Handle any errors
        //     console.error('Error retrieving accounts:', error);
        // });
        try {
            const response = await axios.get(`https://api.wildapricot.com/v2.2/accounts/191317/contacts?%24async=false&%24filter=(Status%20eq%20'Active'%20or%20Status%20eq%20'PendingRenewal')`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                timeout: 15000
            });


            const accounts = response.data;
            // console.log(accounts.Contacts[0])
            // let contacts = accounts.Contacts;
            // const promises = contacts.map(async (contact) => {
            //     const existingImage = await ContactImage.findOne({
            //         wildapricotUserId: contact.Id,
            //     }).maxTimeMS(20000);
            //     console.log(existingImage)
            //     if (existingImage) {
            //         contact.logo = existingImage;
            //         console.log(contact.DisplayName);
            //     }
            // });
            // await Promise.all(promises);
            res.status(200).send(accounts);
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving accounts:', error);
            res.status(500).send('Error retrieving accounts');
        }
    };

    if (req.method === 'POST') {
        // Process a POST request
    } else {
        // Handle any other HTTP method
        // console.log('trigger', accessToken)
        await getToken()
        // res.status(200).json(([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
    }
}