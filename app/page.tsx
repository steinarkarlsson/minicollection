import {getFeaturedFigures, getFeaturedSets, getFeaturedTerrain, getFeaturedAccessories, getFeaturedPrint} from "../lib/sanityQueries";
import Carousel from "../components/Carousel";
export default async function Home() {

    const featuredFigures = await getFeaturedFigures();
    const featuredSets = await getFeaturedSets();
    const featuredTerrain = await getFeaturedTerrain();
    const featuredAccessories = await getFeaturedAccessories();
    const featuredPrint = await getFeaturedPrint();

    return (
        <div className="flex items-center space-y-2 md:space-y-5 p-4">
            <div className="flex flex-wrap">
                <Carousel items={featuredFigures} type={'miniature'}/>
                <Carousel items={featuredSets} type={'set'}/>
                <Carousel items={featuredTerrain} type={'terrain'}/>
                <Carousel items={featuredAccessories} type={'accessory'}/>
                <Carousel items={featuredPrint} type={'print'}/>
            </div>
        </div>
    );
}