import Grid from "../../components/Grid";
import {getReleaseWaves, getSets} from "../../lib/sanityQueries";

export default async function Sets() {

    const sets = await getSets();
    const releaseWaves = await getReleaseWaves();

    return (
        <div>
            <h1 className='text-3xl'>All sets</h1>
            <Grid type='set' items={sets} searchFilter={''} releaseWaves={releaseWaves} factionFilter={''} releaseWaveFilter={''}/>
        </div>
    )
}

