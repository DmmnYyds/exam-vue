const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.121:7001',
        // target: 'http://8.131.89.181:7001',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
