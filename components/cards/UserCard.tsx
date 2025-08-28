"use client"
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import Image from "next/image";

interface Props{
    id:string;
    name:string;
    username:string;
    imgUrl:string;
    personType:string;

}

const UserCard=({id,name,username,imgUrl,personType}:Props)=>{
   const router=useRouter();
    return(
        <article className={"flex  gap-2 items-center w-full"}>
            <div  className="h-[48px] w-[48px] ">
                <Image src={imgUrl}
                alt="logo"
                width={48}
                height={48}
                className={"rounded-full"}/>

            </div>
            <div className="flex-1 text-ellipsis">
  <h3>{name}</h3>
                <p>@{username}</p>

            </div>
            <Button onClick={()=>{router.push(`/profile/${id}`);}} className={"bg-blue-600 rounded-2xl py-1 px-3"}>View</Button>

        </article>
    )

}
export default UserCard;
