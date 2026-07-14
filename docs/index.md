---
layoutClass: m-nav-layout
outline: [2, 3, 4]
sidebar: false
prev: false
next: false
---

<script setup>
import MNavLinks from './components/MNavLinks.vue'
import SearchBox from './components/SearchBox.vue'
import { NAV_DATA } from './data.ts'
</script>
<style src="./index.scss"></style>

# 时知导航 {.shizhi-h1}

::: info 简介

- 汇聚互联网🌐优秀资源，精心筛选与整合🔍 致力于提供高品质内容🌟
- 界面简洁清晰🌊操作便捷🌱，喜欢请记得【Ctrl+D】一键收藏⭐
- 更新日期🕘2025-05-17 ✅全站收录站点: 655🍊近期收录站点: +50 新增极简模式🍃 问AI智能助理🤖 (需加速)

:::

<SearchBox />
<confetti />

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>