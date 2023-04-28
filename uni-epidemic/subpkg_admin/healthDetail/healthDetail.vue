<template>
  <!-- 打卡情况详细报告 -->
  <view class="container">
    <!-- 全校或学院 日期 -->
    <view class="state-box">
      <view class="title">
        {{dataType}}
      </view>
      <text class="data-box">{{date}}日 打卡情况报告</text>
    </view>
    <view class="tip-text">
      点击可查看学生名单，再次点击收起名单
    </view>
    <!-- 详细情况 -->
    <view class="detail-box">
      <view class="item-box">
        <view @click="show('hotM')">
          发热：<text class="text-box">{{hot.length}}人</text>
        </view>
        <view class="table-box" v-if="hotM">
          <!-- 名单表格 -->
          <my-dakatable :dataType="dakaType" :dakaDataList="hot"></my-dakatable>
        </view>
      </view>
      <view class="item-box">
        <view @click="show('vacM')">
          未完成3针疫苗接种：<text class="text-box">{{vaccine.length}}人</text>
        </view>
        <view class="table-box" v-if="vacM">
          <!-- 名单表格 -->
          <my-dakatable :dataType="dakaType" :dakaDataList="vaccine"></my-dakatable>
        </view>
      </view>
      <view class="item-box">
        <view @click="show('sicM')">
          曾经或当前确诊或疑似感染新冠：<text class="text-box">{{sickness.length}}人</text>
        </view>
        <view class="table-box" v-if="sicM">
          <!-- 名单表格 -->
          <my-dakatable :dataType="dakaType" :dakaDataList="sickness"></my-dakatable>
        </view>
      </view>
      <view class="item-box">
        <view @click="show('conM')">
          经检测确诊：<text class="text-box">{{confirmSick.length}}人</text>
        </view>
        <view class="table-box" v-if="conM">
          <!-- 名单表格 -->
          <my-dakatable :dataType="dakaType" :dakaDataList="confirmSick"></my-dakatable>
        </view>
      </view>
      <view class="item-box">
        <view @click="show('resM')">
          已康复：<text class="text-box">{{rescure.length}}人</text>
        </view>
        <view class="table-box" v-if="resM">
          <!-- 名单表格 -->
          <my-dakatable :dataType="dakaType" :dakaDataList="rescure"></my-dakatable>
        </view>
      </view>
      <view class="item-box">
        <view @click="show('nresM')">
          未康复：<text class="text-box">{{notRescure.length}}人</text>
        </view>
        <view class="table-box" v-if="nresM">
          <!-- 名单表格 -->
          <my-dakatable :dataType="dakaType" :dakaDataList="notRescure"></my-dakatable>
        </view>
      </view>
    </view>
    <!-- 回到顶部按钮 -->
    <view class="btn-backToTop" @click="gotoTop">
      <uni-icons class="icon-up" type="arrow-up" color="#fff" size="30"></uni-icons>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-teadpage.js';
  export default {
    // 只有教师和管理员类型的用户可进入该页面
    mixins: [intopageMix],
    onLoad(option) {
      this.hotM = false
      this.date = option.date
      if (option.college) {
        this.dataType = option.college
        console.log(option.college)
        // 获取详细报告
        this.getDetail({
          college: option.college
        })
      } else if (option.classList) {
        this.dataType = option.classList
        let list = option.classList.split(',')
        // 获取详细报告
        this.getDetail({
          classList: list
        })
      } else {
        // 获取详细报告
        this.getDetail({})
      }
      console.log('---', option)
    },
    data() {
      return {
        // 全校或学院
        dataType: '全校',
        // 打卡日期
        date: '',
        // 打卡类型
        dakaType: '报告',
        // 发热
        hot: [],
        hotM: false,
        // 未完成3针疫苗接种
        vaccine: [],
        vacM: false,
        // 曾经或当前确诊或疑似感染新冠
        sickness: [],
        sicM: false,
        // 经检测确诊
        confirmSick: [],
        conM: false,
        // 已康复
        rescure: [],
        resM: false,
        // 未康复
        notRescure: [],
        nresM: false,
      };
    },
    methods: {
      // 获取详细报告
      async getDetail(data) {
        let url = '/collegeDakaReport'
        if (!data.college) url = '/schoolDakaReport'
        if (data.classList) url = '/classDakaReport'
        const res = await uni.$http.get(url, {
          college: data.college,
          classList: data.classList,
          date: this.date
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("获取学生打卡情况失败！")
        if (res.data.status === 0) {
          this.hot = res.data.hot
          this.vaccine = res.data.vaccine
          this.sickness = res.data.sickness
          this.confirmSick = res.data.confirmSick
          this.rescure = res.data.rescure
          this.notRescure = res.data.notRescure
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
      // 显示名单
      show(type) {
        switch (type) {
          case 'hotM':
            this.hotM = !this.hotM
            break;
          case 'vacM':
            this.vacM = !this.vacM
            break;
          case 'sicM':
            this.sicM = !this.sicM
            break;
          case 'conM':
            this.conM = !this.conM
            break;
          case 'resM':
            this.resM = !this.resM
            break;
          case 'nresM':
            this.nresM = !this.nresM
            break;
        }
      },
      // 回到顶部
      gotoTop() {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {

    // 全校或学院 日期
    .state-box {
      width: 92%;
      margin: 10px auto;
      padding: 10px 5px 14px;
      text-align: center;
      border-radius: 10px;
      background-color: #d4e4ff;
      box-shadow: 4px -4px 0 #9aa6e0;

      .title {
        margin: 5px;
        font-size: 20px;
      }

      .data-box {
        color: #4d586f;
      }
    }

    // 点击可查看学生名单
    .tip-text {
      color: #b6b7b9;
      font-size: 14px;
      text-align: center;
    }

    // 详细情况
    .detail-box {
      width: 92%;
      margin: 10px auto;
      border-radius: 10px;
      align-items: center;

      .item-box {
        margin: 16px auto;
        padding: 10px;
        border-radius: 12px;
        border: 1px solid #9aa6e0;
        box-shadow: 3px -3px 0 #9aa6e0;

        .text-box {
          color: #3d60ff;
        }

        .icon-bottom {
          float: right;
        }

        // 名单表格
        .table-box {
          margin-top: 12px;
        }
      }
    }

    // 显示回到顶部按钮
    .btn-backToTop {
      width: 40px;
      height: 40px;
      text-align: center;
      border-radius: 50%;
      background-color: #9aa6e0;
      position: fixed;
      z-index: 999;
      bottom: 50px;
      right: 16px;

      .icon-up {
        position: relative;
        top: 4px;
      }
    }
  }
</style>
