<template>
  <!-- 全校健康打卡情况页面 -->
  <view class="container">
    <!-- 状态框 -->
    <view class="state-box">
      <view class="picker-box">
        <!-- 日期选择器 -->
        <picker class="picker-item" mode="date" :value="dakaData" :start="startDate" :end="endDate"
          @change="dataChange">
          {{dakaData}}
          <uni-icons color="#fff" class="icon-bottom" type="bottom" size="20"></uni-icons>
        </picker>
      </view>
      <!-- 状态框内容容器 -->
      <view class="state-content">
        全校打卡情况：<text class="count-text">{{hadDaka}}/{{allStuCount}}</text>
        <view class="charts-box">
          <!--  :canvas2d="true" canvasId="jvJDSDZnXYuXZfGtIdFMIAcMHhLbgIYg"  -->
          <qiun-data-charts type="arcbar" :opts="allopts" :chartData="allChartData" />
        </view>
      </view>
      <view class="detail-box" @click="gotoDetailPage('school')">
        点击查看详细报告
      </view>
    </view>
    <view class="state-box">
      <!-- 学院 选择区域 -->
      <view class="choose-box">
        学院:
        <view class="picker-box">
          <picker :range="college" :value="coli" @change="changeCol">
            {{college[coli] || '暂无数据'}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="state-content">
        打卡情况：<text class="count-text">{{colHadDaka}}/{{colStuCount}}</text>
      </view>
      <!-- 学院打卡情况 -->
      <view class="college-box">
        <view class="charts-box">
          <!--  :canvas2d="true" canvasId="jvJDSDZnXYuXZfGtIdFMIAcMHhLbgIYg"  -->
          <qiun-data-charts type="arcbar" :opts="colopts" :chartData="colChartData" />
        </view>
      </view>
      <view class="detail-box" @click="gotoDetailPage('college')">
        点击查看详细报告
      </view>
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
      // 获取所有学院信息、某学院所有专业信息、某学院某专业所有班级信息
      this.getCPC()
    },
    data() {
      return {
        // 打卡日期
        dakaData: '',
        // 全校学生人数
        allStuCount: 0,
        // 全校已打卡学生人数
        hadDaka: 0,
        // 学院学生人数
        colStuCount: 0,
        // 学院已打卡学生人数
        colHadDaka: 0,
        // 学院
        coli: 0,
        college: [],
        allChartData: {
          series: [{
            name: "完成率",
            color: "#c2c6ff",
            data: 0.6
          }]
        },
        colChartData: {
          series: [{
            name: "完成率",
            color: "#c2c6ff",
            data: 0.8
          }]
        },
        //进度条图表样式
        allopts: {
          padding: undefined,
          title: {
            name: "80%",
            fontSize: 26,
            color: "#000"
          },
          subtitle: {
            name: "完成率",
            fontSize: 18,
            color: "#000"
          },
          extra: {
            arcbar: {
              type: "default",
              width: 10,
              backgroundColor: "#E9E9E9",
              startAngle: 0.75,
              endAngle: 0.25,
              gap: 2,
              linearType: "custom",
              customColor: ["#aaaaff", "#96a9fd"]
            }
          }
        },
        colopts: {
          padding: undefined,
          title: {
            name: "80%",
            fontSize: 26,
            color: "#000"
          },
          subtitle: {
            name: "完成率",
            fontSize: 18,
            color: "#000"
          },
          extra: {
            arcbar: {
              type: "default",
              width: 10,
              backgroundColor: "#E9E9E9",
              startAngle: 0.75,
              endAngle: 0.25,
              gap: 2,
              linearType: "custom",
              customColor: ["#aaaaff", "#96a9fd"]
            }
          }
        }
      };
    },
    computed: {
      // 今天的日期
      date() {
        this.dakaData = uni.$getDate()
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
      // 获取全校以及学院学生打卡情况
      async getDakaSituation() {
        console.log('-----', this.college[this.coli])
        const res = await uni.$http.get('/allDakaSituation', {
          college: this.college[this.coli],
          today: this.dakaData
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("获取学生打卡情况失败！")
        if (res.data.status === 0) {
          this.hadDaka = res.data.hadDaka
          this.allStuCount = res.data.allStuCount
          this.colStuCount = res.data.colStuCount
          this.colHadDaka = res.data.colHadDaka
          this.allChartData.series[0].data = res.data.allDakaRate
          this.allopts.title.name = Math.round(res.data.allDakaRate * 100) + '%'
          this.colChartData.series[0].data = res.data.colDakaRate
          this.colopts.title.name = Math.round(res.data.colDakaRate * 100) + '%'
          console.log(res.data.allDakaRate, '---', res.data.colDakaRate * 100 + '%')
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
        // 获取全校以及学院学生打卡情况
        this.getDakaSituation()
      },
      // 学院选择项改变
      changeCol(e) {
        this.coli = e.detail.value;
        // 获取获取全校以及学院学生打卡情况
        this.getDakaSituation()
      },
      // 获取所有学院信息、某学院所有专业信息、某学院某专业所有班级信息
      async getCPC(index = 0) {
        // 获取所有学院信息
        const res = await uni.$http.get('/api/college')
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          this.college = res.data.college
          // console.log(this.college, '-----college')
          // 获取获取全校以及学院学生打卡情况
          this.getDakaSituation()
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 查看详细报告
      gotoDetailPage(type){
        let url = type === 'college' ? '/subpkg_admin/healthDetail/healthDetail?date=' + this.dakaData + '&college=' + this.college[this.coli] : '/subpkg_admin/healthDetail/healthDetail?date=' + this.dakaData ;
        uni.navigateTo({
          url: url
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {

    // 状态框
    .state-box {
      width: 86%;
      margin: 18px auto;
      padding: 20px 10px;
      font-size: 18px;
      border-radius: 18px;
      background-color: #d4e4ff;
      box-shadow: 4px -4px 0 #9aa6e0;

      // 日期选择器外层容器
      .picker-box {
        width: 50%;
        padding: 5px;
        margin: 5px 5px;
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

      // 状态框内容容器
      .state-content {
        text-align: center;
        margin-top: 20px;

        // 完成度数字
        .count-text {
          color: #3d60ff;
        }
      }

      // 选择区域
      .choose-box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 18px;

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

      // 圆形进度条外层容器
      .charts-box {
        margin-top: 10px;
        width: 100%;
        height: 140px;
      }
    }
    // 详细报告
    .detail-box {
      text-align: center;
      color: #3d60ff;
      font-size: 14px;
    }
  }
</style>
