/* global describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

describe("Date", () => {
    it("should compose and decompose as expected", () => {
        let value = new Date().toISOString();
        let date = new Date(value);
        let data = compose(date);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Date]]", value]);
        assert.deepStrictEqual(result, date);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let value = new Date().toISOString();
        let date = new Date(value);
        let result = compose(date, true);

        assert.deepStrictEqual(result, date);
    });

    it("should serialize and deserialize as expected", () => {
        let value = new Date().toISOString();
        let date = new Date(value);
        let data = serialize(date);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(["[[Date]]", value]));
        assert.deepStrictEqual(result, date);
    });
});
