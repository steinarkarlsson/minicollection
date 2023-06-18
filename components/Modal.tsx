import MuiModal from '@mui/material/Modal';
import {figureState, modalState} from "../atoms/modalAtom";
import {useRecoilState} from "recoil";
import {XMarkIcon} from "@heroicons/react/20/solid";
import {Character, Faction, Figure, Print, ReleaseWave, Set, Terrain} from "../typings";

interface Props {
    figure: Figure
    sets: Set[]
    character: Character[]
    faction: Faction[]
    releaseWaves: ReleaseWave
}

function Modal({faction}: Props) {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [figure] = useRecoilState(figureState)

    const handleClose = () => {
        setShowModal(false)
    }

    return <MuiModal open={showModal} onClose={handleClose}>
        <>
            <button onClick={handleClose}
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
                <XMarkIcon className="h-6 w-6"/>
            </button>
            <div>
                <p>{figure?.mainName}</p>

            </div>
        </>
    </MuiModal>
}

export default Modal