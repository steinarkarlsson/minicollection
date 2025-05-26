import {
    getAccessories, getEditions,
    getFactions,
    getFigures,
    getPrints,
    getReleaseWaves,
    getSets,
    getTerrain
} from "../../lib/sanityQueries";
import {MiniatureSearchBar} from "../../components/searchBar/MiniatureSearchBar";
import {GroupedGrid} from "../../components/GroupedGrid";

export default async function componentLibrary() {
    const searchFilter = 'aragorn'
    const factionFilter = 'Minas Tirith'
    const releaseWaveFilter = undefined;

    //Meta data
    const factions = await getFactions();
    const releaseWaves = await getReleaseWaves();
    const editions = await getEditions();

    //Card data
    const figures = await getFigures(searchFilter);
    const sets = await getSets(4);
    const terrains = await getTerrain(4);
    const prints = await getPrints(4);
    const accessories = await getAccessories(4);

    //Getting a single item to display
    const figure = figures[0]
    const set = sets[0]
    const terrain = terrains[0]
    const print = prints[0]
    const accessory = accessories[0]

    // console.log('figures:', figures)
    return (
        <div className="flex flex-col items-center space-y-2 md:space-y-5 p-4">
            <MiniatureSearchBar
                searchFilter={searchFilter}
                factionFilter={factionFilter}
                releaseWaveFilter={releaseWaveFilter}
                factions={factions}
                releaseWaves={releaseWaves}
            />
            {/*<div className='flex'>*/}
            {/*    <GenericCard type={'miniature'} name={figure.mainName} image={figure.image} detail1={figure.faction} detail2={figure.releaseWave} id={figure._id} badgeType={'announced'}/>*/}
            {/*    <GenericCard type={'set'} name={set.mainName} image={set.image} detail2={set.releaseWave} id={set._id}/>*/}
            {/*    <GenericCard type={'terrain'} name={terrain.mainName} image={terrain.image} detail1={terrain.releaseWave} id={terrain._id} badgeType={'unreleased'}/>*/}
            {/*    <GenericCard type={'print'} name={print.mainName} image={print.image} detail1={print.releaseWave} detail2={print.edition} id={print._id} badgeType={null}/>*/}
            {/*    <GenericCard type={'accessory'} name={accessory.mainName} image={accessory.image} detail2={accessory.releaseWave} id={accessory._id}/>*/}
            {/*</div>*/}

            <div className='border-2'>
                {/*Miniatures*/}
                {/*<GroupedGrid type={'miniature'} items={figures} grouping={factions} groupBy={'faction'}/>*/}
                {/*Sets*/}
                {/*<GroupedGrid type={'set'} items={sets} grouping={releaseWaves} groupBy={'releaseWave'}/>*/}
                {/*terrain*/}
                {/*<GroupedGrid type={'terrain'} items={terrains} grouping={releaseWaves} groupBy={'releaseWave'}/>*/}
                prints
                <GroupedGrid type={'print'} items={prints} grouping={editions} groupBy={'edition'}/>
                {/*accessories*/}
                {/*<GroupedGrid type={'accessory'} items={accessories} grouping={releaseWaves} groupBy={'releaseWave'}/>*/}
            </div>
        </div>
    );
}