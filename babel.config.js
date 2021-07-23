/*
   bable配置
   秦国胜
   2019-08-05
*/
module.exports = function (api) {
    api.cache(true);
    const presets = [
        [ 
            '@babel/preset-env',
            {
                'targets': {
                    'browsers': [ '> 1%', 'last 2 versions', 'not ie <= 11' ]
                },
                // modules: false // 意思是不转义import语法，主要是为了tree-shaking
                'useBuiltIns': 'usage',
                'corejs': 3
                // 'debug': true
            } 
        ],
        '@babel/preset-react'
    ];
    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        [//按需加载antd的样式
            'import',
            {
                'libraryName': 'antd',
                'libraryDirectory': 'es',
                'style': 'css'  // style: true 会加载 less 文件
            }
        ]
    ];
    return {
        presets,
        plugins
    };
};
