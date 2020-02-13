/** describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

describe("Set", () => {
    it("should compose and decompose as expected", () => {
        let iterable = ["Hello", "World"];
        let set = new Set(iterable);
        let data = compose(set);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Set]]", iterable]);
        assert.deepStrictEqual(result, set);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let iterable = ["Hello", "World"];
        let set = new Set(iterable);
        let result = compose(set, true);

        assert.deepStrictEqual(result, set);
    });

    it("should serialize and deserialize as expected", () => {
        let iterable = ["Hello", "World"];
        let set = new Set(iterable);
        let data = serialize(set);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(["[[Set]]", iterable]));
        assert.deepStrictEqual(result, set);
    });

    it("should compose and decompose a nested Set as expected", () => {
        let set = new Set([
            new Set(["Hello"]),
            new Set(["World"])
        ]);
        let data = compose(set);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Set]]", [
            ["[[Set]]", ["Hello"]],
            ["[[Set]]", ["World"]]
        ]]);
        assert.deepStrictEqual(result, set);
    });
});