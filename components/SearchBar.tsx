'use client';

import React, { useState } from 'react';
import { Faction, ReleaseWave, SearchBarFormData } from '../typings';

interface SearchBarProps {
    factions: Faction[];
    releaseWaves: ReleaseWave[];
    searchTerm: string;
    selectedFaction: string;
    selectedReleaseWave: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 factions,
                                                 releaseWaves,
                                                 searchTerm,
                                                 selectedFaction,
                                                 selectedReleaseWave
                                             }) => {
    const [formData, setFormData] = useState<SearchBarFormData>({
        searchTerm,
        selectedFaction,
        selectedReleaseWave
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submit
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields for searchTerm, selectedFaction, selectedReleaseWave */}
        </form>
    );
};

export default SearchBar;