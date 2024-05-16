import {atom} from 'recoil'
import {GridFigure} from '../typings.d'

export const modalState = atom({
    key: 'modalState',
    default: false,
})

export const figureState = atom<GridFigure | null>({
    key: 'figureState',
    default: null,
})