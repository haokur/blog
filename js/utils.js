var utils = {
  // 查找地址中的传参
  urlSearch: function (key, searchStr) {
    searchStr = searchStr || location.search
    if (searchStr.trim() === '') {
      return key ? null : {}
    }
    searchStr = searchStr.substr(1)
    var searchArr = searchStr.split('&')
    var searchJson = {}
    searchArr.forEach(item => {
      var oItem = item.split('=')
      let key = oItem[0]
      let value = oItem[1]
      searchJson[key] = value
    })
    return key ? searchJson[key] : searchJson
  }
}
window.utils = utils
