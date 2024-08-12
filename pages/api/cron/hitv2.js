import axios from "axios";
import { Buffer } from "buffer";
import mongoose from "mongoose";
import connectDB from "@/components/lib/mongoDB";
import { put } from "@vercel/blob";

const { WILD_API, SERVER_URL, BLOB_READ_WRITE_TOKEN } = process.env;

export const initContactImageModel = async () => {
  let ContactImage;
  await connectDB();

  if (mongoose.models.ContactImage) {
    ContactImage = mongoose.model("ContactImage");
  } else {
    const contactImageSchema = new mongoose.Schema({
      wildapricotUserId: { type: String, required: true },
      vercelBolbUrl: { type: String },
      wildapricotUrl: { type: String },
      profileUpdatedDate: { type: Date },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date },
    });

    ContactImage = mongoose.model("ContactImage", contactImageSchema);
  }

  return ContactImage;
};

export const ContactImage = await initContactImageModel();

const getToken = async () => {
  try {
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

    return response.data.access_token;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const token = await getToken();
    console.log("token", token);
    console.log("contact", ContactImage);

    //Getting response from third party API
    try {
      const response = await axios.get(
        `https://api.wildapricot.com/v2.1/accounts/191317/contacts?$async=false&%24filter=Status%20eq%20'Active'`,
        {
          headers: {
            "User-Agent": "MySampleApplication/0.1",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   contactsData[i].FieldValues[49].Value.Url
      const contactsData = response.data.Contacts;

      console.log("TOTAL LENGTH", contactsData?.length);

      for (let i = contactsData.length - 1; i >= 0; i--) {
        const existingImage = await ContactImage.findOne({
          wildapricotUserId: contactsData[i].Id,
        });
        if (contactsData[i].FieldValues[49].Value.Url) {
          const imageName = contactsData[i].FieldValues[49].Value.Id;
          if (
            existingImage &&
            parseInt(existingImage?.wildapricotUserId) ===
              contactsData[i]?.Id &&
            existingImage?.wildapricotUrl !==
              contactsData[i]?.FieldValues[49]?.Value?.Url
          ) {
            //incase if there is any change in the data !
            console.log(
              "DATA UPDATE CHANGE REQUIRED ::",
              contactsData[i]?.FieldValues[49]?.Value?.Url
            );
            const imageResponse = await axios.get(
              contactsData[i].FieldValues[49].Value.Url,

              {
                responseType: "arraybuffer",
                headers: {
                  "User-Agent": "MySampleApplication/0.1",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const blob = await put(
              `${contactsData.Id}.jpg`,
              Buffer.from(imageResponse.data, "binary"), // Convert arraybuffer to Buffer
              { access: "public" }
            );

            // console.log("blob", blob);
            existingImage.vercelBolbUrl = blob.url;
            existingImage.updatedAt = Date.now();
            existingImage.wildapricotUrl =
              contactsData[i]?.FieldValues[49]?.Value?.Url;

            console.log(await existingImage.save());
          } else if (!existingImage) {
            const imageResponse = await axios.get(
              contactsData[i].FieldValues[49].Value.Url,
              {
                responseType: "arraybuffer",
                headers: {
                  "User-Agent": "MySampleApplication/0.1",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // console.log("Image Response ::", imageResponse);

            const blob = await put(
              `${contactsData.Id}.jpg`,
              Buffer.from(imageResponse.data, "binary"), // Convert arraybuffer to Buffer
              { access: "public", token: BLOB_READ_WRITE_TOKEN }
            );
            const newImage = new ContactImage({
              wildapricotUserId: contactsData[i].Id,
              wildapricotUrl: contactsData[i].FieldValues[49].Value.Url,
              vercelBolbUrl: blob.url,
              updatedAt: Date.now(),
            });
            await newImage.save();
          }
        } else {
          console.log(
            "Field data dont have value",
            contactsData[i]?.FieldValues[49]
          );
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
