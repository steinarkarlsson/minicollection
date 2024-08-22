import CoffeeButton from "./CoffeeButton";
import MiniCollectionIcon from "./MiniCollectionIcon";
import HeaderMenu from "./HeaderMenu";

function Header() {
    return (
        <header className='fixed top-0 w-full h-20 flex flex-row justify-center items-center bg-black border-2'>
            <MiniCollectionIcon/>
            <HeaderMenu/>
            <CoffeeButton/>
        </header>
    )
}

export default Header