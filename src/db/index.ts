
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.MONGODB_URI

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${url}/translensebackendtask`)
        console.log(`MongoDB connected succesfully!! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection FAILED !! : ", error);
        process.exit(1)  //process is an inbuilt method of node, we can exit from different exit codes
        
    }
    
    
}


export default dbConnect