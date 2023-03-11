<template>
  <!-- 返校、外出申请页面 -->
  <view class="container">
    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-item"
        :style="{backgroundColor: applyToIn ? '#20517f' : '#dceffd', color :  applyToIn ? 'white' : '#1b4771'}"
        @click="showIn">返校申请</view>
      <view class="nav-item"
        :style="{backgroundColor: applyToIn ? '#dceffd' : '#20517f', color :  applyToIn ? '#1b4771' : 'white'}"
        @click="showOut">外出申请</view>
    </view>
    <!-- 返校申请模块 -->
    <view class="in-box" v-show="applyToIn">
      <view class="content-item">
        <text>1. 当前是否疑似感染新冠病毒等症状？</text>
        <view class="picker-box">
          <picker class="picker-item" @change="sicknessChange" :value="si" :range="sicknessArr">
            {{sicknessArr[si]}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
        <!-- 疑似感染提示 -->
        <view class="tip-box" v-if="si === '1'">请进行抗原或核算检测，如结果为阳性，须如实报告学校，并延迟返校</view>
      </view>
      <view class="content-item">
        <text>2. 当前位置：</text>
        <view class="input-item" @click="getLocation">
          {{btsApply.address || '请选择当前位置'}}
        </view>
      </view>
      <view class="content-item">
        <text>3. 返校时间：</text>
        <view class="picker-box">
          <!-- 日期选择器 -->
          <picker class="picker-item" mode="date" :value="btsApply.backDate" :start="startDate" :end="endDate"
            @change="backDateChange">
            {{btsApply.backDate}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="content-item">
        <text>4. 预计到校时间：</text>
        <view class="picker-box">
          <picker class="picker-item" @change="arriveChange" :value="ai" :range="arriveArr">
            {{arriveArr[ai]}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="content-item">
        <text>5. 乘坐交通工具：</text>
        <input class="input-item" type="text" placeholder="请输入乘坐的交通工具" v-model="btsApply.traffic" />
      </view>
      <button class="btn-submit" @click="btsSubmit">提交返校申请</button>
    </view>
    <!-- 外出申请模块 -->
    <view class="out-box" v-show="!applyToIn">
      <view class="content-item">
        <text>1. 外出原因：</text>
        <input class="input-item" type="text" placeholder="请输入外出原因" v-model="outApply.reason" />
      </view>
      <view class="content-item">
        <text>2. 外出地点：</text>
        <input class="input-item" type="text" placeholder="请输入外出地点" v-model="outApply.destination" />
      </view>
      <view class="content-item">
        <text>3. 外出地点类别：</text>
        <view class="picker-box">
          <picker class="picker-item" @change="typeChange" :value="ti" :range="typeArr">
            {{typeArr[ti]}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="content-item">
        <text>4. 外出时间：</text>
        <view class="picker-box">
          <!-- 日期选择器 -->
          <picker class="picker-item" mode="date" :value="outApply.outTime" :start="startDate" :end="endDate"
            @change="outTimeChange">
            {{outApply.outTime}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="content-item">
        <text>5. 回校时间：</text>
        <view class="picker-box">
          <!-- 日期选择器 -->
          <picker class="picker-item" mode="date" :value="outApply.backTime" :start="startDate" :end="endDate"
            @change="backTimeChange">
            {{outApply.backTime}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="content-item">
        <text>6. 出行轨迹：</text>
        <input class="input-item" type="text" placeholder="请输入出行轨迹" v-model="outApply.travelRecords" />
      </view>
      <view class="content-item">
        <text>7. 乘坐交通工具：</text>
        <input class="input-item" type="text" placeholder="请输入乘坐的交通工具" v-model="outApply.traffic" />
      </view>
      <button class="btn-submit" @click="outSubmit">提交外出申请</button>
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
    // 将 intopageMix 混入到当前的页面中进行使用，判断用户类型是否正确
    mixins: [intopageMix],
    onLoad() {
      // 让返校日期等于当前日期
      this.btsApply.backDate = uni.$getDate()
      // 让外出日期和外出申请中的返校日期等于当前日期
      this.outApply.outTime = this.outApply.backTime = uni.$getDate()
    },
    data() {
      return {
        // true显示返校申请模块，false显示外出申请模块
        applyToIn: true,
        // 当前是否疑似感染新冠病毒等症状
        si: 0,
        sicknessArr: ['否', '是'],
        // 预计到校时间
        ai: 0,
        arriveArr: ['1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时',
          '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时', '24时'
        ],
        // 返校申请
        btsApply: {
          uid: '',
          uname: '',
          sickness: '否', //当前是否疑似感染新冠病毒等症状
          address: '', //当前位置
          backDate: '', //返校日期
          arriveTime: '1时', //预计到校时间
          traffic: '', // 交通工具
          applyTime: '', //申请时间
        },
        // 外出地点类别
        ti: 0,
        typeArr: ['区内', '区外', '市外', '省外'],
        // 外出申请
        outApply: {
          uid: '',
          uname: '',
          reason: '', // 外出原因
          destination: '', // 外出地点
          placeType: '区内', // 外出地点类别
          outTime: '', // 外出时间
          backTime: '', // 回校时间
          travelRecords: '', // 出行轨迹
          traffic: '', // 交通工具
          applyTime: '', //申请时间
        }
      };
    },
    computed: {
      ...mapState('user', ['userInfo']),
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
      // 显示返校申请模块
      showIn() {
        this.applyToIn = true
      },
      // 显示外出申请模块
      showOut() {
        this.applyToIn = false
      },
      // 改变 当前是否疑似感染新冠病毒等症状
      sicknessChange: function(e) {
        this.si = e.detail.value
        this.btsApply.sickness = this.sicknessArr[this.si]
      },
      // 改变 返校申请的返校日期
      backDateChange(e) {
        this.btsApply.backDate = e.detail.value
      },
      // 改变 预计到校时间
      arriveChange(e) {
        this.ai = e.detail.value
        this.btsApply.arriveTime = this.arriveArr[this.ai]
      },
      // 获取当前位置
      getLocation() {
        if (this.isDisabled) return
        var that = this;
        // 获取当前位置
        uni.chooseLocation({
          success: function(res) {
            console.log(res, '获取当前位置-------')
            that.btsApply.address = res.address; //  + res.name
          },
          fail: (err) => {
            console.log(err)
          }
        });
      },
      // 提交返校申请
      async btsSubmit() {
        if (this.si === '1') return uni.$showMsg('请康复后再返校！')
        if (!this.btsApply.address || !this.btsApply.traffic) return uni.$showMsg('未填写完整！')
        if(this.btsApply.backDate < uni.$getDate()) return uni.$showMsg('返校时间有误！')
        // 让申请时间等于当前时间
        this.btsApply.applyTime = uni.$getDate('time')
        this.btsApply.uid = this.userInfo.uid
        this.btsApply.uname = this.userInfo.uname
        this.btsApply.className = this.userInfo.className
        const res = await uni.$http.post('/addbtsApply', this.btsApply)
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('提交申请失败！')
        if (res.data.status === 0) {
          // 清空数据
          this.si = 0
          this.ai = 0
          this.btsApply = {
            ...this.btsApply,
            address: '',
            traffic: ''
          }
          return uni.$showMsg("已提交申请！")
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
      // 改变 外出地点类别
      typeChange(e) {
        this.ti = e.detail.value
        this.outApply.placeType = this.typeArr[this.ti]
      },
      // 改变 外出申请的外出日期
      outTimeChange(e) {
        this.outApply.outTime = e.detail.value
      },
      // 改变 外出申请的返校日期
      backTimeChange(e) {
        this.outApply.backTime = e.detail.value
      },
      // 提交外出申请
      async outSubmit() {
        if (!this.outApply.reason || !this.outApply.destination || !this.outApply.travelRecords || !this.outApply
          .traffic) return uni.$showMsg('未填写完整！')
        if(this.outApply.outTime < uni.$getDate()) return uni.$showMsg('外出时间有误！')
        if(this.outApply.outTime > this.outApply.backTime) return uni.$showMsg('外出或回校时间有误！')
        // 让申请时间等于当前时间
        this.outApply.applyTime = uni.$getDate('time')
        this.outApply.uid = this.userInfo.uid
        this.outApply.uname = this.userInfo.uname
        this.outApply.className = this.userInfo.className
        const res = await uni.$http.post('/addoutApply', this.outApply)
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('提交申请失败！')
        if (res.data.status === 0) {
          // 清空数据
          this.ti = 0
          this.outApply = {
            ...this.outApply,
            reason: '',
            destination: '',
            travelRecords: '',
            traffic: ''
          }
          return uni.$showMsg("已提交申请！")
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

    // 导航栏
    .nav-bar {
      display: flex;
      text-align: center;

      .nav-item {
        width: 50%;
        height: 36px;
        line-height: 36px;
      }
    }

    // 每个表单项
    .content-item {
      padding: 10px;
      font-size: 16px;

      // 疑似感染提示
      .tip-box {
        color: red;
        font-size: 12px;
      }

      // 选择器外部容器
      .picker-box {
        width: 65%;
        padding: 5px;
        margin: 5px 0;
        border-radius: 20px;
        border: 1px solid #1750ad;

        // 选择器
        .picker-item {
          margin-left: 10px;

          .icon-bottom {
            float: right;
          }
        }
      }

      // 输入框
      .input-item {
        padding: 5px;
        margin: 5px 0;
        border-radius: 20px;
        border: 1px solid #1750ad;
      }
    }

    // 提交按钮
    .btn-submit {
      width: 60%;
      margin: 14px auto;
      border-radius: 12px;
      color: white;
      background-color: #447cb1;
    }
  }
</style>
