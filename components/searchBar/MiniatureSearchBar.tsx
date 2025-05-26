import React from 'react';
import {Faction, ReleaseWave} from "../../typings";
import Search from "./Search";
import {FactionSelect} from "./FactionSelect";
import {ReleaseWaveSelect} from "./ReleaseWaveSelect";

interface miniatureSearchBarProps {
    factions: Faction[],
    releaseWaves: ReleaseWave[],
    searchFilter: string | undefined,
    factionFilter: string | undefined,
    releaseWaveFilter: string | undefined,
}

export function MiniatureSearchBar({
                              searchFilter,
                              factions,
                              releaseWaves,
                              factionFilter,
                              releaseWaveFilter,
                          }: miniatureSearchBarProps) {

    return (
        <div
            className='flex flex-col lg:flex-row justify-center items-center p-2 space-y-4 lg:space-y-0 lg:space-x-10 w-full xl:w-2/3'>
            <Search searchFilter={searchFilter} type={"miniature"}/>
            <FactionSelect filterObject={factions} searchFilter={searchFilter} releaseWaveFilter={releaseWaveFilter}/>
            <ReleaseWaveSelect filterObject={releaseWaves} searchFilter={searchFilter} factionFilter={factionFilter}/>
        </div>
    )
}

