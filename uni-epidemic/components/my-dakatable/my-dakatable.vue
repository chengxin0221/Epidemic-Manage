<template>
  <view>
    <!-- 表格 -->
    <view class="table">
      <!-- 表格头部 -->
      <view class="table-head">
        <view class="th-item" v-if="dataType === '未打卡' || dataType === '报告'">班级</view>
        <view class=" th-item">学号</view>
        <view class="th-item">姓名</view>
        <view class="th-item" v-if="dataType === '已打卡'">打卡日期</view>
      </view>
      <!-- 无数据 -->
      <view class="no-data" v-if="dakaDataList.length === 0">
        暂无数据
      </view>
      <!-- 表格行 -->
      <view class="table-row" v-for="(item,index) in dakaDataList" :key="index" @click="gotoDaka(item)">
        <!-- 单元格 -->
        <view class="t-item" v-if="dataType === '未打卡' || dataType === '报告'">{{item.className}}</view>
        <view class=" t-item">{{item.uid}}</view>
        <view class="t-item">{{item.uname.length > 4 ? item.uname.slice(0,4) + '...' : item.uname}}
        <uni-icons type="forward" size="14" v-if="dataType === '报告'"></uni-icons>
        </view>
        <view class="t-item" v-if="dataType === '已打卡'">{{item.date.slice(0,10)}}
          <uni-icons type="forward" size="14"></uni-icons>
        </view>
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
    name: "my-dakatable",
    props: {
      dakaDataList: {
        type: Array || null,
        default: []
      },
      dataType: {
        type: String,
        default: '已打卡'
      }
    },
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('student', ['updateDakaData']),
      // 跳转到打卡信息页面
      gotoDaka(data) {
        if (this.dataType === '未打卡') return
        // 将要展示的打卡记录保存到store中
        this.updateDakaData(data)
        uni.navigateTo({
          url: '/subpkg/daka/daka?id=' + data.id
        })
      }
    }
  }
</script>

<style lang="scss">
  // 表格
  .table {
    text-align: center;

    // 表格头部
    .table-head {
      display: flex;
      justify-content: space-around;
      height: 40px;
      align-items: center;
      font-size: 16px;
      margin: 5px;
      background-color: #d4e4ff;
      border-radius: 12px;

      .th-item {
        width: 33%;
      }
    }

    // 无数据
    .no-data {
      padding: 20px 10px;
      color: #888a94;
    }

    // 表格行
    .table-row {
      display: flex;
      justify-content: space-around;
      height: 40px;
      align-items: center;
      margin: 5px;
      font-size: 14px;
      border-bottom: 1px solid rgb(224, 224, 224);

      // 单元格
      .t-item {
        position: relative;
        width: 33%;

        // 展示管理的学生名单时显示
        .icon-forward {
          position: absolute;
          top: 1px;
          right: 6px;
          z-index: 999;
        }
      }
    }
  }
</style>
