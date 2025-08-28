"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import Image from "next/image";
import {addCommentToThreaad, addCommentToThread} from "@/lib/actions/thread.actions";
import {usePathname} from "next/navigation";
interface Props{
    threadId:string;
    currentUserImg:string;
    currentUserId:string;

}
const formSchema = z.object({
   comment: z.string().min(2),
})

export default  function CommentForm({threadId,currentUserImg,currentUserId}:Props){
    const pathname= usePathname();
    // 1. Define your form.

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
await addCommentToThread(threadId,values.comment,JSON.parse(currentUserId),pathname)
    form.reset();
        console.log(values)
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 items-center flex gap-4  mt-16  border-t border-b border-slate-900 w-full">
               <div className="flex-1"><FormField

                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-4 w-full ">
                            <FormLabel>
                                <div className="w-[50px] h-[50px]">
                                <Image src={currentUserImg||"/user.png"} alt="profile" className="w-full h-full object-cover rounded-full" width={50} height={50}/>
                                </div>
                            </FormLabel>
                            <FormControl>
                                <Input  type="text" placeholder="Comment here" {...field}  className=" flex-1 border-none ring-0  focus-visible:ring-0 focus:outline-none  focus:ring-0 "/>
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               </div>
                <Button type="submit" className="rounded-full ">Reply</Button>
            </form>
        </Form>
    )
}
