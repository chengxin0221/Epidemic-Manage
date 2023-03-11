<template>
  <!-- 用户管理页面 -->
  <view class="container">
    <!-- 学院 选择区域和管理区域的外层容器 -->
    <view class="outter-box">
      <!-- 设置 -->
      <view class="btn-set" @click="gotoSchoolPage"><uni-icons class="icon-set" color="#fff" type="gear" size="22"></uni-icons><text class="set-text">更改学校结构</text></view>
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
      <!-- 专业 选择区域 -->
      <view class="choose-box">
        专业:
        <view class="picker-box">
          <picker :range="professional" :value="proi" @change="changePro">
            {{professional[proi] || '暂无数据'}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <!-- 班级 选择区域 -->  
      <view class="choose-box">
        班级:
        <view class="picker-box">
          <picker :range="classes" :value="clai" @change="changeCla">
            {{classes[clai] || '暂无数据'}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
    </view>
    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-item" :style="{backgroundColor: tlM ? '#20517f' : '#dceffd', color :  tlM ? 'white' : '#1b4771'}"
        @click="showArea('学院教师')">学院教师</view>
      <view class="nav-item" :style="{backgroundColor: teM ? '#20517f' : '#dceffd', color :  teM ? 'white' : '#1b4771'}"
        @click="showArea('班主任')">班主任</view>
      <view class="nav-item" :style="{backgroundColor: stM ? '#20517f' : '#dceffd', color :  stM ? 'white' : '#1b4771'}"
        @click="showArea('学生')">学生</view>
    </view>
    <!-- 学院教师区域 -->
    <view class="teacher-list" v-show="tlM">
      <!-- 学院教师名单表格 -->
      <my-usertable @add="addUser" @del="delUser" @search="searchUser" :dataList="teList" :dataType="teDT">
      </my-usertable>
    </view>
    <!-- 班主任区域 -->
    <view v-show="teM">
      <!-- 班级没有班主任 -->
      <view class="no-teacher" v-show="!teacher.uid">
        <text class="class-text">{{classes[clai]}}</text>暂无班主任，请从学院教师中选择一名教师作为该班级班主任
      </view>
      <!-- 班级有班主任 -->
      <view class="teacher-box" v-show="teacher.uid">
        <view class="tip-text">点击以下“班主任”字体可编辑班主任个人信息</view>
        <view class="teacher-content">
          <view class="title" @click="gotoDetail">
            班主任
          </view>
          <view class="item-box">
            <view class="text">职工号：</view>
            <view class="item">{{teacher.uid}}</view>
          </view>
          <view class="item-box">
            <view class="text">姓名：</view>
            <view class="item">{{teacher.uname}}</view>
          </view>
          <view class="item-box">
            <view class="text">管理班级：</view>
            <view class="class-item" v-for="(item,index) in adminClass" :key="index">{{item}}
              <!-- x图标 -->
              <uni-icons class="icon-del" color="#6f6f6f" type="clear" size="24" @click="delAdminCla(item)">
              </uni-icons>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 班级学生名单区域 -->
    <view class="student-box" v-show="stM">
      <!-- 班级学生名单表格 -->
      <my-usertable @add="addUser" @del="delUser" @search="searchUser" :dataList="list" :dataType="stuDT">
      </my-usertable>
    </view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex';
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-adminpage.js';
  export default {
    // 只有管理员类型的用户可进入该页面
    mixins: [intopageMix],
    onShow() {
      // 获取该学院的教师列表
      this.getTeacherList(this.college[this.coli])
      // 获取该班级的班主任信息
      this.getTeacherData(this.classes[this.clai])
      // 获取班级学生信息
      this.getStudentData(this.classes[this.clai])
    },
    onLoad() {
      // 获取所有学院信息、某学院所有专业信息、某学院某专业所有班级信息
      this.getCPC()
    },
    data() {
      return {
        // 是否显示管理区域
        tlM: true,
        teM: false,
        stM: false,
        // 学院名称数组
        coli: 0,
        college: [],
        // 专业名称数组
        proi: 0,
        professional: [],
        // 班级名称数组 
        clai: 0,
        classes: [],
        // 班主任信息
        teacher: {},
        // 管理的班级
        adminClass: [],
        // 要在表格里展示学生信息
        list: [],
        teList: [],
        // 表格数据类型
        stuDT: '学生',
        teDT: '教师',
      };
    },
    methods: {
      ...mapMutations('user', ['updateUserData']),
      // 更改学校结构
      gotoSchoolPage() {
        uni.navigateTo({
          url: '/subpkg_admin/schoolStructure/schoolStructure'
        })
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
          // 获取该学院的教师列表
          this.getTeacherList(this.college[this.coli])
          // 获取某学院所有专业信息
          this.getProfessional(this.college[index])
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
          // console.log(this.professional, '------professional')
          // 获取某学院某专业所有班级信息
          this.getClasses(this.professional[0])
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 获取某学院某专业所有班级信息
      async getClasses(data) {
        const res = await uni.$http.get('/api/classes', {
          professional: data,
          college: this.college[this.coli]
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          this.classes = res.data.classes
          // console.log(this.classes, '------classes')
          // 获取该班级的班主任信息
          this.getTeacherData(this.classes[this.clai])
          // 获取班级学生信息
          this.getStudentData(this.classes[this.clai])
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 获取该学院的教师列表
      async getTeacherList(name) {
        this.teList = [];
        const res = await uni.$http.get('/api/teacherlist', {
          college: name
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("获取学院教师信息失败！")
        if (res.data.status === 0) {
          this.teList = res.data.teacherList;
          // console.log(this.teList,'--------telist--')
        } else {
          if (res.data.message === '该学院暂未有教师信息！') return;
          return uni.$showMsg(res.data.message)
        }
      },
      // 获取该班级的班主任信息
      async getTeacherData(name) {
        this.teacher = {};
        const res = await uni.$http.get('/api/teacher', {
          classes: name
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("获取班主任信息失败！")
        if (res.data.status === 0) {
          this.teacher = res.data.teacher;
          this.adminClass = res.data.teacher.className.split(',');
        } else {
          if (res.data.message === '该班级暂未有班主任！') return;
          return uni.$showMsg(res.data.message)
        }
      },
      // 获取该班级的学生信息
      async getStudentData(name) {
        this.list = [];
        const res = await uni.$http.get('/student', {
          className: name
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("获取学生信息失败！")
        if (res.data.status === 0) {
          this.list = res.data.student
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
      // 显示管理区域
      showArea(area) {
        switch (area) {
          case '学院教师':
            // 获取该学院的教师列表
            this.getTeacherList(this.college[this.coli])
            this.tlM = true
            this.teM = false
            this.stM = false
            break;
          case '班主任':
            // 获取该班级的班主任信息
            this.getTeacherData(this.classes[this.clai])
            this.teM = true
            this.tlM = false
            this.stM = false
            break;
          case '学生':
            // 获取班级学生信息
            this.getStudentData(this.classes[this.clai])
            this.stM = true
            this.tlM = false
            this.teM = false
            break;
        }
      },
      // 学院选择项改变
      changeCol(e) {
        this.coli = e.detail.value;
        // 改变专业选择器
        this.getProfessional(this.college[this.coli])
        this.proi = 0
        this.clai = 0
        // 获取该学院的教师列表
        this.getTeacherList(this.college[this.coli])
      },
      // 专业选择项改变
      changePro(e) {
        this.proi = e.detail.value
        // 改变班级选择器
        this.getClasses(this.professional[this.proi])
        this.clai = 0
      },
      // 班级选择项改变
      changeCla(e) {
        this.clai = e.detail.value
        // 获取该班级的班主任信息
        this.getTeacherData(this.classes[this.clai])
        // 获取班级学生信息
        this.getStudentData(this.classes[this.clai])
      },
      // 搜索教师、学生
      searchUser(type) {
        uni.navigateTo({
          url: '/subpkg_admin/searchUser/searchUser?type=' + type + '&college=' + this.college[this.coli] +
            '&classes=' + this.classes[this.clai]
        })
      },
      // 删除学院教师、班级学生
      delUser(type, data) {
        // if (data.length === 0) return uni.$showMsg('未选择要删除的用户')
        // 询问用户是否删除
        uni.showModal({
          title: '提示',
          content: '确认要删除该用户吗？',
          success: async (res) => {
            if (res.confirm) {
              const res = await uni.$http.get('/deluser', {
                dataType: type,
                delList: data
              })
              // 请求失败
              if (res.statusCode !== 200) return uni.$showMsg('删除失败！')
              if (res.data.status === 0) {
                uni.$showMsg('删除成功！');
                if (type === '教师') {
                  // 获取该学院的教师列表
                  this.getTeacherList(this.college[this.coli])
                } else {
                  // 获取班级学生信息
                  this.getStudentData(this.classes[this.clai])
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
            }
          }
        })
      },
      // 添加学院教师、班级学生
      addUser(type) {
        let url = '/subpkg_admin/addUser/addUser?college=' + this.college[this.coli] + '&userType=' + type;
        if (type === '学生') url = '/subpkg_admin/addUser/addUser?college=' + this.college[this.coli] + '&userType=' +
          type + '&className=' + this.classes[this.clai] + '&professional=' + this.professional[this.proi];
        uni.navigateTo({
          url: url
        })
      },
      // 删除班主任管理的班级
      delAdminCla(name) {
        // 询问用户是否删除
        uni.showModal({
          title: '提示',
          content: '确认要删除该班级吗？',
          success: async (res) => {
            if (res.confirm) {
              this.teacher.className = this.adminClass.toString();
              const res = await uni.$http.get('/editAdminClass', {
                uid: this.teacher.uid,
                className: this.teacher.className,
                delClass: name
              })
              // 请求失败
              if (res.statusCode !== 200) return uni.$showMsg('删除失败！')
              if (res.data.status === 0) {
                uni.$showMsg('删除成功！');
                if (name === this.classes[this.clai]) {
                  this.adminClass = [];
                  this.teacher = {};
                } else {
                  this.adminClass = res.data.classList;
                  this.teacher.className = this.adminClass.toString();
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
            }
          }
        })
      },
      // 跳转到个人信息编辑页面
      gotoDetail() {
        // 将要展示的个人信息保存到store中
        this.updateUserData(this.teacher)
        uni.navigateTo({
          url: '/subpkg/personalInfo/personalInfo?id=' + this.teacher.uid
        })
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
      
      // 设置按钮
      .btn-set {
        margin-left: 10px;
        font-size: 15px;
        .set-text {
          position: relative;
          top: -3px;
        }
        // 设置图标
        .icon-set {
          margin-right: 5px;
        }
      }

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

    // 导航栏
    .nav-bar {
      display: flex;
      text-align: center;

      .nav-item {
        width: 33%;
        height: 36px;
        line-height: 36px;
      }
    }

    // 没有班主任区域
    .no-teacher {
      padding: 30px;
      line-height: 28px;

      .class-text {
        color: #20517f;
        padding: 10px;
        font-size: 18px;
      }
    }

    // 有班主任区域
    .teacher-box {
      .tip-text {
        color: #4a4949;
        font-size: 14px;
        padding: 12px;
      }

      .teacher-content {
        width: 92%;
        padding: 5px 0px;
        margin: 10px auto;
        border-radius: 12px;
        border: 1px solid #20517f;
        background-color: white;
        box-shadow: 5px -5px 0 #20517f;

        // 标题
        .title {
          font-size: 20px;
          padding: 10px;
          color: #20517f;
          text-align: center;
        }

        .item-box {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          margin: 10px 0;
          align-items: center;

          // V图标
          .icon-bottom {
            position: absolute;
            right: 10px;
          }

          // 文字
          .text {
            width: 32%;
            font-size: 18px;
            text-align: right;
          }

          // 职工号、姓名值
          .item {
            width: 60%;
            height: 24px;
            padding: 5px 10px;
            color: white;
            border-radius: 18px;
            background-color: #20517f;
          }

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
        }
      }
    }
  }
</style>
