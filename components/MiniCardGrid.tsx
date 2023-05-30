import {Figure} from "../typings";
import MiniCard from "./MiniCard";
interface Props {
    title: string
    figures: Figure[]
}
function MiniCardGrid({title,figures}:Props) {
    return (
        <div className="space-y-0.5 md:space-y-2 pt-16">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
            <div className="group relative md:-ml-1">
                <div className="border-2 border-white-1000 flex flex-wrap space-x-0.5 md:space-x-2.5 md:p-2">
                    {figures.map((figure) => (
                            <MiniCard
                                key={figure.mainName}
                                figure={figure}
                            />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MiniCardGrid