'use client'
import {Faction, Figure, ReleaseWave} from "../typings";
import MiniCard from "./MiniCard";
import {useEffect, useState} from 'react';
import {getFigureGridInfo} from '../lib/sanityQueries';
import DetailsModal from './detailsModal/DetailsModal';

interface MiniCardGridProps {
    figures: Figure[]
    searchFilter: string
    factionFilter: string
    releaseWaveFilter: string
    factions: Faction[]
    releaseWaves: ReleaseWave[]
    selectedFigure: Figure
}

function useScrollToEnd(callback: () => void, isLoading: boolean) {
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            const bottomPosition = document.documentElement.scrollHeight - window.innerHeight - 50;

            if (currentPosition >= bottomPosition && !isLoading) {
                callback()
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isLoading])
}

function MiniCardGrid({releaseWaveFilter, searchFilter, factionFilter, releaseWaves}: MiniCardGridProps) {
    const [displayedFigures, setDisplayedFigures] = useState<Figure[]>([])
    const [count, setCount] = useState<number>(32)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        getFigureGridInfo(searchFilter, factionFilter, releaseWaveFilter, count).then((figures) => {
            setDisplayedFigures(figures)
            setIsLoading(false);
        })
    }, [count, searchFilter, factionFilter, releaseWaveFilter]);

    useScrollToEnd(() => {
        setCount(prevCount => prevCount + 6)
    }, isLoading)

    return (
        <>
            {releaseWaves.map((releaseWave) => (
                <div key={releaseWave.name}>
                    {displayedFigures.some(figure => figure.releaseWave?.name === releaseWave.name) ? (
                        <>
                            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-25 dark:via-gray-400"/>
                            <div className="text-2xl lg:text-3xl pt-5 pl-5 lg:mx-24">{releaseWave.name}</div>
                            <div className="flex flex-wrap justify-center">
                                {displayedFigures.map((figure) => (
                                    figure.releaseWave?.name === releaseWave.name ?
                                        <MiniCard figure={figure}
                                                  key={figure.mainName + releaseWave.name + figure._id}/> : null
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            ))}
            <DetailsModal type={'figure'}/>
        </>
    )
}

export default MiniCardGrid;