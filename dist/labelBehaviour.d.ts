import type { ReactNode } from 'react';
import { PaginationItem } from './paginationItem.js';
/**
 * @public
 */
export declare type LabelBehaviour = (item: PaginationItem) => ReactNode;
/**
 * @public
 */
export declare function defaultLabelBehaviour({ a11yLabel, label, }: PaginationItem): ReactNode;
/**
 * @public
 */
export declare function srOnlySpanLabel({ a11yActiveLabel, srOnlyClassName, }?: {
    a11yActiveLabel?: string;
    srOnlyClassName?: string;
}): (item: PaginationItem) => ReactNode;
