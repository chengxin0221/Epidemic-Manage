<template>
  <view class="container">
    <!-- 发布公告页面 -->
    <view class="notice-content">
      <!-- 公告信息表单 -->
      <form @submit="formSubmit">
        <view class="notice-item">
          <view class="notice-title">公告标题：</view>
          <input class="notice-input" v-model="newNotice.title" placeholder="请输入公告标题" />
        </view>
        <view class="notice-item">
          <view class="notice-title">公告内容：</view>
          <!-- 最大输入长度，设置为 -1 的时候不限制最大长度 -->
          <textarea class="notice-textarea" v-model="newNotice.content" placeholder="请输入公告内容" maxlength="-1"></textarea>
        </view>
        <!-- 公告配图 -->
        <view class="notice-item">
          公告配图：
          <view class="img-box">
            <view class="img-item" v-for="(item, index) in imgList" :key="index" v-if="imgList.length!==0">
              <!-- 一定要加  mode="widthFix" 否则图片使用默认高度为240px -->
              <image class="img" :style="{opacity: opacity}" mode="widthFix" :src="item" @click="addImg(index)" @longpress="handleLPImg"></image>
              <!-- 显示删除配图按钮 -->
              <view class="btn-delIcon" v-if="delIcon" @click="delImg(index)">
                <uni-icons class="icon-del" type="trash-filled" color="#fff" size="30"></uni-icons>
              </view>
            </view>
            <view class="add-img" @click="addImg(-1)">
              <uni-icons class="add-icons" type="plusempty" size="30"></uni-icons>
            </view>
          </view>
        </view>
        <!-- 发布按钮 -->
        <button class="btn-submit" form-type="submit">发布</button>
      </form>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  // 导入自己封装的 mixin 模块
  import intopageMix from '@/mixins/before-into-adminpage.js';
  export default {
    // 只有管理员可进入该页面
    mixins: [intopageMix],
    onLoad(option) {
      if (option.id) {
        // 进入编辑公告状态，展示要编辑的公告内容
        // 将要编辑的公告内容展示出来
        // 浅拷贝 Object.assign(target, source1, source2); Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
        Object.assign(this.newNotice, this.editNotice)
        // 如果原公告的编辑者和当前用户不同则添加当前用户的用户名到编辑者中
        this.newNotice.editor = this.editNotice.editor.split(',').indexOf(this.userInfo.uname) !== -1 ? this.editNotice.editor : this.editNotice.editor.concat(',',this.userInfo.uname)
        // 解码emoji表情
        this.newNotice.content = uni.$uncodeUtf16(this.newNotice.content)
        // 将图片展示出来
        if(this.newNotice.imgList){
          this.imgList = this.newNotice.imgList.split(',')
        }
      } else if (this.lastNotice.title) {
        // 继续编辑上次未上传成功的公告内容
        // 若是跳转登录后重新编辑资讯则初始化资讯内容为刚刚写入的内容
        // 浅拷贝 Object.assign(target, source1, source2); Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
        Object.assign(this.newNotice, this.lastNotice)
        // 解码emoji表情
        this.newNotice.content = uni.$uncodeUtf16(this.newNotice.content)
      }
    },
    data() {
      return {
        // 公告内容
        newNotice: {
          // 当前日期
          date: '',
          // 公告标题
          title: '',
          // 公告内容
          content: '',
          // 公告配图
          imgList: '',
          // 作者
          author: '',
          // 编辑者
          editor: '',
        },
        // 添加的配图
        imgList: [],
        // 是否显示删除配图按钮
        delIcon: false,
        // 配图透明度
        opacity: 1,
        // 倒计时的秒数
        seconds: 3,
      };
    },
    computed: {
      // 用户信息
      ...mapState('user', ['userInfo']),
      // 要编辑的公告信息
      ...mapState('home', ['editNotice','lastNotice']),
    },
    methods: {
      ...mapMutations('home', ['updateEditNotice','updateLastNotice']),
      // 选择配图
      addImg(index) {
        if(this.delIcon){
          // 隐藏删除配图按钮，图片透明度变回1
          this.delIcon = false
          this.opacity = 1
          return;
        }
        const that = this
        var count = 9
        // index=-1表示是点击添加按钮，而不是点击已添加图片
        if (index !== -1) count = 1
        uni.chooseImage({
          count: count, //最多可以选择的图片张数，默认9
          success(res) {
            console.log("配图：", res.tempFilePaths)
            console.log(index, '-----index')
            if (index !== -1) {
              that.imgList[index] = res.tempFilePaths[0]
              // 更新一下imgList数组使更改的图片显示在屏幕上
              that.imgList.push('更新')
              that.imgList.pop()
            } else {
              res.tempFilePaths.forEach(item => that.imgList.push(item))
            }
            // console.log(that.imgList, '-----------addNotice------imgList')
          }
        })
      },
      // 长按已添加图片
      handleLPImg(){
        // 显示删除配图按钮，所有图片透明度变为0.4
        this.delIcon = true
        this.opacity = 0.4
      },
      // 删除已选择的配图
      delImg(index){
        this.delIcon = false
        this.opacity = 1
        console.log(index, '-----index')
        // 最后一张图片
        if(index === this.imgList.length-1){
          this.imgList.pop()
          return;
        }
        // 不是最后一张
        for(let i = index; i < this.imgList.length-1; i++){
          this.imgList[index] = this.imgList[index+1]
          this.imgList.pop()
        }
        // console.log(this.imgList, '-----------addNotice------delimg')
      },
      // 点击发布公告按钮
      formSubmit: function(e) {
        // 判断资讯信息对象各项内容是否为空
        if (!this.newNotice.title || !this.newNotice.content) return uni.$showMsg('未填写完整！')
        // 标题不得含emoji
        if(uni.$utf16toEntities(this.newNotice.title) !== this.newNotice.title) return uni.$showMsg('标题不得含emoji！')
        // 获取当前日期赋值给newNotice.data
        this.newNotice.date = uni.$getDate()
        // 发布公告的作者和编辑者 [发布者和编辑者为空时即是新发布公告而不是编辑公告]
        if(!this.newNotice.author){
          this.newNotice.author = this.userInfo.uname
          this.newNotice.editor = this.userInfo.uname
        }
        const that = this
        uni.showModal({
          title: '发布公告',
          content: '确定已经完成公告内容的编辑吗？',
          cancelText: "取消", // 取消按钮的文字  
          confirmText: "确认", // 确认按钮文字 
          success: function(res) {
            // 选择确定按钮
            if (res.confirm) {
              // 上传公告信息
              that.uploadNotic()
            }
          }
        });
      },
      // 上传公告信息
      async uploadNotic() {
        // 上传公告配图到后端
        if (this.imgList) {
          for (let i = 0; i < this.imgList.length; i++) {
            // 上传没上传过的
            if (!/http:\/\/([^\/]*)\/api\/uploads/.test(this.imgList[i])) {
              // 上传图片
              const up = await this.uploadImg(this.imgList[i])
              // console.log(up, 'up---------------')
              if (up === '上传失败') return uni.$showMsg('发布公告失败！')
              // 将返回的url路径替换到公告配图数组中
              this.imgList[i] = up
            }
          }
          // 把配图路径数组转为字符串赋值给newNotice对象的imgList属性
          this.newNotice.imgList = this.imgList.toString()
        }
        // 将emoji表情其转成 base64
        this.newNotice.content = uni.$utf16toEntities(this.newNotice.content)
        // 保存这次发布公告记录以防跳转登录后需重新编辑
        this.updateLastNotice(this.newNotice)
        console.log(this.newNotice, '即将上传的公告信息--------')
        // 发布公告内容到后端
        const response = await uni.$http.post('/addNotice', this.newNotice)
        if (response.statusCode !== 200) return uni.$showMsg('上传公告失败！')
        if (response.data.status === 0) {
          // 清空表单数据
          this.newNotice = {}
          this.imgList = []
          this.updateEditNotice({})
          this.updateLastNotice({})
          // 跳转回之前的页面
          uni.navigateBack({
            complete: () => {
              // 显示编辑或发布成功弹窗
              uni.$showMsg(response.data.message)
            }
          })
        } else {
          // 发布公告失败原因为身份认证失败
          if (response.data.message === '身份认证失败！') {
            // 3秒后跳转登录
            uni.$showTips()
          } else {
            // 其他原因导致发布公告失败
            return uni.$showMsg(response.data.message)
          }
        }
      },
      // 上传图片到后端
      uploadImg(imgurl) {
        const uploadUrl = uni.$http.baseUrl + '/api/uploadImg?type=notice';
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 资讯表单内容
  .notice-content {
    padding: 10px;

    // 表单项
    .notice-item {
      margin-bottom: 10px;

      // 表单项标题
      .notice-title {}

      // 表单项input输入框
      .notice-input {
        margin: 10px 5px;
        padding: 5px 10px;
        border-bottom: 1px solid #71a3f9;
      }

      // 表单项textarea多行输入框
      .notice-textarea {
        width: 632rpx;
        height: 280rpx;
        margin: 10px 5px;
        padding: 10px;
        border: 1px solid #71a3f9;
      }
    
      // 配图图片区域
      .img-box {
        padding: 10px;

        .img-item{
          position: relative;
          // 添加的图片
          .img {
            width: 98%;
            margin-bottom: 10px;
          }
          
          // 删除配图按钮
          .btn-delIcon {
            width: 40px;
            height: 40px;
            text-align: center;
            border-radius: 50%;
            background-color: #5a99d0;
            position: absolute;
            z-index: 999;
            top: 20px;
            right: 20px;
            .icon-del {
              position: relative;
              top: 4px;
            }
          }
        }

        // 添加配图的+
        .add-img {
          display: inline-block;
          width: 84px;
          height: 84px;
          text-align: center;
          border: 1px solid #d4e4ff;

          .add-icons {
            position: relative;
            top: 26px;
          }
        }
      }
    }

    // 发布按钮
    .btn-submit {
      margin: 20px;
      background-color: #d4e4ff;
    }
  }
</style>
