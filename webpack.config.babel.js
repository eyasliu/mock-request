import webpack from 'webpack'
import path from 'path'

const join = (...args) => path.join(__dirname, ...args)
const isDev = process.env.NODE_ENV === 'development'
const config = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: join('./dest'),
        filename: '[name].js',
        publicPath: '/dest/'
    },
    devtool: isDev ? 'eval' : false,
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
if(isDev){

} else {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }))
}



export default config