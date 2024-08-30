import Image from "next/image";

function MiniCollectionIcon() {
    return (
        <div className='flex flex-row'>
            <Image src="/icon.png" width="50" height="50" alt="logo" className="w-8 lg:w-16"/>
        </div>
    )
}

export default MiniCollectionIcon