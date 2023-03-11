<template>
  <!-- 没有管理的班级时显示 -->
  <view class="no-data" v-if="classList.length === 0">
    <!-- 无管理班级图片 -->
    <image class="nodata-img" src="../../static/none.jpg"></image>
    <view class="nodata-text">
      暂无管理班级
    </view>
  </view>
  <!-- 管理班级页面 -->
  <view class="container" v-else>
    <!-- 管理的班级区域 -->
    <view class="classes">
      <view :class="['class-item', className === item ? 'shadow' : '']" v-for="(item,i) in classList" :key="i"
        @click="changeClass(item)">
        {{item}}
      </view>
    </view>
    <view class="student-box">
      <!-- 班级信息和搜索框的外层容器 -->
      <view class="class-box">
        <!-- 班级信息项 -->
        <view class="class-info">
          学院：<text class="info-item">{{classInfo.college}}</text>
        </view>
        <view class="class-info">
          专业：<text class="info-item">{{classInfo.professional}}</text>
        </view>
        <view class="class-info">
          班级：<text class="info-item">{{className}}</text>
        </view>
        <!-- 搜索框 -->
        <view class="search-box">
          <!-- 输入框 -->
          <input class="uni-input" v-model="searchBasis" maxlength="12" placeholder="学号后两位或姓名" />
          <!-- 搜索按钮 -->
          <button @click="search" class="btn-search">搜索</button>
        </view>
      </view>
      <!-- 班级学生名单表格 -->
      <my-usertable @add="addUser" @del="delUser" :dataList="list" :dataType="stuDT" :nosearch="true" :userColor="{color: 'black', iconColor: '#6fa2d2', bgColor: 'rgba(138, 198, 251, 0.52)'}">
      </my-usertable>
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
    // 教师类型的用户才可进入该页面
    mixins: [intopageMix],
    onShow() {
      // 获取该班级的学生信息
      this.getStudentData(this.className)
    },
    data() {
      return {
        // 班级
        className: '',
        // 学生信息
        studentList: [],
        // 表格数据类型
        dataType: '学生信息',
        // 搜索依据
        searchBasis: '',
        // 要在表格里展示的信息
        list: [],
        // 表格数据类型
        stuDT: '学生',
        // 班级信息
        classInfo: {
          id: '',
          classes: '',
          professional: '',
          college: '',
          teacher: ''
        }
      };
    },
    computed: {
      ...mapState('user', ['userInfo']),
      // 班主任管理的班级
      classList() {
        if (this.userInfo.className) {
          this.className = this.userInfo.className.split(',')[0]
          return this.userInfo.className.split(',')
        }
        return [];
      },
    },
    methods: {
      // 改变展示的班级学生名单
      changeClass(name) {
        this.className = name
        this.getStudentData(name)
      },
      // 获取该班级的学生信息
      async getStudentData(name) {
        const res = await uni.$http.get('/student', {
          className: name
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg("获取学生信息失败！")
        if (res.data.status === 0) {
          this.studentList = [...res.data.student]
          this.classInfo = {
            ...res.data.classInfo
          }
          this.list = this.studentList
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
      // 搜索
      search() {
        if(!this.searchBasis.trim()){
          this.list = [...this.studentList]
          return uni.$showMsg('已显示全班学生！')
        }
        if (/[0-9]{2}/g.test(this.searchBasis.trim())) {
          let list = []
          list = this.studentList.filter(x => x.uid.slice(-2, ) === this.searchBasis.trim())
          if(list.length === 0) uni.$showMsg('未搜索到该学生！')
          else {
            this.list = list
            uni.$showMsg('已显示搜索结果！')
          }
          // console.log(this.studentList[0].uid.slice(-2,),this.list)
        } else {
          let list = []
          list = this.studentList.filter(x => x.uname.indexOf(this.searchBasis.trim()) !== -1)
          if(list.length === 0) uni.$showMsg('未搜索到该学生！')
          else {
            this.list = list
            uni.$showMsg('已显示搜索结果！')
          }
          // console.log(this.searchBasis,this.list)
        }
        // 清空
        this.searchBasis = ''
      },
      // 删除学生
      delUser(type, data) {
        // 询问用户是否删除
        uni.showModal({
          title: '提示',
          content: '确认要删除该学生吗？',
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
                // 获取班级学生信息
                this.getStudentData(this.className)
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
      // 添加班级学生
      addUser(type) {
        let url = '/subpkg_admin/addUser/addUser?college=' + this.classInfo.college + '&userType=' +
          type + '&className=' + this.className + '&professional=' + this.classInfo.professional;
        uni.navigateTo({
          url: url
        })
      },
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

  // 有管理班级
  .container {

    // 管理的班级区域
    .classes {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;

      // 班级
      .class-item {
        width: 46%;
        line-height: 40px;
        margin: 5px;
        text-align: center;
        border-radius: 18px;
        border: 1px solid #0d72ad;
      }

      // 阴影
      .shadow {
        // color: #083854;
        border: none;
        background-color: rgba(138, 198, 251, 0.52);
        box-shadow: 4px 4px 0 rgba(39, 105, 164, 0.63);
      }
    }

    // 学生信息
    .student-box {

      // 班级信息和搜索框的外层容器
      .class-box {
        width: 88%;
        margin: 10px auto;
        padding: 10px;
        font-size: 18px;
        border-radius: 18px;
        background-color: rgba(138, 198, 251, 0.52);
        box-shadow: 4px -4px 0 rgba(39, 105, 164, 0.63);
      }

      // 班级信息项
      .class-info {
        display: flex;
        padding: 10px;
        color: #0e4f75;

        .info-item {
          width: 70%;
          color: black;
        }
      }

      // 搜索框
      .search-box {
        display: flex;
        align-items: center;
        margin: 10px 0;

        // 输入kuang
        .uni-input {
          height: 35px;
          line-height: 35px;
          padding-left: 10px;
          border-radius: 18px;
          background-color: white;
        }

        // 搜索按钮
        .btn-search {
          margin-left: 10px;
          font-size: 16px;
          border-radius: 14px;
          color: white;
          background-color: #75bbe4;
        }
      }
    }
  }
</style>
