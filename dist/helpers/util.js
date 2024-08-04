export function isNumber(val) {
    return typeof val === 'number';
}
export function sanatizeInteger(maybeInteger) {
    return typeof maybeInteger === 'number' && Number.isInteger(maybeInteger)
        ? maybeInteger
        : undefined;
}
export function sanatizeBoolean(maybeBoolean) {
    return typeof maybeBoolean === 'boolean' ? maybeBoolean : undefined;
}
// TODO: use native findLastIndex in next major release
export function findLastIndex(array, predicate) {
    for (let k = array.length - 1; k >= 0; k--) {
        if (predicate(array[k]))
            return k;
    }
    return -1;
}
export class UnsupportedValueError extends Error {
    constructor(value) {
        super('Unsupported value: ' + value);
    }
}
