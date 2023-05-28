import type {NextPage} from 'next'
import Head from 'next/head'
import Header from "../components/Header";
import MiniCardGrid from "../components/MiniCardGrid";
import connectToDatabase from '../db'
import {Figure} from "../typings";

interface Props {
    figures: Figure[]
}

const Home = ({ figures }: Props) => {

    console.log(figures)
    console.log(figures[0].mainName)

    return (
        <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh]}`}>
            <Head>
                <title>Mini Collection</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
                <main className="relative pl-4 pb-24  lg:space-y-24 lg:pl-16 mt-10">
                    <section className="md:space-y-24 mt-10">
                        <MiniCardGrid title={"Miniatures"} figures={figures}/>
                        <MiniCardGrid title={"Sets"} figures={figures}/>
                        <MiniCardGrid title={"Terrain"} figures={figures}/>
                        <MiniCardGrid title={"Books"} figures={figures}/>
                    </section>
                </main>
        </div>
    )
}
export default Home

export async function getServerSideProps() {
    const db = await connectToDatabase()
    const figures = await db.collection('figures').find({}).toArray()
    return {
        props: {
            figures: JSON.parse(JSON.stringify(figures))
        }
    }
}