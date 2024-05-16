import {useEffect, useState} from "react";

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
    </header>
}

export default Header