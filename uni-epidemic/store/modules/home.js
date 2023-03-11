export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 最新公告
    noticeData: JSON.parse(uni.getStorageSync('noticeData') || '[]'),
    // 上次编辑的资讯内容
    lastEpidemicInfo: JSON.parse(uni.getStorageSync('lastEpidemicInfo') || '{}'),
    // 上次编辑的公告内容
    lastNotice: JSON.parse(uni.getStorageSync('lastNotice') || '{}'),
    // 要编辑的公告内容
    editNotice: JSON.parse(uni.getStorageSync('editNotice') || '{}'),
    // 要编辑的资讯内容
    editEpidemicInfo: JSON.parse(uni.getStorageSync('editEpidemicInfo') || '{}'),
  }),
  
  // 模块的 mutations 方法
  mutations: {
    // 更新noticeData
    updateNoticeData(state, data) {
      state.noticeData = data
      // 通过 this.commit() 方法，调用 home 模块下的 saveNoticeDataToStorage 方法，将数据持久化存储到本地
      this.commit('home/saveNoticeDataToStorage')
    },
    // 将noticeData持久化存储到本地
    saveNoticeDataToStorage(state) {
      uni.setStorageSync('noticeData', JSON.stringify(state.noticeData))
    },
    // 更新lastEpidemicInfo
    updateLastEpidemicInfo(state, data) {
      state.lastEpidemicInfo = data
      // 通过 this.commit() 方法，调用 home 模块下的 saveLastEpidemicInfo 方法，将数据持久化存储到本地
      this.commit('home/saveLastEpidemicInfo')
    },
    // 将lastEpidemicInfo持久化存储到本地
    saveLastEpidemicInfo(state) {
      uni.setStorageSync('lastEpidemicInfo', JSON.stringify(state.lastEpidemicInfo))
    },
    // 更新lastNotice
    updateLastNotice(state, data) {
      state.lastNotice = data
      // 通过 this.commit() 方法，调用 home 模块下的 saveLastNotice 方法，将数据持久化存储到本地
      this.commit('home/saveLastNotice')
    },
    // 将lastNotice持久化存储到本地
    saveLastNotice(state) {
      uni.setStorageSync('lastNotice', JSON.stringify(state.lastNotice))
    },
    // 更新editNotic
    updateEditNotice(state, data) {
      state.editNotice = data
      // 通过 this.commit() 方法，调用 home 模块下的 saveEditNoticeToStorage 方法，将数据持久化存储到本地
      this.commit('home/saveEditNoticeToStorage')
    },
    // 将editNotice持久化存储到本地
    saveEditNoticeToStorage(state) {
      uni.setStorageSync('editNotice', JSON.stringify(state.editNotice))
    },
    // 更新editEpidemicInfo
    updateEditEpidemicInfo(state, data) {
      state.editEpidemicInfo = data
      // 通过 this.commit() 方法，调用 home 模块下的 saveEditEpidemicInfoToStorage 方法，将数据持久化存储到本地
      this.commit('home/saveEditEpidemicInfoToStorage')
    },
    // 将editEpidemicInfo持久化存储到本地
    saveEditEpidemicInfoToStorage(state) {
      uni.setStorageSync('editEpidemicInfo', JSON.stringify(state.editEpidemicInfo))
    },
  },

  // 模块的 getters 属性
  getters: {

  },
}
