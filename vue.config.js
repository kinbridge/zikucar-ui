module.exports = {
    // publicPath:'./',
    lintOnSave: false,
    productionSourceMap:false,
    devServer:{
        port:80,
        // outputDir: 'dist',  // 输出文件目录
        proxy: {
            '/think': {
                target:'http://127.0.0.1:8080',
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin:true,
                pathRewrite:{
                    '^/think': '/think'
                }
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
      }
}