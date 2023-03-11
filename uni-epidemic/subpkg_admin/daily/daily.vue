<template>
  <!-- 没有管理的班级时显示 -->
  <view class="no-data" v-if="userInfo.className.length === 0">
    <!-- 无管理班级图片 -->
    <image class="nodata-img" src="../../static/none.jpg"></image>
    <view class="nodata-text">
      暂无管理班级
    </view>
  </view>
  <!-- 健康日报页面 -->
  <view class="container" v-else>
    <!-- 状态框 -->
    <view class="state-box">
      <view class="title">
        Hi, {{userInfo.uname}}
        <view class="picker-box">
          <!-- 日期选择器 -->
          <picker class="picker-item" mode="date" :value="dakaData" :start="startDate" :end="endDate"
            @change="dataChange">
            {{dakaData}}
            <uni-icons color="#fff" class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <!-- 状态框内容容器 -->
      <view class="state-content">
        <view>
          今日打卡完成情况：<text class="count-text">{{studentCount-studentList.length}}/{{studentCount}}</text>
        </view>
        <view class="detail-box" @click="gotoDetailPage">
          点击查看详细报告
        </view>
      </view>
    </view>
    <!-- 未打卡学生名单展示区域 -->
    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-item"
        :style="{backgroundColor: notDakd ? '#d4e4ff' : '#dceffd', color :  notDakd ? '' : '#1b4771'}" @click="showIn">
        未打卡学生({{studentList.length}}人)</view>
      <view class="nav-item"
        :style="{backgroundColor: notDakd ? '#dceffd' : '#d4e4ff', color :  notDakd ? '#1b4771' : ''}" @click="showOut">
        已打卡学生({{studentCount-studentList.length}}人)</view>
    </view>
    <!-- 未打卡学生名单 -->
    <view class="notdaka-box" v-show="notDakd">
      <!-- 名单表格 -->
      <my-dakatable :dataType="dataType" :dakaDataList="studentList"></my-dakatable>
    </view>
    <!-- 已打卡学生名单 -->
    <view class="haddaka-box" v-show="!notDakd">
      <!-- 名单表格 -->
      <my-dakatable :dataType="hadDataType" :dakaDataList="haddaka"></my-dakatable>
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
      // 获取学生打卡情况
      this.getDakaSituation()
    },
    data() {
      return {
        // 打卡日期
        dakaData: '',
        // 表格类型
        dataType: '未打卡',
        hadDataType: '已打卡',
        // 未打卡学生名单
        studentList: [],
        // 已打卡学生名单
        haddaka: [],
        // 管理的总学生人数
        studentCount: 0,
        // true显示未打卡模块，false显示已打卡申请模块
        notDakd: true,
      };
    },
    onPullDownRefresh() {
      // 获取学生打卡情况
      this.getDakaSituation(() => uni.stopPullDownRefresh())
    },
    computed: {
      ...mapState('user', ['userInfo']),
      // 今天的日期
      date() {
        this.dakaData = uni.$getDate()
        return uni.$getDate()
      },
    },
    methods: {
      // 获取学生打卡情况
      async getDakaSituation(cb) {
        const res = await uni.$http.get('/dakaSituation', {
          className: this.userInfo.className,
          today: this.dakaData
        })
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("获取学生打卡情况失败！")
        if (res.data.status === 0) {
          this.studentList = res.data.studentList
          this.studentCount = res.data.studentCount
          this.haddaka = res.data.haddaka
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
      // 改变日期
      dataChange(e) {
        this.dakaData = e.detail.value
        // 获取学生打卡情况
        this.getDakaSituation()
      },
      // 显示未打卡模块
      showIn() {
        this.notDakd = true
      },
      // 显示已打卡模块
      showOut() {
        this.notDakd = false
      },
      // 查看详细报告
      gotoDetailPage(){
        uni.navigateTo({
          url: '/subpkg_admin/healthDetail/healthDetail?date=' + this.dakaData + '&classList=' + this.userInfo.className
        })
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
  // 状态框
  .state-box {
    width: 86%;
    margin: 10px auto;
    padding: 20px 10px;
    font-size: 18px;
    border-radius: 18px;
    background-color: #d4e4ff;
    box-shadow: 4px -4px 0 #9aa6e0;

    .title {
      display: flex;
      flex-direction: column;

      // 日期选择器外层容器
      .picker-box {
        width: 50%;
        padding: 5px;
        margin: 8px 0px;
        color: white;
        background-color: #9aa6e0;
        border-radius: 14px;
        border: 1px solid #9aa6e0;
      
        // 选择器
        .picker-item {
          margin-left: 5px;
      
          .icon-bottom {
            float: right;
          }
        }
      }
    }

    // 状态框内容容器
    .state-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;

      // 完成度数字
      .count-text {
        color: #3d60ff;
      }

      // 详细报告
      .detail-box {
        text-align: center;
        color: #3d60ff;
        font-size: 14px;
        margin-top: 14px;
      }
    }
  }

  // 导航栏
  .nav-bar {
    display: flex;
    text-align: center;
    margin: 15px 0;

    .nav-item {
      width: 50%;
      height: 36px;
      line-height: 36px;
    }
  }
</style>
