import {sidebarLinks} from "@/constants";
import Link from "next/link";
import Image from "next/image";

export default function RightSidebar(){
    return (
        <section className="right-sidebar ">
            <div className="flex flex-1 flex-col w-full  justify-start ">
<h3 className="">Suggested Communities</h3>
            </div>
            <div className="flex flex-1 flex-col w-full  justify-start">
<h3>Similar like you</h3>
            </div>
        </section>
    )
}