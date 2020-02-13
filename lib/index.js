require("@hyurl/utils/types");
const { createComposer } = require("./compose");
const { createDecomposer } = require("./decompose");
const TypePattern = /^\[\[[A-Z][a-zA-Z0-9_]+\]\]$/;

Object.assign(exports, {
    createComposer,
    createDecomposer
});

exports.compose = exports.clone = createComposer((type, value) => {
    return [`[[${type}]]`, value];
});

exports.decompose = exports.declone = createDecomposer((data) => {
    return {
        type: String(data[0]).slice(2, -2),
        value: data[1]
    };
}, (data) => {
    return Array.isArray(data)
        && data.length === 2
        && typeof data[0] === "string"
        && TypePattern.test(data[0]);
});

exports.serialize = function serialize(data) {
    return JSON.stringify(exports.compose(data));
};

exports.deserialize = function deserialize(json) {
    return exports.decompose(JSON.parse(json));
}