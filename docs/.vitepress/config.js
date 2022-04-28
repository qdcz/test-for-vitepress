module.exports = {
    // base: '/',
    lang: 'en-US',
    title: '人间清醒',
    description: '广天下之广,深天下之深',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '关于', link: '/about/index' },
            { text: '友情链接', link: '/concat/index' },
            { text: '临时存储', link: '/temporary/index' }
        ],
        // markdown: {
        //     extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6']
        // },
        sidebar:"auto"
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
        // carbonAds: {
        //     carbon: 'your-carbon-key',
        //     custom: 'your-carbon-custom',
        //     placement: 'your-carbon-placement'
        //   }
    },
    markdown: {
        // extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'],
        lineNumbers: true,
        // options for markdown-it-anchor
        anchor: { level: 4 },
        // options for markdown-it-toc
        config: (md) => {
            // use more markdown-it plugins!
            md.use(require('markdown-it-anchor'))
        }
    }
}