import { atom } from 'recoil';
import { DetailedFigure, Set } from '../types';

export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
});

export const figureState = atom<DetailedFigure | null>({
    key: 'figureState',
    default: null,
});

export const itemState = atom<DetailedFigure | Set | null>({
    key: 'itemState',
    default: null,
});