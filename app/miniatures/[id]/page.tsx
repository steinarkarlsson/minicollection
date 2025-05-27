'use client'

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {FigureFull} from '../../../typings';
import Spinner from "../../../components/Spinner";
import {getFigureDetails} from "../../../lib/sanityQueries";
import {usePathname} from "next/navigation";
import DetailsTable from "../../../components/detailsModal/DetailsTable";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [figure, setFigure] = useState<FigureFull>();
    const pathname = usePathname()

    const id = pathname.split('/').pop();

    useEffect(() => {
        setIsLoading(true)
        id ? getFigureDetails(id).then((res) => {
            setFigure(res[0])
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
                                <p className="text-2xl font-bold">{figure?.mainName}</p>
                            </div>
                            <div
                                className='flex flex-col justify-center items-center justify-items-stretch lg:space-x-10 lg:flex-row'>
                                {figure && figure.image?.asset ? (
                                    <Image
                                        src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                        alt={figure.mainName}
                                        width={200}
                                        height={400}
                                        style={{
                                            objectFit: 'contain',
                                            width: '200px',
                                            height: '400px',
                                            paddingTop: '20px'
                                        }}
                                    />
                                ) : null}
                                <div className='flex'>
                                    <DetailsTable figure={figure}/>
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