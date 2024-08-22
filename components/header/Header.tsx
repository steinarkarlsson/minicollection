import React from "react";
import Image from "next/image";
import CoffeeButton from "./CoffeeButton";

function Header() {
    return (
        <header className='fixed top-0 w-full h-20 flex flex-row justify-center items-center bg-black'>
            <Image src="/icon.png" width="60" height="60" alt="logo" className="w-10 lg:w-20"/>
            <div className="flex flex-col">
                <p className="text-md lg:text-2xl">Mini Collection</p>
                <p className="text-xs lg:text-md">A Strategy Battle Game Collectors Archive</p>
            </div>
            <CoffeeButton/>
        </header>
    )
}

export default Header