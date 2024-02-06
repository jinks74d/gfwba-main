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
                getEvents(accessToken)
            }
        } catch (error) {
            // Handle any errors
            console.error('Error retrieving access token:', error);
        }
    };

    const getEvents = (token) => {
        console.log('start', accessToken);
        let currentDate = new Date().toISOString();
        console.log('-----CURRENT DATE------', currentDate)
        axios
            .get(`https://api.wildapricot.com/v2.1/accounts/191317/events?$async=true&%24filter=IsUpcoming%20eq%20true`, {
                headers: {
                    'User-Agent': 'MySampleApplication/0.1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                (console.log('triggered'))
                const events = response.data;
                function compare(a, b) {
                    if (a.EndDate < b.EndDate) {
                        return -1;
                    }
                    if (a.EndDate > b.EndDate) {
                        return 1;
                    }
                    return 0;
                }
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                };
                const options1 = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                const options2 = {
                    weekday: "long",
                    hour: 'numeric',
                    minute: 'numeric'
                };

                // console.log(events)
                let eventArr = events.Events.sort(compare);
                let event = eventArr.slice(0, 5)
                for (let i = 0; i < event.length; i++) {
                    const eventStart = new Date(event[i].StartDate);
                    const eventEnd = new Date(event[i].EndDate);
                    let startDate = eventStart.toLocaleDateString(undefined, options1);
                    let startTime = eventStart.toLocaleDateString(undefined, options2);
                    let endTime = eventEnd.toLocaleDateString(undefined, options2);
                    event[i].Date = startDate;
                    let time = `${startTime} - ${endTime}`
                    event[i].Date = startDate;
                    event[i].Time = time;
                    console.log(event[i])
                }
                let eventsArr = event.forEach((e) => {
                    const eventStart = new Date(e.StartDate);
                    const eventEnd = new Date(e.EndDate);
                    let startDate = eventStart.toLocaleDateString(undefined, options1);
                    let startTime = eventStart.toLocaleDateString(undefined, options2);
                    let endTime = eventEnd.toLocaleDateString(undefined, options2);
                    let time = `${startTime} - ${endTime}`
                    e.Date = startDate;
                    e.Time = time;
                })
                res.status(200).json(event);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error retrieving events:', error);
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