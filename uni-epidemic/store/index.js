import Vue, {
  provide
} from 'vue'
import Vuex from 'vuex'
// 导入home页面的vuex模块
import home from './modules/home.js'
import user from './modules/user.js'
import student from './modules/student.js'

Vue.use(Vuex); //vue的插件机制

// 创建 Store 的实例对象
const store = new Vuex.Store({
  // 挂载 store 模块
  modules: {
    home,
    user,
    student
  },
})

export default store
