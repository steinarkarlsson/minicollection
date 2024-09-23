'use client'

import { useEffect, useState } from 'react';
import Spinner from "./Spinner";
import MiniCard from "./MiniCard";
import { getFigureGridInfo } from '../lib/sanityQueries';
import { Faction, DetailedFigure, ReleaseWave } from '../types';
import { createClient } from "../utils/supabase/client";
import { useDebounce } from 'use-debounce';

console.log('createClient()')
const supabase = createClient();

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
    const [displayedFigures, setDisplayedFigures] = useState<Awaited<ReturnType<typeof getFigureGridInfo>>>([]);
    const [ownedFigures, setOwnedFigures] = useState<{ id: string, quantity: number }[]>([]);
    const [count, setCount] = useState<number>(32);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visibleCards, setVisibleCards] = useState<number>(0);

    const [debouncedOwnedFigures] = useDebounce(ownedFigures, 10);

    useEffect(() => {
        const fetchOwnedFigures = async () => {
            console.log('GRID await Supabase getUser')
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                console.log('GRID await Supabase get collection')
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
        const updateDatabase = async () => {
            console.log('GRID await Supabase getUser')
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                console.log('GRID await Supabase update collection')
                await supabase
                    .from('collection')
                    .update({ owned: debouncedOwnedFigures })
                    .eq('user_id', user.id);
            }
        };

        updateDatabase();
    }, [debouncedOwnedFigures]);

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

    const handleUpdateOwnedFigures = (itemId: string, operation: 'add' | 'remove') => {
        setOwnedFigures(prevOwnedFigures => {
            const itemIndex = prevOwnedFigures.findIndex((item: { id: string }) => item.id === itemId);

            let updatedOwnedFigures;
            if (itemIndex !== -1) {
                if (operation === 'add') {
                    updatedOwnedFigures = prevOwnedFigures.map((item, index) =>
                        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else if (operation === 'remove') {
                    updatedOwnedFigures = prevOwnedFigures.map((item, index) =>
                        index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
                    ).filter(item => item.quantity > 0);
                }
            } else {
                if (operation === 'add') {
                    updatedOwnedFigures = [...prevOwnedFigures, { id: itemId, quantity: 1 }];
                } else {
                    updatedOwnedFigures = prevOwnedFigures; // Return the previous state if no changes
                }
            }

            return updatedOwnedFigures || prevOwnedFigures;
        });
    };

    return (
        <>
            {isLoading ? <Spinner/> :
                releaseWaves.map((releaseWave) => (
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