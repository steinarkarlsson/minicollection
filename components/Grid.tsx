//@ts-nocheck
'use client'
import {AccessoryFull, FigureFull, PrintFull, SetFull, TerrainFull} from "../typings";
import Card from "./Card";

interface GridProps {
    type: 'miniature' | 'set' | 'terrain' | 'print' | 'accessory'
    items: FigureFull[] | SetFull[] | TerrainFull[] | PrintFull[] | AccessoryFull[]
}

export function Grid({type, items}: GridProps) {

    const detail1 =
        type === 'miniature' ? 'faction' :
            type === 'set' ? 'releaseWave' :
                type === 'print' ? 'releaseWave' :
                        null;

    const detail2 =
        type === 'miniature' ? 'releaseWave' :
            type === 'print' ? 'edition' :
                type === 'terrain' ? 'releaseWave' :
                    type === 'accessory' ? 'releaseWave' :
                    null;

    const name =
        type === 'miniature' || type === 'accessory' || type === 'set' || type === 'terrain' || type === 'print' ? 'mainName' : 'name';

    return (
        <div className="flex flex-row flex-wrap gap-6">
            {items.map((item) => (
                <Card type={type} name={item[name]} image={item.image} detail1={item[detail1]} detail2={item[detail2]} id={item._id}/>
            ))}
        </div>
    )
}