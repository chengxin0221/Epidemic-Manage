export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 将要打开的打卡记录
    // daka: JSON.parse(uni.getStorageSync('daka') || '{}'),
    daka: null,
  }),

  // 模块的 mutations 方法
  mutations: {
    // 更新将要打开的打卡记录
    updateDakaData(state, daka) {
      state.daka = daka
      // 将 daka 对象持久化存储到本地
      // uni.setStorageSync('daka', JSON.stringify(state.daka))
    },
  },

  // 模块的 getters 属性
  getters: {

  },
}
