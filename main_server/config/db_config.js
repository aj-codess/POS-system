import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connect_db=async()=>{

    try{

        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch(error){

        console.error("MongoDB Connection Error:", err);

        process.exit(1);

    }

};

export default connect_db;