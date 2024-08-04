import type { ReactNode } from 'react';
import { NarrowBehaviour } from '../narrowBehaviour.js';
export declare function usePaginationItems(inputCurrent: number, inputTotal: number, maxWidth: number | undefined, options?: {
    nextLabel?: string | ReactNode;
    previousLabel?: string | ReactNode;
    ariaNextLabel?: string;
    ariaPreviousLabel?: string;
    renderNav?: boolean;
    narrowBehaviour?: NarrowBehaviour;
}): {
    visible: boolean;
    items: import("../paginationItem.js").PaginationItem[];
    ref: (element: Element) => void;
    clearCache: () => void;
};
