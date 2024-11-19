const deepEqual = (a: any, b: any, visited: WeakMap<object, any> = new WeakMap()): boolean => {
    if (a === b || (a !== a && b !== b)) return true;

    if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;

    if (a.constructor !== b.constructor) return false;

    if (visited.has(a)) return visited.get(a) === b;
    visited.set(a, b);

    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i], visited)) return false;
        }
        return true;
    }

    if (a instanceof Map) {
        if (!(b instanceof Map) || a.size !== b.size) return false;
        for (const [keyA, valueA] of a) {
            if (!b.has(keyA) || !deepEqual(a.get(keyA), b.get(keyA), visited)) return false;
        }
        return true;
    }

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

    if (a instanceof RegExp) {
        return a.source === b.source && a.flags === b.flags;
    }

    if (a instanceof Date) {
        return a.getTime() === b.getTime();
    }

    if (typeof a.valueOf === 'function' && typeof b.valueOf === 'function' && a.valueOf() !== a) {
        return a.valueOf() === b.valueOf();
    }

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
