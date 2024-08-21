import Head from 'next/head'
import Header from "../components/header/Header";
import MiniCardGrid from "../components/MiniCardGrid";
import {Faction, GridFigure, ReleaseWave} from "../typings";
import React from "react";
import {getFactions, getFigureGridInfo, getReleaseWaves} from "../lib/sanityQueries";
import SearchBar, {SearchBarFormData} from "../components/SearchBar";
import Spinner from "../components/Spinner";
import Welcome from '../components/Welcome';

interface Props {
    figures: GridFigure[],
    factions: Faction[],
    releaseWaves: ReleaseWave[]
}

const Home = ({figures, factions, releaseWaves}: Props) => {
    const [filteredFigures, setFilteredFigures] = React.useState<GridFigure[]>(figures)
    const [searchFilter, setSearchFilter] = React.useState<string>('')
    const [factionFilter, setFactionFilter] = React.useState<string>('')
    const [releaseWaveFilter, setReleaseWaveFilter] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(e.target.value)
    }

    const handleFactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFactionFilter(e.target.value)
    }

    const handleReleaseWaveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReleaseWaveFilter(e.target.value)
    }

    const onSubmit = async (data: SearchBarFormData) => {
        setIsLoading(true)
        const newFigures = await getFigureGridInfo(data.searchTerm, data.faction, data.releaseWave)
        setFilteredFigures(newFigures);
        setIsLoading(false)
    }

    return (
        <div className='relative h-screen bg-gradient-to-b lg:h-[140vh] !h-screen'>
            <Head>
                <title>Mini Collection</title>
                <link rel="icon" href="/icon.png"/>
            </Head>
            <Header/>
            <main className="relative mt-10 lg:space-y-20">
                <section className="mt-10 space-y-2 md:space-y-5">
                </section>
                <section className="mt-10 space-y-2 md:space-y-5 p-4">
                    <Welcome/>
                    <SearchBar
                        factions={factions}
                        releaseWaves={releaseWaves}
                        searchTerm={searchFilter}
                        selectedFaction={factionFilter}
                        selectedReleaseWave={releaseWaveFilter}
                        handleReleaseWaveChange={handleReleaseWaveChange}
                        handleFactionChange={handleFactionChange}
                        handleSearchChange={handleSearch}
                        onSubmit={onSubmit}
                    />
                    <div className='flex flex-col'>
                        {isLoading ? <Spinner/> :
                            <MiniCardGrid
                                figures={filteredFigures}
                                searchFilter={searchFilter}
                                factionFilter={factionFilter}
                                releaseWaveFilter={releaseWaveFilter}
                                factions={factions}
                                releaseWaves={releaseWaves}
                            />
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}
export default Home

export async function getServerSideProps() {
    try {
        const figures = await getFigureGridInfo();
        const factions = await getFactions();
        const releaseWaves = await getReleaseWaves();
        return {props: {figures, factions, releaseWaves}}
    } catch (e) {
        console.error(e)
    }
}