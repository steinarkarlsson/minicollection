import Image from "next/image";
import {Figure, Set} from "../../typings";
import MiniCard from "../MiniCard";

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
                                <div
                                    className="group relative m-2 mx-2 w-60 overflow-hidden rounded-md pt-2 shadow-xl hover:shadow-yellow-200 transition delay-75 ease-in-out duration-600 border-2  border-gray-800 hover:border-white"
                                >
                                    <div className="flex h-60 flex-col items-center justify-center">
                                        {figure.image && figure.image.asset ? (
                                            <Image
                                                src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                                alt=""
                                                width={120}
                                                height={100}
                                                style={{objectFit: 'contain', width: 'auto', maxHeight: '100%'}}
                                            />
                                        ) : null}
                                    </div>
                                    <div className="px-6 text-m text-wrap">
                                        {figure.mainName}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> : null}
        </>
    );
};

export default IncludedItemsGrid;