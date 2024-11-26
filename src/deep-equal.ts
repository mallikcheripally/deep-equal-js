function deepEqual(a: any, b: any): boolean {
    if (a === b || (a !== a && b !== b)) return true;
    if (a === null || a === undefined || b === null || b === undefined) return false;
    if (typeof a !== 'object' || typeof b !== 'object' || a.constructor !== b.constructor) {
        if (typeof a.valueOf === 'function' && typeof b.valueOf === 'function' && a.valueOf() !== a && b.valueOf() !== b) return a.valueOf() === b.valueOf();
        return false;
    }

    let length, i, j, key;

    if (Array.isArray(a)) {
        if (!Array.isArray(b)) return false;
        length = a.length;
        if (length !== b.length) return false;
        i = 0;
        j = length - 1;

        while (i <= j) {
            if (!deepCompareValues(a[i], b[i])) return false;
            if (i !== j && !deepCompareValues(a[j], b[j])) return false;
            i++;
            j--;
        }
        return true;
    }

    if (a instanceof Map) {
        if (!(b instanceof Map) || a.size !== b.size) return false;
        const iteratorA = a.entries();
        const iteratorB = b.entries();
        let nextA = iteratorA.next();
        let nextB = iteratorB.next();
        while (!nextA.done && !nextB.done) {
            if (!deepCompareValues(nextA.value[0], nextB.value[0])) return false;
            if (!deepCompareValues(nextA.value[1], nextB.value[1])) return false;
            nextA = iteratorA.next();
            nextB = iteratorB.next();
        }
        return !!(nextA.done && nextB.done);
    }

    if (a instanceof Set) {
        if (!(b instanceof Set)) return false;
        if (a.size !== b.size) return false;
        const iteratorA = a.values();
        const iteratorB = b.values();
        let nextA = iteratorA.next();
        let nextB = iteratorB.next();
        while (!nextA.done && !nextB.done) {
            if (!deepCompareValues(nextA.value, nextB.value)) return false;
            nextA = iteratorA.next();
            nextB = iteratorB.next();
        }
        return !!(nextA.done && nextB.done);
    }

    if (ArrayBuffer.isView(a) && !(a instanceof DataView)) {
        if (!(ArrayBuffer.isView(b) && !(b instanceof DataView))) return false;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
        // @ts-ignore
        length = a.length;
        // @ts-ignore
        if (length !== b.length) return false;

        for (i = 0; i < length; i++) {
            // @ts-ignore
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    if (a instanceof Date) {
        if (!(b instanceof Date)) return false;
        return a.getTime() === b.getTime();
    }

    if (a instanceof RegExp) {
        if (!(b instanceof RegExp)) return false;
        return a.source === b.source && a.flags === b.flags;
    }

    if (typeof a.valueOf === 'function' && typeof b.valueOf === 'function' && a.valueOf() !== a) {
        return a.valueOf() === b.valueOf();
    }

    const keysA = Object.keys(a);
    length = keysA.length;
    if (Object.keys(b).length !== length) return false;

    for (i = length; i-- !== 0; ) {
        key = keysA[i];
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (!deepCompareValues(a[key], b[key])) return false;
    }

    return true;
}

function deepCompareValues(aVal: any, bVal: any): boolean {
    if (aVal === bVal) return true; // Fast path for identical references
    if (aVal !== aVal && bVal !== bVal) return true; // Handle NaN
    const typeA = typeof aVal;
    if (typeA !== typeof bVal || aVal === null || bVal === null || aVal === undefined || bVal === undefined)
        return false;

    if (typeof aVal.valueOf === 'function' && typeof bVal.valueOf === 'function' && aVal.valueOf() !== aVal && bVal.valueOf() !== bVal) return aVal.valueOf() === bVal.valueOf();

    if (typeA !== 'object') return false;
    return deepEqual(aVal, bVal);
}

export default deepEqual;
