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

    const inputStyle = "bg-gray-800 w-70 h-12 text-lg rounded-md m-4 scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200";
    const labelStyle = "text-lg text-gray-400";

    const {
        register,
        handleSubmit,
        formState: {},
    } = useForm<SearchBarFormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pt-10">
            <label className={labelStyle}>Search</label>
            <input {...register('searchTerm')} value={searchTerm} className={inputStyle} onChange={handleSearchChange}/>

            <label className={labelStyle}>Faction</label>
            <select {...register('faction')} onChange={handleFactionChange} className={inputStyle}>
                <option key="" value=""></option>
                {factions.map((faction) => (
                    <option key={faction._id} value={faction.name}>{faction.name}</option>
                ))}
            </select>

            <label className={labelStyle}>Release Wave</label>
            <select {...register('releaseWave')} onChange={handleReleaseWaveChange} className={inputStyle}>
                <option key="" value=""></option>
                {releaseWaves.map((releaseWave) => (
                    <option key={releaseWave.name} value={releaseWave.name}>{releaseWave.name}</option>
                ))}
            </select>

            <input type="submit" className="rounded-lg bg-gray-700 h-10 w-24 text-lg hover:bg-gray-600 transition duration-300"/>
        </form>
    )
}

export default SearchBar;