/** describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

describe("TypedArray", () => {
    it("should compose and decompose as expected", () => {
        let value = [0, 1, 2, 3, 4, 5, 6, 7];
        let arr = Uint8Array.from(value);
        let data = compose(arr);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Uint8Array]]", value]);
        assert.deepStrictEqual(result, arr);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let value = [0, 1, 2, 3, 4, 5, 6, 7];
        let arr = Uint8Array.from(value);
        let result = compose(arr, true);

        assert.deepStrictEqual(result, arr);
    });

    it("should serialize and deserialize as expected", () => {
        let value = [0, 1, 2, 3, 4, 5, 6, 7];
        let arr = Uint8Array.from(value);
        let data = serialize(arr);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify([
            "[[Uint8Array]]",
            [0, 1, 2, 3, 4, 5, 6, 7]
        ]));
        assert.deepStrictEqual(result, arr);
    });

    it("should compose and decompose Node.js Buffer", () => {
        let value = [0, 1, 2, 3, 4, 5, 6, 7];
        let arr = Buffer.from(value);
        let data = compose(arr);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Buffer]]", value]);
        assert.deepStrictEqual(result, arr);
    });

    it("should compose Node.js Buffer and compose it as Uint8Array", () => {
        let value = [0, 1, 2, 3, 4, 5, 6, 7];
        let arr = Buffer.from(value);
        let data = compose(arr);
        let _Buffer = Buffer;
        global.Buffer = null; // hack, unset Buffer from the global environment
        let result = decompose(data);
        global.Buffer = _Buffer;

        assert.deepStrictEqual(data, ["[[Buffer]]", value]);
        assert.deepStrictEqual(result, Uint8Array.from(arr));
    });
});