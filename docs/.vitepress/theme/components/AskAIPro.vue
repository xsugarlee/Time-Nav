<template>
    <div class="chat-container">
        <!-- 聊天头部 -->
        <!-- 修改聊天头部 -->
        <div class="chat-header">
            <div class="connection-status" :class="connectionStatus" :title="connectionStatus === 'connected' ? '已连接' : connectionStatus === 'connecting' ? '连接中' : '连接错误'"></div>
            <h2>问AI - 您身边的智能助理</h2>
            <!-- 添加日期时间显示 -->
            <div class="datetime">
                <span id="current-time">{{ currentTime }}</span>
                <span id="current-date">{{ currentDate }}</span>
            </div>
            <button class="home-btn" @click="goToHome" title="返回主页">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M5 12h14M12 5l7 7-7 7"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" fill="none"/>
                </svg>
            </button>
        </div>

        <!-- 消息区域 -->
        <div class="messages-area" ref="messagesArea">
            <div v-for="(msg, index) in messages" :key="index"
                 class="message-bubble"
                 :class="[msg.role, {'typing': msg.role === 'assistant' && msg.isTyping}]">
                <div v-if="msg.role === 'assistant'" v-html="msg.content"></div>
                <template v-else>{{ msg.content }}</template>
            </div>
            <!-- 添加加载指示器 -->
            <div v-if="isLoading" class="loading-indicator">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        </div>

        <!-- 修改输入区域 -->
        <div class="input-area">
            <div class="input-wrapper">
                <button class="clear-btn" @click="startNewChat" title="清除历史">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path d="M19.5 5.5L18 4H6L4.5 5.5M3 7H21M5 7L6 20H18L19 7M10 10V16M14 10V16"
                              stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" fill="none"/>
                    </svg>
                </button>
                <input v-model="userInput" placeholder="输入您的问题..." @keyup.enter="sendMessage">
                <button class="send-btn" @click="sendMessage">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
// 在script部分添加goToHome函数
function goToHome() {
    window.location.href = '/'
}
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

// 常量配置
const API_ENDPOINTS = [
  "https://askai-pro.sketchupensvray.workers.dev"
]

// 初始化 Markdown 解析器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// 隐藏BackToTop组件
    const backToTop = document.querySelector('.vitepress-backTop-main, .VPBackToTop')
    if (backToTop) backToTop.style.display = 'none'

// 响应式状态
const messages = ref([
    { role: 'assistant', content: '您好！我是问AI助手，请问有什么可以帮您？' }
])
const userInput = ref('')
const isLoading = ref(false)
const connectionStatus = ref('connecting')

// 方法定义
function startNewChat() {
    messages.value = [
        { role: 'assistant', content: '您好！我是问AI助手，请问有什么可以帮您？' }
    ]
    userInput.value = ''
    isLoading.value = false
}

async function sendMessage() {
    if (!userInput.value.trim()) return

    // 添加用户消息
    messages.value.push({
        content: userInput.value,
        role: 'user'
    })

    const userMessage = userInput.value
    userInput.value = ''
    isLoading.value = true

    // 尝试多个API端点
    for (const endpoint of API_ENDPOINTS) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content: "你是问AI智能助理"
                        },
                        ...messages.value.map(msg => ({
                            role: msg.role,
                            content: msg.content
                        }))
                    ],
                    model: "DeepSeek-v3:4pE1RG2PBjGgcazxKSMwUe"
                })
            })

            const data = await response.json()
            if (data.choices && data.choices[0].message) {
                messages.value.push({
                    content: md.render(data.choices[0].message.content),
                    role: 'assistant'
                })
                isLoading.value = false
                return // 成功则退出循环
            }
        } catch (error) {
            console.error(`请求失败 (${endpoint}):`, error)
            if (endpoint === API_ENDPOINTS[API_ENDPOINTS.length - 1]) {
                // 所有端点都失败时才显示错误
                messages.value.push({
                    content: `请求失败: ${error.message}`,
                    role: 'assistant'
                })
            }
        }
    }

    isLoading.value = false
}

// 从HTML中提取回复的辅助函数
function extractReplyFromHTML(html) {
    // 这里需要根据实际HTML结构编写解析逻辑
    // 示例：假设回复包含在<div class="reply">标签中
    const match = html.match(/<div class="reply">(.*?)<\/div>/)
    return match ? match[1] : null
}

