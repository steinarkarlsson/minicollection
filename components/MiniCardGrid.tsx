import {GridFigure} from "../typings";
import MiniCard from "./MiniCard";
import {useEffect, useState} from 'react';
import {getFigureGridInfo} from '../lib/sanityQueries';

interface Props {
    figures: GridFigure[]
}

function useScrollToEnd(callback: () => void) {
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            const botttomPosition = document.documentElement.scrollHeight - window.innerHeight - 50;

            if (currentPosition >= botttomPosition) {
                callback()
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
}


function MiniCardGrid({figures}: Props) {
    const [displayedFigures, setDisplayedFigures] = useState<GridFigure[]>([])
    const [count, setCount] = useState<number>(32)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        getFigureGridInfo('', '', '', count).then((figures) => {
            setDisplayedFigures(figures)
            setIsLoading(false)
        })
    }, [count]);

    useScrollToEnd(() => {
        setIsLoading(true)
        setCount(prevCount => prevCount + 32)
    })

    return (
                    <div className="flex flex-wrap justify-center">
                        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><p>{isLoading ? 'IsLoading': 'Not loading' }</p></div>
                        {displayedFigures.map((figure) => (
                            <MiniCard figure={figure} key={
                                figure.mainName + figure.releaseWave?.name
                            }/>
                        ))}
                    </div>
    )
}

export default MiniCardGrid