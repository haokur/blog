// ajax 方法定义
function ajax (options) {
  var { url, method, data, headers } = options
  var lowerMethod = method.toLowerCase()

  var _isGet = lowerMethod === 'get';
  var _isPost = lowerMethod === 'post';

  function _dataStringify (_data) {
    return Object.keys(_data)
      .map(key => `${key}=${_data[key]}`)
      .join('&')
  }

  // 拼接 data
  let requestData = null
  if (_isGet) {
    url += `?${_dataStringify(data)}`
  } else if (_isPost) {
    requestData =
      options.format === 'json' ? JSON.stringify(data) : _dataStringify(data)
  }

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = Boolean(options.withCredentials)

    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject('请求错误')
      }
    }

    // 绑定自定义 handler
    for (var ev in options.handlers) {
      var _prevHandler = xhr[ev]
      xhr[ev] = function () {
        _prevHandler()
        options.handlers[ev]()
      };
    }

    xhr.open(method, url, true)

    // 设置 header
    for (var attr in headers) {
      xhr.setRequestHeader(attr, headers[attr])
    }

    xhr.send(requestData)
  })
}

// ajax 使用
// ajax({
//   url: 'http://localhost:9000',
//   method: 'POST',
//   format: 'json',
//   data: {
//     name: 'tom'
//   },
//   headers: {
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Type': 'application/json',
//     'x-token': 'xxxxx'
//   },
//   withCredentials: true,
//   handlers: {
//     onload: function () {
//       console.log('自定义onload')
//     }
//   }
// })
//   .then(res => {
//     console.log(res, 222222)
//   })
//   .catch(err => {
//     console.log(err)
//   })
