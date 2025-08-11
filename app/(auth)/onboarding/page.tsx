import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from '@clerk/nextjs/server'

const Onboarding=async()=> {
    // @ts-ignore
    const user = await currentUser()

const userInfo=null;
const userData= {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    profile_pic: userInfo ? userInfo?.image : user?.imageUrl
}
    console.log(user?.username)
    return (
        <>
            <main className="flex  mx-auto  max-w-3xl justify-start flex-col text-white px-10 py-20">
                <h2>Onboarding</h2>
                <p>Complete your profile now to use Threads</p>
                <section className="bg-secondary mt-10 p-10 ">
                    <AccountProfile user={userData} btnTitle="Continue"/>
                </section>
            </main>
        </>
    )
}

export default Onboarding;