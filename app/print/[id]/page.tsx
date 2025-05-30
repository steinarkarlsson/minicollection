'use client'

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {PrintFull} from '../../../typings';
import Spinner from "../../../components/Spinner";
import {SetDetailsTable} from "../../../components/detailsModal/SetDetailsTable";
import {getPrintDetails} from "../../../lib/sanityQueries";
import {usePathname} from "next/navigation";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [print, setPrint] = useState<PrintFull>();
    const pathname = usePathname()

    const id = pathname.split('/').pop();

    useEffect(() => {
        setIsLoading(true)
        id ? getPrintDetails(id).then((res) => {
            setPrint(res)
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
                                <p className="text-2xl font-bold">{print?.mainName}</p>
                            </div>
                            <div
                                className='flex flex-col justify-center lg:space-x-10 lg:flex-row'>
                                {print && print.image?.asset ? (
                                    <Image
                                        src={`https://cdn.sanity.io/images/4llymfg7/production/${print.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                        alt={print.mainName}
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
                                    <SetDetailsTable set={print}/>
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