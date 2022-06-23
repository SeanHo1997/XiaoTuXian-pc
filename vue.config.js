const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 定义自动引入所有组件的样式路径
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  }

  // chainWebpack: config => {
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => Object.assign(options, { limit: 10000 }))
  // }
})
