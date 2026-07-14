<template>
    <div class="search-container">
        <a href="/" class="back-home" target="_self">返回首页</a>
        <p class="h1" style="letter-spacing: 6px;">时知导航</p>
        <div ref="container" :style="containerStyle">
            <div class="content" :style="contentStyle">
                <slot></slot>
            </div>
        </div>
        <div>
            <input v-model="searchBox" type="text" class="search-box" :placeholder="placeholderText"
                @keyup.enter="handleSearch" />
            <div class="engine-switch">
                <label :class="{ active: selectedEngine === 'google' }" @click="switchEngine('google')">Google</label>
                <label :class="{ active: selectedEngine === 'bing' }" @click="switchEngine('bing')">必应</label>
                <label :class="{ active: selectedEngine === 'tiangong' }" @click="switchEngine('tiangong')">天工</label>
            </div>
        </div>

        <!-- 收藏网址图标 -->
        <div class="favorites">

            <div class="favorite-icon">
                <a href="https://www.baidu.com" target="_blank">
                    <img src="/icons/baidu.webp" alt="baidu" />
                </a>
            </div>

            <div class="favorite-icon">
                <a href="https://chat.deepseek.com/" target="_blank">
                    <img src="/icons/deepseek.webp" alt="deepseek" />
                </a>
            </div>
            <div class="favorite-icon">
                <a href="https://www.doubao.com/chat/" target="_blank">
                    <img src="/icons/doubao.webp" alt="doubao" />
                </a>
            </div>

            <div class="favorite-icon">
                <a href="https://juejin.cn/" target="_blank">
                    <img src="/icons/juejin.webp" alt="juejin" />
                </a>
            </div>

            <div class="favorite-icon">
                <a href="https://www.csdn.net/" target="_blank">
                    <img src="/icons/csdn.webp" alt="csdn" />
                </a>
            </div>

            <div class="favorite-icon">
                <a href="https://wx.zsxq.com/login/" target="_blank">
                    <img src="/icons/zsxq.webp" alt="zsxq" />
                </a>
            </div>

            <div class="favorite-icon">
                <a href="https://www.xiaohongshu.com/" target="_blank">
                    <img src="/icons/xhs.webp" alt="xhs" />
                </a>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* 返回首页按钮 */
.back-home {
    position: fixed;
    top: 10px;
    left: 10px;
    font-size: 14px;
    color: rgba(246, 246, 246, 0.3) !important;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 1000;
    transition: all 0.3s ease;
}

/* 添加悬停效果 */
.back-home:hover {
    color: #fff !important;
}

.grid-container {
    display: grid;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
}

/* 搜索框及内容容器 */
.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px;
    box-sizing: border-box;
    position: relative;
}

/* 标题 */
p.h1 {
    text-align: center;
    font-size: 45px;
    color: #fff;
    margin: 58px 0;
    font-weight: 500;
    letter-spacing: 6px;
    line-height: 1.5;
}

/* 搜索框 */
.search-box {
    border: 1px solid rgba(255, 255, 255, .05);
    border-radius: 50px;
    padding: 9px 20px;
    height: 50px;
    width: 650px;
    background-color: rgba(0, 0, 0, .6) !important;
    color: #fff;
    font-size: 14px;
    outline: none;
    backdrop-filter: blur(5px);
}

/* 标签 */
.engine-switch {
    margin: 3px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.engine-switch label {
    margin: 0 15px;
    cursor: pointer;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 4px;
    color: rgba(246, 246, 246, 0.3);
    transition: color 0.3s ease;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}

.engine-switch label:hover {
    color: #fff;
}

.engine-switch label.active {
    color: white;
    background-color: transparent;
    box-shadow: none;
}

.button {
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 30px;
    color: #fff;
    border: none;
    cursor: pointer;
}

.button:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

/* 收藏网址图标 */
.favorites {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 35px;
    margin-bottom: 20px;
    width: 100%;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}

.favorite-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    touch-action: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
}

.favorite-icon img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    pointer-events: none;
    -webkit-user-drag: none;
}


.favorite-icon:hover {
    background-color: rgba(255, 255, 255, 0.5);
}

.favorite-icon img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
}

@media (max-width: 768px) {
    p.h1 {
        font-size: 40px;
        margin-bottom: 1rem;
        white-space: nowrap;
    }

    .search-container {
        padding-top: 70px;
    }

    .search-box {
        max-width: 330px;
    }

    .favorites {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        margin-bottom: -100px;
        padding: 0 15px;
        width: 100%;
        box-sizing: border-box;
    }

    .favorite-icon {
        width: 44px;
        height: 44px;
    }

    .favorite-icon img {
        width: 30px;
        height: 30px;
    }
}

