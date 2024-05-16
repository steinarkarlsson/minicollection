import Image from "next/image";
import {GridFigure} from "../typings";

interface Props {
    figure: GridFigure
}

function MiniCard({figure}: Props) {

    return (
        <div
            className="m-2 pt-2 w-60 mx-2 border-2 border-gray-700 rounded-md shadow-lg hover:bg-gray-900 transition delay-75 duration-400 ease-in-out"
        >
            <div className="h-60 flex flex-col justify-center items-center">
                <div className="flex justify-center">
                    {figure.image && figure.image.asset ? (
                        <Image
                            src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                            className="h-60 w-auto"
                            alt=""
                            width={500}
                            height={500}
                        />
                    ) : null}

                </div>
            </div>
            <div className="px-6">
                <div className="text-m text-wrap">
                    {figure.mainName}
                </div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-400">
                    {figure.faction?.name}
                </span>
            </div>
            <div className="px-6 pt-4 pb-2">
                    <span
                        className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-400">
                    {figure.releaseWave?.name}
                </span>
            </div>
        </div>
    )
}

export default MiniCard