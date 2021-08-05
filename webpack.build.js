/*
*  webpack -- 生产
*/

// const path = require('path');
// const webpack = require('webpack');

const { merge } = require('webpack-merge'); // 链接公共配置
const COMMON = require('./webpack.common'); // 公共配置

//css 压缩
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin');

// js优化
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

//手动添加webpack内部js压缩器
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(
    COMMON,
    {
        mode: 'production',
        devtool:'cheap-module-source-map',
        // 分割
        optimization: {
            splitChunks: {
                // 自动提取所有公共模块到单独 bundle
                chunks: 'all'
            },
            minimize: true,// 启动压缩
            usedExports: true, //只导出被使用的模块
            minimizer: [ 
                new TerserWebpackPlugin({
                    test: /\.js(\?.*)?$/i
                }),
                // css 压缩
                new CssMinimizerPlugin({
                    // parallel: true, // 启用/禁用多进程并发执行。
                    // parallel: 4,// 启用多进程并发执行且设置并发数。
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: { removeAll: true }, // 清除注释
                                normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                            }
                        ]
                    }
                  
                })
                //new OptimizeCSSAssetsPlugin (
                // // 引入css 规则
                //     cssProcessor: require('cssnano'),
                //     cssProcessorPluginOptions: {
                //         preset: [
                //             'default', {
                //                 discardComments: { removeAll: true }, //对注释的处理
                //                 normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                //             } 
                //         ]
                //     },
                //     canPrint: true  // 是否打印处理过程中的日志
                //)
            ]
        },
        cache: { // 缓存
            // 将缓存类型设置为文件系统
            type: 'filesystem',
            buildDependencies: {
                /* 将你的 config 添加为 buildDependency， 以便在改变 config 时获得缓存无效*/
                config: [ __filename ]
                /* 如果有其他的东西被构建依赖，你可以在这里添加它们*/
            
            /* 注意，webpack.config，加载器和所有从你的配置中引用的模块都会被自动添加*/           
            }          
            // 指定缓存的版本            
            // version: '1.0'
        }, 
        module: {
            rules: [
                {
                    test: /\.(jpg|png|gif|bmp)$/,
                    use: [
                        { //  图片压缩
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false
                                },
                                pngquant: {
                                    quality: [ 0.65, 0.9 ],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ]
                }
            ]
        },
        /* 插件 */
        plugins: [
            // js优化
            new WebpackParallelUglifyPlugin({
                uglifyJS: {
                    output: {
                        beautify: false, //不需要格式化
                        comments: false //不保留注释
                    },
                    compress: {
                        drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                    },
                    warnings: false // 在UglifyJs删除没有用到的代码时不输出警告
                }
            })
        ]
    }
);