import fs from "fs";
import path from "path";

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
        `image_${contactID}.jpg`
      );

      // Check if directory exists, if not create it
      if (!fs.existsSync(path.dirname(imagePath))) {
        fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      }

      fs.writeFile(imagePath, imageData, "base64", function (err) {
        if (err) {
          console.error("Error:", err);
          return res.status(500).json({
            success: false,
            message: "Image uploading to local machine failed",
          });
        } else {
          console.log("Image saved successfully at:", imagePath);
          return res
            .status(200)
            .json({ success: true, message: "Image uploaded successfully" });
        }
      });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
