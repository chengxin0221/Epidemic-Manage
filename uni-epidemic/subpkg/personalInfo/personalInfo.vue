<template>
  <!-- 个人信息页面 -->
  <view class="container">
    <!-- 头像和姓名模块 -->
    <view class="img-name-box">
      <!-- 头像 -->
      <view class="img-box">
        <image :src="headImg" mode="widthFix" class="info-img" @click="changeImg"></image>
      </view>
      <!-- 姓名 -->
      <text class="name">{{personalInfo.uname}}</text>
    </view>
    <!-- 个人信息模块 -->
    <view class="info-box">
      <view class="info-content">
        <!-- 个人信息项 -->
        <view class="info-item">
          姓名：<input class="item-text" v-model="personalInfo.uname" />
        </view>
        <view class="info-item">
          学号：<input class="item-text" style="color: #797979;" disabled="true" v-model="personalInfo.uid" />
        </view>
        <view class="info-item" v-if="personalInfo.userType !== '管理员'">
          学院：<text class="item-text" :style="{'color': !id ? '#797979' : ''}">{{personalInfo.college}}</text>
          <picker :range="college" :value="coli" @change="changeCol" v-if="id && userInfo.userType === '管理员'">
            <uni-icons class="icon-refresh" color="#20517f" type="refresh" size="20"></uni-icons>
          </picker>
        </view>
        <view class="info-item" v-if="personalInfo.userType === '学生'">
          专业：<text class="item-text" :style="{'color': !id ? '#797979' : ''}">{{personalInfo.professional}}</text>
          <picker :range="professional" :value="proi" @change="changePro" v-if="id && userInfo.userType === '管理员'">
            <uni-icons class="icon-refresh" color="#20517f" type="refresh" size="20"></uni-icons>
          </picker>
        </view>
        <view class="info-item" v-if="personalInfo.userType==='学生'">
          班级：<text class="item-text" :style="{'color': !id ? '#797979' : ''}">{{personalInfo.className}}</text>
          <picker :range="classes" :value="clai" @change="changeCla" v-if="id">
            <uni-icons class="icon-refresh" color="#20517f" type="refresh" size="20"></uni-icons>
          </picker>
        </view>
        <view class="info-item" v-if="personalInfo.userType==='教师'">
          <text>班级：</text>
          <view class="class-box">
            <view class="class-item" v-for="(item,index) in classList" :key="index">{{item}}<!-- X 图标 -->
              <uni-icons class="icon-del" color="#6f6f6f" type="clear" size="24" @click="delCla(item)" v-if="id">
              </uni-icons>
            </view>
            <view class="icon-box" v-if="id">
              <picker :range="classes" :value="clai" @change="changeCla">
                <!-- + 图标 -->
                <uni-icons class="icon-add" color="#20517f" type="plusempty" size="22"></uni-icons>
              </picker>
              <uni-icons class="icon-redo" color="#20517f" type="undo" size="22" @click="redo"></uni-icons>
            </view>
          </view>
        </view>
        <view class="info-item" v-if="id">
          密码：<input class="item-text" type="text" v-model="personalInfo.upwd" />
        </view>
        <view class="info-item">
          电话：<input class="item-text" type="number" maxlength="11" v-model="personalInfo.phone" />
        </view>
        <view class="info-item">
          户籍所在地：<input class="item-text" v-model="personalInfo.residence" />
        </view>
      </view>
      <!-- 编辑按钮 -->
      <button class="btn-submit" @click="clickEdit">编辑</button>
    </view>
  </view>
</template>

