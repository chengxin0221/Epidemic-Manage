<template>
  <view class="notice-box">
    <view class="notice-item" @click="gotoAnnouncement(notice.id)">
      <!-- 公告标题 -->
      <view class="notice-title">{{notice.title.length > 14 ? notice.title.slice(0,14)+'...' : notice.title}}</view>
      <!-- 公告内容文字部分 -->
      <view class="notice-content">{{content}}</view>
      <!-- 公告作者和发布时间 -->
      <view class="author-box">
        {{notice.author}}
        <text class="notice-date">{{String(notice.date).slice(0,10)}}</text>
      </view>
    </view>
    <radio class="radio" :checked="isCheck" color="#5a99d0" v-if="isShow" @click="checkChange"></radio>
  </view>
</template>

<script>
  export default {
    name: "my-notice",
    props: {
      notice: {
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
      content() {
        // 解码emoji表情
        return uni.$uncodeUtf16(this.notice.content)
      }
    },
    methods: {
      // 点击公告
      gotoAnnouncement(id) {
        if (this.isShow) {
          this.checkChange()
          return;
        } else {
          uni.navigateTo({
            url: '/subpkg/announcement/announcement?id=' + id
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

<style lang="scss" scoped>
  .notice-box {
    position: relative;

    // 单选按钮
    .radio {
      position: absolute;
      right: 5px;
      top: 10px;
    }

    .notice-item {
      padding: 10px;
      border: 1px solid #ebebeb;
      border-radius: 12px;
      box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.06);

      // 公告标题
      .notice-title {
        font-size: 18px;
        font-weight: bold;
        color: #415e92;
      }

      // 公告内容
      .notice-content {
        font-size: 16px;
        margin: 6px 0;
        height: 92rpx;
        line-height: 47rpx;
        overflow: hidden;
      }

      // 公告作者和发布时间
      .author-box {
        color: #797878;

        // 时间
        .notice-date {
          float: right;
          font-size: 14px;
          line-height: 21px;
        }
      }
    }
  }
</style>
