/** describe, it */
const assert = require("assert");
const { compose, decompose, serialize, deserialize } = require("..");

/**
 * @param {ArrayBuffer} buf 
 */
function createView(buf) {
    let view = new DataView(buf);

    for (let i = 0; i < view.byteLength; i++) {
        view.setUint8(i, i);
    }

    return view;
}

describe("DataView", () => {
    it("should compose and decompose as expected", () => {
        let buf = new ArrayBuffer(8);
        let view = createView(buf);
        let data = compose(view);
        let result = decompose(data);

        assert.deepStrictEqual(data, ["[[DataView]]", [0, 1, 2, 3, 4, 5, 6, 7]]);
        assert.deepStrictEqual(result, view);
    });

    it("should compose for HTML Structured Clone Algorithm as expected", () => {
        let buf = new ArrayBuffer(8);
        let view = createView(buf);
        let result = compose(view, true);

        assert.deepStrictEqual(result, view);
    });

    it("should serialize and deserialize as expected", () => {
        let buf = new ArrayBuffer(8);
        let view = createView(buf);
        let data = serialize(view);
        let result = deserialize(data);

        assert.deepStrictEqual(data, JSON.stringify([
            "[[DataView]]",
            [0, 1, 2, 3, 4, 5, 6, 7]
        ]));
        assert.deepStrictEqual(result, view);
    });
});