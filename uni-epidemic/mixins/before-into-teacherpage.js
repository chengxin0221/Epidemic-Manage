import { mapState } from 'vuex'

// 导出一个 mixin 对象
export default {
  computed: {
    ...mapState('user', ['userInfo']),
  },
  onShow() {
    // 在页面刚展示的时候，判断该用户的用户类型是否能够进入该页面
    if(this.userInfo.userType !== "教师"){
      return uni.switchTab({
        url: '/pages/home/home'
      })
    }
  },
  methods: {
    
  },
}