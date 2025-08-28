
import {currentUser} from "@clerk/nextjs/server";
import {fetchUser, fetchUsers} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import UserCard from "@/components/cards/UserCard";

const  Page=async()=>{
    const user=await currentUser();

    if(!user)return null;
    const userInfo=await fetchUser(user.id);
    if(!userInfo?.onboarded)redirect('/onboarding');
    const result=await fetchUsers({
        userId:user.id,
        searchString:'',
        pageNumber:1,
        pageSize:25
    })
    return(
        <section>
            <h1>Search</h1>
            <div>
                {result.users.length===0?(
                    <p>No User</p>
                ):(
                    <>
                    {result.users.map((user)=>(
                        <UserCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        imgUrl={user.image}
                        personType="User"/>

                    ))}
                    </>

                )}
            </div>
        </section>
    )
}
export default Page
