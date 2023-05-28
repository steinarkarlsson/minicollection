import Image from "next/image";
import {Figure} from "../typings";

interface Props {
    figure: Figure
}

function MiniCard({figure}:Props){
    return (
        <div className="relative h-28 min-w-[180px]">
        <Image
            src={`https://storage.googleapis.com/minicollection`+ figure.image}
            className="rounded-sm object-cover md:rounded"
            alt=""
            width={200}
            height={100}
        />
            <h3>{figure.mainName}</h3>
            <h4>{figure.faction}</h4>
    </div>
    )
}

export default MiniCard