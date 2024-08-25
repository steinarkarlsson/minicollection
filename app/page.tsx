import {getFigureGridInfo, getSets} from "../lib/sanityQueries";
import Welcome from '../components/Welcome';
import Carousel from "../components/Carousel";

export default async function Home() {
    const figures = await getFigureGridInfo();
    const sets = await getSets();

    return (
        <div className="flex flex-col items-center mt-10 space-y-2 md:space-y-5 p-4">
            <Welcome/>
            <Carousel items={figures} type={'figure'}/>
            <Carousel items={sets} type={'set'}/>
        </div>
    );
}