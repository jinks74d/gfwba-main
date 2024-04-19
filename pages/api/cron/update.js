import { put } from "@vercel/blob";
import { initContactImageModel } from "./hit";

export default async function handler(req, res) {
  console.log("run");
  if (req.method === "POST") {
    try {
      const ContactImage = await initContactImageModel();
      const { contactID, image } = req.body;

      // Check if image data and contactID are provided
      if (!contactID || !image) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
      }

      const imageData = image.split(";base64,").pop(); // Extract base64 data

      // Upload image to Vercel Blob Storage
      const blob = await put(
        `${contactID}.jpg`,
        Buffer.from(imageData, "base64"),
        { access: "public" }
      );
      //console.log(await get(`${contactID}.jpg`));
      // Check if ContactImage exists with the same contactID
      console.log("ContactImage", ContactImage);
      const existingContact = await ContactImage.findOne({
        wildapricotUserId: contactID,
      });

      if (existingContact) {
        // Update existing document
        existingContact.vercelBolbUrl = blob.url;
        existingContact.profileUpdatedDate = Date.now();
        await existingContact.save();
      } else {
        // Create new document
        const newContactImage = new ContactImage({
          wildapricotUserId: contactID,
          vercelBolbUrl: blob.url,
          profileUpdatedDate: Date.now(),
        });
        await newContactImage.save();
      }

      return res.status(200).json({
        success: true,
        message:
          "Image uploaded to Vercel Blob Storage and ContactImage updated/created",
        url: { blob: blob.url, contactID },
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({
        success: false,
        message: error,
      });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
