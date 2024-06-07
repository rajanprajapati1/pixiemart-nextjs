import mongoose from "mongoose";

const MongooseConnection = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB Connection Already Exists");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connection Established");
  } catch (err) {
    console.error("Something went wrong while connecting to MongoDB", err);
  }
};

export { MongooseConnection };
