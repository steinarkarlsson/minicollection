import Image from "next/image";
import {Figure} from "../typings";
import {useRecoilState} from "recoil";
import {figureState, modalState} from "../atoms/modalAtom";
interface Props {
    figure: Figure
}

function MiniCard({figure}: Props) {

    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentFigure, setCurrentFigure] = useRecoilState(figureState)

    if (figure.image && figure.image.asset) {
        return (
            <div
                className="m-2 w-60 border-2 border-gray-700 rounded-md shadow-lg hover:bg-gray-800 transition delay-75 duration-400 ease-in-out"
                onClick={() => {
                    setCurrentFigure(figure)
                    setShowModal(true)
                }}
            >
                <div className="h-60 flex flex-col justify-center items-center">
                    <div className="flex justify-center">
                        <Image
                            src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                            className="h-60 w-auto"
                            alt=""
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
                <div className="px-6">
                    <div className="text-m text-wrap">
                        {figure.mainName}
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-400">
                    faction
                </span>
                </div>
                <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-400">
                    {figure.material}
                </span>
                </div>
            </div>
        )
    } else {
        return (
            <div
                className="m-2 w-60 border-2 border-gray-700 rounded-md shadow-lg hover:bg-gray-800 transition delay-75 duration-400 ease-in-out"
                onClick={() => {
                    setCurrentFigure(figure)
                    setShowModal(true)
                }}
            >
                <div className="h-60 flex flex-col justify-center items-center">
                    <div className="flex justify-center">

                    </div>
                </div>
                <div className="px-6">
                    <div className="text-m text-wrap">
                        {figure.mainName}
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-400">
                    faction
                </span>
                </div>
                <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-400">
                    {figure.material}
                </span>
                </div>
            </div>
        )
    }
}
export default MiniCard