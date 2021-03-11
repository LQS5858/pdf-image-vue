const { name } = require('./package.json')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    configureWebpack: {
        output: {
            // qiankun微应用必须添加这个---把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`
        }
    },
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://cms.ipfz.co:83',
                changeOrigin: true
            }
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}