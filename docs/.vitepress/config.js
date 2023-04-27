module.exports = {
  title: '网站标题',
  description: '网站描述',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/docPress/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/foo/' },
      {
        text: '测试下拉框',
        items: [
          { text: '测试菜单项一', link: '/foo/' },
          { text: '测试菜单项二', link: '/foo/' },
          { text: '测试菜单项三', link: '/foo/' }
        ]
      }
    ],
    sidebar: [
      {
        text: '指南第一页',
        items: [
          { text: 'Bar Index', link: '/foo/' },
          { text: 'Bar One', link: '/foo/one' },
          { text: 'Bar Two', link: '/foo/two' },
        ]
      },
      {
        text: '指南第二页',
        items: [
          { text: 'Bar Three', link: '/bar/three' },
          { text: 'Bar Four', link: '/bar/four' },
        ]
      },
    ]

  }
}