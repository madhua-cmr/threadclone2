"use server"
import {connectDB} from "@/lib/mongoose";
import {revalidatePath} from "next/cache";
import User from "@/lib/models/user.model";

interface params{
    id:string,
    username:string,

    name:string,
    image:string,
    bio:string,
    path:string}
export const updateUser=async({id,username,name,bio,image,path}:params):Promise<void>=>{
    await connectDB();
    await User.findOneAndUpdate({id},
        {
            id,
            username:username.toLowerCase(),
            name,
            image,
            bio,
            onboarded:true
        },{upsert:true})
     if(path==="/profile/edit"){
         revalidatePath(path);
     }


}
