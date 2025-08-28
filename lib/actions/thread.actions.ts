"use server"
import {connectDB} from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import {revalidatePath} from "next/cache";

interface Params{
    text:string,
    author:string,
    communityId:string|null,
    path:string,
}
export async function createThread({text,author,communityId,path}:Params){

    try {
      await  connectDB();
    const createdThread=await Thread.create({
        text,
        author,
        community:null,

    })
    await User.findByIdAndUpdate(author,{
        $push:{threads:createdThread._id}
    })
    revalidatePath(path);
}
catch(err:any){
   throw new Error(`Failed to create thread ${err.message}`);
}
}


export const fetchPosts=async(pageNumber=1,pageSize=20)=>{
    try{
  await connectDB();
  const skipposts=(pageNumber-1)*pageSize;
  const posts=await Thread.find({parentId:{$in:[null,undefined]}}).sort({createdAt:'desc'}).skip(skipposts).limit(pageSize).populate({path:'author',model:User})
          .populate({
      path:'children',
          populate:{
          path:'author',
              model:User,
              select:"_id name  image"

      }});
  const totalposts=await Thread.countDocuments({parentId:{$in:[null,undefined]}})
const isNext=totalposts>skipposts+posts.length;
  return{posts,isNext}
    }catch(err:any){
       throw new Error(`Failed to fetch posts ${err.message}`);
    }

}


export async function fetchThreadById(id:string){
    await connectDB()
    try{
        const thread=await Thread.findById(id).populate({
        path:"author",
        model:User,
        select:"_id id name image"


        }).populate({
            path:'children',
            populate:[
                {
                    path:"author" ,
                    model:User,
                    select:"_id id name parentId image"

                },{
                path:'children',
                    model:Thread,
                    populate:{
                    path:'author',
                        model:User,
                        select:"_id id name parentId image"
                    }
                }
            ]
        })

            return thread;

    }
    catch(err:any){
        throw new Error(`Failed to fetch thread ${err.message}`);
    }
}


export async function addCommentToThread(
    threadId:string,
    commentText:string,
    userId:string,
    path:string
){
    connectDB();
    try{
        const originalThread=await Thread.findById(threadId);
        if(!originalThread){
            throw new Error("Thread Not found");
        }
        const newthread=new Thread({
            text:commentText,
                author:userId,
            parentId:threadId,

        })

        const savedCommentThread=await newthread.save();
        originalThread.children.push(savedCommentThread._id);
        await originalThread.save();
        revalidatePath(path);
    }catch(err:any){
        throw new Error(`Failed to addCommentToThread ${err.message}`);
    }

}

export async function fetchUserPosts(userId:string) {
    try {
        await connectDB();
        const posts = await User.findOne({id: userId}).populate(
            {
                path: 'threads',
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }

                }

            }
        )
        return posts;
    } catch (err: any) {
        throw new Error(`Failed to fetch user posts ${err.message}`);
    }

}