# Structured Clone

**A cheap way to clone typed data for serialization.**

Using this module, a program can safely clone data from an object for
serialization by using JSON or HTML Structured Clone Algorithm, that means all
functions, symbols, circular references, and any other elements that are not
compatible with these algorithms will be auto-removed silently.

Additionally, this module also composes the clone object into a structured
format for JSON serialization, so it could be used to serialize compound types
like Date, RegExp, etc. The types that supported by HTML Structured Clone
Algorithm (in Node.js term) are also supported by JSON along with this module.

This module is designed primarily in order to safely clone data that can be
transferred across processes or threads in Node.js, however, it works in modern
browsers as well.

## API

- `compose(data: any, forHTML = false)` Composes the data into a well-formated
    object that can be serialized via JSON or HTML Structured Clone Algorithm.
    If `forHTML` is omitted, this function returns a copy of data in a form that
    combined types and values (only for compound types), so that they can be
    serialized and transferred in JSON just like HTML Structured Clone Algorithm
    does.
    - Alias `clone()` is deprecated.

- `decompose(data: any)` Decomposes the formated data back to its original form.
    - Alias `declone()` is deprecated.

- `serialize(data: any): string` Equivalent to `JSON.stringify(compose(data))`.
- `deserialize(json: string): any` Equivalent to `decompose(JSON.parse(json))`.

- `createComposer(make: (type: string, value: any) => any): (data: any, forHTML?: boolean) => any`
    This function could be used to create a customized composer function.

- `createDecomposer(parse: (data: any) => { type: string, value: any }, checkSignature: (data: any) => boolean): (data: any) => any`
    This function could be used to create a customized decomposer function.

- `utils` Some utility functions used to process data:
    - `error2object(err: Error): object` Transfers an error instance to a
        standard object.
    - `object2error(obj: object): Error` Transfers a standard object to an
        error instance.
    - `walkToJSON(data: any): any` Recursively calls `toJSON()` method in the
        data and its children nodes until drain.

## Example

```js
import { compose, decompose } from "@hyurl/structured-clone";
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
let copy = compose(data);
let json = JSON.stringify(copy);

// Parse serialized data and decompose to the original form. 
let _copy = JSON.parse(json);
let _data = decompose(_copy);

// The two copy of data are literally the same.
// (However with different object reference.)
console.assert(format(data) === format(_data));

console.log(json);
// Will seem like:
// {"ok":true,"greeting":"Hello, World!","times":100,"largeTimes":["[[BigInt]]",
// "1000000000"],"maxTimes":["[[Number]]","Infinity"],"guests":["[[Map]]",
// [[10000,{"name":"Mr. Wong","tel":["[[Number]]","NaN"] ...
```
