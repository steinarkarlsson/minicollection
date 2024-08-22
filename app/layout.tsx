import '../styles/globals.css'
import Header from "../components/header/Header";
import Footer from "../components/Footer";

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
            <main className="flex-grow mt-20 s lg:mx-48 lg:mx-3/4 space-y-2 md:space-y-5 p-4 lg:space-y-20 border-2 border-yellow-200">
                {children}
            </main>
          <Footer/>
        </div>
        </body>
        </html>

    )
}
