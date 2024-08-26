import {Figure, Set} from "../../typings";
import IncludedItemCard from "./IncludedItemCard";

interface IncludedItemsTableProps {
    item: Figure | Set;
}

const IncludedItemsGrid: React.FC<IncludedItemsTableProps> = ({item}) => {
    return (
        <>
            {/*Miniature Section*/}
            {item.figures && item.figures.length > 0 ?
                <div>
                    <div className='text-xl border-2'> Included Miniatures
                        ({item.figures ? item.figures.length : null})
                    </div>
                    <div className="flex flex-wrap justify-center border-2">
                        {item.figures.map((figure) => (
                            <IncludedItemCard figure={figure} key={figure._id}/>
                        ))}
                    </div>
                </div> : null}
        </>
    );
};

export default IncludedItemsGrid;