import deepEqual from '@/deep-equal';

describe('deepEqual', () => {
    test('object should return true', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 };
        expect(deepEqual(obj1, obj2)).toBe(true);
    });
});
