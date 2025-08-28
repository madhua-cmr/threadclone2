import {redirect} from "next/navigation";
import {fetchUser, getActivity} from "@/lib/actions/user.actions";
import {currentUser} from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";

const  Page=async()=>{
    const user=await currentUser();
    if(!user){
        return null;
    }
    const userInfo=await fetchUser(user.id);
    if(!userInfo?.onboarded)redirect('/onboarding')

    const activity=await getActivity(userInfo._id);

    return(
        <section >
            <h1>Activity</h1>
            <section >
                {activity.length>0?(
<div className={"flex flex-col gap-6  justify-center"}>
                    {activity.map((activity)=>(

                        <Link key={activity._id} href={`/thread/${activity.parentId}`} >
                            <article className="flex gap-4 items-center bg-slate-900 rounded-md p-2" >
                                <div className={"w-[30px] h-[30px] rounded-full"}>
                                <Image src={activity.author.image} alt={"Profile pic"} width={30} height={30} className="w-full h-full rounded-full object-cover" ></Image></div>
                                <p>
                                    <span className="text-blue-600">{activity.author.name}</span>
                                    {" "}
                                    replied to your thread
                                </p>

                            </article>
                        </Link>

                    ))}
</div>
                ):(
                    <p>No activity yet</p>
                )}
            </section>
        </section>
    )
}
export default Page
