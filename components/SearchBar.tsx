import React from 'react';
import {Faction, ReleaseWave} from "../typings";
import {useForm} from "react-hook-form";
import {z} from 'zod';

type searchBarProps = {
    searchTerm: string,
    factions: Faction[],
    selectedFaction: string,
    releaseWaves: ReleaseWave[],
    selectedReleaseWave: string,
    handleFactionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleReleaseWaveChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (data: SearchBarFormData) => void
}

const SearchBarSchema = z.object({
    searchTerm: z.string().optional(),
    faction: z.string().optional(),
    releaseWave: z.string().optional()
});

export type SearchBarFormData = z.infer<typeof SearchBarSchema>;

function SearchBar({
                       searchTerm,
                       factions,
                       releaseWaves,
                       handleFactionChange,
                       handleReleaseWaveChange,
                       handleSearchChange,
                       onSubmit
                   }: searchBarProps) {

    const inputStyle = {background: '#1C2025', border: '#434D5B', color: '#C7D0DD', width: '300px', margin: '10px'}

    const {
        register,
        handleSubmit,
        formState: {},
    } = useForm<SearchBarFormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Search</label>
            <input {...register('searchTerm')} value={searchTerm} style={inputStyle} onChange={handleSearchChange}/>

            <label>Faction</label>
            <select {...register('faction', {required: true})} onChange={handleFactionChange}>
                {factions.map((faction) => (
                    <option key={faction._id} value={faction.name}>{faction.name}</option>
                ))}
            </select>

            <label>Release Wave</label>
            <select {...register('releaseWave')} onChange={handleReleaseWaveChange}>
                {releaseWaves.map((releaseWave) => (
                    <option key={releaseWave.name} value={releaseWave.name}>{releaseWave.name}</option>
                ))}
            </select>

            <input type="submit"/>
        </form>
    )
}

export default SearchBar;