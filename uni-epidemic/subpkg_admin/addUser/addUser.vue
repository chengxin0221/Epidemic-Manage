<template>
  <!-- 添加用户界面 -->
  <view>
    <view class="info-box">
      <!-- 个人信息项 -->
      <view class="info-item" v-if="userType==='教师'">
        <text class="text">入职年份：</text>
        <view class="inp-item">
          <picker :range="yearList" :value="yi" @change="changeYear">{{yearList[yi]}}
            <!-- V 图标 -->
            <uni-icons class="icon-bottom" color="#20517f" type="bottom" size="22"></uni-icons>
          </picker>
        </view>
      </view>
      <view class="info-item">
        <text class="text">姓名：</text>
        <input class="inp-item" v-model="name" />
      </view>
      <view class="info-item">
        <text :class="['text', userType==='教师'?'move-left':'']">班级：</text>
        <view class="class-box" v-if="userType==='教师'">
          <view class="class-item" v-for="(item,index) in classList" :key="index">{{item}}<!-- X 图标 -->
            <uni-icons class="icon-del" color="#6f6f6f" type="clear" size="24" @click="delCla(item)"></uni-icons>
          </view>
          <picker :range="classes" :value="i" @change="changeCla">
            <!-- + 图标 -->
            <uni-icons class="icon-add" color="#20517f" type="plusempty" size="22"></uni-icons>
          </picker>
        </view>
        <view class="uninput" v-else>{{className}}</view>
      </view>
      <view class="info-item">
        <text class="text">密码：</text>
        <input class="inp-item" v-model="pwd" />
      </view>
      <view class="info-item" v-if="userType==='学生'">
        <text class="text">专业：</text>
        <view class="uninput">{{professional}}</view>
      </view>
      <view class="info-item">
        <text class="text">学院：</text>
        <view class="uninput">{{college}}</view>
      </view>
    </view>
    <button class="btn-add" @click="addUser">添加</button>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-teadpage.js';
  export default {
    // 只有教师和管理员可进入该页面
    mixins: [intopageMix],
    onLoad(option) {
      this.college = option.college;
      this.userType = option.userType;
      if (this.userType === '教师') {
        // 获取某学院所有班级信息
        this.getClasses();
      } else {
        this.className = option.className;
        this.professional = option.professional;
      }
    },
    data() {
      return {
        // 添加用户类型
        userType: '',
        // 学院
        college: '',
        // 班级
        i: 0,
        classes: [],
        classList: [],
        // 添加学生时的班级
        className: '',
        // 添加学生时的专业
        professional: '',
        // 默认密码
        pwd: '1212',
        // 姓名
        name: '',
        // 入职年份\
        yi: 0,
      };
    },
    computed: {
      yearList() {
        let y = uni.$getDate().slice(0, 4);
        let list = [];
        for (let i = 0; i <= 10; i++) {
          list.push((parseInt(y) - i).toString());
        }
        return list;
      }
    },
    methods: {
      // 获取某学院所有班级信息
      async getClasses() {
        const res = await uni.$http.get('/api/classes', {
          college: this.college
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          this.classes = res.data.classes
          // console.log(this.classes, '------classes')
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 改变班级选择器
      changeCla(e) {
        this.i = e.detail.value;
        this.classList.push(this.classes[this.i])
        this.classList = [...new Set(this.classList)]
      },
      // 改变入职年份选择器
      changeYear(e) {
        this.yi = e.detail.value;
      },
      // 删除添加的班级
      delCla(name) {
        // 是最后一个
        if (name === this.classList[this.classList.length - 1]) this.classList.pop()
        // 不是最后一个
        else {
          for (let i = 1; i < this.classList.length; i++) {
            if (this.classList[i - 1] === name) {
              this.classList[i - 1] = this.classList[i]
            }
          }
          this.classList.pop()
        }
      },
      // 添加用户
      async addUser() {
        if (!this.name || !this.pwd) return uni.$showMsg('姓名和密码不可为空');
        // 请求路径
        let url = '/addteacher';
        // 请求携带的参数
        let data = {
          college: this.college,
          name: this.name,
          userType: this.userType,
          classes: this.classList.toString(),
          pwd: this.pwd,
          year: this.yearList[this.yi]
        }
        if (this.userType === '学生') {
          data = {
            college: this.college,
            professional: this.professional,
            name: this.name,
            userType: this.userType,
            className: this.className,
            pwd: this.pwd
          }
          url = '/addstudent'
        }
        const res = await uni.$http.post(url, data)
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          uni.navigateBack({
            complete() {
              uni.$showMsg("添加成功！")
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 个人信息
  .info-box {
    width: 93%;
    box-sizing: border-box;
    padding: 10px;
    margin: 20px auto;
    border-radius: 14px;
    border: 1px solid #20517f;
    box-shadow: 5px -4px 0 #20517f;

    // 个人信息项
    .info-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      font-size: 18px;
      color: #20517f;

      // 文字
      .text {
        width: 37%;
        text-align: right;
      }

      .move-left {
        position: relative;
        right: 10px;
      }

      // 班级
      .class-box {
        width: 60%;

        // 管理班级
        .class-item {
          position: relative;
          padding: 5px;
          margin: 5px;
          color: white;
          display: inline-block;
          border-radius: 18px;
          background-color: #20517f;

          // X 图标
          .icon-del {
            position: absolute;
            right: -7px;
            top: -9px;
          }
        }

        // + 图标
        .icon-add {
          padding-left: 40px;
        }
      }
      
      // 非输入框，有固定值的
      .uninput {
        width: 66%;
        height: 24px;
        font-size: 16px;
        padding: 5px 10px;
        border-radius: 18px;
        color: white;
        background-color: #20517f;
      }

      // 输入框
      .inp-item {
        width: 66%;
        height: 24px;
        font-size: 16px;
        padding: 5px 10px;
        border-radius: 18px;
        border: 2px solid #20517f;
        background-color: white;

        // V图标
        .icon-bottom {
          float: right;
        }
      }
    }
  }

  // 添加按钮
  .btn-add {
    width: 90%;
    color: white;
    margin-top: 20px;
    border-radius: 20px;
    background-color: #20517f;
  }
</style>
