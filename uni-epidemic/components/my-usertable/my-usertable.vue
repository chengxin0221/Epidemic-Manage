<template>
  <view>
    <!-- 名单表格标题 -->
    <view class="table-title">
      <view class="title-text">
        {{dataType}} <text class="sum-text">(人数：{{dataList.length}})</text>
      </view>
      <view class="icon-box">
        <!-- 搜索图标 -->
        <uni-icons v-if="!onlydel && !nosearch" class="icon" type="search" :color="userColor.iconColor" size="26" @click="searchUser(dataType)"></uni-icons>
        <!-- 删除图标 -->
        <uni-icons class="icon" type="trash-filled" :color="userColor.iconColor" size="26" @click="delUser(dataType)"></uni-icons>
        <!-- 添加图标 -->
        <uni-icons v-if="!onlydel" class="icon" type="plusempty" :color="userColor.iconColor" size="26" @click="addUser(dataType)"></uni-icons>
      </view>
    </view>
    <!-- 表格 -->
    <view class="table">
      <!-- 表格头部 -->
      <view class="table-head" :style="{color: userColor.color, backgroundColor: userColor.bgColor}">
        <checkbox-group @change="checkAll">
          <label class="item">
            <!-- 全选复选框 -->
            <checkbox color="#20517f" value="qx" :checked="selectAll" />
          </label>
        </checkbox-group>
        <view class="th-item" v-if="dataType === '学生'">班级</view>
        <view class="th-item">{{dataType === '教师' ? '职工号' : '学号'}}</view>
        <view class="th-item">姓名</view>
        <view class="th-item" v-if="dataType === '教师'">管理班级</view>
      </view>
      <!-- 无数据 -->
      <view class="no-data" v-if="dataList.length === 0">
        暂无数据
      </view>
      <!-- 表格行 -->
      <checkbox-group @change="checkboxChange">
        <view class="table-row" v-for="(item,index) in dataList" :key="index">
          <view class="item">
            <checkbox color="#20517f" :value="item.uid" :checked="item.checked" />
          </view>
          <view class="info-box" @click="gotoDetail(item)">
            <view class="t-item" v-if="dataType === '学生'">{{item.className}}</view>
            <view class="t-item">{{item.uid}}</view>
            <view class="t-item">{{item.uname.length > 4 ? item.uname.slice(0,4) + '...' : item.uname}}</uni-icons>
            </view>
            <view class="t-item" v-if="dataType === '教师'">
              {{item.className.length > 4 ? item.className.slice(0,4) + '...' : item.className}}
            </view>
          </view>
        </view>
      </checkbox-group>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    name: "my-usertable",
    props: {
      dataList: {
        type: Array || null,
        default: []
      },
      dataType: {
        type: String,
        default: ''
      },
      // 是否只显示3个图标中的删除图标
      onlydel: {
        type: Boolean,
        default: false
      },
      // 不显示搜索图标
      nosearch: {
        type: Boolean,
        default: false
      },
      // 背景颜色和文字颜色
      userColor: {
        type: Object || null,
        default: {
          color: 'white',
          iconColor: '#20517f',
          bgColor: '#20517f'
        }
      }
    },
    data() {
      return {
        // 是否全选
        selectAll: false,
        // 选中的值
        checkedList: [],
        // 是否显示搜索选项
        isShow: false,
      };
    },
    watch: {
      // 监听传入的dataList数据
      dataList: {
        handler(newVal) {
          // 刚传入的dataList数据的checked是undefined
          if(this.dataList.length === 0 || !this.dataList[0].checked){
            this.selectAll = false;
          }
          // console.log(this.selectAll,'====',this.dataList[0].checked)
        },
        deep: true
      },
      // 监听全选复选框绑定的值
      selectAll: {
        handler(newVal) {
          // 如果新值为true，则全选
          if (newVal) {
            this.dataList.forEach(item => {
              this.$set(item, 'checked', true);
            })
          } else {
            // 新值为false时
            // 情景1：当选中的数组长度为0时，对有复选框的数据列表进行遍历，设置checked为false
            // 情景2：当选中的数组长度和有复选框的数据列表长度相等时，对有复选框的数据列表进行遍历，设置checked为false
            if (this.checkedList.length == 0 || this.checkedList.length == this.dataList.length) {
              this.dataList.forEach(item => {
                this.$set(item, 'checked', false)
              })
            }
          }
        },
        deep: true
      },
      // 监听选中数组
      checkedList: {
        handler(newVal, oldVal) {
          if (newVal) {
            if (newVal.length == this.dataList.length) {
              // 当选中数组长度等于有复选框的列表的长度时，勾选全选复选框
              this.selectAll = true;
            } else {
              // 当选中数组长度不等于有复选框的列表的长度时，不勾选全选复选框
              this.selectAll = false
            }
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations('user', ['updateUserData']),
      // 全选复选框的改变事件
      checkAll(e) {
        // 当有选中的值时，即全选复选框被勾选，则应为全选状态
        if (e.detail.value.length > 0) {
          this.selectAll = true
        } else {
          this.selectAll = false
        }
      },
      // 复选框
      checkboxChange: function(e) {
        var items = this.dataList;
        var values = e.detail.value;
        // 将选中的值赋值给选中数组
        this.checkedList = values;
        console.log(this.checkedList, '选中数组');
        for (var i = 0; i < items.length; ++i) {
          const item = items[i]
          // 当选中数组包含带有复选框数组中的某个元素，则设置为选中状态
          if (values.includes(item.uid)) {
            this.$set(item, 'checked', true)
          } else {
            this.$set(item, 'checked', false)
          }
        }
      },
      // 搜索用户
      searchUser(type) {
        this.$emit('search', type)
      },
      // 删除用户
      delUser(type) {
        if (this.selectAll && this.checkedList.length === 0) {
          let list = [];
          this.dataList.forEach(item => {
            list.push(item.uid)
          })
          if (list.length === 0) return uni.$showMsg('未选择要删除的用户')
          this.$emit('del', type, list)
        } else {
          if (this.checkedList.length === 0) return uni.$showMsg('未选择要删除的用户')
          this.$emit('del', type, this.checkedList)
        }
      },
      // 添加用户
      addUser(type) {
        this.$emit('add', type)
      },
      // 跳转到个人信息编辑页面
      gotoDetail(data) {
        // 将要展示的个人信息保存到store中
        this.updateUserData(data)
        uni.navigateTo({
          url: '/subpkg/personalInfo/personalInfo?id=' + data.id
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 学院教师名单区域、班级学生名单区域
  .table-title {
    display: flex;
    padding: 10px;
    font-size: 18px;
    position: relative;

    .title-text {
      width: 60%;

      // 人数
      .sum-text {
        color: #797979;
        font-size: 14px;
        margin-left: 6px;
      }
    }

    // 搜索、删除、添加三个图标的外层容器
    .icon-box {
      width: 40%;
      display: flex;

      .icon {
        width: 33%;
      }
    }
  }

  // 表格
  .table {
    text-align: center;

    // 表格头部
    .table-head {
      display: flex;
      height: 40px;
      align-items: center;
      font-size: 16px;
      margin: 5px;
      border-radius: 12px;

      // 全选复选框
      .item {
        width: 8%;
        padding-left: 11px;
      }

      .th-item {
        width: 30%;
      }
    }

    // 无数据
    .no-data {
      padding: 20px 10px;
      color: #888a94;
    }

    // 表格行
    .table-row {
      display: flex;
      height: 40px;
      align-items: center;
      margin: 5px;
      font-size: 14px;
      border-bottom: 1px solid rgb(224, 224, 224);

      // 每一项的复选框
      .item {
        padding-left: 11px;
      }

      // 内容区域
      .info-box {
        width: 90%;
        justify-content: space-around;
        display: flex;

        // 单元格
        .t-item {
          position: relative;
          width: 30%;

          // 展示管理的学生名单时显示
          .icon-forward {
            position: absolute;
            top: 1px;
            right: 6px;
            z-index: 999;
          }
        }
      }
    }
  }
</style>
