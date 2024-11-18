/**
 * Performs a deep equality check between two values.
 * @param {*} a - The first value to compare.
 * @param {*} b - The second value to compare.
 * @param {WeakMap} [visited=new WeakMap()] - Internal parameter to handle circular references.
 * @returns {boolean} - True if values are deeply equal, false otherwise.
 */
const deepEqual = (a: any, b: any, visited: WeakMap<object, any> = new WeakMap()): boolean => {
    if (a === b || (a !== a && b !== b)) return true;

    // If either is null or not an object, they are not equal
    if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;

    // Check constructor equality
    if (a.constructor !== b.constructor) return false;

    // Circular reference check
    if (visited.has(a)) return visited.get(a) === b;
    visited.set(a, b);

    // Array comparison
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i], visited)) return false;
        }
        return true;
    }

    // Map comparison
    if (a instanceof Map) {
        if (!(b instanceof Map) || a.size !== b.size) return false;
        for (const [keyA, valueA] of a) {
            if (!b.has(keyA) || !deepEqual(a.get(keyA), b.get(keyA), visited)) return false;
        }
        return true;
    }

    // Set comparison
    if (a instanceof Set) {
        if (!(b instanceof Set) || a.size !== b.size) return false;
        for (const valA of a) {
            let hasValue = false;
            for (const valB of b) {
                if (deepEqual(valA, valB, visited)) {
                    hasValue = true;
                    break;
                }
            }
            if (!hasValue) return false;
        }
        return true;
    }

    // TypedArray comparison
    if (ArrayBuffer.isView(a)) {
        // @ts-ignore
        if (!ArrayBuffer.isView(b) || a.constructor !== b.constructor || a.length !== b.length) return false;
        // @ts-ignore
        for (let i = 0; i < a.length; i++) {
            // @ts-ignore
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    // RegExp comparison
    if (a instanceof RegExp) {
        return a.source === b.source && a.flags === b.flags;
    }

    // Date comparison
    if (a instanceof Date) {
        return a.getTime() === b.getTime();
    }

    // Primitive wrappers (String, Number, Boolean)
    if (typeof a.valueOf === 'function' && typeof b.valueOf === 'function' && a.valueOf() !== a) {
        return a.valueOf() === b.valueOf();
    }

    // Object comparison
    const keysA = Object.keys(a);
    if (keysA.length !== Object.keys(b).length) return false;
    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key], visited)) {
            return false;
        }
    }
    return true;
};

export default deepEqual;
