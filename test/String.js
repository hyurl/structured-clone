/** describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

describe("String", () => {
    it("should compose and decompose as expected", () => {
        let value = "Hello, World!";
        let str = new String(value);
        let data = compose(str);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[String]]", value]);
        assert.deepStrictEqual(result, str);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let value = "Hello, World!";
        let str = new String(value);
        let result = compose(str, true);

        assert.deepStrictEqual(result, str);
    });

    it("should serialize and deserialize as expected", () => {
        let value = "Hello, World!";
        let str = new String(value);
        let data = serialize(str);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(["[[String]]", value]));
        assert.deepStrictEqual(result, str);
    });
});