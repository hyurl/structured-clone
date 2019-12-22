const { isTypedClone, decloneError } = require("./utils");

// Fix global variable.
if (typeof globalThis === "undefined") {
    var globalThis;

    if (typeof global === "object") {
        globalThis = global;
    } else if (typeof window === "object") {
        globalThis = window;
    }
}

exports.declone = declone;
/**
 * When constructing a clone for JSON, this function is used to destruct the
 * output data to it's original form.
 * @param {any} data 
 */
function declone(data) {
    if (typeof data !== "object" || data === null) {
        return data;
    } else {
        if (Array.isArray(data)) {
            if (isTypedClone(data)) {
                let [type, value] = data;

                try {
                    switch (type) {
                        case "[[BigInt]]":
                            return BigInt(value);

                        case "[[Number]]":
                            return Number(value);

                        case "[[Date]]":
                            return new Date(value);

                        case "[[RegExp]]": {
                            let [pattern, flags] = value.slice(1).split("/");
                            return new RegExp(pattern, flags);
                        }

                        case "[[Error]]": {
                            return decloneError(value);
                        }

                        case "[[Map]]":
                            return new Map(declone(value));

                        case "[[Set]]":
                            return new Set(declone(value));

                        case "[[ArrayBuffer]]": {
                            return Uint8Array.from(value).buffer;
                        }

                        case "[[DataView]]": {
                            return new DataView(Uint8Array.from(value).buffer);
                        }

                        case "[[Buffer]]":
                        case "[[Int8Array]]":
                        case "[[Uint8Array]]":
                        case "[[Uint8ClampedArray]]":
                        case "[[Int16Array]]":
                        case "[[Uint16Array]]":
                        case "[[Int32Array]]":
                        case "[[Uint32Array]]":
                        case "[[BigInt64Array]]":
                        case "[[BigUint64Array]]":
                        case "[[Float32Array]]":
                        case "[[Float64Array]]": {
                            type = type.slice(2, -2);
                            return globalThis[type].from(value);
                        }

                        default:
                            return data;
                    }
                } catch (e) {
                    return decloneArray(data);
                }
            } else {
                return decloneArray(data);
            }
        } else {
            let obj = {};

            for (let key in data) {
                obj[key] = declone(data[key]);
            }

            return obj;
        }
    }
}

/**
 * @param {any[]} data 
 */
function decloneArray(data) {
    let arr = [];

    for (let i = 0, len = data.length; i < len; ++i) {
        arr.push(declone(data[i]));
    }

    return arr;
}