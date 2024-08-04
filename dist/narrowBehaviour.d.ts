import { CompositionItem } from './compositionItem.js';
/**
 * NarrowBehaviours will yield their narrowest composition first and then
 * yield a less narrow composition
 * They should not yield the initialComposition
 * @public
 */
export declare type NarrowBehaviour = (composition: ReadonlyArray<CompositionItem>, metaData?: NarrowBehaviourMetaData) => Generator<CompositionItem[]>;
declare type NarrowBehaviourMetaData = {
    appliedBehaviours?: NarrowBehaviour[];
};
/**
 * @public
 */
export declare function dropEllipsis(initialComposition: ReadonlyArray<CompositionItem>, metaData?: NarrowBehaviourMetaData): Generator<CompositionItem[], void, unknown>;
/**
 * @public
 */
export declare function dropNav(initialComposition: ReadonlyArray<CompositionItem>): Generator<CompositionItem[], void, unknown>;
/**
 * @public
 */
export declare function dropFirstAndLast(initialComposition: ReadonlyArray<CompositionItem>, metaData?: NarrowBehaviourMetaData): Generator<CompositionItem[], void, unknown>;
/**
 * @public
 */
export declare function dropEllipsisThenNav(initialComposition: ReadonlyArray<CompositionItem>): Generator<CompositionItem[], void, unknown>;
/**
 * @public
 */
export declare function dropNavThenEllipsis(initialComposition: ReadonlyArray<CompositionItem>): Generator<CompositionItem[], void, unknown>;
/**
 * When combining NarrowBehaviours the behaviours will be applied in order:
 * the first behaviour will be used before subsequent behaviours
 * Compositions yielded from combineBehaviours will initially have
 * all behaviours applied in their narrowest form and then work through
 * each behaviour in turn (from last to first)
 */
/**
 * Combine two or more narrowBehaviours
 * @public
 */
export declare const combine: (...behaviours: ReadonlyArray<NarrowBehaviour>) => NarrowBehaviour;
export {};
