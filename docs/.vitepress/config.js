import { defineConfig } from 'vitepress'
export default defineConfig({
    // base: '/',
    lang: 'en-CN',
    title: '澜漾',
    description: '广天下之广,深天下之深',
    themeConfig: {
        logo: '/logo2.jpg',
        displayAllHeaders: true,
        search: true,
        searchPlaceholder: 'Search...',
        lastUpdated: '最近更新时间',
        nextLinks: true,
        prevLinks: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: '首页', link: '/' },
            { text: '码上行动', link: '/home/home' },
            { text: '编辑器快捷键', link: '/IDEShortcutKey/WebStorm' },
            {
                text: '杂',
                items: [
                    { text: '药香氤氲', link: '/interest/drug/index' },
                    { text: '乐动人生', link: '/interest/music/index' },
                ]
            },
            { text: '关于', link: '/about/index' },
            { text: '友情链接', link: '/concat/index' },
            { text: '临时存储', link: '/temporary/index' }
        ],
        smoothScroll: true,  // 平滑滚动
        sidebar:"auto"
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
})