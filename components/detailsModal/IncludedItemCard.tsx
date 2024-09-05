'use client'
import Image from "next/image";
import {DetailedFigure} from "../../types";
import {useRecoilState} from "recoil";
import {itemState, modalState} from "../../atoms/modalAtom";
import {getFigureDetails} from "../../lib/sanityQueries";
import Link from "next/link";

interface IncludedItemCardProps {
    figure: DetailedFigure;
}

export default function IncludedItemCard({figure}: IncludedItemCardProps) {
    const [, setShowModal] = useRecoilState(modalState);
    const [, setItem] = useRecoilState(itemState);

    const handleClick = () => {
        getFigureDetails(figure._id).then(
            (figures: DetailedFigure[]) => {
                setItem(figures[0]);
                setShowModal(true);
            }
        );
    };

    return (
        <Link href={`/miniatures/${figure._id}`}>
            <div
                className="group relative m-2 mx-2 w-40 overflow-hidden rounded-md pt-2 shadow-xl hover:shadow-yellow-200 transition delay-75 ease-in-out duration-600 border-2  border-gray-800 hover:border-white"
                onClick={handleClick}
            >
                <div className="flex h-40 flex-col items-center justify-center">
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
        </Link>
    )
}