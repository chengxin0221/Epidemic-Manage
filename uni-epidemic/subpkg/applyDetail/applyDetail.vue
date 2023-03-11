<template>
  <!-- 申请记录详情页面 -->
  <view class="container">
    <!-- 记录表的外层容器 -->
    <view class="record-box" v-if="type==='返校'">
      <!-- 记录标题 -->
      <view class="record-title">返校申请详情：</view>
      <view class="record-item">
        <view class="t-item">学号：</view>
        <view class="t-item">{{btsRecord.uid}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">姓名：</view>
        <view class="t-item">{{btsRecord.uname}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">班级：</view>
        <view class="t-item">{{btsRecord.className}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">专业：</view>
        <view class="t-item">{{btsRecord.professional}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">学院：</view>
        <view class="t-item">{{btsRecord.college}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">当前是否疑似感染新冠病毒等症状：</view>
        <view class="t-item center">{{btsRecord.sickness}}</view>
      </view>
      <view class="record-item">
        <view class="t-item center">当前位置：</view>
        <view class="t-item">{{btsRecord.address}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">返校时间：</view>
        <view class="t-item">{{btsRecord.backDate}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">预计到校时间：</view>
        <view class="t-item">{{btsRecord.arriveTime}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">乘坐交通工具：</view>
        <view class="t-item">{{btsRecord.traffic}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">申请时间：</view>
        <view class="t-item">{{btsRecord.applyTime ? btsRecord.applyTime.slice(0,16) : ''}}</view>
      </view>
      <!-- 学生进入显示 -->
      <block v-if="userInfo.userType === '学生'">
        <view class="record-item">
          <view class="t-item">审核状态：</view>
          <view class="t-item" :style="{'color': btsRecord.state !== '审核通过' ? '#fc2407' : '#003eba' }">
            {{btsRecord.state || ''}}
          </view>
        </view>
        <view class="record-item">
          <view class="t-item">审核意见：</view>
          <view class="t-item">{{btsRecord.opinion || ''}}</view>
        </view>
      </block>
      <!-- 班主任进入显示 -->
      <block v-if="userInfo.userType === '教师' || userInfo.userType==='管理员'">
        <view class="record-item">
          <view class="t-item">审核状态：</view>
          <view class="t-item" :style="{'color': si !== '1' ? '#fc2407' : '#003eba' }">
            <view class="picker-box">
              <picker @change="stateChange" :value="si" :range="stateArr">
                {{btsRecord.state}}
                <uni-icons class="icon-turn" type="navigate-filled" color="#20517f" size="24"></uni-icons>
              </picker>
            </view>
          </view>
        </view>
        <view class="record-item">
          <view class="t-item">审核意见：</view>
          <view class="t-item">
            <input class="input-item" type="text" placeholder="请输入审核意见" v-model="btsRecord.opinion" />
          </view>
        </view>
      </block>
      <view class="record-item">
        <view class="t-item">审核人员：</view>
        <view class="t-item">{{btsRecord.reviewBy || ''}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">审核时间：</view>
        <view class="t-item">{{btsRecord.reviewTime ? btsRecord.reviewTime.slice(0,16) : ''}}</view>
      </view>
    </view>
    <!-- 记录表的外层容器 -->
    <view class="record-box" v-if="type==='外出'">
      <!-- 记录标题 -->
      <view class="record-title">外出申请详情：</view>
      <view class="record-item">
        <view class="t-item">学号：</view>
        <view class="t-item">{{outRecord.uid}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">姓名：</view>
        <view class="t-item">{{outRecord.uname}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">班级：</view>
        <view class="t-item">{{outRecord.className}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">专业：</view>
        <view class="t-item">{{outRecord.professional}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">学院：</view>
        <view class="t-item">{{outRecord.college}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">外出原因：</view>
        <view class="t-item">{{outRecord.reason}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">外出地点：</view>
        <view class="t-item">{{outRecord.destination}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">外出地点类别：</view>
        <view class="t-item">{{outRecord.placeType}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">外出时间：</view>
        <view class="t-item">{{outRecord.outTime}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">回校时间：</view>
        <view class="t-item">{{outRecord.backTime}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">出行轨迹：</view>
        <view class="t-item">{{outRecord.travelRecords}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">乘坐交通工具：</view>
        <view class="t-item">{{outRecord.traffic}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">申请时间：</view>
        <view class="t-item">{{outRecord.applyTime ? outRecord.applyTime.slice(0,16) : ''}}</view>
      </view>
      <!-- 学生进入显示 -->
      <block v-if="userInfo.userType === '学生'">
        <view class="record-item">
          <view class="t-item">审核状态：</view>
          <view class="t-item" :style="{'color': outRecord.state !== '审核通过' ? '#fc2407' : '#003eba' }">
            {{outRecord.state || ''}}
          </view>
        </view>
        <view class="record-item">
          <view class="t-item">审核意见：</view>
          <view class="t-item">{{outRecord.opinion || ''}}</view>
        </view>
      </block>
      <!-- 班主任或管理员进入显示 -->
      <block v-if="userInfo.userType === '教师' || userInfo.userType==='管理员'">
        <view class="record-item">
          <view class="t-item">审核状态：</view>
          <view class="t-item" :style="{'color': si !== '1' ? '#fc2407' : '#003eba' }">
            <view class="picker-box">
              <picker @change="stateChange" :value="si" :range="stateArr">
                {{outRecord.state}}
                <uni-icons class="icon-turn" type="navigate-filled" color="#20517f" size="24"></uni-icons>
              </picker>
            </view>
          </view>
        </view>
        <view class="record-item">
          <view class="t-item">审核意见：</view>
          <view class="t-item">
            <input class="input-item" type="text" placeholder="请输入审核意见" v-model="outRecord.opinion" />
          </view>
        </view>
      </block>
      <view class="record-item">
        <view class="t-item">审核人员：</view>
        <view class="t-item">{{outRecord.reviewBy || ''}}</view>
      </view>
      <view class="record-item">
        <view class="t-item">审核时间：</view>
        <view class="t-item">{{outRecord.reviewTime ? outRecord.reviewTime.slice(0,16) : ''}}</view>
      </view>
    </view>
    <!-- 删除按钮 -->
    <button v-if="userInfo.userType==='学生'" class="btn-del" @click="clickDel">删除</button>
    <!-- 审核按钮 -->
    <button v-if="userInfo.userType==='教师' || userInfo.userType==='管理员'" class="btn-del" @click="review">审核</button>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-nologin-into-page.js';
  export default {
    // 未登录的用户不可进入该页面
    mixins: [intopageMix],
    onLoad(option) {
      this.id = option.id
      if(!this.id) return uni.navigateBack()
      this.type = option.type
      // 获取记录详细信息
      this.getApplyDetail(this.id)
    },
    data() {
      return {
        // 申请记录的id
        id: '',
        // 申请记录类型
        type: '返校',
        // 返校申请记录
        btsRecord: {},
        // 外出申请记录
        outRecord: {},
        // 审核状态列表
        si: 0,
        stateArr: ['待审核', '审核通过', '审核不通过']
      };
    },
    computed: {
      ...mapState('user', ['userInfo']),
    },
    methods: {
      // 获取记录详细信息
      async getApplyDetail(id) {
        let url = this.type === '返校' ? '/btsApply' : '/outApply'
        const res = await uni.$http.get(url, {
          id
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取申请详细信息失败！')
        if (res.data.status === 0) {
          // 返校申请记录
          this.btsRecord = this.type === '返校' ? {
            ...res.data.btsApply[0]
          } : {},
          // 外出申请记录
          this.outRecord = this.type === '外出' ? {
            ...res.data.outApply[0]
          } : {}
          if (this.userInfo.userType === '教师' || this.userInfo.userType === '管理员') {
            if (this.type === '返校') {
              this.btsRecord.reviewTime = this.btsRecord.reviewTime !== null ? this.btsRecord.reviewTime : uni.$getDate('time')
              this.btsRecord.reviewBy = this.btsRecord.reviewBy !== null ? this.btsRecord.reviewBy : this.userInfo.uname
            } else {
              this.outRecord.reviewTime = this.outRecord.reviewTime !== null ? this.outRecord.reviewTime : uni.$getDate('time')
              this.outRecord.reviewBy = this.outRecord.reviewBy !== null ? this.outRecord.reviewBy : this.userInfo.uname
            }
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
      // 点击删除按钮
      clickDel() {
        if (this.type === '返校' && this.btsRecord.status === '审核通过') return uni.$showMsg('审核已通过无法删除！')
        if (this.type === '外出' && this.outRecord.status === '审核通过') return uni.$showMsg('审核已通过无法删除！')
        uni.showModal({
          title: '提示',
          content: '确定要删除该记录吗？',
          success: (res) => {
            if (res.confirm) {
              // 删除记录
              this.delRecord()
            }
          }
        })
      },
      // 删除
      async delRecord() {
        var res;
        if (this.type === '返校') res = await uni.$http.get('/delbtsApply', {
          id: this.btsRecord.id
        })
        else res = await uni.$http.get('/deloutApply', {
          id: this.outRecord.id
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('删除失败！')
        if (res.data.status === 0) {
          uni.navigateBack({
            complete() {
              return uni.$showMsg('删除成功！')
            }
          })
        } else {
          // 编辑失败原因为身份认证失败
          if (res.data.message === '身份认证失败！') {
            // 3秒后跳转登录
            uni.$showTips()
          } else {
            // 其他原因导致失败
            return uni.$showMsg(res.data.message)
          }
        }
      },
      stateChange(e) {
        this.si = e.detail.value
        this.btsRecord.state = this.stateArr[this.si]
        this.outRecord.state = this.stateArr[this.si]
      },
      // 审核
      async review() {
        var res;
        if (this.type === '返校') {
          this.btsRecord.reviewTime = uni.$getDate('time')
          this.btsRecord.reviewBy = this.userInfo.uname
          res = await uni.$http.post('/btsReview', this.btsRecord)
        } else {
          this.outRecord.reviewTime = uni.$getDate('time')
          this.outRecord.reviewBy = this.userInfo.uname
          res = await uni.$http.post('/outReview', this.outRecord)
        }
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('出错了，请重新审核！')
        if (res.data.status === 0) {
          uni.navigateBack({
            complete() {
              return uni.$showMsg('审核完成！')
            }
          })
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

    // 记录表的外层容器
    .record-box {
      width: 92%;
      padding-top: 20px;
      margin: 0 auto;

      // 记录标题
      .record-title {
        padding: 5px 10px;
        color: white;
        background-color: #00557f;
      }

      .record-item {
        display: flex;
        text-align: center;

        .t-item:first-child {
          text-align: right;
          background-color: rgba(117, 175, 250, 0.17);
          border-right: 1px solid #00557f;
        }

        .t-item {
          width: 50%;
          padding: 5px 0;
          border-bottom: 1px solid #00557f;

          .picker-box {
            width: 80%;
            height: 20px;
            margin: 2px auto;
            text-align: center;

            .icon-turn {
              float: right;
            }
          }
        }

        .center {
          line-height: 43px;
        }
      }

      // 记录表格
      .table {
        display: flex;

        // 表格内容名称 列
        .t-head {
          display: flex;
          flex-direction: column;
          text-align: right;
        }

        // 表格内容值 列
        .t-content {
          display: flex;
          flex-direction: column;
          text-align: center;
        }

        // 单元格
        .t-item {
          border: 1px solid #00557f;
        }
      }
    }

    // 操作按钮
    .btn-del {
      width: 30%;
      margin: 30px auto;
      border-radius: 12px;
      color: white;
      background-color: #447cb1;
    }
  }
</style>
