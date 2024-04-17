import fs from "fs";
import path from "path";
import { promisify } from "util";
const writeFileAsync = promisify(fs.writeFile);

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
      const imagePath = path.join(
        process.cwd(),
        "public",
        "contacts-image",
        `image_${contactID}.jpg`
      );

      // Print current directory
      console.log("Current directory:", process.cwd());

      await writeFileAsync(imagePath, imageData, "base64");

      console.log("Image saved successfully at:", imagePath);
      return res
        .status(200)
        .json({ success: true, message: "Image uploaded successfully" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        success: false,
        message: "Image uploading to local machine failed",
        error: error.message,
      });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
