import React from 'react';
import {Faction, ReleaseWave} from "../../types";
import Search from "./Search";
import {FactionSelect} from "./FactionSelect";
import {ReleaseWaveSelect} from "./ReleaseWaveSelect";

interface SetSearchBarProps {
    releaseWaves: ReleaseWave[],
    searchFilter: string | undefined,
    releaseWaveFilter: string | undefined,
}

export function SetSearchBar({
                              searchFilter,
                              releaseWaves,
                              releaseWaveFilter,
                          }: SetSearchBarProps) {

    return (
        <div
            className='flex flex-col lg:flex-row justify-center items-center p-2 space-y-4 lg:space-y-0 lg:space-x-10 w-full xl:w-2/3'>
            <Search searchFilter={searchFilter} type={'set'}/>
            <ReleaseWaveSelect filterObject={releaseWaves} searchFilter={searchFilter}/>
        </div>
    )
}

