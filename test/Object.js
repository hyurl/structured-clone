/** describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");
const pick = require("@hyurl/utils/pick").default;

describe("Object", () => {
    it("should compose and decompose as expected", () => {
        let obj = { foo: "Hello", bar: "World" };
        let data = compose(obj);
        let result = decompose(data);

        assert.deepStrictEqual(data, obj);
        assert.deepStrictEqual(result, obj);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let obj = { foo: "Hello", bar: "World" };
        let result = compose(obj, true);

        assert.deepStrictEqual(result, obj);
    });

    it("should serialize and deserialize as expected", () => {
        let obj = { foo: "Hello", bar: "World" };;
        let data = serialize(obj);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(obj));
        assert.deepStrictEqual(result, obj);
    });

    it("should compose and decompose a nested Object as expected", () => {
        let obj = {
            foo: new Set(["Hello"]),
            bar: new Set(["World"]),
            fn: () => null
        };
        let data = compose(obj);
        let result = decompose(data);

        assert.deepStrictEqual(data, {
            foo: ["[[Set]]", ["Hello"]],
            bar: ["[[Set]]", ["World"]]
        });
        assert.deepStrictEqual(result, pick(obj, ["foo", "bar"]));
    });

    it("should compose a nested Object for HTML Structured Clone Algorithm", () => {
        let obj = {
            foo: new Set(["Hello", () => null]),
            bar: new Set(["World", Symbol()])
        };
        let result = compose(obj, true);

        assert.deepStrictEqual(result, {
            foo: new Set(["Hello"]),
            bar: new Set(["World"])
        });
    });
});