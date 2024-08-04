import { useState, useCallback } from 'react';
import { getElementWidth, getNonContentWidth } from '../helpers/style.js';
import { createActivePage, createEllipsis, createNavNext, createNavPrevious, createPage, } from '../compositionItem.js';
export function useWidthCalculator() {
    const [widthCalculator, setWidthCalculator] = useState(undefined);
    const clearCache = useCallback(() => setWidthCalculator(undefined), []);
    if (!widthCalculator) {
        return {
            metricsRender: {
                items: itemsToMeasure,
                ref(containerElement) {
                    const metrics = getMetricsFromMetricsRender(containerElement);
                    metrics && setWidthCalculator(() => createWidthCalculator(metrics));
                },
            },
            clearCache,
        };
    }
    return {
        widthCalculator,
        clearCache,
    };
}
function getMetricsFromMetricsRender(containerElement) {
    if (!containerElement)
        return;
    return [
        getNonContentWidth(containerElement),
        ...Array.from(containerElement.children).map(getElementWidth),
    ];
}
function createWidthCalculator([outerFrameWidth, pageSingleDigitWidth, pageDoubleDigitWidth, activeSingleDigitWidth, activeDoubleDigitWidth, navPreviousEnabledWidth, navPreviousDisabledWidth, navNextEnabledWidth, navNextDisabledWidth, ellipsisWidth,]) {
    const getItemWidth = ({ type, page }) => {
        switch (type) {
            case 'page':
                return (pageSingleDigitWidth +
                    (pageDoubleDigitWidth - pageSingleDigitWidth) *
                        (page.toString().length - 1));
            case 'active':
                return (activeSingleDigitWidth +
                    (activeDoubleDigitWidth - activeSingleDigitWidth) *
                        (page.toString().length - 1));
            case '<':
                return page !== undefined
                    ? navPreviousEnabledWidth
                    : navPreviousDisabledWidth;
            case '>':
                return page !== undefined ? navNextEnabledWidth : navNextDisabledWidth;
            case '…L':
            case '…R':
                return ellipsisWidth;
            default:
                const _exCheck = type;
                return _exCheck;
        }
    };
    return (items) => outerFrameWidth + items.reduce((acc, item) => acc + getItemWidth(item), 0);
}
const itemsToMeasure = [
    createPage(8),
    createPage(88),
    createActivePage(8),
    createActivePage(88),
    createNavPrevious(0),
    createNavPrevious(undefined),
    createNavNext(0),
    createNavNext(undefined),
    createEllipsis('L'),
];