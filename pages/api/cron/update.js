import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
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
        `image_${contactID}.jpg`,
        Buffer.from(imageData, "base64"),
        { access: "public" }
      );

      return res.status(200).json({
        success: true,
        message: "Image uploaded to Vercel Blob Storage",
        url: blob,
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
