/* global describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

describe("Number", () => {
    it("should compose and decompose as expected", () => {
        let value = 123;
        let num = new Number(value);
        let data = compose(num);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Number]]", value]);
        assert.deepStrictEqual(result, num);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let value = 123;
        let num = new Number(value);
        let result = compose(num, true);

        assert.deepStrictEqual(result, num);
    });

    it("should serialize and deserialize as expected", () => {
        let value = 123;
        let num = new Number(value);
        let data = serialize(num);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(["[[Number]]", value]));
        assert.deepStrictEqual(result, num);
    });
});
