import Head from 'next/head'
import Header from "../components/Header";
import MiniCardGrid from "../components/MiniCardGrid";
import {Figure} from "../typings";
import React from "react";
import {getFigureGridInfo} from "../lib/sanityQueries";

interface Props {
    figures: Figure[]
}

const Home = ({figures}: Props) => {
    const [searchTerm, setSearchTerm] = React.useState<string>('')
    //const [selectedFaction, setselectedFaction] = React.useState<Faction>(faction[0])
    //const [selectedReleaseWave, setselectedReleaseWave] = React.useState<ReleaseWave>(releaseWave[0])

    //  const figures = getFigureGridInfo();
    // console.log(figures)
    return (
        <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]} !h-screen overflow-hidden'>
            <Head>
                <title>Mini Collection</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className="relative pl-4 pb-24  lg:space-y-24 lg:pl-16 mt-10">
                <section className="md:space-y-24 mt-10">
                    {/*<SearchBar*/}
                    {/* searchTerm={searchTerm}*/}
                    {/* factions={faction}*/}
                    {/* selectedFaction={selectedFaction}*/}
                    {/* releaseWaves={releaseWave}*/}
                    {/* selectedReleaseWave={selectedReleaseWave}*/}
                    {/*>*/}
                    <MiniCardGrid title={"Miniatures"} figures={figures}/>
                </section>
            </main>
        </div>
    )
}
export default Home

export async function getServerSideProps() {
    const figures = await getFigureGridInfo();
    return {props: {figures}}
}