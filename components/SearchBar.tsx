import React, {useCallback} from 'react';
import {useTheme} from "@mui/material";
import {Faction, ReleaseWave} from "../typings";
import {useForm} from "react-hook-form";
import {z} from 'zod';

type searchBarProps = {
    searchTerm: string,
    factions: Faction[],
    selectedFaction: Faction,
    releaseWaves: ReleaseWave[],
    selectedReleaseWave: ReleaseWave,
}

const SearchBarSchema = z.object({
    searchTerm: z.string().optional(),
    faction: z.object({
        name: z.string(),
    }).optional(),
    releaseWave: z.object({
        name: z.string(),
    }).optional()
});

export type SearchBarFormData = z.infer<typeof SearchBarSchema>;

function SearchBar({searchTerm, factions, selectedFaction, releaseWaves, selectedReleaseWave}: searchBarProps) {

    const inputStyle = {background: '#1C2025', border: '#434D5B', color: '#C7D0DD', width: '300px', margin: '10px'}

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SearchBarFormData>();

    const onSubmit = useCallback((data: SearchBarFormData) => {
        console.log(data)
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Search</label>
            <input {...register('searchTerm')} value={searchTerm} style={inputStyle}/>

            <label>Faction</label>
            <select {...register('faction', {required: true})} >
                {factions.map((faction) => (
                    <option key={faction._id} value={selectedFaction.name}>{faction.name}</option>
                ))}
            </select>
            {errors.faction && <p>Faction is required</p>}

            <label>Release Wave</label>
            <select {...register('releaseWave')} >
                {releaseWaves.map((releaseWave) => (
                    <option key={releaseWave.name} value={selectedReleaseWave.name}>{releaseWave.name}</option>
                ))}
            </select>

            <input type="submit"/>
        </form>
    )
}

export default SearchBar;