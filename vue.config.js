module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://cms.ipfz.co:83',
                changeOrigin: true
            }
        }
    }
}