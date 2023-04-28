<template>
  <view class="container">
    <!-- 登录区域 -->
    <!-- 登录表单上方的图片 -->
    <image class="login-img" src="../../static/loginLogo.jpg"></image>
    <!-- 登录表单 -->
    <view class="login-body">
      <!-- 每个登录表单项的容器 -->
      <view class="login-item">
        <!-- 账号 -->
        <uni-icons type="person" size="30" color="#858585"></uni-icons>
        <input class="input-item" type="number" :placeholder="placeholder" maxlength="10" v-model="id" />
      </view>
      <view class="login-item">
        <!-- 密码 -->
        <uni-icons type="locked" size="30" color="#858585"></uni-icons>
        <input class="input-item" password placeholder="请输入密码" v-model="passWord" />
      </view>
    </view>
    <!-- 获取微信用户个人信息并登录 -->
    <button class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
    <!-- 别的选项 -->
    <view class="ather-choice">
      <!-- <view class="choice-text" @click="forget">
        忘记密码
      </view> -->
      <view class="choice-text center" @click="notLogin">
        以游客的身份访问
      </view>
    </view>
  </view>
</template>

<script>
  // 按需从 vuex 中导入 mapState 辅助函数
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        // 用户类型
        userType: '学生',
        placeholder: '请输入学号或职工号',
        // 用户类型数组
        userArr: ['学生', '班主任', '管理员'],
        index: 0,
        // 账号
        id: '',
        // 密码
        passWord: '',
      };
    },
    computed: {
      // token 是用户登录成功之后的 token 字符串
      ...mapState('user', ['token', 'userInfo']),
    },
    methods: {
      // 使用 mapMutations 辅助方法，把 user 模块中的 updateToken 方法映射到当前组件中使用
      ...mapMutations('user', ['updateToken', 'updateUserInfo']),
      // 获取微信用户的基本信息 并登录
      async getUserInfo(e) {
        if(!this.id || !this.passWord) return uni.$showMsg('账号或密码不能为空！')
        if(!/^\d{10}$/.test(this.id)) return uni.$showMsg('账号格式不正确！')
        // 判断是否获取用户信息成功
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
        console.log(e.detail.userInfo)
        const res = await uni.$http.post('/api/login', {
          uid: this.id,
          upwd: this.passWord
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("登录失败！")
        if (res.data.status === 0) {
          // 清除表单数据
          this.id = ''
          this.passWord = ''
          // 更新 vuex 中的 token
          this.updateToken(res.data.token)
          this.updateUserInfo({
            ...res.data.userInfo
          })
          // 获取当前页面栈的实例
          let pages = getCurrentPages();
          if(pages.length === 1){
            uni.navigateTo({
              url: '/pages/my/my'
            })
          } else {
            // 跳转回进入登录页面之前的页面
            uni.navigateBack()
          }
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 以游客身份访问
      notLogin(){
        uni.switchTab({
          url: '/pages/home/home'
        })
      },
      // 忘记密码
      forget(){
        let pages = getCurrentPages();
        console.log(pages,'=------',pages.length);
        uni.$showMsg('请联系班主任或管理员重置密码！')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    text-align: center;

    // 登录表单上方的图片
    .login-img {
      width: 400rpx;
      height: 374rpx;
      margin-top: 35px;
    }

    // 登录表单项的外层容器
    .login-body {
      margin: 20px 30px;

      // 每个登录表单项的容器
      .login-item {
        padding: 10px 10px 0;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #999;

        // 用户类型选择器
        .picker-item {
          margin-left: 10px;
        }

        // 输入框
        .input-item {
          width: 69%;
          height: 28px;
          margin: 10px;
          text-align: left;
        }
      }
    }

    // 登录按钮
    .btn-login {
      width: 256px;
      margin: 30px auto 14px;
      border-radius: 18px;
      background-color: #c8d9ff;
    }

    // 别的选择
    .ather-choice {
      width: 75%;
      margin: auto;
      // display: flex;
      // justify-content: space-between;

      // 忘记密码 以及 不登录以游客身份访问 文字
      .choice-text {
        color: #777779;
        font-size: 16px;
      }
      
      .center {
        align-items: center;
      }
    }
  }
</style>
