<template>
  <!-- 没有管理的班级时显示 -->
  <view class="no-data" v-if="classList.length === 0">
    <!-- 无管理班级图片 -->
    <image class="nodata-img" src="../../static/none.jpg"></image>
    <view class="nodata-text">
      暂无管理班级
    </view>
  </view>
  <!-- 申请审批页面 -->
  <view v-else>
    <view class="class-box">
      当前班级：
      <view :class="['class-item', className === item ? 'had-choice':'no-choice']" v-for="(item,i) in classList" :key="i" @click="changeClass(item)">{{item}}</view>
    </view>
    <!-- 申请类型选择 -->
    <radio-group class="radio-box" @change="radioChange">
      <label>
        <radio value="返校申请" color="#20517f" :checked="type === '返校申请'" /><text class="radio-text">返校申请</text>
      </label>
      <label>
        <radio value="外出申请" color="#20517f" :checked="type === '外出申请'" /><text>外出申请</text>
      </label>
    </radio-group>
    <!-- 返校申请模块 -->
    <view class="in-box" v-show="type === '返校申请'">
      <my-btstable :btsApply="btsApply"></my-btstable>
    </view>
    <!-- 外出申请模块 -->
    <view class="out-box" v-show="type === '外出申请'">
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
  import intopageMix from '@/mixins/before-into-teacherpage.js';
  export default {
    // 只有教师类型的用户可进入该页面
    mixins: [intopageMix],
    onShow() {
      // 获取返校申请记录
      this.getBtsApply()
      // 获取外出申请记录
      this.getOutApply()
    },
    data() {
      return {
        // 显示返校申请模块，显示外出申请模块
        type: '返校申请',
        // 当前显示的班级
        className: '',
        // 存储返校申请记录
        btsApply: [],
        // 存储外出申请记录
        outApply: []
      };
    },
    computed: {
      ...mapState('user', ['userInfo']),
      // 班主任管理的班级
      classList() {
        let list = this.userInfo.className ? this.userInfo.className.split(',') : []
        this.className = list.length === 0 ? '' : list[0]
        return list;
      }
    },
    methods: {
      // 当前展示班级改变
      changeClass(name){
        this.className = name
        // 更新数据
        // 获取返校申请记录
        this.getBtsApply()
        // 获取外出申请记录
        this.getOutApply()
      },
      // 显示返校申请模块显示外出申请模块
      radioChange(e) {
        this.type = e.detail.value
      },
      // 获取返校申请记录
      async getBtsApply() {
        const res = await uni.$http.get('/btsApply', {
          // className: this.classList[this.index]
          className: this.className
        })
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
        const res = await uni.$http.get('/outApply', {
          // className: this.classList[this.index]
          className: this.className
        })
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

<style lang="scss" scoped>
  // 没有管理的班级时显示
  .no-data {
    text-align: center;
  
    // 无管理班级图片
    .nodata-img {
      width: 446rpx;
      height: 426rpx;
      margin-top: 72px;
    }
  
    .nodata-text {
      margin-top: 20px;
      color: #797979;
    }
  }
  // 班级区域
  .class-box {
    margin: 6px;
    padding: 6px;
    border-radius: 10px;
    border: 1px solid #20517f;
    box-shadow: -2px 3px 0 #20517f;
    padding-left: 10px;
    align-items: center;
    
    // 班级
    .class-item {
      display: inline-block;
      padding: 6px 6px;
      margin: 5px;
      border-radius: 14px;
    }
    // 选中班级
    .had-choice {
      color: white;
      background-color: #20517f;
    }
    
    // 未选中班级
    .no-choice{
      border: 1px solid #20517f;
    }

    .icon-turn {
      display: inline-block;
      margin-left: 10px;
    }
  }

  // 申请类型选择
  .radio-box {
    margin: 16px 10px 8px;

    .radio-text {
      margin-right: 22px;
    }
  }
</style>
