<template>
  <div
    class="search-box"
    @click="handleClick"
    :class="{ 'focused': isFocused }"
  >
    <div class="search-engine-selector">
      <button @click="changeSearchEngine('bing')" style="padding: 5px;">
        <img src="https://www.bing.com/favicon.ico" alt="Bing Icon" class="search-engine-icon">
      </button>
      <!-- 可根据需要添加其他搜索引擎的按钮 -->
    </div>
    <input
      id="searchInput"
      type="text"
      placeholder="输入关键词搜索"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="search"
    >
    <button @click="search">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="search-icon" style="margin-right: 10px; margin-left: 10px;">
        <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isFocused: false,
            searchTimeout: null // 用于存储延迟的定时器
        };
    },
    methods: {
        search() {
            // 清除之前的定时器，避免多次触发
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            // 设置延迟执行搜索逻辑
            this.searchTimeout = setTimeout(() => {
                const searchQuery = document.getElementById('searchInput').value;
                if (searchQuery.trim() !== '') {
                    const searchEngine = localStorage.getItem('searchEngine') || 'bing';
                    let searchUrl = '';
                    if (searchEngine === 'bing') {
                        searchUrl = `https://cn.bing.com/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                    window.open(searchUrl, '_blank');
                }
            }, 2000); // 延迟 2 秒
        },
        handleFocus() {
            this.isFocused = true;
        },
        handleBlur() {
            this.isFocused = false;
        },
        handleClick() {
            this.isFocused = true;
        },
        changeSearchEngine(engine) {
            localStorage.setItem('searchEngine', engine);
        }
    }
};
</script>

<style scoped>
/* Light mode styles */
.search-box {
  display: flex;
  align-items: center;
  border-radius: 13px;
  border: 1px solid #f0f0f0;
  background-color: #f5f5f5;
  padding: 8px;
  transition: box-shadow 0.3s; /* 添加过渡效果 */
}

.search-box.focused {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 鼠标点击时显示外部柔和阴影 */
}

.search-box:hover {
  background-color: #f6f6f6; /* 悬停时背景色 */
}

input {
  flex: 1;
  margin-right: 10px;
  border: none;
  padding: 10px 5px; /* 增大预加载文字的大小 */
  border-radius: 5px;
  font-family: inherit;
  font-size: 15px;
  background-color: transparent;
  color: black;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

button svg {
  fill: #007bff;
}

button:hover svg {
  fill: #0056b3;
}

.search-engine-selector {
  display: flex;
  align-items: center;
}

.search-engine-selector button {
  padding: 5px;
}

.search-engine-icon {
  width: 26px; /* 或者其他更小的固定宽度 */
  max-width: 100%; /* 图标的最大宽度为父容器的宽度 */
  height: auto; /* 高度自动调整以保持宽高比 */
}

.search-icon {
  width: 1.8em;
  height: 1.8em;
  color:rgba(77, 77, 77, 0.3);
}

/* Dark mode styles */
:root.dark .search-box {
  background-color: rgba(56, 56, 56, 0.1); /* 暗黑模式下的背景色 */
  border-color: rgba(56, 56, 56, 0.8); /* 暗黑模式下的边框颜色 */
}

:root.dark .search-box.focused {
  box-shadow: 0 0 10px #6e6e6e2c; /* 鼠标点击时显示外部柔和阴影 */
}

:root.dark input {
  color: #ffffff; /* 暗黑模式下的文字颜色 */
}

:root.dark button svg {
  fill: #4d4d4d; /* 暗黑模式下的图标填充颜色 */
}

:root.dark .search-icon {
  color: rgba(255, 255, 255, 0.3); /* 暗黑模式下的搜索图标颜色 */
}

</style>
