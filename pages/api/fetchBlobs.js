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
                getBlobs(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const getBlobs = async (token) => {
        const { img } = req.body
        console.log('start', accessToken);
        const response = await fetch(`${img}?$async=false`, {
            headers: {
                'User-Agent': 'MySampleApplication/0.1',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        const blob = await response.blob();
        console.log(blob)
        // blob.arrayBuffer().then((buf) => {
        //     res.send(Buffer.from(buf))
        // })
        res.status(200).send(blob);
        // axios
        // .get(`${img}?$async=false`, {
        //     headers: {
        //         'User-Agent': 'MySampleApplication/0.1',
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${token}`,
        //     },
        // })
        // .then((response) => {
        // console.log(response)
        // const imgBlob = response.data;
        // const contacts = accounts.Contacts.filter(contact => contact.Status !== 'Lapsed')
        // Do something with the accounts
        // console.log(typeof imgBlob);
        // res.status(200).send(imgBlob);
        // })
        // .catch((error) => {
        // Handle any errors
        // console.error('Error retrieving memberships:', error);
        // });
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