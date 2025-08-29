import {fetchPosts} from "@/lib/actions/thread.actions";
import {currentUser} from "@clerk/nextjs/server";
import {ThreadCard} from "@/components/cards/ThreadCard";

export default async function Home() {
    const data=await fetchPosts(1,20);
const user=await currentUser();
// console.log(data);
  return (
      <>
          <section>
              {data.posts.length===0?(<p className="flex items-center jusitfy-center ">No threads found</p>):(<div className="flex flex-col justify-center items-center gap-4">
              {
                data.posts.map((post)=>(
                    <ThreadCard
                    key={post._id}
                    id={post._id}
                    currentUserId={user?.id||""}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    createdAt={post.createdAt}
                    community={post.community}
                    comments={post.children}
                    isComment={post.parentId!=null}
                    />

                )
                )
              }</div>)}
          </section>
      </>
  );
}
