const path = require("path")
const glob = require("glob")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')
let entries = function () {
    let jsDir = path.resolve(__dirname, 'src/entry')
    let entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    let src = {
      map: {},
      plugins: [
        // new CleanWebpackPlugin(['dist/*']),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({filename:"css/[name][hash].css"}),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
      ]
    };
    for (let i = 0; i < entryFiles.length; i++) {
      let filePath = entryFiles[i];
      let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
      src.map[filename] = ["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",filePath];
      src.plugins.push(
        new HTMlWebpackPlugin({
          title: 'My App',
          filename: filename + '.html',
          template: 'index.html',
          inject: true,
          chunks: [filename,"commons"],
          cache: false,
          hash: false,
          minify: {
            removeComments: false,
            collapseWhitespace: false
          },
          showErrors: false
        })
      )
  
    }
    return src;
  };
module.exports = {
    // entry: {
    //     app: './src/app.js',
    // },
    // entry:["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",'./src/app.js'],
    entry:entries().map,
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
    // plugins: [ 
    //     // new CleanWebpackPlugin(['dist/*']),
    //     new VueLoaderPlugin(),
    //     new MiniCssExtractPlugin({ filename: 'css/style[hash].css' }),
    //     new HTMlWebpackPlugin({
    //         filename:'index.html',
    //         template:'index.html'
    //     }),
    //     new webpack.NamedModulesPlugin(),
    //     new webpack.HotModuleReplacementPlugin(),
    // ],
    plugins:entries().plugins,
    devServer: {
        contentBase: path.join(__dirname, "dist"), 
        port: 9000, 
        open:true,
        inline:true,
        hot:true 
      }
}
