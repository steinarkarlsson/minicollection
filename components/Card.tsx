//@ts-nocheck
'use client'
import Image from "next/image";
import {SanityImage} from "../typings";
import {useRecoilState} from "recoil";
import {modalState} from "../atoms/modalAtom";
import Link from "next/link";
import CardBadge from "./CardBadge";

interface Props {
    type: 'miniature' | 'set' | 'terrain' | 'print' | 'accessory'
    id: string
    name: string
    image?: SanityImage
    detail1?: { name: string }[] | { name: string } | undefined
    detail2?: { name: string }[] | { name: string } | undefined
    badgeType?: 'unreleased' | 'released' | 'announced' | null
}

function Card({type, id, name, image, detail1, detail2, badgeType}: Props) {
    const [, setShowModal] = useRecoilState(modalState);

    const handleClick = () => {
        setShowModal(true);
    };

    const cardWidth = type === 'set' || type === 'terrain' || type === 'accessory' ? 'w-80' : 'w-60';
    const cardHeight = type === 'set' || type === 'terrain' || type === 'accessory' ? 'h-60' : 'h-80';
    const path =
        type === 'miniature' ? 'miniatures' :
        type === 'accessory' ? 'accessories' :
        type === 'set' ? 'sets' :
        type === 'terrain' ? 'terrain' :
        type === 'print' ? 'print' : type;

    //console.log('Rendering card with props: type:', type, 'id:', id, 'name:', name, 'detail1:', detail1, 'detail2:', detail2)
    // console.log(`detail1 - isArray:${Array.isArray(detail1)}, typeof:${typeof detail1} value:`, detail1)
    // console.log(`detail2 - isArray:${Array.isArray(detail2)}, typeof:${typeof detail2} value:`, detail2)

    return (
        <Link href={`/${path}/${id}`}>
            <div
                className={`group relative m-2 mx-2 ${cardWidth} overflow-hidden rounded-md pt-2 shadow-xl hover:shadow-yellow-200 transition delay-75 ease-in-out duration-600 border-2  border-gray-800 hover:border-white`}
                onClick={handleClick}
            >
                <div className="absolute top-0 right-0 p-5">
                    <CardBadge type={badgeType}/>
                </div>

                <div className={`flex flex-col ${cardHeight} items-center justify-center`}>
                    {image && image.asset ? (
                        <Image
                            src={`https://cdn.sanity.io/images/4llymfg7/production/${image.asset._ref.slice(6).slice(0, -4)}.png`}
                            alt=""
                            width={136}
                            height={140}
                            style={{objectFit: 'contain', width: 'auto', maxHeight: '100%'}}/>
                    ) : null}
                </div>
                <div className="px-6 text-m text-wrap">
                    {name}
                </div>
                <div className="flex flex-row pt-4 pb-2">
                    {Array.isArray(detail1) ?
                        detail1.map((property, index) => (
                            <div key={index} className="px-1">
                                <span
                                    className="inline-block w-auto whitespace-nowrap rounded-full bg-gray-800 px-3 pb-1 text-xs font-semibold text-gray-400">
                                    {property.name}
                                </span>
                            </div>
                            )) : null
                    }
                    {typeof detail1 === 'object' && detail1 !== null && name in detail1 ?
                        <div key={detail1[name]} className="px-1">
                                <span
                                    className="inline-block w-auto whitespace-nowrap rounded-full bg-gray-800 px-3 pb-1 text-xs font-semibold text-gray-400">
                                    {detail1[name]}
                                </span>
                        </div> : null
                    }
                </div>
                <div className="flex flex-row pt-4 pb-2">
                    {Array.isArray(detail2) ?
                        detail2.map((property, index) => (
                            <div key={index} className="px-1">
                                <span
                                    className="inline-block w-auto whitespace-nowrap rounded-full bg-gray-800 px-3 pb-1 text-xs font-semibold text-gray-400">
                                    {property.name}
                                </span>
                            </div>
                        )) : null
                    }
                    {typeof detail2 === 'object' && detail2 !== null && name in detail2 ?
                        <div key={detail2[name]} className="px-1">
                                <span
                                    className="inline-block w-auto whitespace-nowrap rounded-full bg-gray-800 px-3 pb-1 text-xs font-semibold text-gray-400">
                                    {detail2[name]}
                                </span>
                        </div> : null
                    }
                </div>
            </div>
        </Link>
    );
}

export default Card;