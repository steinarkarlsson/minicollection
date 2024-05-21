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

    const inputStyle = "flex bg-gray-800 w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200 lg:w-90";
    const labelStyle = "flex text-lg text-gray-400";
    const groupStyle = "p-2";

    const {
        register,
        handleSubmit,
        formState: {},
    } = useForm<SearchBarFormData>();

    return (
        <div className="flex justify-center pt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row">
                <div className={groupStyle}>
                    <label className={labelStyle}>Search</label>
                    <input {...register('searchTerm')} value={searchTerm} className={inputStyle}
                           onChange={handleSearchChange}/>
                </div>
                <div className={groupStyle}>
                    <label className={labelStyle}>Faction</label>
                    <select {...register('faction')} onChange={handleFactionChange} className={inputStyle}>
                        <option key="" value=""></option>
                        {factions.map((faction) => (
                            <option key={faction._id} value={faction.name}>{faction.name}</option>
                        ))}
                    </select>
                </div>
                <div className={groupStyle}>
                    <label className={labelStyle}>Release Wave</label>
                    <select {...register('releaseWave')} onChange={handleReleaseWaveChange} className={inputStyle}>
                        <option key="" value=""></option>
                        {releaseWaves.map((releaseWave) => (
                            <option key={releaseWave.name} value={releaseWave.name}>{releaseWave.name}</option>
                        ))}
                    </select>
                </div>
                <div className="pt-10">
                    <input type="submit"
                           className="h-10 w-24 rounded-lg bg-gray-700 text-lg transition duration-300 hover:bg-gray-600"/>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;