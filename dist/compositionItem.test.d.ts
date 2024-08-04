import { CompositionItem } from './compositionItem.js';
declare type CompositionShorthandItem = '<' | `<${number}` | '>' | `>${number}` | number | `*${number}` | '…L' | '…R';
export declare const shorthandOf: (received: CompositionItem[] | void) => any;
export declare const fromShorthand: (shorthand: CompositionShorthandItem[]) => CompositionItem[];
export {};
