const { cloneError } = require("./utils");

function handleToJSON(data) {
    while (data !== null
        && data !== void 0
        && typeof data["toJSON"] === "function"
    ) {
        data = data.toJSON();
    }

    return data;
}

exports.clone = clone;
/**
 * Constructs a clone of the object that can be serialized with JSON or HTML
 * Structured Clone Algorithm.
 * @param data 
 * @param forHSCA For HTML Structured Clone Algorithm, by default it's
 *  for JSON.
 */
function clone(data, forHSCA = false, parentNodes = []) {
    let type = typeof data;

    if (type === "function" && !forHSCA) {
        data = handleToJSON(data);
        type = typeof data;
    }

    if (data === null || data === undefined ||
        type === "function" || type === "symbol") {
        return data === null ? null : void 0;
    }

    if (type === "bigint") {
        return forHSCA ? data : ["[[BigInt]]", String(data)];
    } else if (type === "number") {
        if (isNaN(data) || !isFinite(data)) {
            return forHSCA ? data : ["[[Number]]", String(data)];
        } else {
            return data;
        }
    } else if (type === "object") {
        if (parentNodes.includes(data)) {
            return void 0;
        } else {
            parentNodes = [...parentNodes, data];
        }

        if (data instanceof Date) {
            return forHSCA ? data : ["[[Date]]", data.toISOString()];
        } else if (data instanceof RegExp) {
            return forHSCA ? data : ["[[RegExp]]", String(data)];
        } else if (data instanceof Error) {
            return forHSCA ? data : ["[[Error]]", clone(cloneError(data))];
        } else if (data instanceof Map) {
            let map = forHSCA ? new Map() : [];

            for (let [key, value] of data) {
                key = clone(key, forHSCA, parentNodes);

                if (key !== undefined) {
                    value = clone(value, forHSCA, parentNodes);
                    forHSCA ? map.set(key, value) : map.push([key, value]);
                }
            }

            return forHSCA ? map : ["[[Map]]", map];
        } else if (data instanceof Set) {
            let set = forHSCA ? new Set() : [];

            for (let value of data) {
                value = clone(value, forHSCA, parentNodes);

                if (value !== undefined) {
                    forHSCA ? set.add(value) : set.push(value);
                }
            }

            return forHSCA ? set : ["[[Set]]", set];
        } else if (data instanceof ArrayBuffer) {
            return forHSCA ? data : ["[[ArrayBuffer]]", [...new Uint8Array(data)]];
        } else if (data instanceof DataView) {
            return forHSCA ? data : ["[[DataView]]", [...new Uint8Array(data.buffer)]];
        } else if (ArrayBuffer.isView(data)) {
            return forHSCA ? data : [`[[${data.constructor.name}]]`, [...data]];
        } else if (!forHSCA && typeof (data = handleToJSON(data)) !== "object") {
            return clone(data);
        } else if (Array.isArray(data)) {
            let arr = [];

            for (let i = 0, len = data.length; i < len; ++i) {
                arr.push(clone(data[i], forHSCA, parentNodes));
            }

            return arr;
        } else {
            let proto = Object.getPrototypeOf(data);

            if (!forHSCA || proto === null || proto.constructor === Object) {
                let obj = Object.create(proto);

                for (let key in data) {
                    // Only care about own properties.
                    if (Object.prototype.hasOwnProperty.call(data, key)) {
                        let value = clone(data[key], forHSCA, parentNodes);
                        value !== undefined && (obj[key] = value);
                    }
                }

                return obj;
            } else {
                return data;
            }
        }
    }

    return data;
}