<template>
  <view class="container">
    <!-- 首页图片 -->
    <image class="topimg" :src="topImg"></image>
    <!-- 提供的服务 -->
    <view class="service">
      <!-- 登录未过期时显示 -->
      <my-service :serviceData="serviceData" v-if="userInfo"></my-service>
      <!-- 登录过期时显示 -->
      <my-service :serviceData="commonService" v-else></my-service>
    </view>
    <!-- 公告栏 -->
    <view class="notice">
      <!-- 公告栏标题 -->
      <view class="notice-head">
        <text class="notice-title">最新公告</text>
        <text class="more" @click="gotoNoticePage">更多</text>
      </view>
      <!-- 公告 -->
      <block v-if="noticeData.length !== 0">
        <view class="notice-box" v-for="(item, index) in noticeData" :key="index">
          <my-notice :notice="item"></my-notice>
        </view>
      </block>
      <view class="nodata" v-else>
        暂无公告
        <image class="nodata-img" src="../../static/none.jpg"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    onShow() {
      // 在onShow中获取信息则通过navigateBack跳转回来也会更新，若在onLoad中获取则通过navigateTo跳转才会更新
      // 获取提供的服务图标和名称
      this.getServiceData()
    },
    data() {
      return {
        // 首页最上方图片
        topImg: '',
        // 提供的服务
        serviceData: {},
        // 为游客提供的功能
        commonService: {},
        // 正在加载数据
        isloading: false,
      };
    },
    computed: {
      // 用户类型
      ...mapState('user', ['userInfo']),
      // 最新公告
      ...mapState('home', ['noticeData'])
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 获取最新公告
      this.getServiceData(() => uni.stopPullDownRefresh())
    },
    methods: {
      ...mapMutations('home', ['updateNoticeData']),
      // 获取提供的服务图标和名称以及最新公告
      async getServiceData(cb) {
        const res = await uni.$http.get('/api/home', {
          userType: this.userInfo.userType || '游客'
        })
        // console.log(res,'-----home')
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.status === 0) {
          this.serviceData = res.data.serviceData
          this.topImg = res.data.topImg
          this.commonService = res.data.commonService
          // 更新最新公告
          this.updateNoticeData(res.data.noticeData)
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 点击公告栏的更多
      gotoNoticePage() {
        uni.navigateTo({
          url: '/subpkg/noticePage/noticePage'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {

    // 首页最上方图片
    .topimg {
      width: 100%;
      height: 320rpx;
    }

    // 公告栏
    .notice {
      margin-bottom: 10px;

      // 公告栏头部
      .notice-head {
        padding: 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        &::before {
          content: ' ';
          display: block;
          position: absolute;
          width: 3px;
          height: 18px;
          background-color: #9595ff;
          left: 10px;
          bottom: 13px;
        }

        // 公告栏标题
        .notice-title {
          font-size: 20px;
          padding-left: 10px;
        }

        // 更多
        .more {
          font-size: 15px;
          color: #757575;
        }
      }

      // 公告项
      .notice-box {
        margin: 10px;
      }

      // 无公告时展示的区域
      .nodata {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;

        .nodata-img {
          width: 480rpx;
          height: 480rpx;
        }
      }
    }
  }
</style>
