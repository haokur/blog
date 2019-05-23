
## XMLHttpRequest 类

XMLHttpRequest 为 ajax 的核心。

- 使用

```js
var xhr = new XMLHttpRequest()
```

- XMLHttpRequest 本质及构成

本质为一个函数；

```js
typeof XMLHttpRequest ; // 'function'
```

原型链关系：XMLHttpRequest “继承”于 XMLHttpRequestEventTarget，XMLHttpRequestEventTarget “继承”于 EventTarget ；

```js
var xhr = new XMLHttpRequest();
xhr instanceof XMLHttpRequest; // true
xhr instanceof XMLHttpRequestEventTarget ; // true
xhr instanceof EventTarget ; // true
```

- 实例化时属性，xhr 上属性

  - 事件绑定

    - onabort =》中止请求时触发
    - onerror =》请求错误时触发
    - onload =》请求成功时触发
    - onloadend =》请求不管成功失败中止都将最后触发
    - onloadstart => 客户端开始发出请求，readyState=1，status=0，
    - onprogrress =》服务器已经响应，处理请求中触发
    - onreadystatechange =》 readyState 改变时触发
    - ontimeout =》超时触发

  - 响应体相关

    - readyState =》初始值为0，在 new XMLHttpRequest() 的时候
    - response
    - responseText
    - responseType
    - responseURL
    - responseXML

  - 状态相关

    - status
    - readyState
    - statusText

  - 其他
    - timeout =》设置超时请求的时间，默认为0，不计超时
    - upload =》 XMLHttpRequestLoad 实例
    - withCredentials =》Request Header 是否带 cookie，需服务端配合。

- 第一层原型，XMLHttpRequest 属性和方法

  - 属性
    - 状态
    	- UNSENT ：0
    	- OPENED：1
    	- HEADERS_RECEIVED：2
    	- LOADING：3
    	- DONE：4
  - 方法
    - abort =》中止请求
    - getAllResponseHeaders =》 获取所有 headers 头部信息，并非所有都能获取
    - getResponseHeader('key')  =》获取 key 的 header 信息，并非所有都能获取
  - open(method，url，async) 打开一个请求，此时 xhr.readyState 为 1
  - overrideMimeType 
  - send(data?) =》发送请求

  - 其他

    > 设置了 xhr 的所有属性的 getter 和 setter


- 第二层原型，XMLHttpRequestEventTarget 

  > 仅设置了 xhr 的 事件绑定中的方法的 getter 和 setter

- 第三层原型，EventTarget

  - addEventListener
  - dispatchEvent
  - removeEventListener



## 流程解析

前端测试代码如下：

```js
var xhr = new XMLHttpRequest()
console.log(xhr.readyState); // 此时的 readyState 为0

var eventKeys = [
    'abort',
    'error',
    'load',
    'loadend',
    'loadstart',
    'progress',
    'readystatechange',
    'timeout'
]

eventKeys.forEach(key => {
    xhr[`on${key}`] = function () {
        console.log(`-------request is ${key}-------`)
        console.log(`request is on${key}`)
        log()
        console.log('\n\n')
    }
});

xhr.open('get', 'http://localhost:9000/', true);
xhr.send()

function log() {
    console.log('readyState=', xhr.readyState);
    console.log('status=', xhr.status);
    console.log('statusText', xhr.statusText);
}
```

nodejs 服务端代码如下：

```js
const Koa = require('koa');
const app = new Koa();

function response() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world')
    }, 10000);
  })
}

app.use(async ctx => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  var res = await response()
  ctx.body = res;
})

app.listen(9000)
```

根据打印信息，成功的普通请求概括如下：

- readyState 经历四个值： 0 -》1 -》 2 -》 3 -》 4
- 绑定事件触发顺序及对应的 readyState 是：onreadystatechange（1） -》onloadstart（1） -》 onreadystatechange（2） -》onreadystatechange（3）-》onprogress（3）-》onreadystatechange（4）-》onload（4）-》onloadend（4）
- status ：0 和 200
- statusText：空 和 OK

通过 readyState 看请求周期

- var xhr = new XMLHttpRequest();   //  xhr.readyState = 0  
- xhr.open('get','url',true);     // readyState = 0   =》 readyState = 1 ，ononreadystatechange 触发
- xhr.send(); // => xhr.onloadstart() 触发，readyState 不变为1
- readyState = 1  =》 readyState = 2，onreadystatechange 触发，服务器端已经接收到请求。
- readyState = 2   =》 readyState = 3，onreadystatechange 触发，并触发 onprogress 事件，表示响应正在加载中。。。
- readyState = 3   =》 readyState = 4，onreadystatechange 触发，并触发 onload 事件。
- 触发 onloadend 事件。



## 实例解析

- 普通的 get 请求

```js
var xhr = new XMLHttpRequest()
xhr.onload = function () {
    console.log(xhr.response, xhr.responseText)
}
xhr.open('get', 'http://localhost:9000/', true)
xhr.send();
```

- 普通的 post 请求（Form Data，请求参数为 key value 形式）

```js
var xhr = new XMLHttpRequest();
xhr.onload = function () {
    console.log(xhr.response, xhr.responseText)
}
xhr.open('post', 'http://localhost:9000/', true)
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
xhr.send('name=tom&age=18');
```

> 设置请求的格式为 `x-www-form-urlencoded` , 且传递的数据为字符串，用 `&` 连接不同的字段。
>
> 设置请求头，xhr.setRequestHeader( key,val )

- 普通的 post 请求 （请求体为 json 格式）

```js
var xhr = new XMLHttpRequest();
xhr.onload = function () {
    console.log(xhr.response, xhr.responseText)
}
xhr.open('post', 'http://localhost:9000/', true)
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify({ name: 'tom', age: 18 }));
```

