import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Link from "next/link";
import React from "react";
import {Faction} from "../../typings";

interface FactionSelectProps {
    filterObject: Faction[],
    searchFilter: string | undefined,
    factionFilter: string | undefined,
    releaseWaveFilter: string | undefined,
}

export function FactionSelect({filterObject, searchFilter, factionFilter, releaseWaveFilter}: FactionSelectProps) {
    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label" className="text-white">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                variant='filled'
                label='factionFilter'
                className='flex pb-3 border-2 align-middle items-middle bg-gray-800 text-white w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
            >
                {filterObject.map((e) => (
                    <MenuItem
                        value={e.name}
                        key={e.name}
                    >
                        <Link
                            href={{
                                pathname: '/',
                                query: {
                                    ...(searchFilter ? {searchFilter} : {}),
                                    factionFilter: `${e.name}`,
                                    ...(releaseWaveFilter ? {releaseWaveFilter} : {}),
                                }
                            }}
                        >
                            {e.name}
                        </Link>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}