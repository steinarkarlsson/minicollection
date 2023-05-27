import type {NextPage} from 'next'
import Head from 'next/head'
import Header from "../components/Header";
import MiniCardGrid from "../components/MiniCardGrid";

const Home: NextPage = () => {
    return (
        <div className="">
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