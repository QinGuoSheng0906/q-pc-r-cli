/*
*  webpack公共配置
*/

const path = require('path');
const webpack = require('webpack');


//清理本地打包文件
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

//HTML 模版
const HtmlWebpackPlugin = require('html-webpack-plugin');

//这个插件可以将样式文件从bundle.js抽离出来一个文件，并且支持chunk css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 去除无用css -- 会清除antd 按需样式
// const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
// const glob = require('glob');

// const PATHS = {
//     src: path.resolve(__dirname, 'src')
// };

module.exports = {
    entry: {
        main: [
            path.resolve(__dirname,'./src/index.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].js',
        publicPath: '/',
        clean:true //清理旧文件
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [ path.resolve('./src') ],// 限定范围
                use:[ 
                    {
                        loader:'thread-loader', // 开启多进程打包
                        options:{
                            workers:3
                        }
                    },
                    { 
                        loader: 'babel-loader' ,
                        options: {
                            //开启babel缓存，第二次构建时会读取之前的缓存
                            //问题：当文件名没有发生变化的时候，同名文件都是走缓存。会导致修改内容与实际展示内容不一致。
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { 
                        loader: MiniCssExtractPlugin.loader, 
                        options: { publicPath: '../' } 
                    }, 
                    'css-loader',
                    'postcss-loader',
                    'thread-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    { 
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '../' } 
                    }, 
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    'postcss-loader',
                    'less-loader',
                    { // 处理样式全局变量及公共文件,
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [ // 只有一条时也可以写成对象形式
                                path.resolve(__dirname, 'src/assets/styles/variable.less')
                            ]
                            // injector: 'append' // 如果在样式文件之后导入就加此行配置
                        }
                    },
                    'thread-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|bmp)$/,
                type: 'asset/resource',
                generator: {
                    // [ext]前面自带"."
                    filename: 'images/[hash:8].[name][ext]'
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
                generator: {
                    // [ext]前面自带"."
                    filename: 'assets/fonts/[hash:8].[name][ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack5-react', 
            template: path.resolve(__dirname, './public/index.html'),
            favicon: path.resolve(__dirname,  './public/favicon.ico'), // 添加小图标
            filename: path.resolve(__dirname, './dist/index.html'),
            hash: true,
            minify: {
                html5: true,
                collapseWhitespace: true, //去除空格
                preserveLineBreaks: false, //去除换行
                minifyCSS: true,
                minifyJS: true,
                removeComments: false //去除注释
            }
        }),
        //css less 抽离
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename:'styles/[name].css'
        }),
        // new PurgecssWebpackPlugin({
        //     paths: glob.sync(`${PATHS.src}/*.html`, { nodir: true })
        // }),
        // 全局环境变量
        new webpack.DefinePlugin({
            'process.env': {
                PROCESS_ENV: JSON.stringify(process.env.PROCESS_ENV)
            }
        })
    ],
    // 设置别名
    resolve: {
        // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
        modules: [ path.resolve(__dirname, './src'), path.resolve(__dirname, 'node_modules') ],
        alias: {
            '@': path.resolve(__dirname, './src'),                             // 客户端目录
            '@api': path.resolve(__dirname, './src/api'),                      // 请求api
            '@assets': path.resolve(__dirname, './src/assets'),                // 静态文件
            '@styles': path.resolve(__dirname, './src/assets/styles'),         // 样式
            '@images': path.resolve(__dirname, './src/assets/images'),         // 静态图片
            '@components': path.resolve(__dirname, './src/components'),        // 组件
            '@pages': path.resolve(__dirname, './src/pages'),                  // 页面
            '@lib': path.resolve(__dirname, './src/lib'),                      // 其它
            '@enums': path.resolve(__dirname, './src/lib/enums'),              // 枚举值
            '@actions': path.resolve(__dirname, './src/stores/actions'),       // 状态管理
            '@reducers': path.resolve(__dirname, './src/stores/reducers')
        },
        enforceExtension: false,
        extensions: [ '.js', '.jsx', '.css', '.less' , '.json' ]
    }
}