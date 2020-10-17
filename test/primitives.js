/* global describe, it */
const assert = require("assert");
const { compose, decompose } = require("..");

describe("primitives", () => {
    it("should keep the original form for simple primitives when composing", () => {
        assert.deepEqual(compose("Hello, World!"), "Hello, World!");
        assert.deepEqual(compose(123), 123);
        assert.deepEqual(compose(true), true);
        assert.deepEqual(compose(false), false);
        assert.deepEqual(compose(null), null);
    });

    it("should compose and decompose BigInt and Number keywords", () => {
        assert.deepStrictEqual(compose(NaN), ["[[Number]]", "NaN"]);
        assert.deepStrictEqual(compose(Infinity), ["[[Number]]", "Infinity"]);
        assert.deepStrictEqual(compose(-Infinity), ["[[Number]]", "-Infinity"]);

        assert(Object.is(decompose(["[[Number]]", "NaN"]), NaN));
        assert.strictEqual(decompose(["[[Number]]", "Infinity"]), Infinity);
        assert.strictEqual(decompose(["[[Number]]", "-Infinity"]), -Infinity);

        if (typeof BigInt === 'function') {
            assert.deepStrictEqual(compose(BigInt(123)), ["[[BigInt]]", "123"]);
            assert.strictEqual(decompose(["[[BigInt]]", "123"]), BigInt(123));
        }
    });

    it("should skip unsupported primitives", () => {
        assert.strictEqual(compose(Symbol("foo")), void 0);
        assert.deepEqual(compose(void 0), void 0);
    });
});
