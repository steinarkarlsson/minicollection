import MiniCardGrid from "../components/MiniCardGrid";
import React from "react";
import { getFactions, getFigureGridInfo, getReleaseWaves } from "../lib/sanityQueries";
import Welcome from '../components/Welcome';
import SearchBar from '../components/SearchBar';

export default async function Home() {
    const figures = await getFigureGridInfo();
    const factions = await getFactions();
    const releaseWaves = await getReleaseWaves();

    return (
        <div className="mt-10 space-y-2 md:space-y-5 p-4">
            <Welcome />
            <SearchBar
                factions={factions}
                releaseWaves={releaseWaves}
                searchTerm=""
                selectedFaction=""
                selectedReleaseWave=""
            />
            <div className='flex flex-col'>
                <MiniCardGrid
                    figures={figures}
                    searchFilter=""
                    factionFilter=""
                    releaseWaveFilter=""
                    factions={factions}
                    releaseWaves={releaseWaves}
                />
            </div>
        </div>
    );
}