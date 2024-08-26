import { atom } from 'recoil';
import { Figure, Set } from '../typings';

export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
});

export const figureState = atom<Figure | null>({
    key: 'figureState',
    default: null,
});

export const itemState = atom<Figure | Set | null>({
    key: 'itemState',
    default: null,
});