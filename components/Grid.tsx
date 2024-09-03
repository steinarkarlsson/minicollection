'use client'
import {DetailedFigure, ReleaseWave, Set} from "../types";
import ItemCard from "./ItemCard";

interface GridProps {
    type: 'figure' | 'set'
    items: DetailedFigure[] | Set[]
    searchFilter: string
    releaseWaves: ReleaseWave[]
    factionFilter: string
    releaseWaveFilter: string
}

export default function Grid({items, releaseWaves}: GridProps) {
    return (
        <>
            {releaseWaves.map((releaseWave) => (
                <div key={releaseWave.name}>
                    {items.some(item => item.releaseWave?.name === releaseWave.name) ? (
                        <div key={releaseWave.name}>
                            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-25 dark:via-gray-400"/>
                            <div className="text-2xl lg:text-3xl pt-5 pl-5 lg:mx-24">{releaseWave.name}</div>
                            <div className="flex flex-wrap justify-center">
                                {items.map((item) => (
                                    item.releaseWave?.name === releaseWave.name ?
                                        <ItemCard
                                            item={item}
                                            type={"set"}
                                            key={item.mainName + releaseWave.name + item._id}
                                        /> : null
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}
        </>
    )
}

