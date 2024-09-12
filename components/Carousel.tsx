import {DetailedFigure, Set} from "../types";
import ItemCard from "./ItemCard";
import Link from "next/link";

interface CarouselProps {
    items: DetailedFigure[] | Set[]
    type: 'figure' | 'set'
}

export default function Carousel({items, type}: CarouselProps) {

    const typeTitle = type === 'figure' ? 'Miniatures' : 'Sets (WIP)'
    const link = type === 'figure' ? '/miniatures' : '/sets'
    const itemNumber = type === 'figure' ? 4 : 3

    return (
        <div className='flex flex-col justify-center lg:justify-start'>
            <Link href={link} className='flex text-2xl m-5 lg:text-4xl text-gray-300 justify-center lg:justify-start underline hover:text-white'>Browse all {typeTitle}</Link>
            <div className='flex flex-wrap w-full justify-center lg:justify-start'>
                {items.slice(0,itemNumber).map((item) => (
                    <div key={item.mainName}>
                        <ItemCard item={item} type={type}/>
                    </div>
                ))}
            </div>
        </div>
    )
}