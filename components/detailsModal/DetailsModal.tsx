import MuiModal from '@mui/material/Modal';
import {itemState, modalState} from "../../atoms/modalAtom";
import {useRecoilState} from "recoil";
import {Grid} from '@mui/material';
import Image from 'next/image';
import {getFigureDetails} from '../../lib/sanityQueries';
import {useEffect, useState} from 'react';
import {Figure} from '../../typings';
import DetailsTable from './DetailsTable';
import Spinner from "../Spinner";
import SetDetailsTable from "./SetDetailsTable";
import IncludedItemsGrid from "./IncludedItemsGrid";

interface DetailsModalProps {
    type: 'figure' | 'set'
}

function DetailsModal({type}: DetailsModalProps) {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [selectedItem] = useRecoilState(itemState);
    const [detailedItem, setdetailedItem] = useState<Figure | Set | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true)
        setdetailedItem(selectedItem);
        setIsLoading(false)
    }, [selectedItem]);

    const handleClose = () => {
        setShowModal(false);
        setdetailedItem(null)
    };
    return (
        <MuiModal open={showModal} onClose={handleClose}>
            <>
                <div className="modal w-full h-full top-0 left-0 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 "></div>
                    <div
                        className="flex flex-container relative justify-center items-center bg-gray-950 rounded shadow-lg z-50 max-h-full m-5 lg:w-3/5 lg:h-4/5 overflow-y-auto p-4">
                        <div className="px-6 text-left overflow-y-auto max-h-full">
                            {isLoading ? <Spinner/> :
                                <>
                                    <div className='flex pt-12'>
                                        <p className="text-2xl font-bold">{detailedItem?.mainName}</p>
                                    </div>
                                    <Grid container spacing={2} className='flex flex-col lg:flex-row'>
                                        {detailedItem && detailedItem.image?.asset ? (
                                            <Image
                                                src={`https://cdn.sanity.io/images/4llymfg7/production/${detailedItem.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                                alt={detailedItem.mainName}
                                                width={600}
                                                height={600}
                                                style={{objectFit: 'contain', width: '300px', height: '400px', paddingTop:'20px'}}
                                            />
                                        ) : null}
                                        <Grid item className='flex'>
                                            {type === 'set' ? <SetDetailsTable set={detailedItem}/> : <DetailsTable figure={detailedItem}/>
                                            }
                                        </Grid>
                                    </Grid>
                                    {type === 'set' ? <IncludedItemsGrid item={detailedItem}/> : null}
                                    <div className="mt-4 pb-4 flex justify-end">
                                        <button
                                            className="modal-close absolute top-8 right-14 px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200"
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