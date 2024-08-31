import {Set} from "../../typings";
import IncludedItemCard from "./IncludedItemCard";

interface IncludedItemsTableProps {
    item: Set | undefined;
}

const IncludedItemsGrid: React.FC<IncludedItemsTableProps> = ({item}) => {
    return (
        <>
            {/*Miniature Section*/}
            {item && item.figures && item.figures.length > 0 ?
                <div>
                    <div className='text-xl'> Included Miniatures
                        ({item.figures ? item.figures.length : null})
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {item.figures.map((figure) => (
                            <IncludedItemCard figure={figure} key={figure._id}/>
                        ))}
                    </div>
                </div> : null}
        </>
    );
};

export default IncludedItemsGrid;