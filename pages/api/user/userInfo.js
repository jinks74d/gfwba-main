import axios from 'axios';
import { Buffer } from 'buffer';

export default function handler(req, res) {
    // require('dotenv').config()
    const { WILD_API, WILD_CLIENT_ID, WILD_CLIENT_SECRET, USER_EMAIL, USER_PASSWORD } = process.env
    // console.log(req.body)

    const getAccount = () => {
        const { token, id } = req.body
        // console.log('start', accessToken);
        // console.log(token)
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

    const updateAccount = () => {
        const { token, changes, id } = req.body;
        // let data = { 'test': 'pending', 'leave': 'ok' };
        // "if" statements to identify which fields were updated
        if (Object.keys(changes).length === 0) {
            console.log('The object is empty');
        } else {
            // if (changes.FirstName) { original.FirstName = changes.FirstName }
            // if (changes.LastName) { original.LastName = changes.LastName }
            // if (changes.Email) { original.Email = changes.Email }
            // if (changes.Password) { original.Password = changes.Password }
            changes.Id = `${id}`

            console.log(changes, `https://api.wildapricot.org/v2/Accounts/220017/Contacts/${id}`);
            axios
                .put(`https://api.wildapricot.org/v2.2/accounts/220017/contacts/${id}`, changes, {
                    headers: {
                        'User-Agent': 'MySampleApplication/0.1',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const accounts = response.data;
                    console.log(accounts);
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
    };

    if (req.method === 'POST') {
        // Process a POST request
        console.log('trigger', req.method)
        getAccount()
    } else if (req.method === 'PUT') {
        console.log('trigger', req.method)
        updateAccount()
    } else {
        // Handle any other HTTP method
        console.log('trigger', req.method)
        // getToken()
        res.status(200).json(([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
    }
}