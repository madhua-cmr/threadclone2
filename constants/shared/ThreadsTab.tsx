import {fetchUserPosts} from "@/lib/actions/thread.actions";
import {redirect} from "next/navigation";
import {ThreadCard} from "@/components/cards/ThreadCard";

interface Props{
    currentUserId:string;
    accountId:string;
    accountType:string;
}

export default async function ThreadsTab({currentUserId,accountId,accountType}:Props){
const result=await fetchUserPosts(accountId);
console.log(result);
if(!result){
    redirect('/');
}
    return(
        <>
<section className="p-4 flex flex-col gap-8 ">
    {result.threads?.map((thread)=>(
        <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
            accountType==="User"?{name:result.name,image:result.image,id:result.id}:{
                name:thread.author.name,image:thread.author.image,id:thread.author.id
            }
            }
            createdAt={thread.createdAt}
            community={thread.community}
            comments={thread.children}
        />
        ))
    }
</section>
        </>
    )
}