<template>
  <!-- 加v-if防止未获取到信息时显示undefine -->
  <view class="container" v-if="epidemicInfo.title">
    <!-- 资讯信息页面 -->
    <!-- 资讯标题 -->
    <view class="title">{{epidemicInfo.title}}</view>
    <!-- 公告作者和发布时间 -->
    <view class="author-date-box">
      <!-- 作者 -->
      {{epidemicInfo.author}}
      <!-- 资讯发布时间 -->
      <text class="date">{{String(epidemicInfo.date).slice(0,10)}}</text>
    </view>
    <!-- 资讯内容 -->
    <view class="content">
      <rich-text :nodes="epidemicInfo.content"></rich-text>
    </view>
    <!-- 编辑人员区域 -->
    <view class="editor-box">
      <view class="box-text">参与编辑人员：</view>
      {{epidemicInfo.editor}}
    </view>
  </view>
</template>

<script>
  export default {
    onReady() {
      // 设置导航栏标题
      uni.setNavigationBarTitle({
        title: this.epidemicInfo.title
      });
    },
    onLoad(option) {
      // 获取指定id的资讯信息
      this.getEpidemicInfo(Number(option.id))
    },
    data() {
      return {
        // 本页面要展示的资讯
        epidemicInfo: {},
      };
    },
    methods: {
      // 获取指定id的资讯信息
      async getEpidemicInfo(id) {
        const res = await uni.$http.get('/api/epidemicInfo', {
          id
        })
        // 请求失败
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.status === 0) {
          this.epidemicInfo = res.data.epidemicInfo[0]
          // 将数据库中存储的图片路径中的ip改为当前ip以便显示
          // http://192.168.43.206:5000
          this.epidemicInfo.content = this.epidemicInfo.content.replace(/http:\/\/([^\/]*)/g, uni.$http.baseUrl);
          // 解码emoji表情
          this.epidemicInfo.content = uni.$uncodeUtf16(this.epidemicInfo.content)
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
      padding: 30px 10px 40px;
      margin-top: 10px;
      overflow: hidden;
      background-color: #d8e5fd;
      // box-shadow: 0 6px 18px rgba(80, 165, 244, 0.3);
    }

    // 编辑人员区
    .editor-box {
      color: #797878;
      margin: 40px 0;
      padding: 10px;
      border-top: 1px dashed #415e92;

      .box-text {
        margin-bottom: 6px;
      }
    }
  }
</style>
