# deep-equal-js

<div style="font-size: 20px">
Blazing fast utility for deep equality checks.
</div>

 <br />

<div>
  <a href="https://www.npmjs.com/package/deep-equal-js">
    <img alt="npm" src="https://img.shields.io/npm/v/deep-equal-js.svg" />
  </a>
  <a href="https://github.com/mallikcheripally/deep-equal-js/actions">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/mallikcheripally/deep-equal-js/ci.yml" />
  </a>
  <a href="https://github.com/mallikcheripally/deep-equal-js/blob/main/LICENSE">
    <img alt="license" src="https://img.shields.io/npm/l/deep-equal-js.svg" />
  </a>
  <a href="https://www.npmjs.com/package/deep-equal-js">
    <img alt="downloads" src="https://img.shields.io/npm/dm/deep-equal-js.svg" />
  </a>
  <a href="https://codecov.io/gh/mallikcheripally/deep-equal-js">
    <img alt="types included" src="https://codecov.io/gh/mallikcheripally/deep-equal-js/branch/main/graph/badge.svg" />
  </a>
</div>

# Features

ES6 module supporting JavaScript and TypeScript. 

Supports checking:
- Objects
- Arrays
- Maps
- Sets
- TypedArray
- RegExp
- Date
- Primitives and primitive wrappers (String, Number, Boolean)
- null, undefined, NaN, and circular references.

# Installation

```bash
npm install deep-equal-js
```

Alternatively, if you use Yarn:

```bash
yarn add deep-equal-js
```

# Usage
```javascript
import deepEqual from 'deep-equal-js';

console.log(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(deepEqual([1, 2], [1, 2])); // true
console.log(deepEqual(9, 9)); // true
console.log(deepEqual('test', 'test')); // true
console.log(deepEqual(NaN, NaN)) // true
conseole.log(deepEqual(9, '9')); // false
console.log(deepEqual(null, undefined)); // false
```

# Contributing

We welcome contributions from the community to make this library better. If you find any issues or have suggestions for improvements, feel free to contribute or open an issue on our [GitHub Repository](https://github.com/mallikcheripally/deep-equal-js).

# License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

# Something Missing?

If you find any issues or have suggestions for improvements, feel free to contribute or open an issue on our [GitHub Repository](https://github.com/mallikcheripally/deep-equal-js).
