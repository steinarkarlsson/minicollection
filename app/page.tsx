import {getFeaturedFigures, getFeaturedSets} from "../lib/sanityQueries";
import Welcome from '../components/Welcome';
import Carousel from "../components/Carousel";

export default async function Home() {

    const featuredFigures = await getFeaturedFigures();
    const featuredSets = await getFeaturedSets();

    return (
        <div className="flex flex-col items-center justify-center space-y-2 md:space-y-5 p-4 max-w-6xl lg:mx-auto">
            <Welcome/>
            <div className="flex flex-col items-center">
                <Carousel items={featuredFigures} type={'figure'}/>
                <Carousel items={featuredSets} type={'set'}/>
            </div>
        </div>
    );
}