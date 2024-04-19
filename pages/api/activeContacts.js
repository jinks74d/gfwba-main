import axios from "axios";
import { Buffer } from "buffer";
let Count;
// const ContactImage = require("./models/contactImage");
export default async function handler(req, res) {
  // require('dotenv').config()
  const { WILD_API, WILD_CLIENT_ID, WILD_CLIENT_SECRET } = process.env;
  let accessToken = "";
  const getToken = async () => {
    try {
      const apiKey = "YOUR_API_KEY";
      const authHeader = `Basic ${Buffer.from(`APIKEY:${WILD_API}`).toString(
        "base64"
      )}`;
      const response = await axios.post(
        "https://oauth.wildapricot.org/auth/token",
        "grant_type=client_credentials&scope=auto",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: authHeader,
          },
        }
      );
      accessToken = response.data.access_token;
      // console.log('success', accessToken)
      // Do something with the access token
      if (response.data.access_token) {
        getAccounts(accessToken, req, res);
      }
    } catch (error) {
      // Handle any errors
      console.error("Error retrieving access token:", error);
    }
  };
  const getAccounts = async (token, req, res) => {
    let skip = req.query.page;
    try {
      let apiUrl = `https://api.wildapricot.com/v2.2/accounts/191317/contacts?%24async=false&%24filter=Status%20eq%20'Active'`;
      if (!Count) {
        const countResponse = await axios.get(
          `https://api.wildapricot.com/v2.2/accounts/191317/contacts?%24async=false&%24filter=Status%20eq%20'Active'&$count=true`,
          {
            headers: {
              "User-Agent": "MySampleApplication/0.1",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            timeout: 15000,
          }
        );
        Count = countResponse.data.Count;
      }
      if (skip === "0") {
        apiUrl += `&$top=10`; // Set top to 10 if skip is 0
      } else {
        skip = skip * 10;
        apiUrl += `&$skip=${skip}&$top=10`; // Set top to 10 if skip is 0
      }
      const response = await axios.get(apiUrl, {
        headers: {
          "User-Agent": "MySampleApplication/0.1",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 15000,
      });
      const accounts = response.data.Contacts;
      res.status(200).send({ Contacts: accounts, count: Count });
    } catch (error) {
      // Handle any errors
      console.error("Error retrieving accounts:", error);
      res.status(500).send("Error retrieving accounts");
    }
  };
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    // console.log('trigger', accessToken)
    await getToken();
    // res.status(200).json(([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
  }
}
