import {GridFigure} from "../typings";
import MiniCard from "./MiniCard";

interface Props {
    figures: GridFigure[]
}

function MiniCardGrid({figures}: Props) {
    return (
        <>
                <div className="flex">
                    <div className="flex justify-center flex-wrap">
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