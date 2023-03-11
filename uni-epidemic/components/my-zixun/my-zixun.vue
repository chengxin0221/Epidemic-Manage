<template>
  <view class="info-box">
    <view class="zixun-item" @click="gotoEpidemicInfoPage(zixun.id)">
      <!-- 资讯头部作者和发布时间 -->
      <view class="head-box">
        {{zixun.author}}
        <text class="zixun-date">{{String(zixun.date).slice(0,10)}}</text>
      </view>
      <!-- 资讯内容部分 -->
      <view class="body">
        <!-- 资讯标题 -->
        <view class="title">{{zixun.title.length > 18 ? zixun.title.slice(0,18)+'...' : zixun.title}}</view>
        <!-- 资讯图片 -->
        <image class="zixun-coverImg" :src="coverImg"></image>
      </view>
    </view>
    <radio class="radio" :checked="isCheck" color="#5a99d0" v-if="isShow" @click="checkChange"></radio>
  </view>
</template>

<script>
  export default {
    name: "my-zixun",
    props: {
      zixun: {
        type: Object | null,
        default: {}
      },
      // 是否显示单选按钮
      isShow: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        // 单选按钮是否选中
        isCheck: false,
      };
    },
    watch: {
      isShow() {
        if (!this.isShow) {
          console.log('取消选中--------')
          this.isCheck = false;
        }
      }
    },
    computed: {
      // 资讯图片
      coverImg() {
        // 将数据库中存储的图片路径中的ip改为当前ip以便显示
        // http://192.168.43.206:5000
        return this.zixun.coverImg.replace(/http:\/\/([^\/]*)/g, uni.$http.baseUrl);
      }
    },
    methods: {
      // 点击资讯
      gotoEpidemicInfoPage(id) {
        if (this.isShow) {
          this.checkChange()
          return;
        } else {
          uni.navigateTo({
            url: '/subpkg/epidemicInfo/epidemicInfo?id=' + id
          })
        }
      },
      // 点击单选按钮
      checkChange() {
        this.isCheck = !this.isCheck
        this.$emit('radioChange')
      },
    }
  }
</script>

<style lang="scss">
  .info-box {
    position: relative;

    // 单选按钮
    .radio {
      position: absolute;
      right: 4px;
      bottom: 8px;
    }

    // 资讯
    .zixun-item {
      padding: 10px;
      border: 1px solid #ebebeb;
      border-radius: 12px;
      box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.06);

      // 资讯头部
      .head-box {
        color: #415e92;

        // 时间
        .zixun-date {
          float: right;
          color: #797878;
          font-size: 14px;
          line-height: 21px;
        }
      }

      // 资讯内容部分
      .body {
        display: flex;
        padding-top: 5px;

        // 资讯标题
        .title {
          width: 85%;
          height: 145rpx;
          font-size: 16px;
          box-sizing: border-box;
          padding-top: 6px;
        }

        // 资讯图片
        .zixun-coverImg {
          width: 265rpx;
          height: 145rpx;
        }
      }
    }
  }
</style>
