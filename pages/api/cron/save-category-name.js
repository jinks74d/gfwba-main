import axios from "axios";
const { WILD_API } = process.env;
import mongoose from "mongoose";
import connectDB from "@/components/lib/mongoDB";

export const initCategory = async () => {
  let CategoryNamesModel;
  await connectDB();

  if (mongoose.models.CategoryNames) {
    CategoryNamesModel = mongoose.model("CategoryNames");
  } else {
    const categoryNameSchema = new mongoose.Schema({
      categoryId: { type: String },
      categoryName: { type: String },
      createdAt: { type: Date, default: Date.now },
    });

    CategoryNamesModel = mongoose.model("CategoryNames", categoryNameSchema);
  }

  return CategoryNamesModel;
};

export const CategoryNames = await initCategory();

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
    throw error; // throw the error to handle it further
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const token = await getToken();

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

      const contactsData = response.data.Contacts;

      for (let i = 0; i < contactsData.length; i++) {
        const fieldValues = contactsData[i].FieldValues;

        if (fieldValues && fieldValues[47]?.Value) {
          for (let fieldValue of fieldValues[47].Value) {
            if (fieldValue && fieldValue.Label) {
              const existingCategoryName = await CategoryNames.findOne({
                categoryId: fieldValue.Id,
              });
              const existingCategoryNames = await CategoryNames.findOne({
                categoryName: fieldValue.Label,
              });
              if (existingCategoryName && !existingCategoryNames) {
                if (existingCategoryName.categoryName !== fieldValue.Label) {
                  existingCategoryName.categoryName = fieldValue.Label;
                  await existingCategoryName.save(); // Save the updated category name
                }
              } else {
                if (!existingCategoryNames) {
                  // Create new category name record
                  const newCategoryName = new CategoryNames({
                    categoryId: fieldValue.Id,
                    categoryName: fieldValue.Label,
                  });
                  await newCategoryName.save();
                }
              }
            }
          }
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
