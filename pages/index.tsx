import Head from 'next/head'
import Header from "../components/Header";
import MiniCardGrid from "../components/MiniCardGrid";
import {Figure, Set, Terrain, Print, Character, Faction, ReleaseWave} from "../typings";
import {useRecoilValue} from "recoil";
import {modalState} from "../atoms/modalAtom";
import React from "react";
import Modal from "../components/Modal";
import {createClient} from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
import {props} from "sanity/src/core/preview/utils/props";

interface Props {
    figure: Figure[]
    set: Set[]
    terrain: Terrain[]
    print: Print[]
    character: Character[]
    faction: Faction[]
    releaseWave: ReleaseWave[]
}

const Home = ({figure, set, terrain, print, character, faction, releaseWave}: Props) => {

    const showModal = useRecoilValue(modalState)

    return (
        <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh]} ${showModal && '!h-screen overflow-hidden'}`}>
            <Head>
                <title>Mini Collection</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className="relative pl-4 pb-24  lg:space-y-24 lg:pl-16 mt-10">
                <section className="md:space-y-24 mt-10">
                    <MiniCardGrid title={"Miniatures"} figures={figure}/>
                </section>
            </main>
            {/*{showModal && <Modal figure={figure} faction={faction} character{character} set={set} releaseWave={releaseWave} />}*/}
        </div>
    )
}
export default Home

const client = createClient(
    {
        projectId: process.env.SANITY_PROJECTID,
        dataset: process.env.SANITY_DATASET,
        apiVersion: "2023-06-12",
        useCdn: false
    }
);

export async function getServerSideProps() {
    const figure = await client.fetch(`*[_type == "figure"]`);
    const set = await client.fetch(`*[_type == "set"]`);
    const terrain = await client.fetch(`*[_type == "terrain"]`);
    const print = await client.fetch(`*[_type == "print"]`);
    const character = await client.fetch(`*[_type == "character"]`);
    const faction = await client.fetch(`*[_type == "faction"]`);
    const releaseWave = await client.fetch(`*[_type == "releaseWave"]`);

    // console.log('data fetched from Sanity client');
    //console.log('Figure example: ', figures[3].image.asset._ref.slice(6).slice(0, -4),'.png');
    // console.log('Set example: ', JSON.stringify(set[0], null, 2));
    // console.log('Terrain example: ', JSON.stringify(terrain[0], null, 2));
    // console.log('Print example: ', JSON.stringify(print[0], null, 2));
    // console.log('Character example: ', JSON.stringify(character[0], null, 2));
    // console.log('Faction example: ', JSON.stringify(faction[0], null, 2));
    // console.log('Release Wave example: ', JSON.stringify(releaseWave[0], null, 2));

    return {
        props: {
            figure,
            set,
            terrain,
            print,
            character,
            faction,
            releaseWave,
        }
    };
}