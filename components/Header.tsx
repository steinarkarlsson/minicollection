import React, {useEffect, useState} from "react";
import Image from "next/image";

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

    return <header className={`flex justify-center ${isScrolled && 'bg-[#141414] p-1'}`}>
        <div className="flex items-center">
            <Image src="/icon.png" width="60" height="60" alt="logo" className="w-10 lg:w-20"/>
            <div className="flex flex-col">
            <p className="text-md lg:text-2xl">Mini Collection</p>
            <p className="text-xs lg:text-md">A Strategy Battle Game Collectors Archive</p>
            </div>
        </div>
    </header>
}

export default Header