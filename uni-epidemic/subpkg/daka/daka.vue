<template>
  <view class="container">
    <form @submit="formSubmit">
      <view class="content-item">
        <text>今日晨检体温：</text>
        <view class="picker-box" :style="{opacity: opacity}">
          <picker :disabled="isDisabled" class="picker-item" @change="temperChange"
            :value="ti" :range="temperArr">
            {{temperArr[ti]}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="content-item">
        <text>是否已完成三针疫苗接种：</text>
        <view class="picker-box" :style="{opacity: opacity}">
          <picker :disabled="isDisabled" class="picker-item" @change="vaccineChange"
            :value="vi" :range="vaccineArr">
            {{vaccineArr[vi]}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="content-item">
        <text>是否曾经或当前被确诊或疑似为新型冠状病毒感染：</text>
        <view class="picker-box" :style="{opacity: opacity}">
          <picker :disabled="isDisabled" class="picker-item" @change="sicknessChange"
            :value="si" :range="sicknessArr">
            {{sicknessArr[si]}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <!-- 上一项选择是时显示 -->
      <block v-if="dakaData.sickness === '是'">
        <view class="content-item">
          <text>是否经核酸或抗原检测确认感染：</text>
          <view class="picker-box imp">
            <picker :disabled="isDisabled" :style="{opacity: opacity}" class="picker-item" @change="confirmChange"
              :value="ci" :range="confirmArr">
              {{confirmArr[ci]}}
              <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
            </picker>
          </view>
        </view>
        <view class="content-item">
          <text>是否已经康复：</text>
          <view class="picker-box imp">
            <picker :disabled="isDisabled" :style="{opacity: opacity}" class="picker-item" @change="rescureChange"
              :value="ri" :range="rescureArr">
              {{rescureArr[ri]}}
              <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
            </picker>
          </view>
        </view>
      </block>
      <view class="content-item">
        <text>当前位置：</text>
        <view class="input-item" :style="{opacity: opacity}" @click="getLocation">
          {{dakaData.address || '请选择当前位置'}}
        </view>
      </view>
      <view class="content-item">
        <text>户籍所在地：</text>
        <input :disabled="isDisabled" :style="{opacity: opacity}" class="input-item" type="text"
          placeholder="请输入本人户籍所在地" v-model="dakaData.residence" />
      </view>
      <view class="content-item">
        <text>本人手机号码：</text>
        <input :disabled="isDisabled" :style="{opacity: opacity}" class="input-item" maxlength="11" type="number"
          placeholder="请输入本人手机号码" v-model="dakaData.phone" />
      </view>
      <button :disabled="isDisabled" :style="{opacity: opacity}" class="btn-submit" form-type="submit">提交</button>
    </form>
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
      this.isDisabled = false
      this.opacity = 1
      // 户籍所在地
      this.dakaData.residence = this.userInfo.residence
      // 手机号码
      this.dakaData.phone = this.userInfo.phone
      if (option.id) {
        // 展示在健康打卡记录页面点击的记录数据
        this.isDisabled = true
        this.opacity = 0.6
        this.dakaData = {...this.daka}
        this.ti = this.temperArr.indexOf(this.daka.temperature)
        this.vi = this.vaccineArr.indexOf(this.daka.vaccine)
        this.si = this.sicknessArr.indexOf(this.daka.sickness)
        this.ci = this.confirmArr.indexOf(this.daka.confirm)
        this.ri = this.rescureArr.indexOf(this.daka.rescure)
        return
      }
    },
    data() {
      return {
        // 是否禁用
        isDisabled: false,
        // 透明度
        opacity: 1,
        dakaData: {
          uid: '',
          uname: '',
          className: '',
          date: '',
          temperature: '正常(37.3度以下)',
          vaccine: '已完成', //疫苗
          sickness: '否', //是否曾经或当前确诊或疑似感染
          confirm: '是', //是否经核酸或抗原检测确认感染
          rescure: '已康复', //是否已经康复
          address: '', //当前位置
          residence: '', //户籍所在地
          phone: ''
        },
        // 今日晨检体温
        ti: 0,
        temperArr: ['正常(37.3度以下)', '发热'],
        // 是否已完成三针疫苗接种
        vi: 0,
        vaccineArr: ['已完成', '二针', '一针', '无'],
        // 是否曾经或当前被确诊或疑似为新型冠状病毒感染
        si: 0,
        sicknessArr: ['否', '是'],
        // 是否经核酸或抗原检测确认感染
        ci: 0,
        confirmArr: ['是', '否'],
        // 是否康复
        ri: 0,
        rescureArr: ['已康复', '康复中'],
      };
    },
    computed: {
      ...mapState('user', ['userInfo']),
      ...mapState('student', ['daka']),
    },
    methods: {
      // 改变 今日晨检体温
      temperChange: function(e) {
        this.ti = e.detail.value
        this.dakaData.temperature = this.temperArr[this.ti]
      },
      // 改变 是否已完成三针疫苗接种
      vaccineChange: function(e) {
        this.vi = e.detail.value
        this.dakaData.vaccine = this.vaccineArr[this.vi]
      },
      // 改变 是否曾经或当前被确诊
      sicknessChange: function(e) {
        this.si = e.detail.value
        this.dakaData.sickness = this.sicknessArr[this.si]
      },
      // 改变 是否经核酸或抗原检测确认感染
      confirmChange: function(e) {
        this.ci = e.detail.value
        this.dakaData.confirm = this.confirmArr[this.ci]
      },
      // 改变 是否已经康复
      rescureChange: function(e) {
        this.ri = e.detail.value
        this.dakaData.rescure = this.rescureArr[this.ri]
      },
      // 获取当前位置
      getLocation() {
        if (this.isDisabled) return
        var that = this;
        // 获取当前位置
        uni.chooseLocation({
          success: function(res) {
            console.log(res, '获取当前位置-------')
            that.dakaData.address = res.address; //  + res.name
          },
          fail: (err) => {
            console.log(err)
          }
        });
      },
      // 点击提交按钮
      async formSubmit() {
        // 判断当前所在位置、户籍所在地、电话是否已填写完整
        if (!this.dakaData.address || !this.dakaData.residence || !this.dakaData.phone)
          return uni.$showMsg('未填写完整')
        // /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ 手机号验证正则表达式
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.dakaData.phone))
          return uni.$showMsg('手机号格式不正确')
        // 打卡用户id
        this.dakaData.uid = this.userInfo.uid
        // 打卡用户姓名
        this.dakaData.uname = this.userInfo.uname
        // 打卡用户班级
        this.dakaData.className = this.userInfo.className
        // 打卡日期
        this.dakaData.date = uni.$getDate()
        console.log('即将上传的打卡信息：', this.dakaData)
        const res = await uni.$http.post('/addDaka', this.dakaData)
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("打卡失败！")
        if (res.data.status === 0) {
          this.dakaData = {}
          uni.navigateBack({
            complete: () => {
              uni.$showMsg("打卡成功！")
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
    padding: 10px 10px 40px;

    // 每个表单项
    .content-item {
      padding: 10px 0;
      font-size: 16px;

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

      // 上一项选择是时显示的区域的picker
      .imp {
        border: 1px solid #fd2205;
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
      margin: 20px 0;
      border-radius: 18px;
      color: white;
      background-color: #6794c1;
    }
  }
</style>
