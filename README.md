# Structured Clone

**A cheap way to clone typed data for serialization.**

Using this module, the program can safely clone data from a object for
serialization using JSON or HTML Structured Clone Algorithm, that means all
functions, symbols, circular references, and any other elements that are not
compatible with these algorithms will be removed.

Additionally, this module also transforms the clone object into a structured
form when cloning for JSON serialization, so it could be used to serialize
compound types like Date, RegExp, etc. The types that supported by HSCA (in
Node.js term) are also supported by JSON when using this module.

This module is designed primarily in order to safely clone data that can be
transferred across processes or threads in Node.js, however, it works both in
Node.js and in browsers.

## API

- `clone(data: any, forHSCA = false)` Constructs a clone of the object that can be
    serialized with JSON or HTML Structured Clone Algorith, if `forHSCA` is
    omitted, this function returns a copy of data in a form that combined types
    and values (only for compound types), so that they can be serialized and
    transferred in JSON just like HSCA does.
- `declone(data: any)` When constructing a clone for JSON, this function is used
    to destruct the output data to it's original form. DON'T use this function
    when setting `forHSCA` a true value for `clone()`.

## Example

```js
import { clone, declone } from "@hyurl/structured-clone";
import { format } from "util";

let data = {
    ok: true,
    greeting: "Hello, World!",
    times: 100,
    largeTimes: 1000000000n, // BigInt is supported if the runtime supports it.
    maxTimes: Infinity,
    guests: new Map([
        [
            10000,
            { name: "Mr. Wong", tel: NaN, roles: new Set([1, 2, 3]) }
        ],
        [
            10001,
            { name: "Mrs. Wong", tel: NaN, roles: new Set([2, 3]) }
        ]
    ]),
    date: new Date(),
    pattern: /H(ello|i), \w+/i,
    err: new Error("Excuse me"), // Other errors are as well supported.
    packet: new TextEncoder().encode("Hello, World!"), // TypedArray
    // Other Types like ArrayBuffer and ArrayBufferView are also supported,
    // however, Buffer are only supported by Node.js with JSON serialization,
    // HSCA will transfer Buffer into Uint8Array automatically.
};

// Create copy and serialize
let copy = clone(data);
let json = JSON.stringify(copy);

// Parse serialized data and de-clone to the original form. 
let _copy = JSON.parse(json);
let _data = declone(_copy);

// The two copy of data are literally the same.
// (However with different object reference.)
console.assert(format(data) === format(_data));

console.log(json);
// Will seem like:
// {"ok":true,"greeting":"Hello, World!","times":100,"largeTimes":["[[BigInt]]",
// "1000000000"],"maxTimes":["[[Number]]","Infinity"],"guests":["[[Map]]",
// [[10000,{"name":"Mr. Wong","tel":["[[Number]]","NaN"] ...
```