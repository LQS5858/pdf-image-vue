const { name } = require('./package.json')
module.exports = {
    configureWebpack: {
        output: {
            // qiankun微应用必须添加这个---把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`
        }
    },
    devServer: {
        port: '8000',
        proxy: {
            '^/api': {
                target: 'http://cms.ipfz.co:83',
                changeOrigin: true
            }
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    pwa: {
        name: 'easy-front-vue-cli3',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        // configure the workbox plugin (GenerateSW or InjectManifest)
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/service-worker.js',
            importWorkboxFrom: 'disabled',
            importScripts: 'https://cdn.bootcdn.net/ajax/libs/workbox-sw/5.1.4/workbox-sw.js'
            // ...other Workbox options...
        }
    }
}