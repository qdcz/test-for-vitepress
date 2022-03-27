module.exports = {
    // base: '/',
    lang: 'en-US',
    title: '人间清醒',
    description: '广天下之广,深天下之深',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '关于', link: '/about/index' },
            { text: '友情链接', link: '/contact/index' }
        ],
        // sidebar: {
        //     '/client/': [
        //         // { text: 'html', link: '/client/html' },
        //         // { text: 'css', link: '/client/css' },
        //         { text: 'base', link: '/client/javaScript/base' },
        //         { text: 'jinjie', link: '/client/javaScript/jinjie' }

        //     ],
        //     '/service/': [
        //         { text: 'tt03', link: '/test02/index' },
        //         { text: 'tt04', link: '/test02/index' }
        //     ]
        // },
        carbonAds: {
            carbon: 'your-carbon-key',
            custom: 'your-carbon-custom',
            placement: 'your-carbon-placement'
          }
    }
}