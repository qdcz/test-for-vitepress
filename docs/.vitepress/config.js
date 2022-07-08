import { defineConfig } from 'vitepress'
export default defineConfig({
    head: [
        [
            "meta",
            {
                name: "viewport",
                content:
                    "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
            },
        ],
        ["meta", { name: "keywords", content: "澜漾" }],
        ["link", { rel: "icon", href: "/favicon.ico" }],
        [
            "link",
            { rel: "stylesheet", href: "https://lib.baomitu.com/gitalk/1.7.0/gitalk.min.css" },
        ],
        ["script", { src: "https://lib.baomitu.com/gitalk/1.7.0/gitalk.min.js" }],
        ["script", { src: "https://lib.baomitu.com/axios/0.21.1/axios.js" }]
    ],
    // base: '/',
    lang: 'en-CN',
    title: '澜漾',
    description: '广天下之广,深天下之深',
    themeConfig: {
        logo: '/logo2.jpg',
        repo: 'qdcz',
        docsDir: 'docs',
        // editLinks: true,
        // editLinkText: 'Edit this page on GitHub',
        displayAllHeaders: true,
        search: true,
        searchPlaceholder: 'Search...',
        lastUpdated: '最近更新时间',
        nextLinks: true,
        prevLinks: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: '🏠 首页', link: '/' },
            { text: '码上行动', link: '/home/home' },
            { text: '编辑器快捷键', link: '/IDEShortcutKey/WebStorm' },
            // { text: 'npm包备注', link: '/npmPackage/index' },
            { text: '环境搭建', link: '/environmentConstruction/index' },
            { text: 'windowSkills', link: '/windowSystem/index' },
            { text: 'linuxSkills', link: '/service/Linux/index' },
            // {
            //     text: '杂',
            //     items: [
            //         { text: '药香氤氲', link: '/interest/drug/index' },
            //         { text: '乐动人生', link: '/interest/music/index' },
            //     ]
            // },
            { text: '🔨关于', link: '/about/index' },
            { text: '👫友情链接', link: '/concat/index' },
            { text: '临时存储', link: '/temporary/index' }
        ],
        smoothScroll: true,  // 平滑滚动
        sidebar: "auto"
    },
    markdown: {
        toc: { includeLevel: [1, 2, 3] },
        // lineNumbers: true,
        // options for markdown-it-anchor
        anchor: { permalink: false },
        // options for markdown-it-toc
        config: (md) => {
            // use more markdown-it plugins!
            md.use(require('markdown-it-anchor'))
        }
    }
})