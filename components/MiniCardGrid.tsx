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
    const [displayedFigures, setDisplayedFigures] = useState<DetailedFigure[]>([]);
    const [ownedFigures, setOwnedFigures] = useState<string[]>([]);
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
                    setOwnedFigures(collection.owned.map((item: { id: string }) => item.id));
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
        if (operation === 'add') {
            setOwnedFigures(prev => [...prev, itemId]);
        } else if (operation === 'remove') {
            setOwnedFigures(prev => prev.filter(id => id !== itemId));
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: collection } = await supabase
                .from('collection')
                .select('owned')
                .eq('user_id', user.id)
                .maybeSingle();

            if (collection) {
                let updatedOwned;
                if (operation === 'add') {
                    updatedOwned = [...collection.owned, { id: itemId, quantity: 1 }];
                } else if (operation === 'remove') {
                    updatedOwned = collection.owned.filter((item: { id: string }) => item.id !== itemId);
                }

                await supabase
                    .from('collection')
                    .update({ owned: updatedOwned })
                    .eq('user_id', user.id);
            }
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
                                                isOwned={ownedFigures.includes(figure._id)}
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