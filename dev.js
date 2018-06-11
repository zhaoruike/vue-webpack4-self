let express = require('express')
let app = express();
let proxy = require('http-proxy-middleware')
let webpack = require("webpack")
let path = require("path")
let webpackDevMiddleware = require("webpack-dev-middleware")
let webpackHotMiddleware = require("webpack-Hot-middleware")
let webpackConfig = require("./webpack.config.js")
let complier = webpack(webpackConfig)
let devMiddleware = webpackDevMiddleware(complier, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true //向控制台显示任何内容 
})

let hotMiddleware = webpackHotMiddleware(complier,{
   log: false,
   heartbeat: 2000,
})
app.use(express.static(path.resolve(__dirname,'dist')))
app.use(devMiddleware)
app.use(hotMiddleware);
app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));



app.listen(8111,function(){console.log("port 8111 is working!!!")});