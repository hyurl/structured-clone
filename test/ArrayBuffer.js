/* global describe, it */
import * as assert from "assert";
import { compose, decompose, serialize, deserialize } from "../lib/index.js";

describe("ArrayBuffer", () => {
    it("should compose and decompose as expected", () => {
        let buf = new ArrayBuffer(8);
        let data = compose(buf);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[ArrayBuffer]]", [0, 0, 0, 0, 0, 0, 0, 0]]);
        assert.deepStrictEqual(result, buf);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let buf = new ArrayBuffer(8);
        let result = compose(buf, true);

        assert.deepStrictEqual(result, buf);
    });

    it("should serialize and deserialize as expected", () => {
        let buf = new ArrayBuffer(8);
        let data = serialize(buf);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify([
            "[[ArrayBuffer]]",
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
        assert.deepStrictEqual(result, buf);
    });
});
