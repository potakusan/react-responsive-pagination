import { CompositionItem } from '../compositionItem.js';
export declare function useWidestComposition(narrowToWideCompositionsProvider: () => IterableIterator<CompositionItem[]>, maxWidth?: number): {
    items: CompositionItem[];
    ref: (element: Element | null) => void;
    visible: boolean;
    clearCache: () => void;
};
