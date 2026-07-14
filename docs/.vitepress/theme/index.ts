import { h, onMounted, watch, nextTick } from 'vue'
import { useData, EnhanceAppContext } from 'vitepress'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import CssHex from './components/CssHex.vue'
import MNavLinks from './components/MNavLinks.vue'
import Visitor from './components/Visitor.vue'
import Minimalism from './components/Minimalism.vue'
import SearchBox from './components/SearchBox.vue'
import AskAIPro from './components/AskAIPro.vue'
import confetti from "./components/confetti.vue"
import MyLayout from './components/MyLayout.vue'
import backtotop from "./components/backtotop.vue"
import './styles/index.scss'

if (typeof window !== 'undefined') {
    if (window.navigator?.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => registration.unregister())
        })
    }

    if ('caches' in window) {
        caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
    }
}

let homePageStyle: HTMLStyleElement | undefined

export default {
    extends: DefaultTheme,
    setup() {
        const route = useRoute()
        const initZoom = () => mediumZoom('.main img', { background: 'var(--vp-c-bg)' })

        onMounted(initZoom)
        watch(() => route.path, () => nextTick(initZoom))
    },

Layout: () => {
    const { frontmatter } = useData()
    return h('div', [
        h(MyLayout, {
            class: frontmatter.value.layoutClass
        }, {
            'nav-bar-title-after': () => h(Visitor),
            // 'aside-bottom': () => h('div', { class: 'reward-section' }, [
            //     h('p', { class: 'reward-title' }, '绿泡泡赞助：1 杯现磨澳白✨'),
            //     h('img', { src: '/zanshang.webp', alt: 'WeChat QR Code' }),
            // ])
        }),
        h(backtotop)
    ])
},

    enhanceApp({ router, app }: EnhanceAppContext) {
        app.component('MNavLinks', MNavLinks)
        app.component('CssHex', CssHex)
        app.component('SearchBox', SearchBox)
        app.component('Minimalism', Minimalism)
        app.component('AskAIPro', AskAIPro)
        app.component('confetti', confetti)
        app.component('backtotop', backtotop)

        if (typeof window !== 'undefined') {
            // 更新主页样式
            watch(() => router.route.data.relativePath, () => {
                updateHomePageStyle(['/', '/design_nav/'].includes(location.pathname))
            }, { immediate: true })

        }
    }
}

// 浏览器类型检测
if (typeof window !== 'undefined') {
    const browser = navigator.userAgent.toLowerCase()
    if (browser.includes('chrome')) {
        document.documentElement.classList.add('browser-chrome')
    } else if (browser.includes('firefox')) {
        document.documentElement.classList.add('browser-firefox')
    } else if (browser.includes('safari')) {
        document.documentElement.classList.add('browser-safari')
    }
}

// 彩虹动画样式
function updateHomePageStyle(value: boolean) {
    if (value) {
        if (homePageStyle) return

        homePageStyle = document.createElement('style')
        homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
        document.body.appendChild(homePageStyle)
    } else {
        if (!homePageStyle) return

        homePageStyle.remove()
        homePageStyle = undefined
    }
}