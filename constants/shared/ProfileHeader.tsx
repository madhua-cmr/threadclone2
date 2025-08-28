import Image from "next/image";

interface Props{
    accountId:string;
    authUserId :string;
    name :string;
    username :string;
    imgUrl :string;
    bio :string;
}

export default function ProfileHeader(
    {
        accountId,
        authUserId,
        name,
        username,
        imgUrl,
        bio
    }  :Props

){
    return(
        <>
            <section>
                <div className="flex gap-4 items-center mb-[20px] ">
                <div className="w-[80px] h-[80px] ">
                    <Image src={imgUrl} alt="profile" width={80} height={80} className="rounded-full w-full h-full object-cover"/>

                </div>
                <div>
                    <h2>{name}</h2>
                    <p>@{username}</p>
                </div>
                </div>
                <h3>{bio}</h3>
            </section>
        </>
    )
}