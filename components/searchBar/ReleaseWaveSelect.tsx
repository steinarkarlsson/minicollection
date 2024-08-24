import { MenuItem, Select } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ReleaseWave } from "../../typings";

interface ReleaseWaveSelectProps {
    filterObject: ReleaseWave[],
    searchFilter: string | undefined,
    factionFilter: string | undefined,
    releaseWaveFilter: string | undefined,
}

export function ReleaseWaveSelect({ filterObject, searchFilter, factionFilter, releaseWaveFilter }: ReleaseWaveSelectProps) {

    return (
        <Select
            variant='filled'
            label='releaseWaveFilter'
            className='flex pb-3 align-middle items-middle bg-gray-800 text-white w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
        >
            {filterObject.map((e) => (
                <MenuItem
                    value={e.name || ''}
                    key={e.name}
                >
                    <Link
                        href={{
                            pathname: '/',
                            query: {
                                ...(searchFilter ? { searchFilter } : {}),
                                ...(factionFilter ? { factionFilter } : {}),
                                releaseWaveFilter: `${e.name}`,
                            }
                        }}
                    >
                        {e.name}
                    </Link>
                </MenuItem>
            ))}
        </Select>
    )
}