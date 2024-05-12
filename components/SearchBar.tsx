import React from 'react';
import {Button, Select, TextField, useTheme} from "@mui/material";
import {Faction, ReleaseWave} from "../typings";

type searchBarProps = {
    searchTerm: string,
    handleSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    factions: Faction[],
    selectedFaction: Faction,
    handleFactionChange: (event: React.ChangeEvent<{name?: string, value: string}>) => void,
    releaseWaves: ReleaseWave[],
    selectedReleaseWave: ReleaseWave,
    handleReleaseWaveChange: (event: React.ChangeEvent<{name?: string, value: string}>) => void,
}

function SearchBar({searchTerm, handleSearchTermChange, factions, selectedFaction, handleFactionChange, releaseWaves, selectedReleaseWave, handleReleaseWaveChange}:searchBarProps) {
    const theme = useTheme()
    const [searchInput, setSearchInput] = React.useState('')

    const inputStyle = {background:'#1C2025', border:'#434D5B', color:'#C7D0DD', width:'300px', margin:'10px'}


    return (
        <div>
            <TextField
                label="Name"
                color="primary"
                value={searchTerm}
                onChange={handleSearchTermChange}
                sx={inputStyle}
            />
            <Select
                label="Faction"
                sx={inputStyle}
                value={selectedFaction}
                onChange={handleFactionChange}
            >
                {factions.map((faction) => (
                    <option id={faction._id} value={faction.name}>{faction.name}</option>
                ))}
            </Select>
            <Select
                label="Release Wave"
                sx={inputStyle}
                value={selectedReleaseWave}
                onChange={handleReleaseWaveChange}
            >
                {releaseWaves.map((releaseWave) => (
                    <option id={releaseWave._id} value={releaseWave.name}>{releaseWave.name}</option>
                ))}
            </Select>
            <Button id='searchButton' sx={{color:'#fff', border:'#434D5B'}}>Search</Button>
        </div>
    )

}

export default SearchBar;