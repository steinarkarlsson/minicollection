import Image from 'next/image'
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {useState, useEffect} from "react";

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

    return <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <div className="flex items-center space-x-2 md:space-x-10">
            <p>Mini Collection</p>

            <ul className="hidden space-x-4 md:flex">
                <li className="headerLink">Home</li>
                <li className="headerLink">Miniatures</li>
                <li className="headerLink">Sets</li>
                <li className="headerLink">Terrain</li>
                <li className="headerLink">My Collection</li>
            </ul>
        </div>
        <div>
            <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline"/>

            <p className="hidden lg:inline"></p>

                <Image
                    src="/default-profile-picture.png"
                    alt="Profile Image"
                    width="25"
                    height="25"
                    className="rounded-full"/>
        </div>
    </header>
}

export default Header