@media (max-width: 480px) {
    p.h1 {
        font-size: 37px;
        margin-bottom: 2.85rem;
        white-space: nowrap;
    }

    .search-container {
        padding-top: 105px;
    }

    .search-box {
        width: 650px;
        height: 45px;
        padding: 8px 15px;
        font-size: 13px;
    }

    .favorites {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        margin-bottom: -100px;
        padding: 0 15px;
        width: 100%;
        box-sizing: border-box;
    }

    .favorite-icon {
        width: 44px;
        height: 44px;
    }

    .favorite-icon img {
        width: 30px;
        height: 30px;
    }
}

/* 额外的优化：确保在极小屏幕上的显示 */
@media (max-width: 320px) {
    p.h1 {
        font-size: 28px;
        margin-bottom: 1.3rem;
    }

    .search-box {
        width: 260px;
        height: 40px;
        padding: 6px 12px;
        font-size: 11px;
    }

    .favorites {
        gap: 10px;
        margin-bottom: -100px;
    }

    .favorite-icon {
        width: 35px;
        height: 35px;
    }

    .favorite-icon img {
        width: 24px;
        height: 24px;
    }
}
</style>

<script setup>
import { ref, watch, onMounted } from 'vue'

// 常量定义
const ENGINES = {
    bing: {
        name: '必应',
        searchUrl: query => `https://www.bing.com/search?q=${encodeURIComponent(query)}&PC=U316&FORM=CHROMN`,
        placeholder: '大江东去，浪淘尽，千古风流人物。'
    },
    google: {
        name: 'Google',
        searchUrl: query => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        placeholder: ''
    },
    tiangong: {
        name: '天工',
        searchUrl: query => `https://www.tiangong.cn/search?q=${encodeURIComponent(query)}`,
        placeholder: ''
    }
}

// 响应式数据
const selectedEngine = ref('bing')
const searchBox = ref('')
const placeholderText = ref(ENGINES.bing.placeholder)

// 方法
const switchEngine = engine => selectedEngine.value = engine

const handleSearch = () => {
    const query = searchBox.value.trim()
    if (!query) return

    const { searchUrl } = ENGINES[selectedEngine.value]
    const url = searchUrl(query)

    // 安全打开新窗口
    const newWindow = window.open('', '_blank')
    newWindow.opener = null
    newWindow.location.href = url
}

// 诗词API
const loadPoetry = () => {
    return new Promise((resolve, reject) => {
        if (window.jinrishici) {
            window.jinrishici.load(resolve)
            return
        }

        const script = document.createElement('script')
        script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js'
        script.onload = () => window.jinrishici.load(resolve)
        script.onerror = reject
        document.head.appendChild(script)
    })
}

// 生命周期
onMounted(async () => {
    // 返回按钮事件
    document.querySelector('.back-home')?.addEventListener('click', e => {
        e.preventDefault()
        sessionStorage.setItem('manualReturn', 'true')
        window.location.replace('/')
    })

    // 隐藏侧边栏和右侧栏
    const sidebar = document.querySelector('.VPSidebar')
    if (sidebar) sidebar.style.display = 'none'

    // 隐藏右侧边栏
    const aside = document.querySelector('.VPDoc .aside')
    if (aside) aside.style.display = 'none'

    // 隐藏BackToTop组件和导航下拉菜单
    const elementsToHide = [
        '.vitepress-backTop-main',
        '.VPBackToTop',
        '.VPLocalNavOutlineDropdown button',
        '.VPDocFooter .backToTop'
    ]

    // 创建并添加全局样式
    const style = document.createElement('style')
    style.textContent = `
    ${elementsToHide.join(', ')} {
        display: none !important;
    }
`
    document.head.appendChild(style)

    // 额外尝试直接隐藏已存在的元素
    elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => {
            el.style.display = 'none'
        })
    })
    // 调整内容区域
    const content = document.querySelector('.VPContent.has-sidebar')
    if (content) {
        content.style.paddingLeft = '0'
        content.style.maxWidth = '100%'
    }

    // 设置Bing壁纸
    try {
        const res = await fetch('https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN')
        const { url } = await res.json()
        document.querySelector('.mini-layout')?.style.setProperty('background-image', `url(${url})`)
    } catch {
        document.querySelector('.mini-layout')?.style.setProperty('background-image', 'url(/default-bg.webp)')
    }
})

// 监听引擎变化
watch(selectedEngine, async engine => {
    try {
        const result = await loadPoetry()
        placeholderText.value = result.data.content || ENGINES[engine].placeholder
    } catch {
        placeholderText.value = ENGINES[engine].placeholder
    }
})
</script>