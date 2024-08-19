import {Faction, GridFigure, ReleaseWave} from "../typings";
import MiniCard from "./MiniCard";
import {useEffect, useState} from 'react';
import {getFigureGridInfo} from '../lib/sanityQueries';
import DetailsModal from './detailsModal/DetailsModal';

interface MiniCardGridProps {
    figures: GridFigure[]
    searchFilter: string
    factionFilter: string
    releaseWaveFilter: string
    factions: Faction[]
    releaseWaves: ReleaseWave[]
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

function MiniCardGrid({releaseWaveFilter, searchFilter, factionFilter, releaseWaves}: MiniCardGridProps) {
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
        <>
            {releaseWaves.map((releaseWave) => (
                <>
                    {displayedFigures.some(figure => figure.releaseWave?.name === releaseWave.name) ? (
                        <>
                            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-25 dark:via-gray-400"/>
                            <div className="text-2xl lg:text-3xl pt-5 pl-5 lg:mx-24">{releaseWave.name}</div>
                            <div className="flex flex-wrap justify-center">
                                {displayedFigures.map((figure) => (
                                    figure.releaseWave?.name === releaseWave.name ?
                                        <MiniCard figure={figure}
                                                  key={figure.mainName + figure.releaseWave?.name}/> : null
                                ))}
                            </div>
                        </>
                    ) : null}

                </>
            ))}
            <DetailsModal/>
        </>
    )
}

export default MiniCardGrid;