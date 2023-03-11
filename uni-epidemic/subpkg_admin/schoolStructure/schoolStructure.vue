<template>
  <view class="container">
    <!-- 学院 选择区域和管理区域的外层容器 -->
    <view class="college-box">
      <!-- 选择区域 -->
      <view class="choose-box">
        学院:
        <view class="picker-box">
          <picker :range="college" :value="coli" @change="changeCol">
            {{college[coli] || '暂无数据'}}
            <uni-icons class="icon-bottom" color="#fff" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
        <uni-icons color="#20517f" type="gear" size="24" @click="showArea('bottom')"></uni-icons>
      </view>
    </view>
    <view class="outter-box" v-show="isShow">
      <!-- 管理区域 -->
      <view class="manage-box">
        <view class="item" v-for="(name,i) in college" :key="i" @click="changeCol($event,i)">{{name}}
          <!-- X 图标 -->
          <uni-icons class="icon-del" color="#6f6f6f" type="clear" size="24" @click="delCol(name)"></uni-icons>
        </view>
        <view class="icon-box">
          <!-- + 图标 -->
          <uni-icons class="icon-item" color="#fff" type="plusempty" size="24" @click="addCol"></uni-icons>
          <!-- 收起图标 -->
          <uni-icons class="icon-item" color="#fff" type="top" size="22" @click="showArea('top')"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 专业 选择区域和管理区域的外层容器 -->
    <view class="outter-box">
      <!-- 选择区域 -->
      <view class="choose-box">
        专业:
        <view class="picker-box">
          <picker :range="professional" :value="proi" @change="changePro">
            {{professional[proi] || '暂无数据'}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <!-- 管理区域 -->
      <view class="manage-box">
        <view class="item" v-for="(name,i) in professional" :key="i" @click="changePro($event,i)">{{name}}
          <!-- X 图标 -->
          <uni-icons class="icon-del" color="#6f6f6f" type="clear" size="24" @click="delPro(name)"></uni-icons>
        </view>
        <!-- + 图标 -->
        <uni-icons class="icon-add" color="#fff" type="plusempty" size="24" @click="addPro"></uni-icons>
      </view>
    </view>
    <!-- 班级 选择区域和管理区域的外层容器 -->
    <view class="outter-box">
      <!-- 选择区域 -->
      <view class="choose-box">
        班级:
        <view class="picker-box">
          <picker :range="classes" :value="clai" @change="changeCla">
            {{classes[clai] || '暂无数据'}}
            <uni-icons class="icon-bottom" type="bottom" size="20"></uni-icons>
          </picker>
        </view>
      </view>
      <!-- 管理区域 -->
      <view class="manage-box">
        <view class="item" v-for="(name,i) in classes" :key="i" @click="changeCla($event,i)">{{name}}
          <!-- X 图标 -->
          <uni-icons class="icon-del" color="#6f6f6f" type="clear" size="24" @click="delCla(name)"></uni-icons>
        </view>
        <!-- + 图标 -->
        <uni-icons class="icon-add" color="#fff" type="plusempty" size="24" @click="addCla"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-adminpage.js';
  export default {
    // 只有管理员类型的用户可进入该页面
    mixins: [intopageMix],
    onLoad() {
      // 获取所有学院信息、某学院所有专业信息、某学院某专业所有班级信息
      this.getCPC()
    },
    data() {
      return {
        // 学院名称数组
        coli: 0,
        college: [],
        // 专业名称数组
        proi: 0,
        professional: [],
        // 班级名称数组 
        clai: 0,
        classes: [],
        // 显示隐藏
        isShow: false,
      };
    },
    methods: {
      // 显示隐藏
      showArea(type) {
        this.isShow = type === 'top' ? false : !this.isShow
      },
      // 获取所有学院信息、某学院所有专业信息、某学院某专业所有班级信息
      async getCPC(index = 0) {
        // 获取所有学院信息
        const res = await uni.$http.get('/api/college')
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('获取信息失败！')
        if (res.data.status === 0) {
          this.college = [...res.data.college]
          // console.log(this.college, '-----college')
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
          this.professional = [...res.data.professional]
          // console.log(this.professional, '------professional')
          // 获取某学院某专业所有班级信息
          this.getClasses(this.professional[this.proi])
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
          this.classes = [...res.data.classes]
          // console.log(this.classes, '------classes')
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
      // 学院选择项改变
      changeCol(e, index) {
        this.coli = e.detail.value;
        if (index !== undefined) {
          this.coli = index;
          console.log(index, '-----')
        }
        // 改变专业选择器
        this.getProfessional(this.college[this.coli])
        this.proi = 0
        this.clai = 0
      },
      // 专业选择项改变
      changePro(e, index) {
        this.proi = e.detail.value
        if (index !== undefined) {
          this.proi = index;
          // console.log(index,'-----')
        }
        // 改变班级选择器
        this.getClasses(this.professional[this.proi])
        this.clai = 0
      },
      // 班级选择项改变
      changeCla(e, index) {
        this.clai = e.detail.value
        if (index !== undefined) {
          this.clai = index;
          // console.log(index,'-----')
        }
      },
      // 增加学院
      addCol() {
        uni.showModal({
          title: '请输入学院名称',
          editable: true, // 是否显示输入框
          placeholderText: '输入学院名称',
          cancelText: "取消", // 取消按钮的文字
          confirmText: "确认", // 确认按钮文字 
          success: (res) => {
            // 选择确定按钮
            if (res.confirm) {
              if (this.college.includes(res.content.trim())) return uni.$showMsg('该学院已存在！')
              // console.log(res.content)
              // 将添加的项添加到数据库
              this.addTodb({
                college: res.content.trim()
              }, '学院')
            }
          }
        })
      },
      // 增加专业
      addPro() {
        if (this.professional.length === 9) return uni.$showMsg('专业数不可超过9个')
        uni.showModal({
          title: '请输入专业名称',
          editable: true, // 是否显示输入框
          placeholderText: '输入专业名称',
          cancelText: "取消", // 取消按钮的文字
          confirmText: "确认", // 确认按钮文字 
          success: (res) => {
            // 选择确定按钮
            if (res.confirm) {
              if (this.professional.includes(res.content.trim())) return uni.$showMsg('该专业已存在！')
              // console.log(res.content, '----addpro')
              // 将添加的项添加到数据库
              this.addTodb({
                college: this.college[this.coli],
                professional: res.content.trim()
              }, '专业')
            }
          }
        })
      },
      // 添加班级
      addCla() {
        if (this.classes.length === 9) return uni.$showMsg('班级数不可超过9个')
        uni.showModal({
          title: '请输入入学年份',
          editable: true, // 是否显示输入框
          placeholderText: '输入入学年份如：2019',
          cancelText: "取消", // 取消按钮的文字
          confirmText: "确认", // 确认按钮文字 
          success: (res) => {
            // 选择确定按钮
            if (res.confirm) {
              let year = res.content.trim()
              if (year.length === 4 && /20[0-9]{2}/.test(year)) {
                // console.log('====')
                // 将添加的项添加到数据库
                this.addTodb({
                  college: this.college[this.coli],
                  professional: this.professional[this.proi],
                  year: year
                }, '班级')
              } else {
                uni.$showMsg('输入的年份不正确！')
              }
            }
          }
        })
      },
      // 将添加的项添加到数据库
      async addTodb(data, type) {
        let res
        if (type === '学院') {
          res = await uni.$http.post('/addcollege', data)
        } else if (type === '专业') {
          res = await uni.$http.post('/addprofessional', data)
        } else if (type === '班级') {
          res = await uni.$http.post('/addclass', data)
        }
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('添加失败！')
        if (res.data.status === 0) {
          if (type === '学院') {
            // 添加成功后 将新增学院添加到学院数组
            this.college.push(data.college);
            uni.$showMsg('添加学院成功！');
          } else if (type === '专业') {
            // 添加成功后 将新增专业添加到专业数组
            this.professional.push(data.professional);
            uni.$showMsg('添加专业成功！');
          } else if (type === '班级') {
            // 添加成功后 将新增班级添加到班级数组
            this.classes.push(res.data.className);
            uni.$showMsg('添加班级成功！');
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
      // 删除学院
      delCol(name) {
        uni.showModal({
          title: '提示',
          content: `确定要删除该项吗？`,
          cancelText: "取消", // 取消按钮的文字
          confirmText: "确认", // 确认按钮文字 
          success: (res) => {
            // 选择确定按钮
            if (res.confirm) {
              // 从数据库中删除
              this.delFormdb({
                college: name
              }, '学院')
            }
          }
        })
      },
      // 删除专业
      delPro(name) {
        uni.showModal({
          title: '提示',
          content: `确定要删除该项吗？`,
          cancelText: "取消", // 取消按钮的文字
          confirmText: "确认", // 确认按钮文字 
          success: (res) => {
            // 选择确定按钮
            if (res.confirm) {
              // 从数据库中删除
              this.delFormdb({
                college: this.college[this.coli],
                professional: name
              }, '专业')
            }
          }
        })
      },
      // 删除班级
      delCla(name) {
        uni.showModal({
          title: '提示',
          content: `确定要删除该项吗？`,
          cancelText: "取消", // 取消按钮的文字
          confirmText: "确认", // 确认按钮文字 
          success: (res) => {
            // 选择确定按钮
            if (res.confirm) {
              // 从数据库中删除
              this.delFormdb({
                college: this.college[this.coli],
                professional: this.professional[this.proi],
                classes: name
              }, '班级')
            }
          }
        })
      },
      // 从数据库删除
      async delFormdb(data, type) {
        let res
        if (type === '学院') {
          res = await uni.$http.get('/delcollege', data)
        } else if (type === '专业') {
          res = await uni.$http.get('/delprofessional', data)
        } else if (type === '班级') {
          res = await uni.$http.get('/delclass', data)
        }
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg('添加失败！')
        if (res.data.status === 0) {
          if (type === '学院') {
            this.coli = 0
            uni.$showMsg('删除学院成功！');
          } else if (type === '专业') {
            this.proi = 0
            uni.$showMsg('删除专业成功！');
          } else if (type === '班级') {
            this.clai = 0
            uni.$showMsg('删除班级成功！');
          }
          // 更新数据
          this.getCPC(this.coli);
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
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    .college-box {
      width: 93%;
      padding: 16px 4px;
      margin: 20px auto 0px;
      border-radius: 14px;
      border: 1px solid #20517f;
      box-shadow: 3px -3px 0 #20517f;
      background-color: white;
      position: sticky;
      top: 3px;
      z-index: 999;
      // 选择学院区域 、选择年级区域 和 选择班级区域
      .choose-box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 18px;
      
        .picker-box {
          width: 66%;
          font-size: 16px;
          padding: 8px 10px;
          border-radius: 18px;
          color: white;
          background-color: #20517f;
      
          // V图标
          .icon-bottom {
            float: right;
          }
        }
      }
    }

    // 选择区域和管理区域的外层容器
    .outter-box {
      width: 94%;
      padding: 20px 4px;
      margin: 10px auto;
      border-radius: 14px;
      background-color: #20517f;
      // 选择学院区域 、选择年级区域 和 选择班级区域
      .choose-box {
        display: flex;
        justify-content: space-around;
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
      // 管理区域盒子
      .manage-box {
        margin-top: 10px;
      
        .item {
          width: 42%;
          text-align: center;
          position: relative;
          display: inline-block;
          padding: 8px 5px;
          margin: 5px 5px;
          color: #20517f;
          border-radius: 18px;
          background-color: white;
      
          // X 图标
          .icon-del {
            position: absolute;
            right: -7px;
            top: -9px;
          }
        }
      
        // + 图标
        .icon-add {
          margin: 10px 0 10px 55px;
          position: relative;
          top: 3px;
          right: -6px;
        }
      
        // + 图标 收起图标的容器
        .icon-box {
          display: flex;
          padding-top: 6px;
      
          // + 图标 和 收起图标
          .icon-item {
            padding-left: 28px;
          }
        }
      }
    }
  }
</style>
