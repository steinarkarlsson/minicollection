'use client'

import {Autocomplete, TextField} from "@mui/material";
import React from "react";
import {Faction} from "../../typings";
import {useRouter} from "next/navigation";
import Paper from '@mui/material/Paper';

interface FactionSelectProps {
    filterObject: Faction[],
    searchFilter: string | undefined,
    releaseWaveFilter: string | undefined,
}

export function FactionSelect({filterObject, searchFilter, releaseWaveFilter}: FactionSelectProps) {

    const options = filterObject.map(e => ({label: e.name, id: e._id}));

    const router = useRouter();

    const query = `?${searchFilter ? `searchFilter=${searchFilter}` : ''}${releaseWaveFilter ? `&releaseWaveFilter=${releaseWaveFilter}` : ''}`;

    const handleChange = (event: any, value: any) => {
        if (value) {
            const prefix = searchFilter || releaseWaveFilter ? '&' : ''
            router.push(`${query}${prefix}factionFilter=${value.label}`);
        }
        else {
            router.push(query);
        }
    };

    return (
        <Autocomplete
            className='bg-gray-800 text-white w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
            disablePortal
            id="factionFilter"
            defaultValue={undefined}
            options={options}
            sx={{width: 300, input: {color: 'white'}, label: {color: 'gray'}}}
            onChange={handleChange}
            PaperComponent={(props) => (
                <Paper {...props} className="bg-gray-800 text-white" />
            )}
            renderInput={(params) => <TextField {...params} label="Faction"/>}
        />
    )
}