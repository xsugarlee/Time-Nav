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


# 办公学习 {.softwares-h1}

:::warning 归档

- 收集整理💻️新机开荒必备的一些常用💾软件，包含多种学习办公📁等多个方面🧩
- 采用清晰🔍的分类和标签🔖系统，您可根据自己的需求🚀快速定位到目标网址🌐
- 如果您觉得我们的网址导航对您有帮助🥰请分享📲给您的👨‍💻朋友【Ctrl+D】一键收藏⭐

:::

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

