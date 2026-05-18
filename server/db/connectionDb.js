import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const mongoUrl = process.env.mongoUrl;
    const instance = await mongoose.connect(mongoUrl);
    console.log(`MongoDb Connected: ${instance.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
