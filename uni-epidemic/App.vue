<script>
  import {
    mapMutations,
    mapState
  } from 'vuex';
  export default {
    computed: {
      ...mapState('user', ['token'])
    },
    methods: {
      // 使用 mapMutations 辅助方法，把 user 模块中的 updateToken 方法映射到当前组件中使用
      ...mapMutations('user', ['updateToken', 'updateUserInfo']),
    },
    onLaunch: async function() {
      console.log('App Launch')
      // 刚启动小程序时，如果上次已经登录过 token不为空
      if (this.token) {
        // 进行身份验证 判断token是否过去
        const res = await uni.$http.get('/')
        if(res.statusCode !== 200) return uni.$showMsg()
        // 身份验证失败 即登录过期
        if (res.data.status === 1) {
          // 显示提示框
          uni.$showMsg('登录已过期，请重新登录！')
          // 需要清空 vuex 中的 token 和 userInfo
          this.updateToken('')
          this.updateUserInfo('')
        }
      }
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import '@/uni_modules/uni-scss/index.scss';
  /* #ifndef APP-NVUE */
  @import '@/static/customicons.css';

  // 设置整个项目的背景色
  page {
    background-color: #fff;
  }

  // 设置所有设置了container类的页面的下内边距
  .container {
    padding-bottom: 40px;
  }

  /* #endif */
  .example-info {
    font-size: 14px;
    color: #333;
    padding: 10px;
  }
</style>
