import Head from 'next/head'
import Header from "../components/Header";
import MiniCardGrid from "../components/MiniCardGrid";
import {Faction, GridFigure, ReleaseWave} from "../typings";
import React, {useCallback} from "react";
import {getFactions, getFigureGridInfo, getReleaseWaves} from "../lib/sanityQueries";
import SearchBar, {SearchBarFormData} from "../components/SearchBar";

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

    async function updateData (data:SearchBarFormData) {
        const newFigures = await getFigureGridInfo(data.searchTerm, data.faction, data.releaseWave)
        console.log(newFigures)
        setFilteredFigures(newFigures);
    }

    const onSubmit = useCallback((data: SearchBarFormData) => {
        console.log('submitting search')
        console.log(data)
        updateData(data)
    }, [])

    return (
        <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]} !h-screen'>
            <Head>
                <title>Mini Collection</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className="relative pl-4 pb-24  lg:space-y-24 lg:pl-16 mt-10">
                <section className="md:space-y-24 mt-10">
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
                    <MiniCardGrid title={"Miniatures"} figures={filteredFigures}/>
                </section>
            </main>
        </div>
    )
}
export default Home

export async function getServerSideProps() {
    const factions = await getFactions();
    const releaseWaves = await getReleaseWaves();
    // console.log(factions);
    // console.log(releaseWaves);
    const figures = await getFigureGridInfo();
    return {props: {figures,factions,releaseWaves}}
}