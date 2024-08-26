'use client'
import {GridFigure, ReleaseWave, Set} from "../typings";
import {useEffect, useState} from 'react';
import DetailsModal from './detailsModal/DetailsModal';
import ItemCard from "./ItemCard";
import {getFigureGridInfo} from "../lib/sanityQueries";

interface GridProps {
    type: 'miniature' | 'set' | 'terrain' | 'print'
    items: GridFigure[] | Set[]
    searchFilter: string
    releaseWaves: ReleaseWave[]
    factionFilter: string
    releaseWaveFilter: string
}

function useScrollToEnd(callback: () => void, isLoading: boolean) {
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            const botttomPosition = document.documentElement.scrollHeight - window.innerHeight - 50;

            if (currentPosition >= botttomPosition && !isLoading) {
                callback()
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isLoading])
}

function Grid({items, releaseWaves}: GridProps) {
    const [displayedItems, setDisplayedItems] = useState([])
    const [count, setCount] = useState<number>(32)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useScrollToEnd(() => {
        setCount(prevCount => prevCount + 6)
    }, isLoading)

    return (
        <>
            {releaseWaves.map((releaseWave) => (
                <>
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
                </>
            ))}
            <DetailsModal/>
        </>
    )
}

export default Grid;