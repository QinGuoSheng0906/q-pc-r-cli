/**
 * 样式规则检查
 */

module.exports = {
   // stylelint-config-rational-order是配置书写顺序的
   extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
   processors: [],
   // 'stylelint-declaration-block-no-ignored-properties'这个插件的作用是警告那些不起作用的属性
   plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
   // 配置自定义规则
   rules: {
      "indentation": 4,                                                       // 缩进  
      "block-no-empty": true,                                                 // 禁止空块
      "comment-no-empty": true,                                               // 禁止空注释
      // "number-leading-zero": true,                                            // 小数部分小于或等于1的前导零
      "color-no-invalid-hex": true,                                           // 禁止无效的 16 进制颜色。
      "block-no-empty": true,                                                 // 禁止空快
   },
   // 忽略校验的文件，其中/**/*是glob语法，指的是所有文件和文件夹
   ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
}