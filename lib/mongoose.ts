import mongoose from "mongoose";
let isConnected=false;
export const connectDB=async()=>{

    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URI){return;}
    if(isConnected){
        console.log("MongoDB already connected");

    }
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Connected successfully.");

    }
    catch(err:any){
        console.error(err.message);
    }


}
