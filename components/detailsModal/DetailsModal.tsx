import MuiModal from '@mui/material/Modal';
import {itemState, modalState} from "../../atoms/modalAtom";
import {useRecoilState} from "recoil";
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Figure, Set} from '../../typings';
import DetailsTable from './DetailsTable';
import Spinner from "../Spinner";
import SetDetailsTable from "./SetDetailsTable";
import IncludedItemsGrid from "./IncludedItemsGrid";

interface DetailsModalProps {
    type: 'figure' | 'set'
}

type ModalType = Figure | Set | null;

function DetailsModal({type}: DetailsModalProps) {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [selectedItem] = useRecoilState(itemState);
    const [detailedItem, setdetailedItem] = useState<ModalType>(null);
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
                    {/*Opaque overlay*/}
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 "></div>

                    {/*Modal window*/}
                    <div
                        className="flex flex-container relative justify-center items-center bg-gray-950 rounded shadow-lg z-50 max-h-full m-5 pt-20 lg:pt-0 lg:w-3/5 lg:h-4/5 overflow-y-auto p-4">
                        <div className="flex flex-col px-6 text-left max-h-full">
                            {isLoading ? <Spinner/> :
                                <>
                                    <div className='flex'>
                                        <p className="text-2xl font-bold">{detailedItem?.mainName}</p>
                                    </div>
                                    <div
                                         className='flex flex-col justify-center lg:space-x-10 lg:flex-row'>
                                        {detailedItem && detailedItem.image?.asset ? (
                                            <Image
                                                src={`https://cdn.sanity.io/images/4llymfg7/production/${detailedItem.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                                alt={detailedItem.mainName}
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
                                            {type === 'set' ? <SetDetailsTable set={detailedItem as Set}/> :
                                                <DetailsTable figure={detailedItem}/>
                                            }
                                        </div>
                                    </div>
                                    {type === 'set' ? <IncludedItemsGrid item={detailedItem as Set}/> : null}
                                    <button
                                        className="modal-close fixed lg:absolute top-8 right-14 px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200"
                                        onClick={handleClose}>Close
                                    </button>
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