"use client"
import {sidebarLinks} from "@/constants";
import Link from "next/link";
import Image from "next/image";
import{usePathname,useRouter} from "next/navigation";
import {SignedIn, SignOutButton,useAuth} from "@clerk/nextjs";

export default   function LeftSidebar(){
    const path=usePathname();

    const { isLoaded, userId } = useAuth();
    console.log(userId);
    const router=useRouter();
    return (
        <section className="left-sidebar">
            <div className="flex flex-col w-full  flex-1 gap-6 px-6">
            {sidebarLinks.map((link)=>{
   const isactive=(path.includes(link.route)&&link.route.length>1)||path===link.route?"bg-primary":"";
               //  @ts-ignore
                const route:string=link.route==="/profile"?`${link.route}/${userId}`:link.route;

                if(link.route==="/profile"&&(!isLoaded||!userId))return null;


                return (
                  <div key={link.label} className={`flex gap-4 cursor-pointer`}>


                    <Link href={route} className={`left-sidebar-link ${isactive}`}>
                        <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                     <p className="max-lg:hidden">{link.label}</p>
                    </Link>
                  </div>

                )
            })}
            </div>
            <div className="mt-10 px-6 ">
                <SignedIn>
                    <SignOutButton  redirectUrl={"/sign-in"}>
                        <div className="flex cursor-pointer gap-4 p-4">
                            <Image src="/assets/logout.svg" alt="logout" width={24} height={24}/>
                            <p className="text-white max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}