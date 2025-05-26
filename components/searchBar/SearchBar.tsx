import React from 'react';
import {Edition, Faction, ReleaseWave} from "../../typings";
import Search from "./Search";
import {FactionSelect} from "./FactionSelect";
import {ReleaseWaveSelect} from "./ReleaseWaveSelect";
import {EditionSelect} from "./EditionSelect";

interface SearchBarProps {
    factions?: Faction[],
    releaseWaves?: ReleaseWave[],
    editions?: Edition[],
    searchFilter?: string | undefined,
    factionFilter?: string | undefined,
    releaseWaveFilter?: string | undefined,
    editionFilter?: string | undefined,
    type: 'miniature' | 'set' | 'terrain' | 'print' | 'accessory',
}

export function SearchBar({
                              searchFilter,
                              factions,
                              editions,
                              releaseWaves,
                              factionFilter,
                              releaseWaveFilter,
                            editionFilter,
    type,
                          }: SearchBarProps) {

    return (
        <div
            className='flex flex-col lg:flex-row justify-center items-center p-2 space-y-4 lg:space-y-0 lg:space-x-10 w-full xl:w-2/3'>
            <Search searchFilter={searchFilter} type={type}/>
            {factions ? <FactionSelect filterObject={factions} searchFilter={searchFilter} releaseWaveFilter={releaseWaveFilter}/> : null}
            {releaseWaves ? <ReleaseWaveSelect filterObject={releaseWaves} searchFilter={searchFilter} factionFilter={factionFilter}/> : null}
            {editions ? <EditionSelect filterObject={editions} searchFilter={searchFilter} factionFilter={factionFilter} editionFilter={editionFilter}/> : null}
        </div>
    )
}

