import type {NextPage} from 'next'
import Head from 'next/head'
import Header from "../components/Header";
import MiniCardGrid from "../components/MiniCardGrid";

const Home: NextPage = () => {
    return (
        <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#222222] lg:h-[140vh]">
            <Head>
                <title>Mini Collection</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {/*--Appbar--*/}
            <Header/>

            <main>

                {/* Search widget */}
                <section>
                    <MiniCardGrid/>
                </section>
            </main>
            {/* Modal */}
        </div>
    )
}
export default Home