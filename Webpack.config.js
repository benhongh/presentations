"use strict";
const fs = require("fs");
const path = require("path");

function extractEntries(dir) {
    const entries = {};
    const tsconfig = JSON.parse(fs.readFileSync(path.join(dir, "tsconfig.json"), "utf8"));

    for (let sourcePath of tsconfig.files) {
        const sourceFileName = path.basename(sourcePath);
        if (sourceFileName.endsWith(".d.ts"))
            continue;

        if (sourceFileName.endsWith(".tsx")) {
            const sourceName = path.basename(sourcePath, ".tsx");
            entries[sourceName] = path.join(dir, sourcePath);
        }
        else {
            const sourceName = path.basename(sourcePath, ".ts");
            entries[sourceName] = path.join(dir, sourcePath);
        }
    }

    if (entries["dummy"] !== undefined) {
        delete entries.dummy;
    }

    return entries;
}

module.exports = {
    entry: extractEntries(path.join(__dirname, "www/scripts")),
    output: {
        path: "./www/scripts/distro",
        filename: "[name].entry.js"
    },
    externals: {
        "jquery": "jQuery",
        "reveal": "Reveal"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts", ".tsx"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};