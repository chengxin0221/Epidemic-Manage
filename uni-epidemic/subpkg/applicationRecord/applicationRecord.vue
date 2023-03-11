<template>
  <!-- 申请记录页面 -->
  <view class="container">
    <!-- 返校申请记录模块 -->
    <view class="in-box">
      <!-- 表格标题 -->
      <view class="record-title">返校申请记录：</view>
      <my-btstable :btsApply="btsApply"></my-btstable>
    </view>
    <!-- 外出申请记录模块 -->
    <view class="out-box">
      <!-- 表格标题 -->
      <view class="record-title">外出申请记录：</view>
      <my-outtable :outApply="outApply"></my-outtable>
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
      // 获取返校申请记录
      this.getBtsApply()
      // 获取外出申请记录
      this.getOutApply()
    },
    data() {
      return {
        // 返校申请记录
        btsApply: [],
        // 外出申请记录
        outApply: [],
      };
    },
    methods: {
      // 获取返校申请记录
      async getBtsApply() {
        const res = await uni.$http.get('/btsApply')
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取返校申请记录失败！')
        if (res.data.status === 0) {
          this.btsApply = res.data.btsApply
        } else {
          // 失败原因为身份认证失败
          if (res.data.message === '身份认证失败！') {
            // 3秒后跳转登录
            uni.$showTips()
          } else {
            // 其他原因导致失败
            return uni.$showMsg(res.data.message)
          }
        }
      },
      // 获取外出申请记录
      async getOutApply() {
        const res = await uni.$http.get('/outApply')
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取外出申请记录失败！')
        if (res.data.status === 0) {
          this.outApply = res.data.outApply
        } else {
          // 失败原因为身份认证失败
          if (res.data.message === '身份认证失败！') {
            // 3秒后跳转登录
            uni.$showTips()
          } else {
            // 其他原因导致失败
            return uni.$showMsg(res.data.message)
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  // 表格标题
  .record-title {
    padding: 10px;
    font-size: 16px;
  }
</style>
