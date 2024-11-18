import deepEqual from '@/deep-equal';

describe('deepEqual', () => {
    test('object should return true', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 };
        expect(deepEqual(obj1, obj2)).toBe(true);
    });

    test('object should return false', () => {
        const obj1 = { a: 1, b: 2, c: { ca: 1, cb: 2} };
        const obj2 = { a: 1, b: 2, c: { ca: 1, cb: 3} };
        expect(deepEqual(obj1, obj2)).toBe(false);
    });

    test('array should return true', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, 3];
        expect(deepEqual(arr1, arr2)).toBe(true);
    });

    test('array should return false', () => {
        const arr1 = [1, 2, 3, { a: 1 }];
        const arr2 = [1, 2, 3, { a: 2} ];
        expect(deepEqual(arr1, arr2)).toBe(false);
    });

    test('null should return true', () => {
        expect(deepEqual(null, null)).toBe(true);
    });

    test('undefined should return true', () => {
        expect(deepEqual(undefined, undefined)).toBe(true);
    });

    test('null and undefined should return false', () => {
        expect(deepEqual(null, undefined)).toBe(false);
    });

    test('number should return true', () => {
        expect(deepEqual(1, 1)).toBe(true);
    });

    test('number should return false', () => {
        expect(deepEqual(1, 2)).toBe(false);
    });

    test('string should return true', () => {
        expect(deepEqual('1', '1')).toBe(true);
    });

    test('string should return false', () => {
        expect(deepEqual('1', '2')).toBe(false);
    });

    test('function should return true', () => {
        const func = () => {};
        expect(deepEqual(func, func)).toBe(true);
    });

    test('function should return false', () => {
        const func1 = () => {};
        const func2 = () => {};
        expect(deepEqual(func1, func2)).toBe(false);
    });

    test('String should return true', () => {
        const str1 = new String('1');
        const str2 = new String('1');
        expect(deepEqual(str1, str2)).toBe(true);
    });

    test('String should return false', () => {
        const str1 = new String('1');
        const str2 = new String('2');
        expect(deepEqual(str1, str2)).toBe(true);
    });

    test('Map should return true', () => {
        const map1 = new Map();
        const map2 = new Map();
        map1.set('a', 1);
        map2.set('a', 1);
        expect(deepEqual(map1, map2)).toBe(true);
    });

    test('Map should return false', () => {
        const map1 = new Map();
        const map2 = new Map();
        map1.set('a', 1);
        map2.set('b', 1);
        expect(deepEqual(map1, map2)).toBe(false);
    });

    test('Set should return true', () => {
       const set1 = new Set();
       const set2 = new Set();
       set1.add({}).add(1).add('a');
       set2.add({}).add(1).add('a');
       expect(deepEqual(set1, set2)).toBe(true);
    });

    test('Set should return false', () => {
        const set1 = new Set();
        const set2 = new Set();
        set1.add({}).add(1).add('a');
        set2.add({}).add(1).add('b');
        expect(deepEqual(set1, set2)).toBe(false);
    });

    test('TypedArray should return true', () => {
        const arr1 = new Uint8Array([1, 2, 3]);
        const arr2 = new Uint8Array([1, 2, 3]);
        expect(deepEqual(arr1, arr2)).toBe(true);
    });

    test('TypedArray should return false', () => {
        const arr1 = new Uint8Array([1, 2, 3]);
        const arr2 = new Uint8Array([1, 2, 4]);
        expect(deepEqual(arr1, arr2)).toBe(false);
    });

    test('Regex should return true', () => {
        const reg1 = /a/g;
        const reg2 = /a/g;
        expect(deepEqual(reg1, reg2)).toBe(true);
    });

    test('Regex should return false', () => {
        const reg1 = /a/g;
        const reg2 = /b/g;
        expect(deepEqual(reg1, reg2)).toBe(false);
    });

    test('Date should return true', () => {
        const date1 = new Date();
        const date2 = new Date();
        expect(deepEqual(date1, date2)).toBe(true);
    });

    test('Date should return false', () => {
        const date1 = new Date();
        const date2 = new Date(0);
        expect(deepEqual(date1, date2)).toBe(false);
    });
});
