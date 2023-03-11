<template>
  <!-- 搜索用户页面 -->
  <view>
    <view class="search-box">
      <!-- 输入框 -->
      <input class="inp-item" :placeholder="placeholder" type="text" v-model="search">
      <!-- 搜索图标 -->
      <uni-icons class="icon-search" type="search" color="#fff" size="26" @click="searchUser"></uni-icons>
    </view>
    <!-- 本院或本班 -->
    <view class="title-box">{{userType==='教师'?college:classes}}</view>
    <!-- 表格 -->
    <my-usertable @del="delUser" :onlydel="true" :dataList="dataList" :dataType="userType">
    </my-usertable>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-adminpage.js';
  export default {
    // 只有管理员类型的用户可进入该页面
    mixins: [intopageMix],
    onLoad(option) {
      this.userType = option.type
      this.college = option.college
      this.classes = option.classes
    },
    data() {
      return {
        // 搜索的用户类型
        userType: '',
        // 搜索学院
        college: '',
        // 搜索班级
        classes: '',
        // 输入框提示文字
        placeholder: '输入账号或姓名',
        // 搜索依据
        search: '',
        // 本院或本班搜索结果
        dataList: [],
      };
    },
    methods: {
      // 搜索用户
      async searchUser() {
        const res = await uni.$http.get('/searchuser', {
          search: this.search,
          userType: this.userType,
          college: this.college,
          classes: this.classes
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('搜索失败！')
        if (res.data.status === 0) {
          this.dataList = res.data.dataList
          if (this.dataList.length === 0) {
            return uni.$showMsg('未搜索到用户！')
          }
          uni.$showMsg('已显示搜索结果')
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
      // 删除学院教师、班级学生
      delUser(type, data) {
        if (data.length === 0) return uni.$showMsg('未选择要删除的用户')
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
                // 更新搜索结果
                this.searchUser()
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
    }
  }
</script>

<style lang="scss" scoped>
  .search-box {
    width: 80%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px auto;
    padding: 10px;
    border-radius: 18px;
    background-color: #20517f;

    // 输入框
    .inp-item {
      width: 76%;
      height: 28px;
      padding: 0 10px;
      line-height: 28px;
      border-radius: 12px;
      background-color: white;
    }

    // 搜索图标
    .icon-search {
      margin-left: 10px;
    }
  }

  // 本院或本班
  .title-box {
    padding: 10px;
    font-size: 18px;
    text-align: center;
  }
</style>
