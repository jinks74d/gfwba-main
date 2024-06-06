import axios from 'axios';
import { Buffer } from 'buffer';

export default function handler(req, res) {
    const { WILD_API, WILD_CLIENT_ID, WILD_CLIENT_SECRET } = process.env
    let accessToken = '';
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
            // Do something with the access token
            if (response.data.access_token) {
                createRegistration(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const createRegistration = (token) => {
        const { registrationInfo, id } = req.body;
        console.log('start', accessToken == token);
        console.log('line 39: ', req.query.id);
        console.log('line 40: ', registrationInfo);
        let registrationData = {
            "Event": {
                "Id": id
            },
            "Contact": {
                "Id": registrationInfo.contactId
            },
            "RegistrationTypeId": registrationInfo.registrationType,
            "IsCheckedIn": false,
            "RegistrationFields": [
                {
                    "FieldName": "string",
                    "SystemCode": "FirstName",
                    "Value": registrationInfo.FirstName
                },
                {
                    "FieldName": "string",
                    "SystemCode": "LastName",
                    "Value": registrationInfo.LastName
                },
                {
                    "FieldName": "string",
                    "SystemCode": "Organization",
                    "Value": registrationInfo.Organization
                },
                {
                    "FieldName": "string",
                    "SystemCode": "Phone",
                    "Value": registrationInfo.Phone
                },
                {
                    "FieldName": "string",
                    "SystemCode": "Email",
                    "Value": registrationInfo.Email
                },
                {
                    "FieldName": "string",
                    "SystemCode": "custom-15246698",
                    "Value": registrationInfo.billEmail
                },
                {
                    "FieldName": "string",
                    "SystemCode": "custom-15333462",
                    "Value": registrationInfo.consent
                }
            ],
            "ShowToPublic": false,
            "RegistrationDate": new Date(),
            "Memo": "",
            "RecreateInvoice": true
        }
        axios
            .post(`https://api.wildapricot.org/v2.2/accounts/191317/eventregistrations`, registrationData, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                const event = response.data;
                // Do something with the event
                res.status(200).json(event);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error retrieving event:', error);
            });
    };

    if (req.method === 'POST') {
        // Process a POST request
        getToken()
    } else {
        // Handle any other HTTP method
        console.log(req.method)
    }
}