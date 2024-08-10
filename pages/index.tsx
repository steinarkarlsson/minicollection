import Head from 'next/head'
import Header from "../components/Header";
import MiniCardGrid from "../components/MiniCardGrid";
import {Faction, GridFigure, ReleaseWave} from "../typings";
import React from "react";
import {getFactions, getFigureGridInfo, getReleaseWaves} from "../lib/sanityQueries";
import SearchBar, {SearchBarFormData} from "../components/SearchBar";
import Spinner from "../components/Spinner";

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
        console.log('setting search:', e.target.value)
        setSearchFilter(e.target.value)
    }

    const handleFactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('setting faction:', e.target.value)
        setFactionFilter(e.target.value)
    }

    const handleReleaseWaveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('setting releaseWave:', e.target.value)
        setReleaseWaveFilter(e.target.value)
    }

    const onSubmit = async (data: SearchBarFormData) => {
        setIsLoading(true)
        console.log('submitting search')
        console.log(data)
        const newFigures = await getFigureGridInfo(data.searchTerm, data.faction, data.releaseWave)
        setIsLoading(false)
        console.log(newFigures)
        setFilteredFigures(newFigures);
    }

    return (
        <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]} !h-screen'>
            <Head>
                <title>Mini Collection</title>
                <link rel="icon" href="/icon.png"/>
            </Head>
            <Header/>
            <main className="relative mt-10 pb-24 pl-4 lg:space-y-24 lg:pl-16">
                <section className="mt-10 md:space-y-24">
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
                    {isLoading ? <Spinner/> : <MiniCardGrid figures={filteredFigures}/>}
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