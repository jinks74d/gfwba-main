import axios from 'axios';
import { Buffer } from 'buffer';
// import { getServerSideProps } from 'next';

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
                getAccounts(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const getAccounts = (token) => {
        console.log('start', accessToken == token);
        console.log('line 41: ', req.query.id)
        axios
            .get(`https://api.wildapricot.com/v2.2/accounts/191317/contacts/${req.query.id}?$async=false`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const accounts = response.data;
                // Do something with the accounts
                //     const getImage = async () => {
                //     const imageResponse = await fetch(accounts.FieldValues[49].Value.Url, {
                //         headers: {
                //             Authorization: `Bearer ${token}`,
                //         },
                //     });

                //     const imageData = await imageResponse.blob();
                // }
                // getImage()
                //     console.log(accounts);
                res.status(200).json(accounts);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error retrieving accounts:', error);
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