# markdown效果示例

## h2 标题

### h3 标题

#### h4 标题

##### h5 标题

###### h6 标题
---

## other

> 这是一段引用,种一棵树的最好时候是十年前,其次是现在.

可以用 `javascript` 开发的,终将用 `javascript` 开发.

```javascript
// 获取posts目录下的所有markdown文件
function getPostsContent() {
  var getGithubContentUrl =
    "https://api.github.com/repos/haokur/haokur.github.io/contents/posts";
  ajax({
    url: getGithubContentUrl,
    method: "GET",
    format: "json",
    headers: {},
    data: {}
  }).then(res => {
    var data = JSON.parse(res);
    var mdFileNames = data.filter(item => item.name.includes(".md"));
    var postsListHtml = "";
    postsListHtml = mdFileNames
      .map(item => {
        let filename = item.name.replace(".md", "");
        return (
          '<li class="posts-item"><a href="posts.html?source=' +
          filename +
          '">' +
          filename +
          "</a></li>"
        );
      })
      .join("");
    document.querySelector("#posts-list").innerHTML = postsListHtml;
  });
}
```

**strong 强调**

[github 链接](https://github.com/haokur)

![](https://pandao.github.io/editor.md/examples/images/4.jpg)

> Follow your heart.

![](https://pandao.github.io/editor.md/examples/images/8.jpg)

> 图为：厦门白城沙滩

图片加链接 (Image + Link)：

[![](https://pandao.github.io/editor.md/examples/images/7.jpg)](https://pandao.github.io/editor.md/images/7.jpg "李健首张专辑《似水流年》封面")

> 图为：李健首张专辑《似水流年》封面

| Function name | Description                |
| ------------- | -------------------------- |
| `help()`      | Display the help window.   |
| `destroy()`   | **Destroy your computer!** |
| `destroy()`   | **Destroy your computer!** |
| `destroy()`   | **Destroy your computer!** |


---- 

- 列表项1
  1. hello
    - 1
    - 2
  2. world
- 列表项2
  - 列表子项1
  - 列表子项2