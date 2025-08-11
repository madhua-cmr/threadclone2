"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {userValidation} from "@/lib/validations/user";
import Image from "next/image";
import {Textarea} from "@/components/ui/textarea";
import {ChangeEvent, useState} from "react";
import {isBase64Img} from "@/lib/utils";
import {useUploadThing } from "@/lib/uploadthing"
import User from "@/lib/models/user.model";
import {usePathname, useRouter} from "next/navigation";
import {updateUser} from "@/lib/actions/user.actions";
interface props{
    user:{
        id:string;
        objectId:string;
        username:string;
        name:string;
        bio:string;
        image:string;
    };
    btnTitle:string

}

export default function AccountProfile({user,btnTitle}:props) {
    const[files,setFiles]=useState<File[]>([])
    const pathname= usePathname()
    const router=useRouter();
   const {startUpload}=useUploadThing("media")

const form=useForm({
    resolver:zodResolver(userValidation),
    defaultValues:{
        profile_pic:user?.profile_pic||"",
        name:user?.name||"",
        username:user?.username||"",
        bio:user?.bio||""
    }
})

    const handleImage=(e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string)=>void)=>{
    e.preventDefault();
        const fileReader=new FileReader();

        if(e.target.files&&e.target.files.length>0){
            const file=e.target.files[0];

            setFiles(Array.from(e.target.files));
            if(!file.type.includes('image')){
              return;
            }

            fileReader.onload=async(event)=>{
                const imageDataUrl=event.target?.result?.toString()||'';

                fieldChange(imageDataUrl)

            }
            fileReader.readAsDataURL(file);


        }


    }


    async function onSubmit(values: z.infer<typeof userValidation>) {
try{
        const blob=values?.profile_pic;
        const hasImageChanged=isBase64Img(blob);
        if(hasImageChanged){
         const imgRes=await startUpload(files);

            if(imgRes&&imgRes[0].fileUrl){
                 values.profile_pic=imgRes[0].fileUrl;


            }
        }

        //send to backend
     await  updateUser({
         id:user.id,
         name:values.name,
         username:values.username,
         image:values.profile_pic,
         bio:values.bio,
         path:pathname

     })
        if(pathname==="/profile/edit"){
            router.back();
        }else{
            router.push("/");
        }


}catch(error){
    console.log(error)
}



    }

return(
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="profile_pic"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {field.value?(<Image  src={field.value} priority="true" alt={"profile pic"} width={49} height={49} className=" rounded-full object-contain"></Image> ):(<Image  src="/assets/profile.svg" alt={"profile pic"} width={20} height={20} className=" object-contain "></Image>)}
                        </FormLabel>
                        <FormControl>
                            <Input className="no-focus" placeholder="Upload your profile pic" type="file" accept="image/*" onChange={(e)=>{
                                handleImage(e,field.onChange)
                            }}  />
                        </FormControl>

                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input className="no-focus" placeholder="Name" type="text" {...field} />
                        </FormControl>

                    </FormItem>
                )}
            />


            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <FormControl>
                            <Input className="no-focus" placeholder="username" type="text" {...field}  />
                        </FormControl>

                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Bio
                        </FormLabel>
                        <FormControl>
                            <Textarea  placeholder="Your bio" rows={10} {...field}   className="resize-none no-focus" />
                        </FormControl>

                    </FormItem>
                )}
            />

            <Button type="submit">Submit</Button>
        </form>
    </Form>

)
}