const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    // entry: {
    //     app: './src/app.js',
    // },
    entry:["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",'./src/app.js'],
    output: {
        //生成路径
        path: path.resolve(__dirname, 'dist'),
        //内存路径
        publicPath:"/dist/",
        filename: 'js/[name][hash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins:['transform-runtime']
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|cur)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'img/[name][hash].[ext]'
                }
            }
        ]
    },
    plugins: [ 
        // new CleanWebpackPlugin(['prod/*']),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: 'css/style[hash].css' }),
        new HTMlWebpackPlugin({
            filename:'index.html',
            template:'index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "prod"), 
        port: 9000, 
        open:true,
        inline:true,
        hot:true 
      }
}
