import { atom } from 'recoil';
import { FigureFull, SetFull } from '../typings';

export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
});

export const figureState = atom<FigureFull | null>({
    key: 'figureState',
    default: null,
});

export const itemState = atom<FigureFull | SetFull | null>({
    key: 'itemState',
    default: null,
});