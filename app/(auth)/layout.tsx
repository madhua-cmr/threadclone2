import {Inter} from "next/font/google"
import "../globals.css"
import {ClerkProvider} from "@clerk/nextjs";
export const metadata = {
  title: 'ThreadForm like clone',
  description: 'Next js thread clone',
}

const inter=Inter({
  subsets:["latin"]
})
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
    <html lang="en" className={`${inter.className} bg-black`}>
      <body>
      <div>{children}
      </div>
    </body>
    </html>
      </ClerkProvider>
  )
}
