import { mapState } from 'vuex'

// 导出一个 mixin 对象
export default {
  computed: {
    ...mapState('user', ['userInfo']),
  },
  onShow() {
    // 用于管理员用户不可进入的页面
    if(this.userInfo.userType !== "教师" && this.userInfo.userType !== "管理员"){
      return uni.switchTab({
        url: '/pages/home/home'
      })
    }
  },
  methods: {
    
  },
}