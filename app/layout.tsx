import '../styles/globals.css'
import Footer from "../components/Footer";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react"
import React from "react";
import Header from "../components/header/Header";

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
            <div className='flex flex-col min-h-screen justify-between bg-gradient-to-b lg:h-[140vh] !h-screen'>
                <Header/>
                <main
                    className="flex-grow mt-20 lg:mt-40 s lg:mx-48 space-y-2 md:space-y-5 p-4 lg:space-y-20">
                    {children}
                </main>
                <Footer/>
            </div>
            <Analytics/>
            <SpeedInsights/>
        </body>
        </html>

    )
}