import MuiModal from '@mui/material/Modal';
import {figureState, modalState} from "../../atoms/modalAtom";
import {useRecoilState} from "recoil";
import {Grid} from '@mui/material';
import Image from 'next/image';
import {getFigureDetails} from '../../lib/sanityQueries';
import {useEffect, useState} from 'react';
import {Figure} from '../../typings';
import DetailsTable from './DetailsTable';
import Spinner from "../Spinner";

function DetailsModal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [selectedGridFigure] = useRecoilState(figureState);
    const [detailedFigure, setDetailedFigure] = useState<Figure | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true)
        const figureDetails = getFigureDetails(`${selectedGridFigure?._id}`).then((figureDetails) => {
            setDetailedFigure(figureDetails[0]);
            setIsLoading(false)
        });
    }, [selectedGridFigure]);

    const handleClose = () => {
        setShowModal(false);
        setDetailedFigure(null)
    };
    return (
        <MuiModal open={showModal} onClose={handleClose}>
            <>
                <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 "></div>
                    <div
                        className="flex flex-container justify-center items-center bg-gray-950 rounded shadow-lg z-50 max-h-full overflow-y-auto m-5 lg:w-3/5 lg:h-3/5">
                        <div className="px-6 text-left">
                            {isLoading ? <Spinner/> :
                                <>
                                    <div className='flex pt-12'>
                                    <p className="text-2xl font-bold">{detailedFigure?.mainName}</p>
                                    </div>
                                    <Grid container spacing={2} className='flex flex-col lg:flex-row'>
                                        {detailedFigure && detailedFigure.image?.asset ? (
                                            <Image
                                                src={`https://cdn.sanity.io/images/4llymfg7/production/${detailedFigure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                                alt={detailedFigure.mainName}
                                                width={600}
                                                height={600}
                                                style={{objectFit: 'contain', width: '300px', height: '400px', paddingTop:'20px'}}
                                            />
                                        ) : null}
                                        <Grid item className='flex'>
                                            <DetailsTable figure={detailedFigure}/>
                                        </Grid>
                                    </Grid>
                                    <div className="mt-4 pb-4 flex justify-end">
                                        <button
                                            className="modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200"
                                            onClick={handleClose}>Close
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    )
        ;

}

export default DetailsModal;