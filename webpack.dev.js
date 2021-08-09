/*
*  webpack -- 开发配置
*/

const path = require('path');
const webpack = require('webpack');

const { merge } = require('webpack-merge'); // 链接公共配置
const COMMON = require('./webpack.common'); // 公共配置


const devServer = {
    // target: 'web',
    contentBase: path.resolve(__dirname, './dist'),
    host: '0.0.0.0',
    port: 7777,
    historyApiFallback: true,   // 服务路由配置 
    // historyApiFallback:{
    //     index:'dist/index.html',
    //     rewrites: [
    //         { from: /.*/, to: path.posix.join('dist','index.html') }
    //     ]
    // },
    overlay: {
        errors: false//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
    },
    quiet: false, // 控制台不输出打包信息
    inline: true, // 使用inline的方式进行页面自动刷新
    open: false, // 不自动打开浏览器
    hot: true,
    progress: false,
    clientLogLevel: 'none' // 不在浏览器控制台输出错误
    // 代理
    // proxy: {
    //    '/api/*': {
    //       target: 'http://localhost:8888/',
    //       changeOrigin: false,
    //       secure: false,
    //       pathRewrite: {
    //          '^/api': ''
    //       }
    //    }
    // }
}

module.exports = merge(
    COMMON,
    {
        mode: 'development',
        devtool : 'source-map',
        cache: {
            type: 'memory'
        },
        module:{
            rules:[
                {
                    test: /\.(js|jsx)$/,
                    use:[
                        { loader:'eslint-loader' }
                    ],
                    enforce: 'pre', // 编译前检查
                    exclude: /node_modules/, // 不检测的文件
                    include: [ path.resolve(__dirname, 'src') ] // 指定检查的目录
                }
            ]
        },
        /* 插件 */
        plugins: [
            new webpack.HotModuleReplacementPlugin()	// 热更新
        ],
        devServer
    }
);