// 修改连接检查 - 恢复原来的逻辑
onMounted(async () => {
    connectionStatus.value = 'connecting'
    try {
        // 使用API_ENDPOINTS中的第一个端点进行检查
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 2000)

        const response = await fetch(API_ENDPOINTS[0], {
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        clearTimeout(timeoutId)

        connectionStatus.value = response.ok ? 'connected' : 'error'
    } catch (error) {
        console.error('连接检查失败:', error)
        connectionStatus.value = 'error'
        if(/Mobi|Android/i.test(navigator.userAgent)) {
            messages.value.push({
                content: '移动端连接失败，请检查网络代理设置是否正确',
                role: 'assistant'
            })
        }
    }

    // 禁用当前页面的滚动
    document.body.style.overflow = 'hidden'

    // 组件卸载时恢复滚动
    return () => {
        document.body.style.overflow = ''
    }
})


// 添加时间日期的响应式状态
const currentTime = ref('')
const currentDate = ref('')

function updateDateTime() {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    currentDate.value = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
}

// 在组件挂载时启动时间更新
// 在组件挂载时添加代码复制功能
onMounted(() => {
    // 更新时间
    updateDateTime()
    setInterval(updateDateTime, 1000)

    // 添加代码复制功能
    document.addEventListener('click', (e) => {
        // 检查是否点击了代码块区域
        const preElement = e.target.closest('.message-bubble.assistant pre');
        if (preElement) {
            const codeElement = preElement.querySelector('code');
            if (codeElement) {
                // 创建一个临时textarea来复制内容
                const textarea = document.createElement('textarea');
                textarea.value = codeElement.textContent;
                textarea.style.position = 'fixed';  // 避免滚动
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();

                try {
                    // 尝试使用document.execCommand复制（兼容性更好）
                    const successful = document.execCommand('copy');
                    if (successful) {
                        preElement.setAttribute('data-copied', 'true');
                        setTimeout(() => {
                            preElement.removeAttribute('data-copied');
                        }, 2000);
                    } else {
                        // 如果execCommand失败，尝试使用clipboard API
                        navigator.clipboard.writeText(codeElement.textContent)
                            .then(() => {
                                preElement.setAttribute('data-copied', 'true');
                                setTimeout(() => {
                                    preElement.removeAttribute('data-copied');
                                }, 2000);
                            })
                            .catch(err => {
                                console.error('复制失败:', err);
                                alert('复制失败，请手动复制代码');
                            });
                    }
                } catch (err) {
                    console.error('复制失败:', err);
                    // 尝试使用clipboard API作为备选
                    navigator.clipboard.writeText(codeElement.textContent)
                        .then(() => {
                            preElement.setAttribute('data-copied', 'true');
                            setTimeout(() => {
                                preElement.removeAttribute('data-copied');
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('复制失败:', err);
                            alert('复制失败，请手动复制代码');
                        });
                } finally {
                    // 清理临时元素
                    document.body.removeChild(textarea);
                }
            }
        }
    });
})
</script>

<style scoped>
/* 聊天容器设置 */
.chat-container {
    display: flex;
    flex-direction: column;
    width: 1025px;
    height: 820px;
    margin: 0 auto;
    background: var(--vp-c-bg);
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden !important;
    z-index: 100;
}

/* 头部样式 */
.chat-header {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
    gap: 8px;
}

.chat-header h2 {
    font-size: 1.2rem;
    white-space: nowrap;
    margin: 0;
    flex-shrink: 0;
}

/* 消息气泡 */
.message-bubble {
    max-width: 85%;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    line-height: 1.5;
    word-break: break-word;
    animation: fadeIn 0.3s ease-out;
    overflow-wrap: break-word;
}

/* 确保代码块不会溢出并添加美化样式 */
.message-bubble.assistant :deep(pre) {
    white-space: pre-wrap;       /* 允许代码换行 */
    word-wrap: break-word;       /* 在单词内部换行 */
    overflow-x: auto;            /* 在需要时显示水平滚动条 */
    max-width: 100%;             /* 限制最大宽度 */
    border-radius: 0.5rem;       /* 圆角边框 */
    background-color: var(--vp-code-block-bg);  /* 使用主题变量设置背景色 */
    margin: 1rem 0;              /* 上下外边距 */
    padding: 1rem;               /* 内边距 */
    border: 1px solid var(--vp-c-divider-light);  /* 添加边框 */
    position: relative;          /* 为复制按钮定位做准备 */
}

/* 代码高亮样式 */
.message-bubble.assistant :deep(pre code) {
    display: block;
    font-family: var(--vp-font-family-mono);  /* 使用等宽字体 */
    color: var(--vp-c-text-1);  /* 使用主题文本颜色 */
    line-height: 1.5;
    tab-size: 4;
    font-size: 0.95rem;          /* 确保字体大小合适 */
    text-shadow: none;           /* 移除可能导致模糊的文本阴影 */
}

/* 添加复制按钮 - 改进版 */
.message-bubble.assistant :deep(pre)::before {
    content: "复制代码";
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: var(--vp-c-brand);
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s, background-color 0.2s;
    z-index: 10;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-bubble.assistant :deep(pre):hover::before {
    opacity: 1;
}

.message-bubble.assistant :deep(pre[data-copied="true"])::before {
    content: "已复制!";
    background-color: #10b981;
}

/* 内联代码样式 */
.message-bubble.assistant :deep(code:not([class*="language-"])) {
    font-family: var(--vp-font-family-mono);
    font-size: 0.9em;
    color: var(--vp-c-brand);
    background-color: var(--vp-c-bg-soft);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    word-break: break-word;
    text-shadow: none;           /* 移除可能导致模糊的文本阴影 */
}

/* 移动端适配 */
@media (max-width: 768px) {
    .message-bubble.assistant :deep(pre)::before {
        top: 0.3rem;
        right: 0.3rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.7rem;
    }

    .message-bubble.assistant :deep(pre) {
        padding: 0.75rem;
        padding-top: 2rem;  /* 为复制按钮留出空间 */
    }

    .message-bubble.assistant :deep(pre code) {
        font-size: 0.85rem;  /* 移动端字体稍小但仍保持清晰 */
    }
}

/* 确保动画效果应用到加载指示器 */
.loading-indicator {
    animation: fadeIn 0.3s ease-out;
    display: flex;
    justify-content: center;
    gap: 6px;
    padding: 0.5rem;
    margin: 0.5rem 0;
}

.loading-dot {
    width: 8px;
    height: 8px;
    background-color: var(--vp-c-brand);
    border-radius: 50%;
    display: inline-block;
    animation: loading-bounce 1.4s infinite ease-in-out both;
}

.loading-dot:nth-child(1) {
    animation-delay: -0.32s;
}

.loading-dot:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes loading-bounce {
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}

/* 调整时间显示区域，使其更紧凑 */
.datetime {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
    margin-right: 1rem;
    font-size: 0.85rem;
    line-height: 1.2;
}

.connection-status {
    margin-right: 4px;
    padding: 0.25rem 0.5rem;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    position: relative;
}

.connection-status::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: currentColor;
}

.connection-status.connected {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.connection-status.connecting {
    background-color: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
}

.connection-status.error {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

/* 消息区域 */
.messages-area {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

/* 消息气泡 */
.message-bubble {
    max-width: 85%;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    line-height: 1.5;
    word-break: break-word;
}

.message-bubble.user {
    background: #2563eb;
    color: #fff;
    align-self: flex-end;
}

.message-bubble.assistant {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
    align-self: flex-start;
}

/* 控制加粗文本的样式 */
.message-bubble.assistant :deep(strong) {
    font-size: 1em;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

/* 输入区域 */
.input-area {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg); /* 修改为使用主题变量，自适应暗黑模式 */
}

.input-wrapper {
    display: flex;
    align-items: center;
    background: var(--vp-c-bg);
    border-radius: 0.75rem;
    border: 1px solid var(--vp-c-divider);
    transition: all 0.2s ease;
    gap: 4px;
}

.input-wrapper:focus-within {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.1);
}

.input-wrapper input {
    flex: 1;
    padding: 0.75rem 0rem;
    border: none;
    outline: none;
    font-size: 1rem;
    color: var(--vp-c-text-1);
    background: transparent;
}

.input-wrapper input::placeholder {
    color: var(--vp-c-text-3);
}

/* 修改输入区域样式 */
.input-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
}

.clear-btn {
    color: #64748b;
    padding: 1rem 0.5rem;
    margin-right: -4px;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
}

/* 按钮样式 */
.new-chat-btn {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.2s;
}

.new-chat-btn:hover {
    background: #1d4ed8;
}

.send-btn {
    color: #2563eb;
    padding: 1rem;
    transition: all 0.2s;
}

.send-btn:hover {
    color: #1d4ed8;
}

.send-btn svg {
    width: 20px;
    height: 20px;
}

.send-btn svg path {
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
}

/* 移动端适配 */
@media (max-width: 1200px) {
    .chat-container {
        width: 100%;
        height: 100vh;
        margin: 0;
        border-radius: 0;
        position: fixed;
        top: 0;
        left: 0;
        transform: none;
        z-index: 100;
    }

    .messages-area {
        height: calc(100vh - 150px);
        padding-bottom: 60px;
    }
}

/* 移动端适配 */
@media (max-width: 768px) {
    .chat-container {
        height: 100vh;
        margin: 0;
    }

    .messages-area {
        height: calc(100vh - 140px);
        padding-bottom: 80px;
    }

    .input-area {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}

/* 添加时间日期显示样式 */
.datetime {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
    margin-right: 1rem;
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
}

#current-time {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--vp-c-text-1);
}

#current-date {
    font-size: 0.8rem;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .datetime {
        font-size: 0.8rem;
        margin-right: 0.5rem;
    }

    #current-time {
        font-size: 0.9rem;
    }

    #current-date {
        font-size: 0.7rem;
        display: none; /* 在特小屏幕上隐藏日期 */
    }

    .chat-header h2 {
        font-size: 1rem;
    }
}

/* 平板设备适配 */
@media (min-width: 769px) and (max-width: 1024px) {
    .datetime {
        font-size: 0.85rem;
        margin-right: 0.75rem;
    }

    #current-time {
        font-size: 1rem;
    }

    #current-date {
        font-size: 0.75rem;
    }
}

/* 动画效果 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 打字指示器动画 */
.message-bubble.typing::after {
    content: '...';
    animation: typing 1.5s infinite;
}

@keyframes typing {
    0% { content: '.'; }
    33% { content: '..'; }
    66% { content: '...'; }
}
</style>