import {GridFigure} from "../typings";
import MiniCard from "./MiniCard";
import {useEffect, useState} from 'react';
import {getFigureGridInfo} from '../lib/sanityQueries';

interface MiniCardGridProps {
    figures: GridFigure[]
    searchFilter: string
    factionFilter: string
    releaseWaveFilter: string
}

function useScrollToEnd(callback: () => void) {
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            const botttomPosition = document.documentElement.scrollHeight - window.innerHeight - 50;

            if (currentPosition >= botttomPosition) {
                callback()
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
}


function MiniCardGrid({releaseWaveFilter, searchFilter, factionFilter}:MiniCardGridProps) {
    const [displayedFigures, setDisplayedFigures] = useState<GridFigure[]>([])
    const [count, setCount] = useState<number>(32)

    useEffect(() => {
        getFigureGridInfo(searchFilter, factionFilter, releaseWaveFilter, count).then((figures) => {
            setDisplayedFigures(figures)
        })
    }, [count]);

    useScrollToEnd(() => {
        setCount(prevCount => prevCount + 32)
    })

    return (
                    <div className="flex flex-wrap justify-center">
                        {displayedFigures.map((figure) => (
                            <MiniCard figure={figure} key={
                                figure.mainName + figure.releaseWave?.name
                            }/>
                        ))}
                    </div>
    )
}

export default MiniCardGrid