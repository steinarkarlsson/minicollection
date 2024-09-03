import Grid from "../../components/Grid";
import {getReleaseWaves, getSets} from "../../lib/sanityQueries";

export default async function Sets({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const searchFilter = typeof searchParams.searchFilter === 'string' ? searchParams.searchFilter : undefined;
    const releaseWaveFilter = typeof searchParams.releaseWaveFilter === 'string' ? searchParams.releaseWaveFilter : undefined;

    const sets = await getSets();
    const releaseWaves = await getReleaseWaves();

    return (
        <div className="flex flex-col items-center space-y-2 md:space-y-5 p-4">
            {/*<SetSearchBar searchFilter={searchFilter} releaseWaveFilter={releaseWaveFilter} releaseWaves={releaseWaves} />*/}
            <Grid type='set' items={sets} searchFilter={searchFilter || ''} releaseWaves={releaseWaves}
                  factionFilter={''} releaseWaveFilter={releaseWaveFilter || ''}/>
        </div>
    )
}

