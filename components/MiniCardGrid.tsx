'use client'

import {useEffect, useState} from 'react';
import {Faction, FigureFull, ReleaseWave} from "../typings";
import {getFigures} from '../lib/sanityQueries';
import Card from "./Card";

interface MiniCardGridProps {
    figures: FigureFull[];
    searchFilter: string;
    factionFilter: string;
    releaseWaveFilter: string;
    factions: Faction[];
    releaseWaves: ReleaseWave[];
}

function MiniCardGrid({ releaseWaveFilter, searchFilter, factionFilter, releaseWaves }: MiniCardGridProps) {
    const [displayedFigures, setDisplayedFigures] = useState<FigureFull[]>([]);
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
        getFigures(searchFilter, factionFilter, releaseWaveFilter, count).then((figures: FigureFull[]) => {
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

    function updateCount() {
        !isLoading ? setCount(prevCount => prevCount + 6 * cardsPerRow) : null;
    }



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
                                            {/*<MiniCard figure={figure} />*/}
                                            <Card type={'miniature'} name={figure.mainName} image={figure.image} detail1={figure.releaseWave} detail2={figure.faction} id={figure._id}/>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            ))}
            <button onClick={updateCount}>See More</button>
        </>
    );
}

export default MiniCardGrid;