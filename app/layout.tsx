import '../styles/globals.css'
import Header from "../components/header/Header";
import React from "react";

export const metadata = {
    title: 'Mini Collection',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang='en'>
        <head>
            <title>Mini Collection</title>
            <link rel="icon" href="/icon.png"/>
        </head>
        <body>
        <div className='relative h-screen bg-gradient-to-b lg:h-[140vh] !h-screen'>
            <Header/>
            <main className="relative mt-20 mx-8 lg:mx-48 lg:mx-3/4 space-y-2 md:space-y-5 p-4 lg:space-y-20 border-2 border-yellow-200">
                {children}
            </main>
        </div>
        </body>
        </html>

    )
}
