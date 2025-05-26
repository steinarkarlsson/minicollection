import {getReleaseWaves, getTerrain} from "../../lib/sanityQueries";
import {GroupedGrid} from "../../components/GroupedGrid";

export default async function Terrain({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const terrain = await getTerrain();
    const releaseWaves = await getReleaseWaves();

    return (
        <div className="flex flex-col items-center space-y-2 md:space-y-5 p-4">
            <GroupedGrid type={'terrain'} items={terrain} grouping={releaseWaves} groupBy={'releaseWave'}/>
        </div>
    )
}