<script>
  // 按需从 vuex 中导入 mapState 辅助函数
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
      // 跳转不带id参数，显示登录用户的个人信息
      if (!option.id) {
        // 获取最新个人信息
        this.getPersonalInfo()
      } else if (option.id) {
        this.id = option.id;
        // 跳转带id参数，显示存储在store中的用户个人信息
        this.personalInfo = {
          ...this.userData
        };
        this.personalInfo.img = this.personalInfo.img ? this.personalInfo.img.replace(/http:\/\/([^\/]*)/g, uni.$http
          .baseUrl) : ''
        this.headImg = this.personalInfo.img ? this.personalInfo.img : '../../static/girl.png'
        this.classList = this.personalInfo.className ? this.personalInfo.className.split(',') : []
        // 获取所有学院信息
        this.getCPC();
      }
    },
    data() {
      return {
        id: '',
        // 编辑个人信息的人
        editor: '',
        // 是否修改头像
        cimg: false,
        // 头像
        headImg: '',
        // 用于删除原头像
        delImg: '',
        // 个人信息
        personalInfo: {
          uid: '',
          uname: '',
          upwd: '',
          className: '',
          professional: '',
          college: '',
          phone: '',
          residence: '',
          img: ''
        },
        // 学院名称数组
        coli: 0,
        college: [],
        // 专业名称数组
        proi: 0,
        professional: [],
        // 班级名称数组 
        clai: 0,
        classes: [],
        // 班主任管理的班级
        classList: [],
        // 改变学院、专业、班级
        hadChange: false,
      };
    },
    computed: {
      ...mapState('user', ['userInfo', 'userData']),
    },
    methods: {
      ...mapMutations('user', ['updateUserInfo']),
      // 获取最新个人信息
      async getPersonalInfo() {
        const res = await uni.$http.get('/userInfo')
        // 请求失败
        if (res.statusCode !== 200) uni.$showMsg('获取个人信息失败！')
        if (res.data.status === 0) {
          this.personalInfo = {
            ...res.data.userInfo
          }
          // console.log(res.data.userInfo,'--------')
          this.personalInfo.img = this.personalInfo.img ? this.personalInfo.img.replace(/http:\/\/([^\/]*)/g, uni
            .$http.baseUrl) : ''
          this.headImg = this.personalInfo.img ? this.personalInfo.img : '../../static/girl.png'
          this.classList = this.personalInfo.className ? this.personalInfo.className.split(',') : []
          if (!this.personalInfo.img) this.personalInfo.img = this.userInfo.img
          // 更新内存中的个人信息
          this.updateUserInfo(this.personalInfo)
          return
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
      // 更改头像
      changeImg() {
        // 不是登录用户本人不可修改头像
        if (this.id) return uni.$showMsg('用户本人才可更换头像！');
        uni.chooseImage({
          count: 1,
          success: (res) => {
            // console.log('头像', res.tempFilePaths,'-----')
            this.cimg = true;
            this.headImg = res.tempFilePaths[0]
          }
        })
      },
      // 上传头像
      uploadImg(imgurl) {
        const uploadUrl = uni.$http.baseUrl + '/api/uploadImg?type=headImg';
        return new Promise((resolve, reject) => { // 实现同步操作
          uni.uploadFile({
            url: uploadUrl,
            filePath: imgurl,
            name: 'imgfile',
            success: (res) => {
              // 上传不成功
              if (JSON.parse(res.data).status === 1) {
                uni.$showMsg(JSON.parse(res.data).message);
                resolve('上传失败')
              } else {
                // 将上传后的新地址返回
                resolve(JSON.parse(res.data).imgUrl)
              }
            },
            fail(err) {
              uni.$showMsg(err.message);
              reject('上传失败')
            }
          });
        })
      },
      // 点击编辑按钮
      clickEdit() {
        if (!this.personalInfo.uname) return uni.$showMsg('姓名不可为空！')
        if (this.id && !this.personalInfo.upwd) return uni.$showMsg('密码不可为空！')
        // 询问用户是否要提交编辑结果
        uni.showModal({
          title: '提示',
          content: '确认要编辑个人信息吗？',
          success: (res) => {
            if (res.confirm) {
              // 编辑个人信息
              this.editPersonalInfo()
            } else {
              // id为空表示显示的是登录用户的个人信息
              if (!this.id) {
                this.personalInfo = {
                  ...this.userInfo
                }
              } else {
                // 恢复显示原信息
                this.hadChange = false
                this.personalInfo = this.userData
              }
            }
          }
        })
      },
      // 上传编辑结果
      async editPersonalInfo() {
        console.log(this.userInfo, this.personalInfo, '-----')
        // id不为空表示显示的是选择的用户的个人信息
        if (this.id) {
          this.editor = this.userInfo.userType
        }
        if (this.cimg) {
          // 如果原头像是上传的则删除原头像
          if (/http:\/\/([^\/]*)\/api\/uploads/g.test(this.personalInfo.img)) this.delImg = this.personalInfo.img
          // console.log(this.delImg,'-----------delimg')
          // 修改头像
          this.personalInfo.img = await this.uploadImg(this.headImg)
        }
        const res = await uni.$http.post('/editUserInfo', {
          ...this.personalInfo,
          editor: this.editor,
          delImg: this.delImg,
          newClassName: this.classList.toString()
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("编辑失败！")
        if (res.data.status === 0) {
          this.cimg = false
          // id为空表示显示的是登录用户的个人信息
          if (!this.id) {
            // 更新内存中的个人信息
            this.updateUserInfo({
              ...this.personalInfo
            })
          } else {
            this.personalInfo.className = this.classList.toString()
            // 获取所有学院信息
            this.getCPC();
          }
          return uni.$showMsg("编辑成功！")
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
      // 获取所有学院信息
      async getCPC(index = 0) {
        // 获取所有学院信息
        const res = await uni.$http.get('/api/college')
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          this.college = res.data.college
          // 把数组调到与当前显示用户的学院一致
          for (let i = 0; i < this.college.length; i++) {
            if (this.college[i] === this.personalInfo.college) {
              this.coli = i
              break;
            }
          }
          if (this.personalInfo.userType !== '学生') {
            // 获取某学院某专业所有班级信息
            this.getClasses()
          } else {
            // 获取某学院所有专业信息
            this.getProfessional(this.college[this.coli])
          }
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 获取某学院所有专业信息
      async getProfessional(data) {
        const res = await uni.$http.get('/api/professional', {
          college: data
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          this.professional = res.data.professional
          // 学院发生了改变更新专业数据时，改变学生的专业
          if (this.hadChange && this.personalInfo.userType === '学生') {
            this.personalInfo.professional = this.professional[this.proi]
          }
          // 把数组调到与当前显示用户的专业一致
          for (let i = 0; i < this.professional.length; i++) {
            if (this.professional[i] === this.personalInfo.professional) {
              this.proi = i
              break;
            }
          }
          // 获取某学院某专业所有班级信息
          this.getClasses(this.professional[this.proi])
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 获取某学院某专业所有班级信息
      async getClasses(data) {
        // 显示学生的个人信息则获取某学院某专业的班级信息
        let param = {
          professional: data,
          college: this.college[this.coli]
        }
        // 不是显示学生的个人信息则获取某个学院所有班级的信息
        if (this.personalInfo.userType !== '学生') {
          param = {
            college: this.college[this.coli]
          }
        }
        const res = await uni.$http.get('/api/classes', param)
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          this.classes = res.data.classes
          // 学院或专业发生了改变更新班级数据时，改变学生的班级
          if (this.hadChange && this.personalInfo.userType === '学生') {
            this.personalInfo.className = this.classes[this.clai]
          }
          // 显示学生的个人信息则须调整班级数组
          if (this.personalInfo.userType === '学生') {
            // 把数组调到与当前显示用户的专业一致
            for (let i = 0; i < this.classes.length; i++) {
              if (this.classes[i] === this.personalInfo.className) {
                this.clai = i
                break;
              }
            }
          }
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 学院选择项改变
      changeCol(e) {
        // console.log(index,'-----')
        this.coli = e.detail.value;
        // 标志学院发生了改变
        this.hadChange = true
        this.personalInfo.college = this.college[this.coli]
        // 改变专业选择器
        this.getProfessional(this.college[this.coli])
        this.proi = 0
        this.clai = 0
      },
      // 专业选择项改变
      changePro(e) {
        // console.log(index,'-----')
        this.proi = e.detail.value
        // 标志专业发生了改变
        this.hadChange = true
        this.personalInfo.professional = this.professional[this.proi]
        // 改变班级选择器
        this.getClasses(this.professional[this.proi])
        this.clai = 0
      },
      // 班级选择项改变
      changeCla(e) {
        // console.log(index,'-----')
        this.clai = e.detail.value
        this.hadChange = true
        if (this.personalInfo.userType === '学生') {
          this.personalInfo.className = this.classes[this.clai]
        } else {
          this.classList.push(this.classes[this.clai])
          this.classList = [...new Set(this.classList)]
        }
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
      // 恢复修改前的数据
      redo() {
        this.classList = this.personalInfo.className ? this.personalInfo.className.split(',') : []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {

    // 头像和姓名模块
    .img-name-box {
      height: 400rpx;
      background-color: #d4e4ff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 40px;

      // 头像
      .img-box {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        overflow: hidden;
        .info-img {
          width: 160rpx;
        }
      }
      // 姓名
      .name {
        font-size: 18px;
        margin-top: 10px;
      }
    }

    // 个人信息模块
    .info-box {
      .info-content {
        width: 92%;
        margin: 0 auto;
        position: relative;
        top: -129rpx;
        background-color: white;
        border-radius: 18px;
        box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.06);

        // 个人信息项
        .info-item {
          display: flex;
          padding: 12px 8px;
          border-bottom: 1px solid #ebebeb;
          font-size: 16px;

          &:last-child {
            border: none;
          }

          // 输入框
          .item-text {
            width: 58%;
            margin-left: 6px;
          }

          // 班级
          .class-box {
            width: 74%;

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

            // + 图标 redo 图标的容器
            .icon-box {
              display: flex;
              padding-top: 6px;

              // + 图标
              .icon-add,
              .icon-redo {
                padding-left: 16px;
              }
            }
          }
        }

        .picker-view {
          width: 690rpx;
          height: 500rpx;
          margin-top: 20rpx;
        }

        .item {
          line-height: 100rpx;
          text-align: center;
        }
      }

      // 编辑按钮
      .btn-submit {
        position: relative;
        top: -50rpx;
        width: 80%;
        background-color: #d4e4ff;
      }
    }
  }
</style>
