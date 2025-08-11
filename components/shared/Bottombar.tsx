"use client"
import {sidebarLinks} from "@/constants";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";

export default function Bottombar(){
    const path=usePathname()

    return (
<section className="bottom-bar">

        {sidebarLinks.map((link)=>{
            const isactive=(path.includes(link.route)&&link.route.length>1)||path===link.route?"bg-primary":"";
            //  @ts-ignore
            return (
                <div key={link.label} className={`flex flex-col gap-4 cursor-pointer`}>


                    <Link href={`/${link.route}`} className={`p-2 rounded-md flex flex-col gap-1  items-center justify-center ${isactive}`}>
                        <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                        <p className="max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
                    </Link>
                </div>

            )
        })}

</section>
    )
}