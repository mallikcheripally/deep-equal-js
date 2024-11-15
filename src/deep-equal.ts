const deepEqual = (a: any, b: any, visited: WeakMap<object, any> = new WeakMap()): boolean => {
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (a.constructor !== b.constructor) return false;

        if (visited.has(a) && visited.get(a) === b) return true;
        visited.set(a, b);

        // Array comparison
        if (Array.isArray(a)) {
            const length = a.length;
            if (length !== (b as any[]).length) return false;
            for (let i = length; i-- !== 0; ) {
                if (!deepEqual(a[i], (b as any[])[i], visited)) return false;
            }
            return true;
        }

        // Map comparison
        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) return false;
            // @ts-ignore
            for (const [keyA, valueA] of a) {
                let found = false;
                // @ts-ignore
                for (const [keyB, valueB] of b) {
                    if (deepEqual(keyA, keyB, visited) && deepEqual(valueA, valueB, visited)) {
                        found = true;
                        break;
                    }
                }
                if (!found) return false;
            }
            return true;
        }

        // Set comparison
        if (a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) return false;
            // @ts-ignore
            for (const valA of a) {
                let found = false;
                // @ts-ignore
                for (const valB of b) {
                    if (deepEqual(valA, valB, visited)) {
                        found = true;
                        break;
                    }
                }
                if (!found) return false;
            }
            return true;
        }

        // TypedArray comparison
        if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            if (a.byteLength !== b.byteLength) return false;
            for (let i = a.byteLength; i-- !== 0; ) {
                if ((a as any)[i] !== (b as any)[i]) return false;
            }
            return true;
        }

        // RegExp comparison
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;

        // Primitive wrappers (e.g., Date, String)
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

        // Object key comparison
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;

        for (let i = keysA.length; i-- !== 0; ) {
            if (!Object.prototype.hasOwnProperty.call(b, keysA[i])) return false;
        }

        // Recursively compare properties
        for (let i = keysA.length; i-- !== 0; ) {
            const key = keysA[i];
            if (!deepEqual(a[key], b[key], visited)) return false;
        }

        return true;
    }

    // Return true if both are NaN, false otherwise
    return a === b || (a !== a && b !== b);
};

export default deepEqual;
