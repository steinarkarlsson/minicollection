'use client'

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Terrain} from '../../../typings';
import Spinner from "../../../components/Spinner";
import {SetDetailsTable} from "../../../components/detailsModal/SetDetailsTable";
import {getTerrainDetails} from "../../../lib/sanityQueries";
import {usePathname} from "next/navigation";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [terrain, setTerrain] = useState<Terrain>();
    const pathname = usePathname()

    const id = pathname.split('/').pop();

    useEffect(() => {
        setIsLoading(true)
        id ? getTerrainDetails(id).then((res) => {
            setTerrain(res)
            setIsLoading(false)
        }) : null;
    }, [id]);

    return (
        <>
            {isLoading ? <Spinner/> :
                <div className="flex flex-col px-6 text-left max-h-full lg:mt-24">
                    {isLoading ? <Spinner/> :
                        <>
                            <div className='flex'>
                                <p className="text-2xl font-bold">{terrain?.mainName}</p>
                            </div>
                            <div
                                className='flex flex-col justify-center lg:space-x-10 lg:flex-row'>
                                {terrain && terrain.image?.asset ? (
                                    <Image
                                        src={`https://cdn.sanity.io/images/4llymfg7/production/${terrain.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                        alt={terrain.mainName}
                                        width={400}
                                        height={400}
                                        style={{
                                            objectFit: 'contain',
                                            width: '400px',
                                            height: '400px',
                                            paddingTop: '20px'
                                        }}
                                    />
                                ) : null}
                                <div className='flex'>
                                    <SetDetailsTable set={terrain}/>
                                </div>
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
        ;

}