<template>
  <!-- 加v-if防止未获取到信息时显示undefine -->
  <view class="container" v-if="notice.title">
    <!-- 具体公告页面 -->
    <!-- 公告标题 -->
    <view class="title">{{notice.title}}</view>
    <!-- 公告作者和发布时间 -->
    <view class="author-date-box">
      <!-- 作者 -->
      {{notice.author}}
      <!-- 公告发布时间 -->
      <text class="date">{{String(notice.date).slice(0,10)}}</text>
    </view>
    <view class="content">
      <text>{{notice.content}}</text>
      <view class="footer">
        <view>{{notice.author}}</view>
        <view>{{date}}</view>
      </view>
    </view>
    <!-- 公告配图 -->
    <block v-for="(item,index) in imgList" :key="index">
      <!-- 一定要加  mode="widthFix" 否则图片使用默认高度为240px -->
      <image class="img" mode="widthFix" :src="item"></image>
    </block>
    <!-- 编辑人员区域 -->
    <view class="editor-box">
      <view class="box-text">参与编辑人员：</view>
      {{notice.editor}}
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from "vuex"
  export default {
    onReady() {
      uni.setNavigationBarTitle({
        title: this.notice.title
      });
    },
    data() {
      return {
        // 本页面要展示的公告
        notice: {},
        // 配图
        imgList: [],
      };
    },
    computed: {
      date(){
        var year = String(this.notice.date).slice(0,4);
        var month = String(this.notice.date).slice(5,7).indexOf('0') === 0 ? String(this.notice.date).slice(6,7) : String(this.notice.date).slice(5,7);
        var day = String(this.notice.date).slice(8,10).indexOf('0') === 0 ? String(this.notice.date).slice(8,9) : String(this.notice.date).slice(8,10);
        return year + '年' + month + '月' + day + '日';
      }
    },
    onLoad(option) {
      // 获取指定id的公告信息
      this.getNoticeData(Number(option.id))
    },
    methods: {
      // 获取指定id的公告信息
      async getNoticeData(id) {
        const res = await uni.$http.get('/api/notice', {
          id
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.status === 0) {
          this.notice = res.data.noticeData[0]
          // 解码emoji表情
          this.notice.content = uni.$uncodeUtf16(this.notice.content)
          if (this.notice.imgList) {
            // 将配图路径字符串转换为数组
            this.imgList = this.notice.imgList.split(',')
            // 将数据库中存储的图片路径中的ip改为当前ip以便显示
            // http://192.168.43.206:5000
            this.imgList.forEach(item => item.replace(/http:\/\/([^\/]*)/g, uni.$http.baseUrl))
            // console.log(this.imgList, '------------announcement---imgList')
          }
        } else {
          return uni.$showMsg(res.data.message)
        }
      },
    }
  }
</script>

<style lang="scss">
  .container {
    padding: 10px 10px 40px;

    // 标题
    .title {
      margin: 10px 0;
      font-size: 20px;
    }

    // 作者和发布时间
    .author-date-box {
      color: #415e92;

      // 发布时间
      .date {
        margin-left: 10px;
        color: #797878;
        font-size: 14px;
        line-height: 21px;
      }
    }

    // 公告内容
    .content {
      position: relative;
      margin: 20px 5px;
      padding: 20px 10px 60px;
      background-color: #bde3f7;
      
      .footer {
        position: absolute;
        text-align: center;
        bottom: 8px;
        right: 10px;
      }
    }

    // 公告配图
    .img {
      width: 97%;
      margin: 5px;
    }
    
    // 编辑人员区
    .editor-box {
      color: #797878;
      margin: 40px 0;
      padding: 10px;
      border-top: 1px dashed #415e92;
      
      .box-text{
        margin-bottom: 6px;
      }
    }
  }
</style>
