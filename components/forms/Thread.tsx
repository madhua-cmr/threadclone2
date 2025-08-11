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

import {userValidation} from "@/lib/validations/user";

import {Textarea} from "@/components/ui/textarea";

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

export default  function Thread(){
    const pathname= usePathname()
    const router=useRouter();
    const form=useForm({
        resolver:zodResolver(userValidation),
        defaultValues:{

        }
    })

    async function onSubmit(values: z.infer<typeof userValidation>) {





        console.log(values)
    }

  return(  <>

          <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


            <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Bio
                        </FormLabel>
                        <FormControl>
                            <Textarea  placeholder="Your bio" rows={10}  {...field}   className="resize-none no-focus" />
                        </FormControl>
<FormMessage/>
                    </FormItem>
                )}
            />

            <Button type="submit">Submit</Button>
        </form>
    </Form>
      </>

)
}