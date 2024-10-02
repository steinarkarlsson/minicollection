'use client'

import {Autocomplete, TextField} from "@mui/material";
import React from "react";
import {ReleaseWave} from "../../types";
import {useRouter} from "next/navigation";

interface ReleaseWaveSelectProps {
    filterObject: ReleaseWave[],
    searchFilter: string | undefined,
    factionFilter?: string | undefined,
    releaseWaveFilter: string | undefined,
}

export function ReleaseWaveSelect({filterObject, searchFilter, factionFilter, releaseWaveFilter}: ReleaseWaveSelectProps) {

    const options = filterObject.map(e => ({label: e.name, id: e._id}));

    const router = useRouter();

    const query = `?${searchFilter ? `searchFilter=${searchFilter}` : ''}${factionFilter ? `&factionFilter=${factionFilter}` : ''}${releaseWaveFilter ? `&releaseWaveFilter=${releaseWaveFilter}` : ''}`;

    const handleChange = (event: any, value: any) => {
        if (value) {
            const prefix = searchFilter || factionFilter ? '&' : ''
            router.push(`${query}${prefix}releaseWaveFilter=${value.label}`);
        } else {
            router.push(query);
        }
    };

    const defaultOption = options.find(option => option.label === releaseWaveFilter);

    return (
        <Autocomplete
            className='bg-gray-800 text-white w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
            disablePortal
            id="releaseWaveFilter"
            defaultValue={defaultOption}
            options={options}
            sx={{width: 300, input: {color: 'white'}, label: {color: 'gray'}}}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Release Wave"/>}
        />
    )
}