'use client'

import {Autocomplete, TextField} from "@mui/material";
import React from "react";
import {ReleaseWave} from "../../typings";
import {useRouter} from "next/navigation";

interface EditionSelectProps {
    filterObject: ReleaseWave[],
    searchFilter: string | undefined,
    factionFilter?: string | undefined,
    editionFilter?: string | undefined,
}

export function EditionSelect({filterObject, searchFilter, factionFilter, editionFilter}: EditionSelectProps) {

    const options = filterObject.map(e => ({label: e.name, id: e._id}));

    const router = useRouter();

    const query = `?${searchFilter ? `searchFilter=${searchFilter}` : ''}${factionFilter ? `&factionFilter=${factionFilter}` : ''}`;

    const handleChange = (event: any, value: any) => {
        if (value) {
            const prefix = searchFilter || factionFilter ? '&' : ''
            router.push(`${query}${prefix}releaseWaveFilter=${value.label}`);
        } else {
            router.push(query);
        }
    };
    return (
        <Autocomplete
            className='bg-gray-800 text-white w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
            disablePortal
            id="releaseWaveFilter"
            defaultValue={undefined}
            options={options}
            sx={{width: 300, input: {color: 'white'}, label: {color: 'gray'}}}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Release Wave"/>}
        />
    )
}