import Link from "next/link";

function HeaderMenu() {
    return (
        <div className='flex flex-row w-full lg:text-2xl space-x-10 justify-center'>
            <Link href='/'>Home</Link>
            <Link href='/miniatures'>Miniatures</Link>
            <Link href='/sets'>Sets</Link>
            <p className='text-gray-500'>Terrain</p>
            <h2 className='text-gray-500'>Print</h2>
            <p className='text-gray-500'>About</p>
        </div>
    )
}

export default HeaderMenu;