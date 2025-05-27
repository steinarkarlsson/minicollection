'use client'

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {SetFull} from '../../../typings';
import Spinner from "../../../components/Spinner";
import {SetDetailsTable} from "../../../components/detailsModal/SetDetailsTable";
import {IncludedItemsGrid} from "../../../components/detailsModal/IncludedItemsGrid";
import {getSetDetails} from "../../../lib/sanityQueries";
import {usePathname} from "next/navigation";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [set, setSet] = useState<SetFull>();
    const pathname = usePathname()

    const id = pathname.split('/').pop();

    useEffect(() => {
        setIsLoading(true)
        id ? getSetDetails(id).then((res) => {
            setSet(res)
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
                                <p className="text-2xl font-bold">{set?.mainName}</p>
                            </div>
                            <div
                                className='flex flex-col justify-center lg:space-x-10 lg:flex-row'>
                                {set && set.image?.asset ? (
                                    <Image
                                        src={`https://cdn.sanity.io/images/4llymfg7/production/${set.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                        alt={set.mainName}
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
                                    <SetDetailsTable set={set}/>
                                </div>
                            </div>
                            <IncludedItemsGrid item={set}/>
                        </>
                    }
                </div>
            }
        </>
    )
        ;

}