- 设置超时请求（ xhr.timeout=2000 ）

```js
var xhr = new XMLHttpRequest()
xhr.ontimeout = function(){
    console.log(xhr.status,xhr.readyState,xhr.responseText)
    console.log('请求超时')
}
xhr.onloadend = function(){
    console.log(xhr.status,xhr.readyState,xhr.responseText)
    console.log('请求结束')
}
xhr.onreadystatechange =function(){
    console.log('readyState change',xhr.readyState)
}
xhr.timeout = 2000
xhr.open('get', 'http://localhost:9000/', true);
xhr.send();
```

> 超出设置的 timeout 时间的请求，结束时，并不会触发 onerror 和 onabort  以及 onload ，只会触发 ontimeout 和 onloadend；
>
> readyState 从 0-》1-》4
>
> onload 和 onloadend 的区别是，onloadend 不管请求成功与否都会触发，而 onload 只有请求成功结束时触发。

- setRequestHeader 的用法，可以在 Request Header 中添加字段及值

客户端

```js
var xhr = new XMLHttpRequest()
xhr.onload = function () {
    console.log('请求成功')
}
xhr.open('post', 'http://localhost:9000/', true);
xhr.setRequestHeader('X-user','tom')
xhr.setRequestHeader('X-token','ACDFWE@123123')
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send();
```

服务器端（nodejs），设置允许传递的请求头字段，多个字段用逗号隔开。

```js
app.use(async ctx => {
  let origin = ctx.request.header.origin
  ctx.set("Access-Control-Allow-Origin", origin);
  ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  ctx.set("Access-Control-Allow-Headers", "X-user,X-token,Content-Type");
  var res = await response()
  ctx.body = res;
})
```

> 跨越时，需要设置 `Access-Control-Allow-Origin` 为发送请求的客户端的域名。
>
> 字段不区分大小写。

- withCredentials 的用法，请求头中带 cookie 信息

客户端设置 xhr 实体 withCredentials 属性为 true

```js
var xhr = new XMLHttpRequest()
xhr.onload = function () {
    console.log('请求成功')
}
xhr.open('post', 'http://localhost:9000/', true);
xhr.withCredentials = true; // here
xhr.send();
```

服务端，设置允许

```js
app.use(async ctx => {
  let origin = ctx.request.header.origin
  ctx.set("Access-Control-Allow-Origin", origin);
  ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  ctx.set("Access-Control-Allow-Headers", "x-user,x-token,content-type");
  ctx.set("Access-Control-Allow-Credentials", true); // here
  var res = await response()
  ctx.body = res;
})
```

效果则是：

1. Response Headers 中多了一条：Access-Control-Allow-Credentials: true
2. Request Headers 中多了一条：Cookie：本地的 cookie 字符串

> 而且此时跨域的 options 请求好像也不发了

- abort 手动终止请求

```js
var xhr = new XMLHttpRequest()
xhr.open('post', 'http://localhost:9000/', true);
xhr.send();
setTimeout(() => {
    xhr.abort();
}, 3000);
```

> 手动 abort 必须在请求完成（onloadend）之前。
>
> 周期中能触发的事件有：onreadystatechange ，onloadstart，onprogress，onabort，onloadend

- overrideMimeType  和 自定义返回类型

```js
var xhr = new XMLHttpRequest()
xhr.onload = function(){
    console.log(xhr.response)
}
xhr.open('post', 'http://localhost:9000/', true);
xhr.overrideMimeType('text/plain; charset=x-user-defined');
// 或
// xhr.responseType = 'blob';
xhr.send();
```

- upload 实体使用，实现上传进度获取

```js
xhr.onprogress = updateProgress;
xhr.upload.onprogress = updateProgress;
function updateProgress(event) {
    if (event.lengthComputable) {
      var completedPercent = event.loaded / event.total;
    }
 }
```

- 简单地封装 ajax 请求

```js
// ajax 方法定义
function ajax(options) {
    var { url, method, data, headers } = options;
    var lowerMethod = method.toLowerCase();

    var _isGet = lowerMethod === 'get';
    var _isPost = lowerMethod === 'post';

    function _dataStringify(_data) {
        return Object.keys(_data).map(key => `${key}=${_data[key]}`).join('&')
    }

    // 拼接 data
    let requestData = null
    if (_isGet) {
        url += `?${_dataStringify(data)}`
    }
    else if (_isPost) {
        requestData = options.format === 'json'
            ? JSON.stringify(data)
        : _dataStringify(data)
    }

    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = Boolean(options.withCredentials);

        xhr.onload = function () {
            if (xhr.status == 200 || xhr.status == 304) {
                resolve(xhr.responseText);
            }
            else {
                reject('请求错误')
            }
        }

        // 绑定自定义 handler
        for (var ev in options.handlers) {
            var _prevHandler = xhr[ev];
            xhr[ev] = function () {
                _prevHandler();
                options.handlers[ev]();
            }
        }

        xhr.open(method, url, true);

        // 设置 header
        for (var attr in headers) {
            xhr.setRequestHeader(attr, headers[attr]);
        }

        xhr.send(requestData);
    })

}

// ajax 使用
ajax({
    url: 'http://localhost:9000',
    method: 'POST',
    format: 'json',
    data: {
        name: 'tom'
    },
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'x-token': 'xxxxx'
    },
    withCredentials: true,
    handlers: {
        'onload': function () {
            console.log('自定义onload')
        }
    }
})
    .then(res => {
    console.log(res,222222)
})
    .catch(err => {
    console.log(err)
})
```

> 示例并不完整，可以把文件上传的 FormData 方式添加进去，还有超时等功能。
