/** @typedef {Error & { [x: string]: any }} ErrorObject */
/** @type {ErrorObject} */
var AssertionError;
const TypePattern = /^\[\[[A-Z][a-zA-Z0-9_]+\]\]$/;

// For Node.js-like environment.
if (typeof require === "function" && typeof module === "object") {
    try {
        AssertionError = require("assert").AssertionError;
    } catch (e) { }
}

// Fix global variable.
if (typeof globalThis === "undefined") {
    var globalThis;

    if (typeof global === "object") {
        globalThis = global;
    } else if (typeof window === "object") {
        globalThis = window;
    }
}

exports.isTypedClone = isTypedClone;
/**
 * @param {any[]} data 
 */
function isTypedClone(data) {
    return data.length === 2
        && typeof data[0] === "string"
        && TypePattern.test(data[0]);
}

exports.cloneError = cloneError;
/**
 * @param {ErrorObject} err
 * @returns {ErrorObject}
 */
function cloneError(err) {
    return Object.assign({
        name: err.name,
        message: err.message,
        stack: err.stack
    }, err);
}

exports.decloneError = decloneError;
/**
 * @param {ErrorObject} obj
 * @returns {ErrorObject}
 */
function decloneError(obj) {
    let reservedKeys = ["name", "message", "stack"];
    let err;

    if (obj.name === "AssertionError" && AssertionError) {
        err = Object.create(AssertionError.prototype);
    } else {
        err = Object.create((globalThis[obj.name] || Error).prototype);
    }

    Object.defineProperties(err, {
        message: {
            value: obj.message,
            configurable: true,
            writable: true
        },
        stack: {
            value: obj.stack,
            configurable: true,
            writable: true
        }
    });

    for (let x in obj) {
        if (!reservedKeys.includes(x)) {
            err[x] = obj[x];
        }
    }

    return err;
}