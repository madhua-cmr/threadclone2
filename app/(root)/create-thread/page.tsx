import ThreadForm from "@/components/forms/ThreadForm"
import {currentUser} from "@clerk/nextjs/server";
import {fetchUser} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";

export default  async function createThread(){
    const user=await currentUser();
    if(!user)return null;

    const userInfo=await fetchUser(user.id);
    const userId=userInfo._id;
if(!userInfo?.onboarded)redirect('/onboarding');
    return (
<>
    <section className="flex flex-col gap-6 "><h2 className="head-text">Create thread</h2>
    <ThreadForm userId={userId.toString()}/>
    </section>
</>

    )
}