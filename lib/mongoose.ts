import mongoose from "mongoose";

export const connectDB=async()=>{
    const isConnected=false;
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URI){return;}
    if(isConnected){
        console.log("MongoDB already connected");

    }
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected successfully.");

    }
    catch(err:any){
        console.error(err.message);
    }


}
