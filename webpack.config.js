module.exports = {
    mode: "development",
    entry: "./lib/index.js",
    devtool: "source-map",
    target: "node",
    node: {
        process: false
    },
    output: {
        path: __dirname + "/bundle",
        filename: "structured-clone.js",
        library: "StructuredClone",
        libraryTarget: "umd",
        globalObject: "this",
    },
    resolve: {
        extensions: [".js"]
    }
};
