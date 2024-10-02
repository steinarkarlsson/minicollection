'use client'

import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Faction } from "../../types";
import { useRouter, useSearchParams } from "next/navigation";

interface FactionSelectProps {
    filterObject: Faction[];
    searchFilter: string | undefined;
    releaseWaveFilter: string | undefined;
    factionFilter?: string | undefined;
}

export function FactionSelect({ filterObject, factionFilter }: FactionSelectProps) {
    const options = filterObject.map(e => ({ label: e.name, id: e._id }));
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (event: any, value: any) => {
        const currentParams = new URLSearchParams(searchParams?.toString());

        if (value) {
            currentParams.set('factionFilter', value.label);
        } else {
            console.log('removing factionFilter');
            currentParams.delete('factionFilter');
        }
        router.push(`/miniatures?${currentParams.toString()}`);
    };

    const defaultOption = options.find(option => option.label === factionFilter);

    return (
        <Autocomplete
            className='bg-gray-800 text-white w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
            disablePortal
            id="factionFilter"
            defaultValue={defaultOption}
            options={options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: 300, input: { color: 'white' }, label: { color: 'gray' } }}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Faction" />}
        />
    );
}