import {Figure} from "../typings";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import MiniCard from "./MiniCard";

interface Props {
    title: string
    figures: Figure[]
}
function MiniCardGrid({title,figures}:Props) {
    return (
        <div className="h-40 space-y-0.5 md:space-y-2">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100"/>

                <div className="flex items-center space-x-0.5 md:space-x-2.5 md:p-2">
                    {figures.map((figure) => (
                        <MiniCard key={figure.mainName} figure={figure}/>
                    ))}
                </div>

                <ChevronRightIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100"/>
            </div>
        </div>
    )
}

export default MiniCardGrid