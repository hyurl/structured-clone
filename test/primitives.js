/* global describe, it, BigInt */
import * as assert from "assert";
import { compose, decompose } from "../lib/index.js";

describe("primitives", () => {
    it("should keep the original form for simple primitives when composing", () => {
        assert.deepStrictEqual(compose("Hello, World!"), "Hello, World!");
        assert.deepStrictEqual(compose(123), 123);
        assert.deepStrictEqual(compose(true), true);
        assert.deepStrictEqual(compose(false), false);
        assert.deepStrictEqual(compose(null), null);
    });

    it("should compose and decompose BigInt and Number keywords", () => {
        assert.deepStrictEqual(compose(NaN), ["[[Number]]", "NaN"]);
        assert.deepStrictEqual(compose(Infinity), ["[[Number]]", "Infinity"]);
        assert.deepStrictEqual(compose(-Infinity), ["[[Number]]", "-Infinity"]);

        assert.ok(Object.is(decompose(["[[Number]]", "NaN"]), NaN));
        assert.strictEqual(decompose(["[[Number]]", "Infinity"]), Infinity);
        assert.strictEqual(decompose(["[[Number]]", "-Infinity"]), -Infinity);

        if (typeof BigInt === "function") {
            assert.deepStrictEqual(compose(BigInt(123)), ["[[BigInt]]", "123"]);
            assert.strictEqual(decompose(["[[BigInt]]", "123"]), BigInt(123));
        }
    });

    it("should skip unsupported primitives", () => {
        assert.strictEqual(compose(Symbol("foo")), void 0);
        assert.deepStrictEqual(compose(void 0), void 0);
    });
});
