export declare function isNumber(val: any): val is number;
export declare function sanatizeInteger(maybeInteger: unknown): number;
export declare function sanatizeBoolean(maybeBoolean: unknown): boolean;
export declare function findLastIndex<T>(array: ReadonlyArray<T>, predicate: (item: T) => boolean): number;
export declare class UnsupportedValueError extends Error {
    constructor(value: never);
}
