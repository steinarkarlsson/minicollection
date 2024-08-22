import Image from "next/image";

function MiniCollectionIcon() {
    return (
        <div className='flex flex-row border-2'>
            <Image src="/icon.png" width="60" height="60" alt="logo" className="w-10 lg:w-20"/>
            <div className="flex flex-col">
                <p className="text-md lg:text-2xl">Mini Collection</p>
                <p className="text-xs lg:text-md">A Strategy Battle Game Collectors Archive</p>
            </div>
        </div>
    )
}

export default MiniCollectionIcon