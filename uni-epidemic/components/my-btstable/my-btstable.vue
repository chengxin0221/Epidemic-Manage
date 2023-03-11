<template>
  <view>
    <!-- 返校申请记录 -->
    <view class="record">
      <!-- 表格 -->
      <scroll-view class="table">
        <!-- 表格头部 -->
        <view class="table-head">
          <view class="item"></view>
          <view class="th-item">姓名</view>
          <view class="th-item">返校时间</view>
          <view class="th-item">审核状态</view>
          <view class="th-item">审核意见</view>
          <view class="th-item">审核人</view>
          <view class="th-item">审核时间</view>
        </view>
        <!-- 暂无数据 -->
        <view class="no-data" v-if="btsApply.length === 0">
          暂无申请记录
        </view>
        <!-- 表格行 -->
        <view class="table-row" v-for="(item,index) in btsApply" :key="index" @click="gotoDetail(item)">
          <!-- 单元格 -->
          <view class="item">[{{index+1}}]</view>
          <view class="t-item">{{item.uname}}</view>
          <view class="t-item">{{item.backDate}}</view>
          <view class="t-item" :style="{'color': item.state !== '审核通过' ? '#fc2407' : '#003eba' }">{{item.state||''}}
          </view>
          <view class="t-item">{{item.opinion||''}}</view>
          <view class="t-item">{{item.reviewBy||''}}</view>
          <view class="t-item">{{item.reviewTime ? item.reviewTime.slice(0,-3) : ''}}</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-btstable",
    props: {
      btsApply: {
        type: Array || null,
        default: []
      }
    },
    data() {
      return {

      };
    },
    methods: {
      // 进入申请记录详情页
      gotoDetail(data) {
        uni.navigateTo({
          url: '/subpkg/applyDetail/applyDetail?type=' + "返校" + '&id=' + data.id
        })
      }
    }
  }
</script>

<style lang="scss">
  // 返校申请记录
  .record {
    margin-bottom: 20px;
    overflow-x: auto;

    // 表格
    .table {
      padding-bottom: 10px;
      text-align: center;
      width: 470px;

      .item {
        width: 4%;
      }

      .th-item {
        width: 16%;
      }

      // 表格头部
      .table-head {
        display: flex;
        justify-content: space-around;
        height: 40px;
        align-items: center;
        font-size: 14px;
        margin: 5px 0;
        color: white;
        background-color: #20517f;
      }

      // 暂无数据
      .no-data {
        width: 70%;
      }

      // 表格行
      .table-row {
        display: flex;
        height: 35px;
        align-items: center;
        margin: 5px;
        font-size: 12px;
        border-bottom: 1px solid rgb(224, 224, 224);

        .item {
          width: 4%;
        }

        // 单元格
        .t-item {
          width: 16%;
          overflow: hidden;
        }
      }
    }
  }
</style>
