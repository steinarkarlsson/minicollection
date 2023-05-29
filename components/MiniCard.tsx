import Image from "next/image";
import {Figure} from "../typings";

interface Props {
    figure: Figure
}

function MiniCard({figure}:Props){
    return (
        <div className="w-55 h-70 rounded shadow-lg hover:bg-gray-800 transition delay-75 duration-400 ease-in-out">
        <Image
            src={`https://storage.googleapis.com/minicollection`+ figure.image}
            className="max-w-fit max-w-fit object-cover"
            alt=""
            width={200}
            height={100}
        />
        <div className="px-6 py-4">

            <div className="font-bold text-m mb-2 text-wrap">{figure.mainName}</div>
            <p className="text-gray-700 text-base"></p>
        </div>
            <div className="px-6 pt-4 pb-2">
            <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">{figure.faction}</span>
            </div>
            </div>
    )
}

export default MiniCard