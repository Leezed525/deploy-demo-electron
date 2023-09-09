const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: '0.0.0.0',
        // open: true,
        proxy: {
            ['/demo']: {
                target: 'http://127.0.0.1:5000',//目标地址
                ws: true,//是否开启websocket
                secure: false,//是否https
                changeOrigin: true,
                pathRewrite: {
                    ['^/demo']: '' // 这里理解成用/demo代替target里面的地址，即去掉路径中的/api  的这一截
                }
            }
        }
    }
})
