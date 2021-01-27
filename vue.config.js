const path = require('path')
const px2rem = require('postcss-px2rem') // postcss的一个插件

module.exports = {
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 37.5   // 设计稿等分后的rem值   375/10
          })
        ]
      }
    }
  },

  devServer: {
    //port: 8080, //项目端口号
    open: true, // 自动打开浏览器
    // quiet: true, // 不做太多日志输出
    proxy: {
      //处理以/api开头路径的请求
      //'/api': 'http://localhost:4000' ,  // http://localhost:4000/api/search/users
      // '/api': {
      //   target: 'http://localhost:4000', // 转发的目标地址
      //   pathRewrite: {
      //     '^/api' : ''  // 转发请求时去除路径前面的/api
      //   },
      // },


      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址
        pathRewrite: {
          '^/api' : ''  // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      }
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'zh_CN',
      fallbackLocale: 'zh_CN',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
