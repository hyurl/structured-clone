const { clone, declone } = require("..");
const { format } = require("util");

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