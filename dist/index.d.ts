import type { ReactNode, FC } from 'react';
import { NarrowBehaviour } from './narrowBehaviour.js';
import { LabelBehaviour } from './labelBehaviour.js';
export * from './narrowBehaviour.js';
export * from './presets.js';
export * from './labelBehaviour.js';
/**
 * @public
 */
declare const ResponsivePaginationComponent: FC<ResponsivePaginationProps>;
export default ResponsivePaginationComponent;
/**
 * @public
 */
export declare type ResponsivePaginationProps = {
    current: number;
    total: number;
    onPageChange: (page: number) => void;
    maxWidth?: number;
    narrowBehaviour?: NarrowBehaviour;
    className?: string;
    extraClassName?: string;
    pageItemClassName?: string;
    pageLinkClassName?: string;
    activeItemClassName?: string;
    disabledItemClassName?: string;
    disabledLinkClassName?: string;
    navClassName?: string;
    previousClassName?: string;
    nextClassName?: string;
    previousLabel?: string | ReactNode;
    nextLabel?: string | ReactNode;
    ariaPreviousLabel?: string;
    ariaNextLabel?: string;
    renderNav?: boolean;
    ariaCurrentAttr?: boolean;
    linkHref?: 'hash' | 'omit';
    labelBehaviour?: LabelBehaviour;
};
