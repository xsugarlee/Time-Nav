---
layoutClass: m-nav-layout
outline: [2, 3, 4]
sidebar: false
prev: false
next: false
---

<script setup>
import MNavLinks from '../components/MNavLinks.vue'

import { NAV_DATA } from './data'
</script>
<style src="../index.scss"></style>


# 其他资讯 {.news-h1}

::: tip

- 涵盖各种资讯网站🌐 新闻📰、科技📸、财经📊、健康🌿、体育🏀等多个领域
- 通过点击相应的分类标签🏷️可快速访问🚀您感兴趣的特定领域🔥的资讯网站
- 如果您觉得我们的网址导航对您有帮助🥰请分享📲给您的朋友和同事

:::

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

