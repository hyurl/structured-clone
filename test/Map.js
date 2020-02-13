/** describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

describe("Map", () => {
    it("should compose and decompose as expected", () => {
        let iterable = [["foo", "Hello"], ["bar", "World"]];
        let map = new Map(iterable);
        let data = compose(map);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Map]]", iterable]);
        assert.deepStrictEqual(result, map);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let iterable = [["foo", "Hello"], ["bar", "World"]];
        let map = new Map(iterable);
        let result = compose(map, true);

        assert.deepStrictEqual(result, map);
    });

    it("should serialize and deserialize as expected", () => {
        let iterable = [["foo", "Hello"], ["bar", "World"]];
        let map = new Map(iterable);
        let data = serialize(map);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(["[[Map]]", iterable]));
        assert.deepStrictEqual(result, map);
    });

    it("should compose and decompose a nested Map as expected", () => {
        let map = new Map([[
            new Map([["foo", "Hello"]]),
            new Map([["bar", "World"]])
        ]]);
        let data = compose(map);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Map]]", [[
            ["[[Map]]", [["foo", "Hello"]]],
            ["[[Map]]", [["bar", "World"]]]
        ]]]);
        assert.deepStrictEqual(result, map);
    });
});