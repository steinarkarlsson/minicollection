'use client'

import { useEffect, useState } from 'react';
import { Faction, Figure, ReleaseWave } from "../typings";
import MiniCard from "./MiniCard";
import { getFigureGridInfo } from '../lib/sanityQueries';

interface MiniCardGridProps {
    figures: Figure[];
    searchFilter: string;
    factionFilter: string;
    releaseWaveFilter: string;
    factions: Faction[];
    releaseWaves: ReleaseWave[];
}

function useScrollToEnd(callback: () => void, isLoading: boolean) {
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            const bottomPosition = document.documentElement.scrollHeight - window.innerHeight - 50;

            if (currentPosition >= bottomPosition && !isLoading) {
                callback();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading]);
}

function MiniCardGrid({ releaseWaveFilter, searchFilter, factionFilter, releaseWaves }: MiniCardGridProps) {
    const [displayedFigures, setDisplayedFigures] = useState<Figure[]>([]);
    const [count, setCount] = useState<number>(32);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visibleCards, setVisibleCards] = useState<number>(0);
    const [cardsPerRow, setCardsPerRow] = useState<number>(1);

    useEffect(() => {
        const updateCardsPerRow = () => {
            const cardWidth = 200; // Adjust this value based on your card width
            const containerWidth = window.innerWidth;
            setCardsPerRow(Math.floor(containerWidth / cardWidth));
        };

        updateCardsPerRow();
        window.addEventListener('resize', updateCardsPerRow);
        return () => {
            window.removeEventListener('resize', updateCardsPerRow);
        };
    }, []);

    useEffect(() => {
        getFigureGridInfo(searchFilter, factionFilter, releaseWaveFilter, count).then((figures) => {
            setDisplayedFigures(figures);
            setIsLoading(false);
        });
    }, [count, searchFilter, factionFilter, releaseWaveFilter]);

    useEffect(() => {
        if (visibleCards < displayedFigures.length) {
            const timer = setTimeout(() => {
                setVisibleCards(visibleCards + 1);
            }, 50); // Adjust the delay as needed
            return () => clearTimeout(timer);
        }
    }, [visibleCards, displayedFigures.length]);

    useScrollToEnd(() => {
        setCount(prevCount => prevCount + 6 * cardsPerRow);
    }, isLoading);

    return (
        <>
            {releaseWaves.map((releaseWave) => (
                <div key={releaseWave.name}>
                    {displayedFigures.some(figure => figure.releaseWave?.name === releaseWave.name) ? (
                        <>
                            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-25 dark:via-gray-400" />
                            <div className="text-2xl lg:text-3xl pt-5 pl-5 lg:mx-24">{releaseWave.name}</div>
                            <div className="flex flex-wrap justify-center lg:justify-start">
                                {displayedFigures.map((figure, index) => (
                                    figure.releaseWave?.name === releaseWave.name ? (
                                        <div key={figure.mainName + releaseWave.name + figure._id} className={`${index < visibleCards ? 'fade-in' : 'opacity-0'}`}>
                                            <MiniCard figure={figure} />
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            ))}
        </>
    );
}

export default MiniCardGrid;