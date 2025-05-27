//@ts-nocheck
'use client'
import {AccessoryFull, FigureFull, PrintFull, SetFull, TerrainFull} from "../typings";
import Link from "next/link";
import Card from "./Card";

interface CarouselProps {
    items: FigureFull[] | SetFull[] | TerrainFull[] | PrintFull[] | AccessoryFull[]
    type: 'miniature' | 'set' | 'terrain' | 'print' | 'accessory'
}

export default function Carousel({items, type}: CarouselProps) {

    const typeTitle =
        type === 'miniature' ? 'Miniatures' :
            type === 'set' ? 'Sets' :
                type === 'terrain' ? 'Terrain' :
                    type === 'print' ? 'Printed Material' :
                        type === 'accessory' ? 'Accessories' :
                            null;
    const link =
        type === 'miniature' ? '/miniatures' :
            type === 'set' ? '/sets' :
                type === 'terrain' ? '/terrain' :
                    type === 'print' ? '/print' :
                        '/accessories'

    const detail1 =
        type === 'miniature' ? 'faction' : 'releaseWave'

    const detail2 =
        type === 'print' ? 'edition' : undefined;

    return (
        <div className='flex flex-col justify-start'>
            <Link href={link} className='flex text-2xl m-5 lg:text-4xl justify-center lg:justify-start underline'>Browse all {typeTitle}</Link>
            <div className='flex overflow-hidden w-full'>
                {items.slice(0, 1).map((item) => (
                    <div key={item.mainName}>
                        <Card id={item._id} type={type} name={item.mainName} image={item.image} detail1={item[detail1]} detail2={item[detail2]} />
                    </div>
                ))}
            </div>
        </div>
    );
}