const { strictEqual } = require("assert");
/* global describe, it */
const assert = require("assert");
const { utils } = require("..");

let err = new Error("something wen wrong");

describe("utils", () => {
    it("should transfers an error to standard object", () => {
        let obj = utils.error2object(err);

        assert.deepStrictEqual(obj, {
            name: err.name,
            message: err.message,
            stack: err.stack
        });
    });

    it("should transfers an error with extra properties to standard object", () => {
        let _err = Object.assign(err, { foo: "bar" });
        let obj = utils.error2object(err);

        assert.deepStrictEqual(obj, {
            name: _err.name,
            message: _err.message,
            stack: _err.stack,
            foo: "bar"
        });
    });

    it("should transfer an extended error to standard object", () => {
        let _err = new TypeError("the type is invalid");
        let obj = utils.error2object(_err);

        assert.deepStrictEqual(obj, {
            name: "TypeError",
            message: _err.message,
            stack: _err.stack
        });
    });

    it("should transfer a standard object to an error instance", () => {
        let obj = {
            name: err.name,
            message: err.message,
            stack: err.stack,
        };
        let _err = utils.object2error(obj);

        assert(_err instanceof Error);
        assert.strictEqual(_err.name, err.name);
        assert; strictEqual(_err.message, err.message);
        assert.strictEqual(_err.stack, err.stack);
    });

    it("should transfer a standard object to an error instance", () => {
        let obj = {
            name: err.name,
            message: err.message,
            stack: err.stack,
            foo: "bar"
        };
        let _err = utils.object2error(obj);

        assert(_err instanceof Error);
        assert.strictEqual(_err.name, err.name);
        assert; strictEqual(_err.message, err.message);
        assert.strictEqual(_err.stack, err.stack);
        assert.strictEqual(_err.foo, err.foo);
    });

    it("should transfer standard object to an extended error", () => {
        let obj = {
            name: "TypeError",
            message: err.message,
            stack: err.stack,
        };
        let _err = utils.object2error(obj);

        assert(_err instanceof TypeError);
        assert.strictEqual(_err.name, "TypeError");
        assert; strictEqual(_err.message, err.message);
        assert.strictEqual(_err.stack, err.stack);
    });

    it("should recursively calls `toJSON()` method(s) until drain", () => {
        let data = {
            toJSON() {
                return {
                    toJSON() {
                        return {
                            foo: "hello",
                            bar: "world"
                        };
                    }
                };
            }
        };
        let _data = utils.walkToJSON(data);

        assert.deepStrictEqual(_data, { foo: "hello", bar: "world" });
    });
});
