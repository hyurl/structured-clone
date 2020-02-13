/** describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

describe("Boolean", () => {
    it("should compose and decompose as expected", () => {
        let bool = new Boolean(true);
        let data = compose(bool);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Boolean]]", true]);
        assert.deepStrictEqual(result, bool);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let bool = new Boolean(true);
        let result = compose(bool, true);

        assert.deepStrictEqual(result, bool);
    });

    it("should serialize and deserialize as expected", () => {
        let bool = new Boolean(false);
        let data = serialize(bool);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(["[[Boolean]]", false]));
        assert.deepStrictEqual(result, bool);
    });
});