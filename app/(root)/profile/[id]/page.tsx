import {fetchUser} from "@/lib/actions/user.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import ProfileHeader from "@/constants/shared/ProfileHeader";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import {profileTabs} from "@/constants";
import ThreadsTab from "@/constants/shared/ThreadsTab";

export default async function Profile({params}:{id:string}){
    const user=await currentUser();
    if(!user)
    return null;
    console.log(params.id);
    const userInfo=await fetchUser(params.id);
    //console.log(userInfo);
   if(!userInfo?.onboarded) redirect('/onboarding')
    return(
        <>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}

            />
            <div className="mt-9 ">
    <Tabs defaultValue="threads" className={"w-full "}>
        <TabsList className="w-full ">
            {profileTabs.map((tab=>(

                <TabsTrigger key={tab.label} value={tab.value} className="p-4">
                    <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                    <p className="max-sm:hidden">{tab.label}</p>
                    {tab.label==="Threads"&&(
                        <p className="p-1 bg-slate-200 rounded-2xl">
                            {userInfo?.threads.length}
                        </p>
                    )}
                </TabsTrigger>

            )))}
        </TabsList>
        {profileTabs.map((tab)=>(
            <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full">
                <ThreadsTab
                    currentUserId={user.id}
                    accountId={userInfo.id}
                    accountType="User"/>
            </TabsContent>
        ))}
    </Tabs>
            </div>
        </>
    )
}
