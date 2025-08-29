import Image from "next/image";
import Link from "next/link";
import {formatDateString} from "@/lib/utils";


interface Props{
    id:string;
    currentUserId:string;
    parentId:string|null;
    content:string;
    author:{
        name:string;
        image:string;
        id:string;
    };
    community:{
        id:string;
        name:string;
        image:string;
    }|null;
    createdAt:string;
    comments:{
        author:{
            image:string;

        }[]
        isComment?:boolean;
    }



}
export async function ThreadCard({
                                     id,
                                     currentUserId,
                                     parentId,
                                     content,
                                     author,
                                     community,
                                     createdAt,
                                     comments,
    isComment
                                 }: Props
) {

    return (
        <>
            <article className={`flex w-full gap-3 rounded-xl  p-7 ${isComment?"px-0 bg-black xs:px-7":' bg-slate-900'} `}>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="rounded-full w-11 h-11 bg-blue-400 ">
                        <Link href={`/profile/${author.id}`} >
                        <Image src={author?.image||"/user.png"} alt="profile" width={50} height={50} className="h-full w-full object-cover rounded-full"/>
                        </Link>
                    </div>
                    <div className="h-full min-h-10 flex-1 w-[2px] bg-slate-400">

                    </div>
                </div>
                <div className="flex flex-col gap-3 ">
                    <Link href={`/profile/${author.id}`} >
                    <h1>{author?.name}</h1>
                    </Link>
                    <h2>
                        {content}
                    </h2>
       <div className="flex gap-4 ">
           <Image src={"/assets/heart-gray.svg"} alt={"like"} width={30} height={30} />
           <Link href={`/thread/${id}`}>
           <Image src={"/assets/reply.svg"} alt={"comment"} width={30} height={30}/>
           </Link>
           <Image src={"/assets/repost.svg"} alt={"forward"} width={30} height={30}/>
           <Image src={"/assets/share.svg"} alt={"share"} width={30} height={30}/>
       </div>
                </div>
                {isComment&&comments.length>0&&(
<Link href={`/thread/${id}`}>
    <p className="mt-1 ">{comments.length} replies </p>

</Link>
                )}



                {!isComment&&community&&(
                    <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
                        <p >
                            {
                                formatDateString(createdAt)

                            }
                            -
                            {community.name} Community
                        </p>
                        <Image src={community.image} alt="community profile " width={14} height={14} className={"ml-1 rounded-full object-cover"}/>
                    </Link>
                )}

            </article>
        </>
    )
}