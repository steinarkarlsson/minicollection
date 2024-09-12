'use client'

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {DetailedFigure} from '../../../types';
import Spinner from "../../../components/Spinner";
import {getFigureDetails} from "../../../lib/sanityQueries";
import {usePathname, useRouter} from "next/navigation";
import DetailsTable from "../../../components/detailsModal/DetailsTable";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [figure, setFigure] = useState<DetailedFigure>();
    const pathname = usePathname();
    const router = useRouter();

    const id = pathname?.split('/').pop();

    useEffect(() => {
        setIsLoading(true);
        id ? getFigureDetails(id).then((res) => {
            setFigure(res[0]);
            setIsLoading(false);
        }) : null;
    }, [id]);

    const handleBack = () => {
        const searchParams = sessionStorage.getItem('searchParams');
        if (searchParams) {
            const params = new URLSearchParams(searchParams);
            router.push(`/?${params.toString()}`);
        } else {
            router.back();
        }
    };

    return (
        <>
            {isLoading ? <div className="flex items-center justify-center min-h-96">
                    <Spinner/>
                </div> :
                <div className='border-2 border-gray-600'>
                    <div className="flex justify-center px-6 text-left max-h-full lg:mt-24">
                        <div className="flex flex-col lg:w-1/2">
                            <button onClick={handleBack} className="flex lg:text-lg mb-4 hover:underline">
                                ← Back
                            </button>
                            <div className='flex'>
                                <p className='text-4xl lg:text-6xl font-bold'>{figure?.mainName}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center lg:space-x-10 lg:flex-row'>
                                {figure && figure.image?.asset ? (
                                    <Image
                                        src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                        alt={figure.mainName}
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
                                    <DetailsTable figure={figure}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}