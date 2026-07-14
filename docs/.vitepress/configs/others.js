<script>
    const meta = document.querySelector('meta[name="generator"]');
    if (meta) {
        meta.parentNode.removeChild(meta)
  }
    javascript: void (function () {
        document.scrollingElement.scrollIntoView({ behavior: 'smooth' })
    })()
</script>

const API_KEY = process.env.VITE_API_KEY;
// 使用 API_KEY 进行 API 调用
const meta = document.createElement("meta");
meta.name = "generator";
meta.content = `VitePress v${VERSION}`;
document.head.appendChild(meta);

module.exports = {
    // ...
    plugins: [
        // ...
        rollupPluginClosureCompiler(),
        new webpack.DefinePlugin({
            // 定义环境变量
            'process.env.VITE_API_KEY': JSON.stringify('your-api-key'),
        }),
    ],
};

