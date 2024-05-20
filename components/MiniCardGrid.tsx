import {GridFigure} from "../typings";
import MiniCard from "./MiniCard";

interface Props {
    title: string
    figures: GridFigure[]
}

function MiniCardGrid({title, figures}: Props) {
    return (
        <>
            <div className="space-y-0.5 md:space-y-2 pt-16">
                <h2 className="w-56cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
                <div className="group relative md:-ml-1">
                    <div className="flex flex-wrap">
                        {figures.map((figure) => (
                            (<MiniCard
                                key={`${figure.mainName}-${figure.releaseWave?.name}`}
                                figure={figure}
                            />)
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniCardGrid