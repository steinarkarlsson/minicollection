'use client'

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Accessory} from '../../../typings';
import Spinner from "../../../components/Spinner";
import {SetDetailsTable} from "../../../components/detailsModal/SetDetailsTable";
import {getAccessoryDetails} from "../../../lib/sanityQueries";
import {usePathname} from "next/navigation";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [accessory, setAccessory] = useState<Accessory>();
    const pathname = usePathname()

    const id = pathname.split('/').pop();

    useEffect(() => {
        setIsLoading(true)
        id ? getAccessoryDetails(id).then((res) => {
            setAccessory(res)
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
                                <p className="text-2xl font-bold">{accessory?.mainName}</p>
                            </div>
                            <div
                                className='flex flex-col justify-center lg:space-x-10 lg:flex-row'>
                                {accessory && accessory.image?.asset ? (
                                    <Image
                                        src={`https://cdn.sanity.io/images/4llymfg7/production/${accessory.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                        alt={accessory.mainName}
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
                                    <SetDetailsTable set={accessory}/>
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