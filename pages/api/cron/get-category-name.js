import axios from "axios";
import { initCategory } from "./save-category-name";
const { WILD_API, SERVER_URL } = process.env;

export default async function handler(req, res) {
  const CategoryNames = await initCategory();
  if (req.method === "GET") {
    try {
      const category = await CategoryNames.find({}).sort({ categoryName: 1 });

      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
