// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store

// 由于平台的限制，小程序项目中不支持 axios，而且原生的 wx.request() API 功能较为简单，不支持拦截器等全局定制的功能。因此，建议在 uni-app 项目中使用 @escook/request-miniprogram 第三方包发起网络数据请求。
// 按需导入 $http 对象
import {
  $http
} from '@escook/request-miniprogram'
// 配置请求根路径 使用localhost或127.0.0.1用手机预览获取不到数据，使用ipv4地址才可以【连WiFi需使用WLAN的ipv4，真机预览才看的了】
$http.baseUrl = 'http://192.168.43.206:5000'
// 把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 请求拦截器
$http.beforeRequest = function(options) {
  // 显示loading效果
  /* uni.showLoading({
    title: '数据加载中...'
  }) */
  // 判断请求的方法是否为POST请求
  if (options.method === "POST") {
    // 请求的是有权限（即不包含/api/）的接口 需为请求头添加身份认证字段
    // 对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换为 query string
    options.header = options.url.indexOf('/api/') === -1 ? {
      'Authorization': store.state.user.token,
      'content-type': 'application/x-www-form-urlencoded'
    } : {
      'content-type': 'application/x-www-form-urlencoded'
    }
  } else if (options.url.indexOf('/api/') === -1) {
    // 请求的是否为有权限（即不包含/api/）的接口 为请求头添加身份认证字段
    options.header = {
      'Authorization': store.state.user.token
    }
  }
}
// 响应拦截器
$http.afterRequest = function(options) {
  // 隐藏loading效果
  // uni.hideLoading()
}
// 封装弹框的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

// 封装展示倒计时跳转登录的方法
uni.$showTips = function() {
  // 清除token重新登录
  store.commit('user/updateToken', '')
  // 清除userInfo
  store.commit('user/updateUserInfo', '')
  // 把秒数设置成 3 秒
  let seconds = 3;
  // 调用 uni.showToast() 方法，展示提示消息
  uni.showToast({
    // 不展示任何图标
    icon: 'none',
    // 提示的消息
    title: '登录已过期！' + seconds + ' 秒后跳转到登录页',
    // 为页面添加透明遮罩，防止点击穿透
    mask: true,
    // 1.5 秒后自动消失
    duration: 1500
  })
  let timer = setInterval(() => {
    seconds--
    if (seconds <= 0) {
      // 清除定时器
      clearInterval(timer)
      // 跳转到登录页面
      uni.navigateTo({
        url: '/subpkg/login/login'
      })
      // 终止后续代码的运行
      return;
    }
    // 调用 uni.showToast() 方法，展示提示消息
    uni.showToast({
      // 不展示任何图标
      icon: 'none',
      // 提示的消息
      title: '登录已过期！' + seconds + ' 秒后跳转到登录页',
      // 为页面添加透明遮罩，防止点击穿透
      mask: true,
      // 1.5 秒后自动消失
      duration: 1500
    })
  }, 1000)
}

// 将获取当前日期函数挂载到 uni 顶级对象之上，方便全局调用
uni.$getDate = function(type) {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (type === 'start') {
    year = year - 60;
  } else if (type === 'end') {
    year = year + 2;
  }
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  if(type === 'time') return `${year}-${month}-${day} ${hours}:${minutes}`
  return `${year}-${month}-${day}`
}

// 将emoji表情其转成 base64
uni.$utf16toEntities = function(str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
  str = str.replace(patt, function(char) {
    console.log(char, '===')
    var H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
}

// 解码emoji表情
uni.$uncodeUtf16 = function(str) {
  var reg = /\&#.*?;/g;
  var result = str.replace(reg, function(char) {
    var H, L, code;
    if (char.length == 9) {
      code = parseInt(char.match(/[0-9]+/g));
      H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
      L = (code - 0x10000) % 0x400 + 0xDC00;
      return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
    } else {
      return char;
    }
  });
  return result;
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    store,
    app
  }
}
// #endif
