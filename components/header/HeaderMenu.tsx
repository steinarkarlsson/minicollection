function HeaderMenu() {
    return (
        <div className='flex flex-row w-full lg:text-2xl space-x-10 justify-center'>
            <a href='/'>Home</a>
            <a href='/miniatures'>Miniatures</a>
            <a href='/sets'>Sets</a>
            <p className='text-gray-500'>Terrain</p>
            <h2 className='text-gray-500'>Print</h2>
            <p>|</p>
            <p className='text-gray-500'>About</p>
            <p className='text-gray-500'>Contact</p>
        </div>
    )
}

export default HeaderMenu;