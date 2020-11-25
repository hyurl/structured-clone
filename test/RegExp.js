/* global describe, it */
import * as assert from "assert";
import { compose, decompose, serialize, deserialize } from "../lib/index.js";

describe("RegExp", () => {
    it("should compose and decompose as expected", () => {
        let regex = /[a-z]+/i;
        let data = compose(regex);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[RegExp]]", "/[a-z]+/i"]);
        assert.deepStrictEqual(result, regex);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let regex = /[a-z]+/i;
        let result = compose(regex, true);

        assert.deepStrictEqual(result, regex);
    });

    it("should serialize and deserialize as expected", () => {
        let regex = /[a-z]+/i;
        let data = serialize(regex);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(["[[RegExp]]", "/[a-z]+/i"]));
        assert.deepStrictEqual(result, regex);
    });
});
