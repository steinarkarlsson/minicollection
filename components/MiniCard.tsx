import Image from "next/image";
import {GridFigure} from "../typings";

interface Props {
    figure: GridFigure
}

function MiniCard({figure}: Props) {

    return (
        <div
            className="m-2 mx-2 w-60 rounded-md border-2 border-gray-700 pt-2 shadow-lg transition delay-75 ease-in-out duration-400 hover:bg-gray-900 overflow-hidden"
        >
            <div className="flex h-60 flex-col items-center justify-center">
                    {figure.image && figure.image.asset ? (
                        <Image
                            src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                            className="max-h-full w-full object-contain"
                            alt=""
                            width={236}
                            height={240}
                        />
                    ) : null}
            </div>
                <div className="px-6 text-m text-wrap">
                    {figure.mainName}
                </div>
            <div className="flex flex-row pt-4 pb-2">
                {figure.faction?.map((faction, index) => (
                    <div key={index} className="px-1">
                <span className="inline-block w-auto whitespace-nowrap rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-400">
                    {faction.name}
                </span>
                    </div>
                ))}
            </div>
            <div className="px-1 pt-4 pb-2">
                    <span
                        className="inline-block whitespace-nowrap rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-400">
                    {figure.releaseWave?.name}
                </span>
            </div>
        </div>
    )
}

export default MiniCard