import { initContactImageModel } from "./hit";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    console.log("wildapricotUserId", id);
    const ContactImage = await initContactImageModel();
    const existingContact = await ContactImage.findOne({
      wildapricotUserId: id, // Use id directly from the router.query
    });

    if (existingContact && existingContact.vercelBolbUrl) {
      res.status(200).json({
        status: true,
        message: "success",
        wildapricotUrl: existingContact.vercelBolbUrl,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "not found",
      });
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
}
