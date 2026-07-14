import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '导航大全',
        items: [
          {
            // 分组标题1
            text: '找灵感，下素材',
            items: [
              { text: '环艺专题', link: '/designav/' },
            ],
          },
          {
            // 分组标题2
            text: '装软件，查资料',
            items: [
              { text: '办公学习', link: '/softwares/' },
            ],
          },
          {
            // 分组标题3
            text: '一网在手，天下皆知',
            items: [
              { text: '其他资讯', link: '/news/' },
            ],
          },
        ],
      },
    {
        text: '网址提交',
        link: 'https://docs.qq.com/form/page/DR29KWVFmUHladXFY',
    },
    {
        text: '查看更多',
        items: [
              { text: '关于我们', link: '/about/' },
              { text: '在线接单', link: '/orders/' },
              { text: '欢迎打赏', link: '/reward/' },
            ],
    },
    {
        text: '极简模式',
        link: '/minimalism/',
    },
        {
        text: '问AI',
        link: '/askaipro/',
    },
]
