
import {ThreadCard} from "@/components/cards/ThreadCard";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchUser} from "@/lib/actions/user.actions";
import {fetchThreadById} from "@/lib/actions/thread.actions";
import CommentForm from "@/components/forms/CommentForm";

export default async  function Thread({params}:{params:{
    id:string
    }}){
    const user=await currentUser();

if(!user)return null;

const userInfo=await fetchUser(user.id);

if(!userInfo.onboarded){redirect("/onboarding")}

    if(!params.id)return null;
   const thread=await fetchThreadById(params.id);
    return(
        <section className="relative">
            <div>
            <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id||""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                createdAt={thread.createdAt}
                community={thread.community}
                comments={thread.children}
                isComment={thread.parentId!=null}
            />
            </div>
            <div>
                <div>

                   <CommentForm threadId={thread.id} currentUserImg={userInfo.image} currentUserId={JSON.stringify(userInfo._id)}/>
                </div>
                {thread.children.length>0&&(
                    thread.children.map(async(child)=> {
                            const childinfo = await fetchThreadById(child.id);
                          return <ThreadCard
                                key={childinfo._id}
                                id={childinfo._id}
                                currentUserId={childinfo?.id || ""}
                                parentId={childinfo.parentId}
                                content={childinfo.text}
                                author={childinfo.author}
                                createdAt={childinfo.createdAt}
                                community={childinfo.community}
                                comments={childinfo.children}
                                isComment={childinfo.parentId!=null}
                            />
                        }
                    )
                )}
            </div>

        </section>
    )

}
