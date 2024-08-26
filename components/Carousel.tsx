import {Figure, Set} from "../typings";
import ItemCard from "./ItemCard";
import Link from "next/link";

interface CarouselProps {
    items: Figure[] | Set[]
    type: 'figure' | 'set'
}

export default function Carousel({items, type}: CarouselProps) {

    const typeTitle = type === 'figure' ? 'Miniatures' : 'Sets (WIP)'
    const link = type === 'figure' ? '/miniatures' : '/sets'
    const itemNumber = type === 'figure' ? 5 : 4

    return (
        <div className='flex flex-col justify-start'>
            <Link href={link} className='flex text-2xl m-5 lg:text-4xl justify-center lg:justify-start underline'>Browse all {typeTitle}</Link>
            <div className='flex flex-wrap w-full'>
                {items.slice(0,itemNumber).map((item) => (
                    <div key={item.mainName}>
                        <ItemCard item={item} type={type}/>
                    </div>
                ))}
            </div>
        </div>
    )
}