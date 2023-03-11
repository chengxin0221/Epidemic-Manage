export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 登录成功之后的 token 字符串
    token: uni.getStorageSync('token') || '',
    // 用户的基本信息
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 将要要编辑的用户信息
    userData: JSON.parse(uni.getStorageSync('userData') || '{}'),
  }),

  // 模块的 mutations 方法
  mutations: {
    // 更新 token 字符串
    updateToken(state, token) {
      state.token = token
      // 通过 this.commit() 方法，调用 user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
      this.commit('user/saveTokenToStorage')
    },

    // 将 token 字符串持久化存储到本地
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },

    // 更新用户的基本信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      // 将 userInfo 对象持久化存储到本地
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    
    // 更新将要要编辑的用户信息
    updateUserData(state, userData) {
      state.userData = userData
      // 将 userInfo 对象持久化存储到本地
      uni.setStorageSync('userData', JSON.stringify(state.userData))
    },
  },

  // 模块的 getters 属性
  getters: {

  },
}
