---
layoutClass: m-nav-layout
outline: [2, 3, 4]
sidebar: false
prev: false
next: false
---

<script setup>
import MNavLinks from '../components/MNavLinks.vue'
import { NAV_DATA } from '../designav/data.ts'
</script>
<style src="../index.scss"></style>


# 设计导航 {.design-h1}

::: danger 前言

- 环艺常用工具箱💡来自互联网的搜索与整合🌈
- 提供高品质内容💎界面简洁清爽☘️喜欢❤️记得一键收藏⭐
- 个别收录的网站存在打开速度缓慢、无法访问的情况需加速⏩上网访问👀

:::

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>