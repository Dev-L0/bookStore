import mongoose from "mongoose";

  
const connectToDB = async () => {
  try {
   const conne = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB....");
  } catch (error) {
    console.log("Error connecting to DB.....", error.message);
    process.exit(1); //failure
  }
};



export default connectToDB;