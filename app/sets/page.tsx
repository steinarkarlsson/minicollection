import {getReleaseWaves, getSets} from "../../lib/sanityQueries";
import {GroupedGrid} from "../../components/GroupedGrid";

export default async function Sets({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const sets = await getSets();
    const releaseWaves = await getReleaseWaves();

    return (
        <div className="flex flex-col items-center space-y-2 md:space-y-5 p-4">
            <GroupedGrid type={'set'} items={sets} grouping={releaseWaves} groupBy={'releaseWave'}/>
        </div>
    )
}