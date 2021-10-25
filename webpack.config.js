const path = require('path')
module.exports = {
    entry: './main.temp.ts',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: __dirname,
        filename: 'main.js'
    },
}