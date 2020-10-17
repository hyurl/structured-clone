/* global describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

describe("Array", () => {
    it("should compose and decompose as expected", () => {
        let arr = ["Hello", "World"];
        let data = compose(arr);
        let result = decompose(data);

        assert.deepStrictEqual(data, arr);
        assert.deepStrictEqual(result, arr);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let arr = ["Hello", "World"];
        let result = compose(arr, true);

        assert.deepStrictEqual(result, arr);
    });

    it("should serialize and deserialize as expected", () => {
        let arr = ["Hello", "World"];
        let data = serialize(arr);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(arr));
        assert.deepStrictEqual(result, arr);
    });

    it("should compose and decompose a nested Array as expected", () => {
        let arr = [
            new Set(["Hello"]),
            new Set(["World"])
        ];
        let data = compose(arr);
        let result = decompose(data);

        assert.deepStrictEqual(data, [
            ["[[Set]]", ["Hello"]],
            ["[[Set]]", ["World"]]
        ]);
        assert.deepStrictEqual(result, arr);
    });

    it("should compose a nested Array for HTML Structured Clone Algorithm", () => {
        let arr = [
            new Set(["Hello", () => null]),
            new Set(["World", Symbol()])
        ];
        let result = compose(arr, true);

        assert.deepStrictEqual(result, [
            new Set(["Hello"]),
            new Set(["World"])
        ]);
    });
});
