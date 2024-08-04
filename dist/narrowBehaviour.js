import { containsEllipsis, createEllipsis, getLastPage, isEllipsis, isNav, isPageWithNumber, compositionMatches, compositionMatchesEnd, } from './compositionItem.js';
import { findLastIndex } from './helpers/util.js';
/**
 * @public
 */
export function* dropEllipsis(initialComposition, metaData) {
    const indicesToDrop = [];
    if (metaData?.appliedBehaviours?.includes(dropFirstAndLast)) {
        // 1, 2 => …, 2 => 2
        const firstPageIndex = initialComposition.findIndex(item => isPageWithNumber(item, 1));
        if (compositionMatches(initialComposition, firstPageIndex, [1, 2])) {
            indicesToDrop.push(firstPageIndex);
        }
        // n-1, n => n-1, … => n-1
        /** last page */
        const n = getLastPage(initialComposition);
        const lastPageIndex = findLastIndex(initialComposition, item => isPageWithNumber(item, n));
        if (compositionMatchesEnd(initialComposition, lastPageIndex, [n - 1, n])) {
            indicesToDrop.push(lastPageIndex);
        }
    }
    if (containsEllipsis(initialComposition) || indicesToDrop.length > 0) {
        yield initialComposition.filter((item, index) => !isEllipsis(item) && !indicesToDrop.includes(index));
    }
}
/**
 * @public
 */
export function* dropNav(initialComposition) {
    yield initialComposition.filter(item => !isNav(item));
}
/**
 * @public
 */
export function* dropFirstAndLast(initialComposition, metaData) {
    const ellipsisDropped = metaData?.appliedBehaviours?.includes(dropEllipsis);
    let composition = initialComposition.slice();
    /**
     * normal
     * 1*                 1*
     * 1, 2*              1, 2*
     * 1, 2, 3*           1, 2, 3*
     * 1, 2, 3, 4*        …, 3, 4*
     * 1, …, p, p+1*      …, p, p+1* (p>=4)
     *
     * after dropEllipsis
     * 1*                 1*
     * 1, 2*              1, 2*
     * 1, 2, 3*           2, 3*
     * 1, 2, 3, 4*        3, 4*
     * 1, p, p+1*         p, p+1  (p>=4)
     */
    const firstPageIndex = composition.findIndex(item => isPageWithNumber(item, 1));
    if (ellipsisDropped) {
        if (compositionMatches(composition, firstPageIndex, [1, 2, 3, '*'])) {
            composition.splice(firstPageIndex, 2);
        }
        else if (compositionMatches(composition, firstPageIndex, [1, '#', '*'])) {
            composition.splice(firstPageIndex, 1);
        }
    }
    else {
        if (compositionMatches(composition, firstPageIndex, [1, 2, 3, '*'])) {
            composition.splice(firstPageIndex, 2, createEllipsis('L'));
        }
        else if (compositionMatches(composition, firstPageIndex, [1, '…', '#'])) {
            composition.splice(firstPageIndex, 1);
        }
    }
    /** last page */
    const n = getLastPage(composition);
    const lastPageIndex = findLastIndex(composition, item => isPageWithNumber(item, n));
    if (ellipsisDropped) {
        if (compositionMatchesEnd(composition, lastPageIndex, ['*', n - 2, n - 1, n])) {
            composition.splice(lastPageIndex - 1, 2);
        }
        else if (compositionMatchesEnd(composition, lastPageIndex, ['*', '#', n])) {
            composition.splice(lastPageIndex, 1);
        }
    }
    else {
        if (compositionMatchesEnd(composition, lastPageIndex, ['*', n - 2, n - 1, n])) {
            composition.splice(lastPageIndex - 1, 2, createEllipsis('R'));
        }
        else if (compositionMatchesEnd(composition, lastPageIndex, ['#', '…', n])) {
            composition.splice(lastPageIndex, 1);
        }
    }
    if (initialComposition.length !== composition.length) {
        yield composition;
    }
}
/**
 * @public
 */
export function* dropEllipsisThenNav(initialComposition) {
    if (containsEllipsis(initialComposition)) {
        yield initialComposition.filter(item => !isEllipsis(item) && !isNav(item));
        yield initialComposition.filter(item => !isEllipsis(item));
    }
    else {
        yield initialComposition.filter(item => !isNav(item));
    }
}
/**
 * @public
 */
export function* dropNavThenEllipsis(initialComposition) {
    if (containsEllipsis(initialComposition)) {
        yield initialComposition.filter(item => !isEllipsis(item) && !isNav(item));
    }
    yield initialComposition.filter(item => !isNav(item));
}
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
export const combine = (...behaviours) => initialComposition => combineRecursive(behaviours, [], initialComposition);
function* combineRecursive(behaviours, previousBehaviours, initialComposition) {
    // if no behaviours then we are done
    if (behaviours.length === 0)
        return;
    const [firstBehaviour, ...remainingBehaviours] = behaviours;
    const firstBehaviourCompositions = firstBehaviour(initialComposition, {
        appliedBehaviours: previousBehaviours,
    });
    const firstResult = firstBehaviourCompositions.next();
    if (firstResult.done) {
        // if this behaviour did not yield anything then just move on to the next behaviour
        yield* combineRecursive(remainingBehaviours, [...previousBehaviours, firstBehaviour], initialComposition);
    }
    else {
        const firstComposition = firstResult.value;
        // the first composition will be the most reduced
        // this will be the composition for lower priority behaviours to
        // be applied on top of
        yield* combineRecursive(remainingBehaviours, [...previousBehaviours, firstBehaviour], firstComposition);
        // then yield this composition without any other behaviours applied
        yield firstComposition;
        // then yield the remaining compositions from this behaviour
        yield* firstBehaviourCompositions;
    }
}
