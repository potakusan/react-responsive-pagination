declare type CompositionPage = {
    type: 'page';
    page: number;
};
declare type CompositionActivePage = {
    type: 'active';
    page: number;
};
declare type CompositionEllipsis = {
    type: '…L' | '…R';
    page: undefined;
};
declare type CompositionPrevious = {
    type: '<';
    page: number | undefined;
};
declare type CompositionNext = {
    type: '>';
    page: number | undefined;
};
export declare type CompositionItem = CompositionPage | CompositionActivePage | CompositionEllipsis | CompositionPrevious | CompositionNext;
export declare function createActivePage(page: number): CompositionActivePage;
export declare function createPage(page: number): CompositionPage;
export declare function createNavPrevious(page: number | undefined): CompositionPrevious;
export declare function createNavNext(page: number | undefined): CompositionNext;
export declare function createEllipsis(ellipsisPos: 'L' | 'R'): CompositionEllipsis;
export declare function isNav(item: CompositionItem): item is CompositionPrevious | CompositionNext;
export declare function isEllipsis(item: CompositionItem): item is CompositionEllipsis;
export declare function containsEllipsis(composition: ReadonlyArray<CompositionItem>): boolean;
export declare function isPageWithNumber(item: CompositionItem, page: number): item is CompositionPage;
export declare function getLastPage(composition: ReadonlyArray<CompositionItem>): number;
export declare function compositionMatches(composition: ReadonlyArray<CompositionItem>, startIndex: number, pattern: (number | '#' | '…' | '*')[]): boolean;
export declare function compositionMatchesEnd(composition: ReadonlyArray<CompositionItem>, endIndex: number, pattern: (number | '#' | '…' | '*')[]): boolean;
export {};
