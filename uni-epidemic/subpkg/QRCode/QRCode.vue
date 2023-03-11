<template>
  <!-- 返校、外出审批通过二维码 -->
  <view class="content">
    <!--  没有审批通过的返校、外出申请-->
    <view class="no-qrcode" v-show="btsText === 'qrcode' && outText === 'qrcode'">
      <view class="title">暂未有“返校/外出二维码”</view>
      <view class="tip">1、二维码仅在申请的返校或外出日期当天生成</view>
      <view class="tip">2、若申请的审核未通过也无法生成二维码</view>
    </view>
    <!-- 返校申请 -->
    <view class="qrcode-box" v-show="btsText !== 'qrcode'">
      返校二维码
        <!-- 二维码 -->
        <view class="qr-box">
          <u-qrcode ref="btsqr" canvas-id="btsqr" :value="btsText" :size="size" @click="remakeBtsQrcode" @complete="complete($event)">
          </u-qrcode>
        </view>
    </view>
    <!-- 外出申请 -->
    <view class="qrcode-box" v-show="outText !== 'qrcode'">
      外出二维码
        <!-- 二维码 -->
        <view class="qr-box">
          <u-qrcode ref="outqr" canvas-id="outqr" :value="outText" :size="size" @click="remakeOutQrcode" @complete="complete($event)">
          </u-qrcode>
      </view>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-studentpage.js';
  export default {
    // 学生类型的用户才可进入该页面
    mixins: [intopageMix],
    onLoad() {
      // 获取返校外出申请记录
      this.getApplyDetail()
    },
    data() {
      return {
        btsText: 'qrcode',
        outText: 'qrcode',
        size: 200,
      };
    },
    computed: {
      // 今天的日期
      date() {
        return uni.$getDate()
      },
    },
    methods: {
      // 获取返校外出申请记录
      async getApplyDetail() {
        const res = await uni.$http.get('/applyResult', {
          date: this.date
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取申请详细信息失败！')
        if (res.data.status === 0) {
          // 当天有审核通过的申请
          if(res.data.btsApply.length !== 0){
            this.btsText = '班级：' + res.data.btsApply[0].className + '\n学号：' + res.data.btsApply[0].uid + '\n姓名：' + res.data.btsApply[0].uname + '\n申请返校时间：' + res.data.btsApply[0].backDate + '\n审核状态：' + res.data.btsApply[0].state + '\n审核意见：' + res.data.btsApply[0].opinion + '\n审核人员' + res.data.btsApply[0].reviewBy
            console.log(this.btsText,'------返校申请')
          }
          if(res.data.outApply.length !== 0){
            this.outText = '班级：' + res.data.outApply[0].className + '\n学号：' + res.data.outApply[0].uid + '\n姓名：' + res.data.outApply[0].uname + '/n申请外出时间：' + res.data.outApply[0].outTime + '/n审核状态：' + res.data.outApply[0].state + '/n审核意见：' + res.data.outApply[0].opinion + '\n审核人员' + res.data.outApply[0].reviewBy
            console.log(this.outText,'------外出申请')
          }
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
      // 二维码生成完成事件
      complete(e) {
        if (e.success) {
          console.log('生成成功');
        } else {
          console.log('生成失败');
        }
      },
      // 重新生成
      remakeBtsQrcode() {
        const ref = this.$refs['btsqr'];
        ref.remakeBtsQrcode();
      },
      // 重新生成
      remakeOutQrcode() {
        const ref = this.$refs['outqr'];
        ref.remakeOutQrcode();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 100vh;
    background-color: #d2e7f9;
    .no-qrcode {
      padding: 20px;
      font-size: 18px;
      
      .title {
        font-size: 20px;
        margin: 20px 0;
        color: #2626e4;
        text-align: center;
      }
      .tip {
        margin: 10px 0;
      }
    }
    .qrcode-box {
      margin-bottom: 20px;
      font-size: 20px;
      padding-top: 40px;
      text-align: center;
      .qr-box {
        width: 200px;
        margin: 30px auto;
      }
    }
  }
</style>
