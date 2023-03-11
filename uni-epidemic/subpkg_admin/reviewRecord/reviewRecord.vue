<template>
  <!-- 审批记录 -->
  <view class="container">
    <!-- 学院 选择区域和管理区域的外层容器 -->
    <view class="outter-box">
      <!-- 选择区域 -->
      <view class="choose-box">
        学院:
        <view class="picker-box">
          <picker :range="college" :value="coli" @change="changeCol">
            {{college[coli] || '暂无数据'}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="choose-box">
        日期：
        <view class="picker-box">
          <!-- 日期选择器 -->
          <picker class="picker-item" mode="date" :value="applyDate" :start="startDate" :end="endDate"
            @change="dataChange">
            {{applyDate}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
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
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-adminpage.js';
  export default {
    // 只有管理员类型的用户可进入该页面
    mixins: [intopageMix],
    onLoad() {
      // 获取学院信息
      this.getCollege()
    },
    data() {
      return {
        // 学院名称数组
        coli: 0,
        college: [],
        // 显示返校申请模块，显示外出申请模块
        type: '返校申请',
        // 当前显示的班级
        className: '',
        // 存储返校申请记录
        btsApply: [],
        // 存储外出申请记录
        outApply: [],
        // 申请日期
        applyDate: '',
      };
    },
    computed:{
      // 今天的日期
      date() {
        this.applyDate = uni.$getDate()
        return uni.$getDate()
      },
      // 日期选择器的开始日期
      startDate() {
        return uni.$getDate('start');
      },
      // 日期选择器的结束日期
      endDate() {
        return uni.$getDate('end');
      }
    },
    methods: {
      // 获取所有学院信息
      async getCollege(index = 0) {
        // 获取所有学院信息
        const res = await uni.$http.get('/api/college')
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          this.college = res.data.college
          // console.log(this.college, '-----college')
          // 获取返校申请记录
          this.getBtsApply()
          // 获取外出申请记录
          this.getOutApply()
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 学院选择项改变
      changeCol(e) {
        this.coli = e.detail.value;
        // 获取返校申请记录
        this.getBtsApply()
        // 获取外出申请记录
        this.getOutApply()
      },
      // 改变日期
      dataChange(e) {
        this.applyDate = e.detail.value
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
          college: this.college[this.coli],
          applyDate: this.applyDate
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
          college: this.college[this.coli],
          applyDate: this.applyDate
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
  .container {

    // 选择区域和管理区域的外层容器
    .outter-box {
      width: 88%;
      padding: 14px 10px;
      margin: 20px auto;
      border-radius: 14px;
      background-color: #20517f;

      // 选择学院区域 、选择年级区域 和 选择班级区域
      .choose-box {
        display: flex;
        justify-content: space-around;
        margin: 14px 0;
        align-items: center;
        font-size: 18px;
        color: white;

        .picker-box {
          width: 66%;
          font-size: 16px;
          padding: 8px 10px;
          border-radius: 18px;
          color: #20517f;
          background-color: white;

          // V图标
          .icon-bottom {
            float: right;
          }
        }
      }
    }

    // 申请类型选择
    .radio-box {
      margin: 16px 10px 8px;

      .radio-text {
        margin-right: 22px;
      }
    }
  }
</style>
