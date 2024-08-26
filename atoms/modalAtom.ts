import { atom } from 'recoil';
import { GridFigure, Set } from '../typings';

export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
});

export const figureState = atom<GridFigure | Set | null>({
    key: 'figureState',
    default: null,
});