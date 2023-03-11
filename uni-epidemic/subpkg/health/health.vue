<template>
  <view class="container">
    <!-- 健康打卡页面 -->
    <view class="daka-box">
      <!-- 头部状态框标题 -->
      <view class="daka-title">
        Hi, {{userInfo.uname}}
        <text class="today">{{date}}</text>
      </view>
      <!-- 状态框内容容器 -->
      <view class="daka-content">
        <view>今日打卡：<text :style="{color: hadDaka ? '' : '#0905fd'}">{{hadDaka ? '已完成' : '未完成'}}</text></view>
        <!-- 打卡按钮 -->
        <button class="daka-btn" :style="{color: hadDaka ? '#9b9dab' : '#9e9eed'}" @click="gotoDaka">
          <uni-icons class="icon-daka" type="calendar-filled" size="30" :color="hadDaka ? '#9b9dab' : '#9e9eed'">
          </uni-icons>打卡
        </button>
      </view>
    </view>
    <!-- 打卡记录 -->
    <view class="record">
      <!-- 表格标题 -->
      <view class="record-title">
        健康打卡记录
      </view>
      <my-dakatable :dakaDataList="dakaDataList"></my-dakatable>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-studentpage.js';
  export default {
    // 学生类型的用户才可进入该页面
    mixins: [intopageMix],
    onShow() {
      // 获取打卡记录
      this.getDakaData()
    },
    data() {
      return {
        // 打卡记录
        dakaDataList: [],
        // 今天是否已经打卡
        hadDaka: false,
      }
    },
    computed: {
      ...mapState('user', ['userInfo']),
      // 今天的日期
      date() {
        return uni.$getDate()
      }
    },
    methods: {
      // 获取打卡记录
      async getDakaData() {
        const res = await uni.$http.get('/daka', {
          uid: this.userInfo.uid
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.status === 0) {
          this.dakaDataList = res.data.daka
          // console.log(this.dakaDataList, '----------')
          // 今天已经打卡则禁用打卡按钮
          this.hadDaka = this.dakaDataList.find(x => x.date.slice(0, 10) === this.date) ? true : false
        } else {
          // 获取打卡记录失败原因为身份认证失败
          if (res.data.message === '身份认证失败！') {
            // 3秒后跳转登录
            uni.$showTips('/subpkg/health/health')
          } else {
            // 其他原因
            return uni.$showMsg(res.data.message)
          }
        }
      },
      // 跳转到打卡页面
      gotoDaka() {
        if (this.hadDaka) return uni.$showMsg('今日打卡已完成！')
        // 点击打卡按钮进入今日打卡
        uni.navigateTo({
          url: '/subpkg/daka/daka'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {

    // 头部状态框模块盒子
    .daka-box {
      width: 86%;
      margin: 10px auto;
      padding: 10px;
      font-size: 18px;
      border-radius: 18px;
      background-color: #d4e4ff;
      box-shadow: 4px -4px 0 #9aa6e0;

      // 头部状态框
      .daka-title {
        display: flex;
        flex-direction: column;

        .today {
          color: #3a3737;
          font-size: 14px;
          margin-top: 6px;
        }
      }

      // 状态框内容容器
      .daka-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;

        // 打卡按钮
        .daka-btn {
          display: flex;
          flex-direction: column;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: none;
          margin-top: 20px;
          background-color: white;
          font-size: 16px;

          // 打卡图标
          .icon-daka {
            height: 30px;
            position: relative;
            top: -10px;
          }
        }
      }
    }

    // 打卡记录
    .record {

      // 表格标题
      .record-title {
        padding: 10px;
        font-size: 18px;
      }
    }
  }
</style>
