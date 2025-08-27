import {getAccessories, getEditions, getReleaseWaves} from "../../lib/sanityQueries";
import {GroupedGrid} from "../../components/GroupedGrid";

export default async function Accessories({
                                              searchParams: searchParamsPromise
                                          }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await searchParamsPromise;
    const searchFilter = typeof searchParams.searchFilter === 'string' ? searchParams.searchFilter : undefined;
    const releaseWaveFilter = typeof searchParams.releaseWaveFilter === 'string' ? searchParams.releaseWaveFilter : undefined;
    const editionFilter = typeof searchParams.editionFilter === 'string' ? searchParams.editionFilter : undefined;

    const accessories = await getAccessories();
    const releaseWaves = await getReleaseWaves();
    const editions = await getEditions();

    return (
        <div>
            {/*<SearchBar type={'accessory'} releaseWaves={releaseWaves} editions={editions} searchFilter={searchFilter} releaseWaveFilter={releaseWaveFilter} editionFilter={editionFilter} />*/}
            {/*<Grid type={'accessory'} items={accessories}/>*/}
            <GroupedGrid type={'accessory'} items={accessories} grouping={releaseWaves} groupBy={'releaseWave'}/>
        </div>
    )
}