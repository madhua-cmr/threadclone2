import {Inter} from "next/font/google"
import "../globals.css"
import {ClerkProvider} from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import LeftSidebar from "@/components/shared/LeftSidebar";
export const metadata = {
    title: 'Thread like clone',
    description: 'Next js thread clone',
}

const inter=Inter({
    subsets:["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
    <html lang="en" >

      <body
        className={`${inter.className} bg-black text-white`}
      >

      <Topbar/>
      <main className="flex flex-row">

          <LeftSidebar/>
          <section className="main-container">
              <div className=" w-full  max-w-4xl">
                  {children}
              </div>
          </section>
          <RightSidebar/>

      </main>
  <Bottombar/>
      </body>
    </html>
      </ClerkProvider>
  );
}
