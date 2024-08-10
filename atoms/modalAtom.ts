import { atom } from 'recoil';
import { GridFigure } from '../typings';

export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
});

export const figureState = atom<GridFigure | null>({
    key: 'figureState',
    default: null,
});