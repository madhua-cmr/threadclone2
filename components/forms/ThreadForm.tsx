"use client"

import { zodResolver} from "@hookform/resolvers/zod"
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

import {threadValidation} from "@/lib/validations/thread";

import {Textarea} from "@/components/ui/textarea";

import User from "@/lib/models/user.model";
import {usePathname, useRouter} from "next/navigation";
import {updateUser} from "@/lib/actions/user.actions";
import {createThread} from "@/lib/actions/thread.actions";
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

export default  function ThreadForm({userId}:{userId:string}){
    const pathname= usePathname()
    const router=useRouter();
    const form=useForm({
        resolver:zodResolver(threadValidation),
        defaultValues:{
         thread:'',
            accountId:userId
        }
    })

    const  onSubmit=async(values: z.infer<typeof threadValidation>)=> {

await createThread({text:values.thread,
    author:userId,communityId:null,path:pathname
});
router.push("/")




        console.log(values)
    }

  return(  <>

          <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">


            <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                           Thread
                        </FormLabel>
                        <FormControl  className="resize-none no-focus bg-slate-900 text-white border-slate-800" >
                            <Textarea  placeholder="write thread here..." rows={15} className="p-4" {...field}   />
                        </FormControl>
<FormMessage/>
                    </FormItem>
                )}
            />

            <Button type="submit"  className="bg-primary w-full">Submit</Button>
        </form>
    </Form>
      </>

)
}