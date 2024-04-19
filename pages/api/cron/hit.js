import axios from "axios";
import { Buffer } from "buffer";
import path from "path";
import fs from "fs";
import mongoose from 'mongoose';
import connectDB from "@/components/lib/mongoDB";

const { WILD_API, SERVER_URL } = process.env;

const initContactImageModel = () => {
  let ContactImage;

  if (mongoose.models.ContactImage) {
    ContactImage = mongoose.model('ContactImage');
  } else {
    const contactImageSchema = new mongoose.Schema({
  
        wildapricotUserId: { type: String, required: true },
        // localUrl: { type: String },
        wildapricotUrl: { type: String },
        profileUpdatedDate: { type: Date },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date }
    });

    ContactImage = mongoose.model('ContactImage', contactImageSchema);
  }

  return ContactImage;
};

const ContactImage = initContactImageModel();

const getToken = async () => {
  try {
    const authHeader = `Basic ${Buffer.from(`APIKEY:${WILD_API}`).toString("base64")}`;

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
  await connectDB();

  if (req.method === "GET") {
    const token = await getToken();
    console.log("token",token)

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

      const parentContacts = response.data.Contacts;
      const childContacts = await ContactImage.find().sort({ updatedAt: 1 });
      const newContacts = [];
      const alreadyExists = [];

      for (const parentContact of parentContacts) {
        const existingChildContact = childContacts.find(
          (childContact) => childContact.wildapricotUserId === parentContact.Id
        );

        if (!existingChildContact) {
          newContacts.push(parentContact);
        } else {
          alreadyExists.push(parentContact);
        }
      }

      const allContacts = [...newContacts, ...alreadyExists];

      for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];

        const existingImage = await ContactImage.findOne({
          wildapricotUserId: contact.Id,
        });

        if (contact.FieldValues[49]?.Value?.Url) {
          const imageName = contact.FieldValues[49].Value.Id;
          const imageResponse = await axios.get(
            contact.FieldValues[49].Value.Url,
            {
              responseType: "arraybuffer",
              headers: {
                "User-Agent": "MySampleApplication/0.1",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const imagePath = path.join(
            process.cwd(),
            'public/contacts-image',
            `${imageName}`
          );

          fs.writeFileSync(imagePath, imageResponse.data);

          if (!existingImage) {
            const newImage = new ContactImage({
              wildapricotUserId: contact.Id,
              wildapricotUrl: contact.FieldValues[49].Value.Url,
            //   localUrl: `${SERVER_URL}/contacts-image/${imageName}`,
              updatedAt: Date.now(),
            });
            await newImage.save();
          } else {
            existingImage.updatedAt = Date.now();
            // existingImage.localUrl = `${SERVER_URL}/contacts-image/${imageName}`;
            await existingImage.save();
          }
        } else {
          console.log("Field data doesn't have a value");
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
