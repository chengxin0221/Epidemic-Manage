<template>
  <!-- 所有公告页面 -->
  <view v-if="allNotice.length !== 0">
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search @click="search"></my-search>
    </view>
    <uni-swipe-action>
      <view v-for="(item, index) in allNotice" :key="index" @longpress="manageNotice">
        <!-- 非管理员的时候禁用滑动isForbid为false -->
        <uni-swipe-action-item :right-options="options" @click="swipeActionClick($event, item)" :disabled="isForbid">
          <my-notice :notice="item" :isShow="isShow" @radioChange="radioChange(item.id)"></my-notice>
        </uni-swipe-action-item>
      </view>
    </uni-swipe-action>
    <!-- 显示所有公告信息按钮 -->
    <view class="btn-backToAll" v-if="backToAll" @click="showAll">
      <uni-icons class="icon-redo" type="undo-filled" color="#5384cc" size="30"></uni-icons>
    </view>
    <!-- 批量删除区域 -->
    <view class="del-box" v-if="isShow">
      <view class="num">已选中{{num}}篇公告</view>
      <button class="btn btn-cancel" @click="cancel">取消</button>
      <button class="btn btn-del" @click="delNoticeList">删除</button>
    </view>
  </view>
  <view class="nodata" v-else>
    暂无公告
    <image class="nodata-img" src="../../static/none.jpg"></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    onShow: function() {
      // 在onShow中获取信息则通过navigateBack跳转回来也会更新，若在onLoad中获取则通过navigateTo跳转才会更新
      // 获取公告信息
      this.getAllNotice()
    },
    data() {
      return {
        // 公告信息
        allNotice: [],
        // 显示单选按钮
        isShow: false,
        // 删除列表
        delList: [],
        // 是否显示返回按钮
        backToAll: false,
        // 滑动操作选项
        options: [{
            text: '编辑',
            style: {
              backgroundColor: '#007aff'
            }
          },
          {
            text: '删除',
            style: {
              backgroundColor: '#F56C6C'
            }
          }
        ]
      };
    },
    computed: {
      // 用户类型
      ...mapState('user', ['userInfo']),
      // 是否禁用【非管理员且首页的时候禁用】
      isForbid() {
        if (this.userInfo.userType === "管理员") {
          return false;
        }
        return true;
      },
      // 选中的公告篇数
      num() {
        return this.delList.length
      }
    },
    methods: {
      // 用于更新最新公告信息
      ...mapMutations('home', ['updateNoticeData', 'updateEditNotice']),
      // 获取所有公告信息
      async getAllNotice(flag) {
        console.log('运行getAllNotice')
        this.backToAll = false
        const res = await uni.$http.get('/api/notice')
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.status === 0) {
          // 获取所有公告信息
          this.allNotice = res.data.noticeData
          if (flag === 1) {
            // 更新最新公告信息
            this.updateNoticeData(this.allNotice.slice(0, 5))
          }
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 搜索公告
      search(e) {
        if (!e.title) return uni.$showMsg('未输入搜索关键词！')
        var list = this.allNotice.filter((x) => x.title.includes(e.title))
        // console.log(list)
        if (list.length !== 0) {
          this.allNotice = list
          uni.$showMsg('已显示搜索结果')
          this.backToAll = true
        } else uni.$showMsg('未搜索到相关内容!')
      },
      // 显示所有公告
      showAll() {
        this.getAllNotice()
        this.backToAll = false
      },
      // 长按公告
      manageNotice() {
        console.log('长按公告')
        // 如果是管理员则显示单选按钮
        if (!this.isForbid) {
          // 显示单选按钮
          this.isShow = true;
        }
      },
      // 改变单选按钮状态，增加或减少删除列表项
      radioChange(id) {
        var index = this.delList.indexOf(id)
        if (index !== -1) {
          // console.log(index)
          // 删除 删除列表项
          // 该项为最后一项
          if (index === this.delList.length - 1) {
            this.delList.pop()
            // console.log(this.delList,'----------pop')
            return;
          }
          // 不是最后一项，把该项后面的往前挪之后删除最后一项
          for (let i = index + 1; i < this.delList.length; i++) {
            this.delList[index] = this.delList[i]
          }
          // 删除最后一项
          this.delList.pop()
          // console.log(this.delList,'----------把该项后面的往前挪之后删除最后一项')
          return;
        }
        // 增加 删除列表项
        this.delList.push(id)
        // console.log(this.delList,'----------push')
      },
      // 滑动公告组件点击按钮
      swipeActionClick(e, notice) {
        if (e.content.text === "编辑") {
          // 保存要编辑的公告到vuex
          this.updateEditNotice(notice)
          // 跳转到发布公告页面修改公告内容
          uni.navigateTo({
            url: '/subpkg_admin/addNotice/addNotice?id=' + notice.id
          })
        } else {
          const that = this
          uni.showModal({
            title: '删除',
            content: '确定要删除该公告内容吗？',
            cancelText: "取消", // 取消按钮的文字  
            confirmText: "确认", // 确认按钮文字 
            success: function(res) {
              // 选择确定按钮
              if (res.confirm) {
                // 删除公告
                that.delNotic(notice.id)
              }
            }
          });
        }
      },
      // 删除公告
      async delNotic(id) {
        const res = await uni.$http.get('/delnotice', {
          id
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.status === 0) {
          uni.$showMsg(res.data.message)
          this.isShow = false
          this.backToAll = false
          // 更新页面并更新最新公告信息
          this.getAllNotice(1)
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 点击取消
      cancel() {
        console.log('点击取消----')
        this.delList = [];
        this.isShow = false;
      },
      // 点击删除
      delNoticeList() {
        const that = this;
        uni.showModal({
          title: '删除',
          content: '确定要删除这些公告内容吗？',
          cancelText: "取消", // 取消按钮的文字  
          confirmText: "确认", // 确认按钮文字 
          success: function(res) {
            // 选择确定按钮
            if (res.confirm) {
              // console.log('-=-=-=-=-=delList:', that.delList)
              // 删除公告
              that.delList.forEach(item => that.delNotic(item))
              that.delList = []
              that.isShow = false
              that.backToAll = false
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  // 自定义的搜索组件的外层容器
  .search-box {
    // 设置定位效果为“吸顶”
      position: sticky;
      // 吸顶的“位置”
      top: 0;
      // 提高层级，防止被轮播图覆盖
      z-index: 999;
  }

  // 显示所有公告信息按钮
  .btn-backToAll {
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #5a99d0;
    position: fixed;
    z-index: 999;
    bottom: 100px;
    right: 10px;

    .icon-redo {
      position: relative;
      top: 4px;
    }
  }

  // 批量删除区域
  .del-box {
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    z-index: 999;
    width: 100%;
    font-size: 14px;
    padding: 5px 0;
    border-top: 1px solid #e4e4e4;

    .num {
      width: 40%;
      margin: auto 0;
    }

    // 按钮
    .btn {
      width: 21%;
      height: 40px;
      line-height: 40px;
      margin: 0;
    }

    // 取消按钮
    .btn-cancel {
      box-sizing: border-box;
      color: #5a99d0;
      border: 1px solid #5a99d0;
    }

    // 删除按钮
    .btn-del {
      color: white;
      background-color: #5a99d0;
    }
  }

  // 无公告时展示的区域
  .nodata {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 50px;
    color: #5d5959;

    .nodata-img {
      width: 480rpx;
      height: 480rpx;
      margin-top: 20px;
    }
  }
</style>
