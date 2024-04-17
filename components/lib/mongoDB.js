import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        "mongodb+srv://umth5898:RjORsgelUCYj9f4C@cluster0.dxswetf.mongodb.net/wild-Apricot-test"
      );
      console.log("db connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
