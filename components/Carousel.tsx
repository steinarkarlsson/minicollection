import {GridFigure, Set} from "../typings";
import ItemCard from "./ItemCard";
import Link from "next/link";

interface CarouselProps {
    items: GridFigure[] | Set[]
    type: 'figure' | 'set'
}

export default function Carousel({items, type}: CarouselProps) {

    const typeTitle = type === 'figure' ? 'Miniatures' : 'Sets'
    const link = type === 'figure' ? '/miniatures' : '/sets'


    return (
        <div className='flex flex-col'>
            <Link href={link} className='flex text-4xl hover:decoration-90'>Browse all {typeTitle}</Link>
            <div className='flex flex-row w-full overflow-hidden'>
                {items.slice(0,5).map((item) => (
                    <div key={item.mainName}>
                        <ItemCard item={item} type={type}/>
                    </div>
                ))}
            </div>
        </div>
    )
}