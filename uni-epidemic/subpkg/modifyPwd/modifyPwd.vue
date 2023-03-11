<template>
  <view>
    <!-- 修改密码页面 -->
    <view class="modify-box">
      <view class="modify-item">
        <!-- 账号 -->
        <uni-icons type="person" size="30" color="#aaaaff"></uni-icons>
        <input class="input-item" type="number" placeholder="请输入账号" maxlength="12" v-model="uid" />
      </view>
      <view class="modify-item">
        <!-- 原密码 -->
        <uni-icons type="locked" size="30" color="#aaaaff"></uni-icons>
        <input class="input-item" password placeholder="请输入原密码" v-model="password" />
      </view>
      <view class="modify-item">
        <!-- 新密码 -->
        <uni-icons type="locked" size="30" color="#aaaaff"></uni-icons>
        <input class="input-item" password placeholder="请输入新密码" v-model="pwd1" />
      </view>
      <view class="modify-item">
        <!-- 再次输入新密码 -->
        <uni-icons type="locked" size="30" color="#aaaaff"></uni-icons>
        <input class="input-item" password placeholder="请再次输入新密码" v-model="pwd2" />
      </view>
      <!-- 修改密码按钮 -->
      <button class="btn-modify" @click="modifyPwd">修改</button>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-nologin-into-page.js';
  export default {
    // 未登录的用户不可进入该页面
    mixins: [intopageMix],
    data() {
      return {
        // 账号
        uid: '',
        // 原密码
        password: '',
        // 新密码
        pwd1: '',
        // 再次输入新密码
        pwd2: ''
      };
    },
    methods: {
      // 修改密码
      async modifyPwd() {
        if (!this.uid || !this.password || !this.pwd1 || !this.pwd2) return uni.$showMsg('未填写完整')
        if (this.pwd1 !== this.pwd2) {
          this.pwd1 = ''
          this.pwd2 = ''
          return uni.$showMsg('两次输入的新密码不一致！')
        }
        const res = await uni.$http.post('/modifypwd', {
          uid: this.uid,
          pwd: this.password,
          pwd1: this.pwd1
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("修改密码失败！")
        if (res.data.status === 0) {
          this.uid = this.password = this.pwd1 = this.pwd2 = ''
          return uni.$showMsg('修改密码成功！')
        } else {
          // 失败原因为身份认证失败
          if (res.data.message === '身份认证失败！') {
            // 3秒后跳转登录
            uni.$showTips()
          } else {
            // 其他原因导致失败
            this.uid = this.password = this.pwd1 = this.pwd2 = ''
            return uni.$showMsg(res.data.message)
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .modify-box {
    width: 80%;
    margin: 60px auto;

    .modify-item {
      padding: 10px 10px 0;
      display: flex;
      align-items: center;
      border-bottom: solid 1px #0f0fff;

      // 输入框
      .input-item {
        width: 69%;
        height: 28px;
        margin: 10px;
        text-align: left;
      }
    }

    // 修改按钮
    .btn-modify {
      width: 256px;
      margin: 30px auto 14px;
      border-radius: 18px;
      background-color: #c8d9ff;
    }
  }
</style>
