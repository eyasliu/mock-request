import webpack from 'webpack'
import path from 'path'

const join = (...args) => path.join(__dirname, ...args)

const config = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: join('./dest'),
        filename: '[name].js',
        publicPath: '/dest/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"'+process.env.NODE_ENV+'"'
        })
    ]

}

export default config