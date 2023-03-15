import Image from 'next/image'
import Link from 'next/link'
import {BellIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {useState, useEffect} from "react";

function Header() {

    const [isScrolled, setIsScrolled] = useState(false)

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
            <Image src="/ministock-logo.png"
                   width={100}
                   height={100}
                   alt="Mini Stock Logo"
                   className="cursor-pointer object-contain"/>

            <ul className="hidden space-x-4 md:flex">
                <li className="headerLink">Home</li>
                <li className="headerLink">Miniatures</li>
                <li className="headerLink">Sets</li>
                <li className="headerLink">Terrain</li>
                <li className="headerLink">My Stock</li>
            </ul>
        </div>
        <div>
            <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline"/>

            <p className="hidden lg:inline">Kids</p>

            <BellIcon className="h-6 w-6"/>

            <Link href="/account">
                <Image
                    src="/default-profile-picture.png"
                    alt="Profile Image"
                    width="25"
                    height="25"/>
            </Link>
        </div>
    </header>
}

export default Header