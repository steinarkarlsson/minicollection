import {GridFigure} from "../typings";
import MiniCard from "./MiniCard";

interface Props {
    figures: GridFigure[]
}

function MiniCardGrid({figures}: Props) {
    return (
        <>
                <div className="flex">
                    <div className="flex flex-wrap justify-center">
                        {figures.map((figure) => (
                            (<MiniCard
                                key={`${figure.mainName}-${figure.releaseWave?.name}`}
                                figure={figure}
                            />)
                        ))}
                    </div>
                </div>
        </>
    )
}

export default MiniCardGrid