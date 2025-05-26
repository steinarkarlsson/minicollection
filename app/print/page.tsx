import {getEditions, getPrints} from "../../lib/sanityQueries";
import {GroupedGrid} from "../../components/GroupedGrid";

export default async function Sets() {

    const prints = await getPrints();
    const editions = await getEditions()

    return (
        <div className="flex flex-col items-center space-y-2 md:space-y-5 p-4">
            <GroupedGrid type={'print'} items={prints} grouping={editions} groupBy={'edition'}/>
        </div>
    )
}