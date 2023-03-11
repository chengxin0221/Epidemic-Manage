<template>
  <view class="container">
    <!-- 未登录时展示的区域 -->
    <view class="unlogin-container" v-if="!token">
      <!-- 未登录图片 -->
      <image class="unlogin-img" src="../../static/none.jpg"></image>
      <!-- 一键登录按钮 -->
      <button class="btn-login" @click="gotoLogin">一键登录</button>
      <!-- 文字提示 -->
      <view class="tip-text">
        登录后可进行更多操作
      </view>
    </view>
    <!-- 个人中心区域 -->
    <view class="personal-container" v-else>
      <!-- 头像和姓名区域 -->
      <view class="img-name-box">
        <!-- 头像 -->
        <view class="img-box">
          <image class="per-img" mode="widthFix" :src="headImg ? headImg : '../../static/girl.png'"></image>
        </view>
        <!-- 姓名 -->
        <text class="name">{{userInfo.uname}}</text>
      </view>
      <!-- 其他功能选项区域 -->
      <view class="service-box">
        <!-- 个人中心各项功能 -->
        <view class="service" v-for="(item,index) in serviceData" :key="index" @click="gotoServicePage(item)">
          {{item}}<text class="ws-text"
            v-if="item === '个人信息'">{{(!userInfo.phone || ! userInfo.residence) ? '[未完善个人信息]' : ''}}</text>
          <uni-icons type="forward" size="14"></uni-icons>
        </view>
      </view>
      <button class="btn-logout" @click="logout">退出登录</button>
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

      };
    },
    computed: {
      // token 是用户登录成功之后的 token 字符串
      ...mapState('user', ['token', 'userInfo']),
      // 头像
      headImg() {
        return this.userInfo.img ? this.userInfo.img.replace(/http:\/\/([^\/]*)/g, uni.$http.baseUrl) : ''
      },
      // 其他功能选项
      serviceData() {
        let list = [];
        if (this.userInfo) {
          switch (this.userInfo.userType) {
            case '学生':
              list = ["个人信息", "修改密码", "健康打卡", "返校/外出申请", "申请记录"]
              break;
            case '教师':
              list = ["个人信息", "修改密码", "健康日报", "申请审批", "管理班级"]
              break;
            case '管理员':
              list = ["个人信息", "修改密码", "健康情况", "审批记录", "用户管理"]
              break;
          }
        }
        return list;
      }
    },
    methods: {
      ...mapMutations('user', ['updateToken', 'updateUserInfo']),
      // 跳转到登录页面
      gotoLogin() {
        uni.navigateTo({
          url: '/subpkg/login/login'
        })
      },
      // 跳转到所选服务页面
      gotoServicePage(item) {
        switch (item) {
          case "个人信息":
            uni.navigateTo({
              url: '/subpkg/personalInfo/personalInfo'
            })
            break;
          case "修改密码":
            uni.navigateTo({
              url: '/subpkg/modifyPwd/modifyPwd'
            })
            break;
          case "健康打卡":
            uni.navigateTo({
              url: '/subpkg/health/health'
            })
            break;
          case "返校/外出申请":
            uni.navigateTo({
              url: '/subpkg/application/application'
            })
            break;
          case "申请记录":
            uni.navigateTo({
              url: '/subpkg/applicationRecord/applicationRecord'
            })
            break;
          case "健康日报":
            uni.navigateTo({
              url: '/subpkg_admin/daily/daily'
            })
            break;
          case "申请审批":
            uni.navigateTo({
              url: '/subpkg_admin/examination/examination'
            })
            break;
          case "管理班级":
            uni.navigateTo({
              url: '/subpkg_admin/classesManage/classesManage'
            })
            break;
          case "用户管理":
            uni.navigateTo({
              url: '/subpkg_admin/userManage/userManage'
            })
            break;
          case "健康情况":
            uni.navigateTo({
              url: '/subpkg_admin/healthState/healthState'
            })
            break;
          case "审批记录":
            uni.navigateTo({
              url: '/subpkg_admin/reviewRecord/reviewRecord'
            })
            break;
        }
      },
      // 退出登录
      logout() {
        console.log('退出登录！')
        // 询问用户是否退出登录
        uni.showModal({
          title: '提示',
          content: '确认退出登录吗？',
          success: async (res) => {
            if (res.confirm) {
              // 用户确认了退出登录的操作
              // 需要清空 vuex 中的 token
              this.updateToken('')
              this.updateUserInfo('')
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container {

    // 未登录区域
    .unlogin-container {
      text-align: center;

      // 未登录图片
      .unlogin-img {
        width: 446rpx;
        height: 426rpx;
        margin-top: 72px;
      }

      // 一键登录按钮
      .btn-login {
        width: 80%;
        margin: 10px auto;
        border-radius: 18px;
        background-color: #c8d9ff;
      }

      // 文字提示
      .tip-text {
        font-size: 14px;
        color: #5f5d5d;
        margin-top: 15px;
      }
    }

    // 个人中心区域
    .personal-container {

      // 头像和姓名区域
      .img-name-box {
        height: 400rpx;
        background-color: #d4e4ff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40px;

        // 头像
        .img-box {
          width: 160rpx;
          height: 160rpx;
          border-radius: 50%;
          overflow: hidden;
          .per-img {
            width: 160rpx;
          }
        }

        // 姓名
        .name {
          font-size: 18px;
          margin-top: 10px;
        }
      }

      // 其他功能选项区域
      .service-box {
        position: relative;
        top: -129rpx;
        margin: 0 24px;
        background-color: white;
        border: 1px solid #ebebeb;
        border-radius: 18px;
        box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.06);

        // 最后一项
        :last-child {
          border-bottom: none;
        }

        // 个人中心各项功能
        .service {
          display: flex;
          justify-content: space-between;
          padding: 10px 15px;
          border-bottom: 1px solid #ebebeb;
          font-size: 16px;
          align-items: center;

          &:last-child {
            border: none;
          }

          // 未完善个人信息文字提示
          .ws-text {
            color: #7979f5;
            font-size: 12px;
            position: relative;
            left: -26px;
          }
        }
      }

      // 退出登录按钮
      .btn-logout {
        position: relative;
        top: -50rpx;
        width: 80%;
        margin: 0 auto;
        border-radius: 18px;
        background-color: #dce6fd;
      }
    }
  }
</style>
