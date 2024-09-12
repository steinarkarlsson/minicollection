'use client'
import { Faction, DetailedFigure, ReleaseWave } from "../types";
import MiniCard from "./MiniCard";
import { useEffect, useState } from 'react';
import { getFigureGridInfo } from '../lib/sanityQueries';
import { createClient } from "../utils/supabase/client";

interface MiniCardGridProps {
    figures: DetailedFigure[];
    searchFilter: string;
    factionFilter: string;
    releaseWaveFilter: string;
    ownedFilter: string;
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

function MiniCardGrid({ releaseWaveFilter, searchFilter, factionFilter, ownedFilter, releaseWaves }: MiniCardGridProps) {
    const [displayedFigures, setDisplayedFigures] = useState<DetailedFigure[]>([]);
    const [ownedFigures, setOwnedFigures] = useState<{ id: string, quantity: number }[]>([]);
    const [count, setCount] = useState<number>(32);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visibleCards, setVisibleCards] = useState<number>(0);

    const supabase = createClient();

    useEffect(() => {
        const fetchOwnedFigures = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: collection } = await supabase
                    .from('collection')
                    .select('owned')
                    .eq('user_id', user.id)
                    .maybeSingle();
                if (collection) {
                    setOwnedFigures(collection.owned);
                }
            }
        };
        fetchOwnedFigures();
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
        setCount(prevCount => prevCount + 6);
    }, isLoading);

    const handleUpdateOwnedFigures = async (itemId: string, operation: 'add' | 'remove') => {
        const itemIndex = ownedFigures.findIndex((item: { id: string }) => item.id === itemId);

        let updatedOwnedFigures;
        if (itemIndex !== -1) {
            // Item exists
            if (operation === 'add') {
                // Increase the quantity
                updatedOwnedFigures = ownedFigures.map((item: { id: string, quantity: number }, index: number) =>
                    index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else if (operation === 'remove') {
                // Decrease the quantity
                updatedOwnedFigures = ownedFigures.map((item: { id: string, quantity: number }, index: number) =>
                    index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
                ).filter((item: { id: string, quantity: number }) => item.quantity > 0);
            }
        } else {
            // Item does not exist, add it to the array
            if (operation === 'add') {
                updatedOwnedFigures = [...ownedFigures, { id: itemId, quantity: 1 }];
            } else {
                console.error('Item not found in collection');
                return;
            }
        }

        setOwnedFigures(updatedOwnedFigures);

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase
                .from('collection')
                .update({ owned: updatedOwnedFigures })
                .eq('user_id', user.id);
        }
    };

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
                                    figure.releaseWave?.name === releaseWave.name ?
                                        <div key={figure.mainName + releaseWave.name + figure._id} className={`${index < visibleCards ? 'fade-in' : 'opacity-0'}`}>
                                            <MiniCard
                                                figure={figure}
                                                key={figure.mainName + releaseWave.name + figure._id}
                                                isOwned={ownedFigures.some(item => item.id === figure._id)}
                                                quantity={ownedFigures.find(item => item.id === figure._id)?.quantity || 0}
                                                onUpdateOwnedFigures={handleUpdateOwnedFigures}/>
                                        </div>
                                        : null
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