### 参考地址:

- [themes](https://github.com/PrismJS/prism-themes)
- [plugins](https://prismjs.com/index.html#plugins)

### 使用:

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="./libs/prism/themes/prism-tomorrow.css" />

<!-- 待渲染代码 -->
<pre>
    <code class="language-js">
        function test(){
            console.log('hello')
        }
    </code>
</pre>

<!-- 引入脚本 -->
<script src="./libs/prism/prism.js" data-manual></script>

<!-- 执行渲染 -->
<script>
    Prism.highlightAll();
</script>
```

### 插件使用范例,如 `line-numbers`

```html
<!-- 引入插件样式 -->
<link rel="stylesheet" href="./libs/prism/plugins/line-numbers/prism-line-numbers.css">

<!-- 待渲染代码 -->
<pre class="line-numbers">
    <code class="language-js">
        function test(){
            console.log('hello')
        }
    </code>
</pre>

<!-- 引入脚本 -->
<script src="./libs/prism/plugins/line-numbers/prism-line-numbers.min.js"></script>

<!-- 渲染 -->
<script>
    Prism.highlightAll();
</script>
```

