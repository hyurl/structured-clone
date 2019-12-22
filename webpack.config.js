module.exports = {
    mode: "production",
    entry: "./lib/index.js",
    devtool: "source-map",
    target: "node",
    node: {
        process: false
    },
    output: {
        path: __dirname + "/bundle",
        filename: "structured-clone.min.js",
        library: "StructuredClone",
        libraryTarget: "umd",
        globalObject: "this",
    },
    resolve: {
        extensions: [".js"]
    }
};