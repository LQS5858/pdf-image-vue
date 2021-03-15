importScripts("precache-manifest.9aacd72068d404d88590f5e890907bde.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");



// 设置相应缓存的名字的前缀和后缀
workbox.core.setCacheNameDetails({
    prefix: 'cache-exp',
    suffix: 'v1.0.0',
})
// 缓存web的css资源
workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // 使用缓存，但尽快在后台更新
    workbox.strategies.staleWhileRevalidate({
        // 使用自定义缓存名称
        cacheName: 'css-cache'
    })
);

// 缓存web的js资源
workbox.routing.registerRoute(
    // 缓存JS文件
    /.*\.js/,
    // 使用缓存，但尽快在后台更新
    workbox.strategies.staleWhileRevalidate({
        // 使用自定义缓存名称
        cacheName: 'js-cache'
    })
);

// 缓存web的图片资源
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 1 * 24 * 60 * 60 // 设置缓存有效期为30天
            })
        ]
    })
);

// 我们很多资源在其他域名上，比如cdn、oss等，这里做单独处理，需要支持跨域
workbox.routing.registerRoute(
    /^https:\/\/cdn\.my\.com\/.*\.(jpe?g|png|gif|svg)/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cdn-images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 1 * 24 * 60 * 60 // 设置缓存有效期为5天
            })
        ],
        fetchOptions: {
            credentials: 'include' // 支持跨域
        }
    })
);

// 缓存get api请求的数据
// workbox.routing.registerRoute(
//     new RegExp('https://m.my.com/api'),
//     workbox.strategies.networkFirst({
//         cacheName: 'api'
//     })
// );

  // 缓存post api请求的数据
  // const bgSyncPlugin = new workbox.backgroundSync.Plugin('apiQueue', {
  //   maxRetentionTime: 1 * 60
  // });

  // workbox.routing.registerRoute(
  //   /.*\/api\/.*/,
  //   new workbox.strategies.NetworkOnly({
  //     plugins: [bgSyncPlugin]
  //   }),
  //   'POST'
  // );

