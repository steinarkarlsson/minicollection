import React from 'react';
import {useTheme} from "@mui/material";
import {Faction, ReleaseWave} from "../typings";
import {useForm} from "react-hook-form";

type searchBarProps = {
    searchTerm: string,
    factions: Faction[],
    selectedFaction: Faction,
    releaseWaves: ReleaseWave[],
    selectedReleaseWave: ReleaseWave,
}

function SearchBar({searchTerm, factions, selectedFaction, releaseWaves, selectedReleaseWave}: searchBarProps) {
    const theme = useTheme()

    const inputStyle = {background: '#1C2025', border: '#434D5B', color: '#C7D0DD', width: '300px', margin: '10px'}

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>

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
            {errors.releaseWave && <p>Please enter number for age.</p>}

            <input type="submit"/>
        </form>
    )
}

export default SearchBar;