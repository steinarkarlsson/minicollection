import React from "react";
import Image from "next/image";
import CoffeeButton from "./CoffeeButton";
import MiniCollectionIcon from "./MiniCollectionIcon";
function Header() {
    return (
        <header className='fixed top-0 w-full h-20 flex flex-row justify-center items-center bg-black border-2'>
            <MiniCollectionIcon/>
            <CoffeeButton/>
        </header>
    )
}

export default Header