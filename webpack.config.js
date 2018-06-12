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
    entry: {app:["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true", './src/app.js']},
    output: {
        //生成路径
        path: path.resolve(__dirname, 'dist'),
        //内存路径
        publicPath: "/dist/",
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
                    plugins: ['transform-runtime']
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
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(['prod/*']),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: 'css/style[hash].css' }),
        new HTMlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
    },
    devServer: {
        contentBase: path.join(__dirname, "prod"),
        port: 9000,
        open: true,
        inline: true,
        hot: true
    }
}
