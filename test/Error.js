/* global describe, it */
import * as assert from "assert";
import { compose, decompose, serialize, deserialize } from "../lib/index.js";
import pick from "@hyurl/utils/pick";

const reservedProps = ["name", "message", "stack"];

describe("Error", () => {
    it("should compose and decompose as expected", () => {
        let err = new Error("Something went wrong");
        let data = compose(err);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Error]]", {
            name: err.name,
            message: err.message,
            stack: err.stack
        }]);
        assert.strictEqual(result.constructor, Error);
        assert.deepStrictEqual(pick(result, reservedProps), pick(err, reservedProps));
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let err = new Error("Something went wrong");
        let result = decompose(compose(err, true));

        assert.strictEqual(result.constructor, Error);
        assert.deepStrictEqual(pick(result, reservedProps), pick(err, reservedProps));
    });

    it("should compose and decompose as expected", () => {
        let err = new Error("Something went wrong");
        let data = serialize(err);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify(["[[Error]]", {
            name: err.name,
            message: err.message,
            stack: err.stack
        }]));
        assert.strictEqual(result.constructor, Error);
        assert.deepStrictEqual(pick(result, reservedProps), pick(err, reservedProps));
    });

    it("should keep accompanying data of supported types as expected", () => {
        let err = new Error("Something went wrong");
        err["foo"] = "Hello, World!";
        err["handle"] = () => { }; // unsupported and will be removed
        let data = compose(err);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[Error]]", {
            name: err.name,
            message: err.message,
            stack: err.stack,
            foo: err["foo"]
        }]);
        assert.strictEqual(result.constructor, Error);
        assert.deepStrictEqual(
            pick(result, [...reservedProps, "foo"]),
            pick(err, [...reservedProps, "foo"])
        );
        assert.ok(!("handle" in result));
    });

    it("should keep accompanying data of supported types for HTML Structured Clone Algorithm", () => {
        let err = new Error("Something went wrong");
        err["foo"] = "Hello, World!";
        err["handle"] = () => { }; // unsupported and will be removed
        let result = decompose(compose(err, true));

        assert.strictEqual(result.constructor, Error);
        assert.deepStrictEqual(
            pick(result, [...reservedProps, "foo"]),
            pick(err, [...reservedProps, "foo"])
        );
        assert.ok(!("handle" in result));
    });
});
