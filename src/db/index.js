import mongoose, { connect } from "mongoose";
import {DB_NAME} from "./constants.js";

const connectDB= async()=>{
  try {
    //we can store the connection as well in some variables
   const ConnectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
   console.log(`\n mongoDB connected !! DB HOST: ${ConnectionInstance.connection.host}`);
  }
  catch(error)
  {
    console.error("Error", error);
    //can also use exit method given offered process
    process.exit(1);
  }
}

export default connectDB;