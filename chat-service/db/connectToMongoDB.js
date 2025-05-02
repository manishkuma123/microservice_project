import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = "mongodb+srv://manishpdotpitchtechnologies:DYJasKWtNkvM07Tb@cluster0.iqmhgcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongoDB;
