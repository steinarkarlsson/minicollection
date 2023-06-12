import Head from 'next/head'
import Header from "../components/Header";
import MiniCardGrid from "../components/MiniCardGrid";
import {Figure} from "../typings";
import {useRecoilValue} from "recoil";
import {modalState} from "../atoms/modalAtom";
import React from "react";
import Modal from "../components/Modal";
import {createClient} from "next-sanity";

interface Props {
    figures: Figure[]
}

const Home = ({figures}: Props) => {

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
                    <MiniCardGrid title={"Miniatures"} figures={figures}/>
                </section>
            </main>
            {showModal && <Modal/>}
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

export async function getStaticProps() {
    const figures = await client.fetch(`*[_type == "figure"]`);
    return {
        props: {
            figures
        }
    };
}