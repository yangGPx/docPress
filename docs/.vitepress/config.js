module.exports = {
  title: '小鹏村-笔记',
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
      // {
      //   text: '测试下拉框',
      //   items: [
      //     { text: '测试菜单项一', link: '/foo/' },
      //     { text: '测试菜单项二', link: '/foo/' },
      //     { text: '测试菜单项三', link: '/foo/' }
      //   ]
      // }
    ],
    sidebar: [
      {
        text: 'Webpack',
        items: [
          { text: 'webpack总结', link: '/webpack/webpack总结' },
        ]
      },
      {
        text: 'React',
        items: [
          { text: 'React入门总结', link: '/react/React-note' },
        ]
      },
      {
        text: 'CSS',
        items: [
          { text: 'Css常用样式', link: '/css/常用样式' },
        ]
      },
      {
        text: 'VUE',
        items: [
          { text: 'vue3使用语法记录', link: '/vue/vue3使用语法记录' },
          { text: 'Pinia基本使用', link: '/vue/pinia的基本使用' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: '藏海', link: '/other/藏海' },
        ]
      },
    ]

  }
}