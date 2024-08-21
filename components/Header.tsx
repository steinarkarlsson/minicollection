import React, {useEffect, useState} from "react";
import Image from "next/image";
import GoogleSignIn from './GoogleSignIn';

function Header() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handeScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener("scroll", handeScroll)

        return () => {
            window.removeEventListener('scroll', handeScroll)
        }
    }, [])

    return <header className={`flex flex-row justify-center ${isScrolled && 'bg-[#141414] p-1'}`}>
        <div className="flex items-center">
            <Image src="/icon.png" width="60" height="60" alt="logo" className="w-10 lg:w-20"/>
            <div className="flex flex-col">
                <p className="text-md lg:text-2xl">Mini Collection</p>
                <p className="text-xs lg:text-md">A Strategy Battle Game Collectors Archive</p>
            </div>
        </div>
        <div className="flex align-right ml-auto m-2">
            <div className="mx-auto">
                <div className="mx-auto text-center">
                    <div className="mt-4">
                        <img className="mx-auto h-12 transition delay-75 ease-in-out hover:scale-110"
                             src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                             alt="Buy Me a Coffee"
                             onClick={() => window.open('https://buymeacoffee.com/steinarkaro')}
                        />
                    </div>
                </div>
            </div>
        </div>
        <GoogleSignIn/>
    </header>
}

export default Header