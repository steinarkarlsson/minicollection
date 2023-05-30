import {atom} from 'recoil'
import {Figure} from '../typings.d'

export const modalState = atom({
    key: 'modalState',
    default: false,
})

export const figureState = atom<Figure | null>({
    key: 'figureState',
    default: null,
})