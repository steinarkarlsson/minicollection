'use client'
import Image from "next/image";
import {Figure, Set} from "../typings";
import {useRecoilState} from "recoil";
import {itemState, modalState} from "../atoms/modalAtom";

interface Props {
    item: Figure | Set
    type: 'figure' | 'set'
}

function ItemCard({ item, type }: Props) {
    const [, setShowModal] = useRecoilState(modalState);
    const [, setItem] = useRecoilState(itemState);

    const handleClick = () => {
        setItem(item);
        setShowModal(true);
    };

    const cardWidth = type === 'set' ? 'w-80' : 'w-60';
    const cardHeight = type === 'set' ? 'h-60' : 'h-80';

    return (
        <div
            className={`group relative m-2 mx-2 ${cardWidth} overflow-hidden rounded-md pt-2 shadow-xl hover:shadow-yellow-200 transition delay-75 ease-in-out duration-600 border-2  border-gray-800 hover:border-white`}
            onClick={handleClick}
        >
            <div className={`flex flex-col ${cardHeight} items-center justify-center`}>
                    {item.image && item.image.asset ? (
                        <Image
                            src={`https://cdn.sanity.io/images/4llymfg7/production/${item.image.asset._ref.slice(6).slice(0, -4)}.png`}
                            alt=""
                            width={136}
                            height={140}
                            style={{objectFit: 'contain', width: 'auto', maxHeight: '100%'}}
                        />
                    ) : null}
                </div>
                <div className="px-6 text-m text-wrap">
                    {item.mainName}
                </div>
                <div className="flex flex-row pt-4 pb-2">
                    {item.faction?.map((faction, index) => (
                        <div key={index} className="px-1">
                        <span
                            className="inline-block w-auto whitespace-nowrap rounded-full bg-gray-800 px-3 pb-1 text-xs font-semibold text-gray-400">
                            {faction.name}
                        </span>
                        </div>
                    ))}
                </div>
                <div className="px-1 pt-4 pb-2">
                <span
                    className="inline-block whitespace-nowrap rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-400">
                    {item.releaseWave?.name}
                </span>
                </div>
            </div>
            );
            }

            export default ItemCard;