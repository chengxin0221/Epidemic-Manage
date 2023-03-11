<template>
  <view class="container">
    <!-- 发布资讯页面 -->
    <!-- 资讯内容填写区域 -->
    <view class="content">
      <!-- 资讯标题填写区域 -->
      <view class="content-item">
        标题：<input type="text" placeholder="请输入资讯标题" v-model="epidemicInfo.title" />
      </view>
      <!-- 资讯封面图片 -->
      <view class="content-item">
        封面：
        <view class="add-img" @click="addImg">
          <block v-if="!epidemicInfo.coverImg">
            <uni-icons type="plusempty" size="30"></uni-icons>请选择图片
          </block>
          <block v-else>
            <image class="img" :src="epidemicInfo.coverImg"></image>
          </block>
        </view>
      </view>
      <!-- 资讯内容编辑区域 -->
      <view class="editor-box">
        <text>资讯内容：</text>
        <!-- 编辑菜单栏容器 -->
        <scroll-view class="editor-tool-box" scroll-x="true" @tap="format">
          <!-- 编辑菜单栏内容 -->
          <view class="editor-tool">
            <!-- 字体加粗 -->
            <view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
            <!-- 字体斜体 -->
            <view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic">
            </view>
            <!-- 字体下划线 -->
            <view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
              data-name="underline"></view>
            <!-- 字体删除线 -->
            <view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike">
            </view>
            <!-- 左对齐 -->
            <view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
              data-value="left"></view>
            <!-- 居中对齐 -->
            <view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
              data-name="align" data-value="center"></view>
            <!-- 右对齐 -->
            <view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
              data-value="right"></view>
            <!-- 左右对齐 -->
            <view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
              data-name="align" data-value="justify"></view>
            <!-- 行高 -->
            <view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height"
              data-name="lineHeight" data-value="2"></view>
            <!-- 字体间隔 -->
            <view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing"
              data-name="letterSpacing" data-value="2em"></view>
            <!-- 上外边距 -->
            <view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju"
              data-name="marginTop" data-value="20px"></view>
            <!-- 下外边距 -->
            <view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
              data-name="marginBottom" data-value="20px"></view>
            <!-- 移除样式 -->
            <view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
            <!-- 字体大小 -->
            <view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize"
              data-name="fontSize" data-value="24px"></view>
            <!-- 字体颜色 -->
            <view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color"
              data-name="color" data-value="#0000ff"></view>
            <!-- 背景颜色 -->
            <view :class="formats.backgroundColor === '#ffff7f' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
              data-name="backgroundColor" data-value="#ffff7f"></view>
            <!-- 选择框列表 -->
            <view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
            <!-- 有序列表 -->
            <view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
              data-name="list" data-value="ordered"></view>
            <!-- 无序列表 -->
            <view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
              data-name="list" data-value="bullet"></view>
            <!-- 撤销 -->
            <view class="iconfont icon-undo" @tap="undo"></view>
            <!-- 恢复 -->
            <view class="iconfont icon-redo" @tap="redo"></view>
            <!-- 缩进 -->
            <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
            <!-- 撤销缩进 -->
            <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
            <!-- 分割线 -->
            <view class="iconfont icon-fengexian" @tap="insertDivider"></view>
            <!-- 插入图片 -->
            <view class="iconfont icon-charutupian" @tap="insertImage"></view>
            <!-- 标题1 -->
            <view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
              data-name="header" :data-value="1"></view>
            <!-- 字体下标 -->
            <view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
              data-name="script" data-value="sub"></view>
            <!-- 字体上标 -->
            <view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao"
              data-name="script" data-value="super"></view>
            <!-- 删除 -->
            <view class="iconfont icon-shanchu" @tap="clear"></view>
            <view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl"
              data-name="direction" data-value="rtl"></view>
          </view>
        </scroll-view>
        <!-- editor编辑框 -->
        <editor id="editor" class="ql-container" placeholder="请输入资讯内容..." show-img-size show-img-resize
          @statuschange="onStatusChange" @ready="onEditorReady" @input="onInput"></editor>
      </view>
      <!-- 发布资讯按钮 -->
      <button class="btn-submit" @click="submit">发布</button>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  //导入自己封装的 mixin 模块
  import editorMethods from './some-methods.js';
  // 只有管理员可进入该页面
  import intopageMix from '@/mixins/before-into-adminpage.js';
  export default {
    // 将 editorMethods 混入到当前的页面中进行使用
    mixins: [editorMethods,intopageMix],
    onLoad(option) {
      if (option.id) {
        // 进入编辑资讯状态，展示要编辑的资讯内容
        console.log(option.id)
        // 将要编辑的公告内容展示出来
        // 浅拷贝 Object.assign(target, source1, source2); Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
        Object.assign(this.epidemicInfo, this.editEpidemicInfo)
        // 如果原资讯的编辑者和当前用户不同则添加当前用户的用户名到编辑者中
        this.epidemicInfo.editor = this.editEpidemicInfo.editor.split(',').indexOf(this.userInfo.uname) !== -1 ? this.editEpidemicInfo.editor : this.editEpidemicInfo.editor.concat(',',this.userInfo.uname)
        // 解码emoji表情
        this.epidemicInfo.content = uni.$uncodeUtf16(this.epidemicInfo.content)
      } else if (this.lastEpidemicInfo.title) {
        // 继续编辑上次未上传成功的资讯信息
        // 若是跳转登录后重新编辑资讯则初始化资讯内容为刚刚写入的内容
        // 浅拷贝 Object.assign(target, source1, source2); Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
        Object.assign(this.epidemicInfo, this.lastEpidemicInfo)
        // 解码emoji表情
        this.epidemicInfo.content = uni.$uncodeUtf16(this.epidemicInfo.content)
      }
    },
    data() {
      return {
        // 页面标题
        pageName: '发布资讯',
        // 资讯内容
        epidemicInfo: {
          id: -1,
          // 当前日期
          date: '',
          // 资讯标题
          title: '',
          // 封面
          coverImg: '',
          // 资讯正文内容
          content: '',
          // 作者
          author: '',
          // 编辑者
          editor: '',
        },
        // 倒计时的秒数
        seconds: 3,
        //选择图片后生成的临时地址数组
        imglist: [],
        readOnly: false,
        // 编辑菜单样式
        formats: {},
      };
    },
    computed: {
      // 用户信息
      ...mapState('user', ['userInfo']),
      // 最新资讯、上次编辑的资讯
      ...mapState('home', ['lastEpidemicInfo', 'editEpidemicInfo']),
    },
    methods: {
      // 用于更新最新资讯信息、更新上次编辑资讯内容
      ...mapMutations('home', ['updateLastEpidemicInfo', 'updateEditEpidemicInfo']),
      // 编辑器初始化完成时触发
      onEditorReady() {
        // #ifdef MP-BAIDU
        this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
        // #endif

        // #ifdef APP-PLUS || H5 ||MP-WEIXIN
        uni.createSelectorQuery().select('#editor').context((res) => {
          this.editorCtx = res.context
          // 若是跳转登录后重新编辑资讯则初始化资讯内容为刚刚写入的内容
          if (this.epidemicInfo.content) {
            // console.log(this.epidemicInfo.content,'--------')
            this.editorCtx.setContents({
              html: this.epidemicInfo.content,
              fail: (err) => {
                console.log(err)
              }
            })
          }
        }).exec()
        // #endif
      },
      // 编辑器内容改变时触发
      onInput() {
        const that = this
        that.editorCtx.getContents({
          success: res => {
            // 将编辑器中的内容赋值给资讯内容对象
            that.epidemicInfo.content = res.html
            // console.log(res.html)
          },
          fail: function(err) {
            console.log(err)
          }
        })
      },
      // 插入图片
      insertImage() {
        const that = this
        //从本地相册选择图片
        uni.chooseImage({
          count: 1, //最多可以选择的图片张数，默认9
          success(res) {
            // console.log(res)
            that.editorCtx.insertImage({
              width: '80%',
              src: res.tempFilePaths[0]
            })
          }
        })
      },
      // 选择封面图片
      addImg() {
        const that = this
        uni.chooseImage({
          count: 1, //最多可以选择的图片张数，默认9
          success(res) {
            console.log("封面图：", res.tempFilePaths[0])
            that.epidemicInfo.coverImg = res.tempFilePaths[0]
          }
        })
      },
      // 发布
      submit() {
        // 判断资讯内容对象各项内容是否为空
        if (!this.epidemicInfo.content || !this.epidemicInfo.title || !this.epidemicInfo
          .coverImg) return uni.$showMsg('未填写完整！')
        // 标题不得含emoji
        if(uni.$utf16toEntities(this.epidemicInfo.title) !== this.epidemicInfo.title) return uni.$showMsg('标题不得含emoji！')
        // 获取当前日期赋值给epidemicInfo.data
        this.epidemicInfo.date = uni.$getDate()
        // 发布资讯的作者和编辑者 [发布者和编辑者为空时即是新发布资讯而不是编辑资讯]
        if(!this.epidemicInfo.author){
          this.epidemicInfo.author = this.userInfo.uname
          this.epidemicInfo.editor = this.userInfo.uname
        }
        const that = this
        uni.showModal({
          title: '发布资讯',
          content: '确定已经完成资讯内容的编辑吗？',
          cancelText: "取消", // 取消按钮的文字  
          confirmText: "确认", // 确认按钮文字 
          success: function(res) {
            // 选择确定按钮
            if (res.confirm) {
              // 上传资讯信息
              that.uploadNotic()
            }
          }
        });
      },
      // 上传资讯信息
      async uploadNotic() {
        // <img src="http://tmp/qecS1Ode47Ev8bd88a13a4b021660716ad2ebffc19d7.png" width
        // [\'\"] 匹配一个单引号或双引号  
        // ?	匹配前面的子表达式零次或一次  
        // [^\'\"] 匹配未包含的任意字符  
        // * 匹配前面的子表达式零次或多次
        var img = this.epidemicInfo.content.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/g);
        if (img !== null) {
          img.forEach((item) => {
            // 上传没上传过的
            if (!/http:\/\/([^\/]*)\/api\/uploads/.test(item)) {
              // 获取插入图片临时地址（slice截取src=""中的图片路径）
              this.imglist.push(item.slice(5, -1))
            }
          })
          console.log(this.imglist, '资讯内容中插入图片的临时地址---------');
        }
        // 上传资讯正文内容中的图片到后端
        if (this.imglist) {
          for (let i = 0; i < this.imglist.length; i++) {
            // 上传图片
            const up1 = await this.uploadImg(this.imglist[i])
            // console.log(up1, 'up1---------------')
            if (up1 === '上传失败') return uni.$showMsg('发布资讯失败！')
            // 将返回的url路径替换到资讯内容中
            this.epidemicInfo.content = this.epidemicInfo.content.replace(this.imglist[i], up1)
          }
        }
        // 上传未上传过的封面图片到后端
        if (!/http:\/\/([^\/]*)\/api\/uploads/.test(this.epidemicInfo.coverImg)) {
          const up2 = await this.uploadImg(this.epidemicInfo.coverImg)
          // console.log(up2, 'up2-------------------')
          if (up2 === '上传失败') return uni.$showMsg('发布资讯失败！')
          // 将返回的url路径替换到资讯封面图片
          this.epidemicInfo.coverImg = up2
        }
        // 将emoji表情其转成 base64
        this.epidemicInfo.content = uni.$utf16toEntities(this.epidemicInfo.content)
        // 保存这次发布资讯记录以防跳转登录后需重新编辑
        this.updateLastEpidemicInfo(this.epidemicInfo)
        console.log(this.epidemicInfo, '上传的资讯信息')
        // 发布资讯内容到后端
        const response = await uni.$http.post('/addEpidemicInfo', this.epidemicInfo)
        if (response.statusCode !== 200) return uni.$showMsg('发布资讯失败！')
        if (response.data.status === 0) {
          // 清空表单数据
          this.epidemicInfo = {}
          // 清空编辑器内容
          this.editorCtx.clear()
          // 发布成功后清空上次编辑记录
          this.updateLastEpidemicInfo({})
          // 清空要编辑的资讯信息
          this.updateEditEpidemicInfo({})
          // 跳转回之前的页面
          uni.navigateBack({
            complete: () => {
              // 显示编辑或发布成功弹窗
              uni.$showMsg(response.data.message)
            }
          })
        } else {
          // 发布资讯失败原因为身份认证失败
          if (response.data.message === '身份认证失败！') {
            // 3秒后跳转登录
            uni.$showTips()
          } else {
            // 其他原因导致发布资讯失败
            return uni.$showMsg(response.data.message)
          }
        }
      },
      // 上传图片到后端
      uploadImg(imgurl) {
        const uploadUrl = uni.$http.baseUrl + '/api/uploadImg';
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
              console.log('上传图片到后端失败-----')
              reject('上传失败')
            }
          });
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  // 编辑菜单的图标
  @import "./editor-icon.css";

  // 资讯内容填写区域
  .content {
    position: relative;
    top: -14px;
    background-color: #fff;
    padding: 10px;
    border-radius: 24px;

    // 资讯标题填写区域
    .content-item {
      display: flex;
      align-items: center;
      margin: 14px 0;
      padding: 10px;
      border: 1px solid #71a3f9;
      border-radius: 18px;

      // 选择图片
      .add-img {
        width: 80%;
        height: 80px;
        display: flex;
        align-items: center;

        // 选择的图片
        .img {
          width: 160px;
          height: 90px;
        }
      }
    }

    // 资讯摘要内容和资讯内容编辑区域容器
    .editor-box {
      margin: 14px 0;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #71a3f9;
      border-radius: 18px;

      // 编辑菜单栏容器
      .editor-tool-box {
        width: 100%;
        height: 86px;
        overflow-x: auto;
        border: 1px solid #9d9d9d;

        // 编辑菜单栏内容
        .editor-tool {
          width: 600px;

          // 菜单项被选中时的样式
          .ql-active {
            color: #06c;
          }

          // 每个菜单项的样式
          .iconfont {
            display: inline-block;
            padding: 10px;
            width: 42rpx;
            cursor: pointer;
            font-size: 20px;
          }
        }
      }

      // editor编辑框
      .ql-container {
        padding: 12px 15px;
        min-height: 632px;
        font-size: 16px;
        line-height: 1.5;
      }
    }

    // 发布资讯按钮
    .btn-submit {
      width: 40%;
      position: fixed;
      bottom: 30px;
      right: 32%;
      background-color: #d4e4ff;
    }
  }
</style>
