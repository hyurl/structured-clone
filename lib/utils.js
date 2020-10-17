const pick = require("@hyurl/utils/pick").default;
const getGlobal = require("@hyurl/utils/getGlobal").default;
const isVoid = require("@hyurl/utils/isVoid").default;

/** @typedef {Error & { [x: string]: any }} ErrorObject */

/** @type {ErrorObject} */
var AssertionError;

// For Node.js-like environment.
if (typeof require === "function" && typeof module === "object") {
    try {
        AssertionError = require("assert").AssertionError;
    } catch (e) { }
}

exports.error2object = error2object;
/**
 * @param {ErrorObject} err
 * @returns {ErrorObject}
 */
function error2object(err) {
    return Object.assign(pick(err, ["name", "message", "stack"]), err);
}

exports.object2error = object2error;
/**
 * @param {ErrorObject} obj
 * @returns {ErrorObject}
 */
function object2error(obj) {
    let reservedKeys = ["name", "message", "stack"];
    let err;

    if (obj.name === "AssertionError" && AssertionError) {
        err = Object.create(AssertionError.prototype);
    } else {
        err = Object.create((getGlobal(obj.name) || Error).prototype);
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

exports.walkToJSON = walkToJSON;
function walkToJSON(data) {
    // Recursively calls `toJSON()` method(s) until drain.
    while (!isVoid(data) && typeof data["toJSON"] === "function") {
        data = data.toJSON();
    }

    return data;
}
