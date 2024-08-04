import type { ReactNode } from 'react';
import { CompositionItem } from './compositionItem.js';
declare type BaseItem = {
    type: string;
    key: string;
    label: string | ReactNode;
    a11yLabel?: string;
};
declare type ClickableItem = BaseItem & {
    gotoPage: number;
    active?: boolean;
};
declare type NonClickableItem = BaseItem & {
    gotoPage: undefined;
    a11yHidden?: boolean;
};
declare type PageItem = ClickableItem & {
    type: 'page';
};
declare type NavItem = ClickableItem & {
    type: NavType;
};
declare type NavDisabledItem = NonClickableItem & {
    type: NavType;
};
declare type EllipsisItem = NonClickableItem & {
    type: 'ellipsis';
};
export declare type PaginationItem = NavItem | NavDisabledItem | EllipsisItem | PageItem;
export declare type NavType = 'next' | 'previous';
export declare function compositionToPaginationItems(compositionItems: CompositionItem[], options?: {
    previousLabel?: string | ReactNode;
    nextLabel?: string | ReactNode;
    ariaPreviousLabel?: string;
    ariaNextLabel?: string;
}): PaginationItem[];
export {};
