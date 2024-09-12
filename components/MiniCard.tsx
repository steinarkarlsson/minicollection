import Image from "next/image";
import { DetailedFigure } from "../types";
import { useRecoilState } from 'recoil';
import { itemState, modalState } from '../atoms/modalAtom';
import Link from "next/link";
import ActionBar from "./ActionBar";

interface Props {
    figure: DetailedFigure;
    isOwned: boolean;
    quantity: number;
    onUpdateOwnedFigures: (itemId: string, operation: 'add' | 'remove') => void;
}

function MiniCard({ figure, isOwned, quantity, onUpdateOwnedFigures }: Props) {
    const [, setShowModal] = useRecoilState(modalState);
    const [, setItem] = useRecoilState(itemState);

    const handleClick = () => {
        setItem(figure);
        setShowModal(true);
    };

    return (
        <div
            className={`group relative m-2 mx-2 w-60 h-96 overflow-hidden rounded-md pt-2 shadow-lg ${isOwned ? 'hover:shadow-yellow-200' : 'hover:shadow-yellow-600'} transition delay-75 ease-in-out duration-600 border-2 ${isOwned ? 'shadow-yellow-200' : 'border-gray-800'} hover:border-white`}
            onClick={handleClick}
        >
            <Link href={`/miniatures/${figure._id}`}>
                <div className="flex h-60 flex-col items-center justify-center">
                    {figure.image && figure.image.asset ? (
                        <Image
                            src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                            alt=""
                            width={136}
                            height={140}
                            style={{ objectFit: 'contain', width: 'auto', maxHeight: '100%' }}
                        />
                    ) : null}
                </div>
                <div className="px-6 text-m text-wrap h-12 overflow-hidden">
                    {figure.mainName}
                </div>
            </Link>
            {isOwned && (
                <div className="absolute top-2 right-2 text-white text-md font-semibold px-2 py-1 rounded-full">
                    {quantity}
                </div>
            )}
            <ActionBar figureId={figure._id} onUpdateOwnedFigures={onUpdateOwnedFigures} />
            <div className="absolute bottom-0 w-full">
                <div className="factions-container group-hover:hidden flex flex-row pt-2">
                    {figure.faction?.map((faction, index) => (
                        <div key={index} className="px-1">
                            <span className="inline-block w-auto whitespace-nowrap rounded-full bg-gray-800 px-3 pb-1 text-xs font-semibold text-gray-400">
                                {faction.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="release-wave-container group-hover:hidden px-1 pt-2 pb-2">
                    <span className="inline-block whitespace-nowrap rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-400">
                        {figure.releaseWave?.name}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MiniCard;