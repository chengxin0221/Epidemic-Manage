<template>
  <view class="service">
    <view class="service-item" v-for="(item, index) in serviceData" :key="index" @click="gotoPage(item)">
      <image class="service-img" :src="item.img"></image>
      {{item.name}}
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-service",
    props: {
      serviceData: {
        type: Array | null,
        default: []
      }
    },
    data() {
      return {

      };
    },
    methods: {
      gotoPage(item) {
        switch (item.name) {
          case "疫情资讯":
            uni.navigateTo({
              url: '/subpkg/epidemic/epidemic'
            })
            break;
          case "公告":
            uni.navigateTo({
              url: '/subpkg/noticePage/noticePage'
            })
            break;
          case "健康打卡":
            uni.navigateTo({
              url: '/subpkg/health/health'
            })
            break;
          case "返校/外出":
            uni.navigateTo({
              url: '/subpkg/application/application'
            })
            break;
          case "申请记录":
            uni.navigateTo({
              url: '/subpkg/applicationRecord/applicationRecord'
            })
            break;
          case "申请审批":
            uni.navigateTo({
              url: '/subpkg_admin/examination/examination'
            })
            break;
          case "健康日报":
            uni.navigateTo({
              url: '/subpkg_admin/daily/daily'
            })
            break;
          case "管理班级":
            uni.navigateTo({
              url: '/subpkg_admin/classesManage/classesManage'
            })
            break;
          case "发布公告":
            uni.navigateTo({
              url: '/subpkg_admin/addNotice/addNotice'
            })
            break;
          case "发布资讯":
            uni.navigateTo({
              url: '/subpkg_admin/addEpidemicInfo/addEpidemicInfo'
            })
            break;
          case "用户管理":
            uni.navigateTo({
              url: '/subpkg_admin/userManage/userManage'
            })
            break;
          case "健康情况":
            uni.navigateTo({
              url: '/subpkg_admin/healthState/healthState'
            })
            break;
          case "审批记录":
            uni.navigateTo({
              url: '/subpkg_admin/reviewRecord/reviewRecord'
            })
            break;
          case "二维码":
            uni.navigateTo({
              url: '/subpkg/QRCode/QRCode'
            })
            break;
        }
      },
    }
  }
</script>

<style lang="scss">
  .service {
    display: flex;
    flex-wrap: wrap;
    // margin-bottom: 10px;
    margin: 0 10px 10px;
    border: 1px solid #ebebeb;
    border-radius: 12px;
    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.06);

    .service-item {
      display: flex;
      flex-direction: column;
      width: 25%;
      align-items: center;
      font-size: 14px;
      padding: 10px 6px;
      box-sizing: border-box;
       
      .service-img {
        width: 64rpx; 
        height: 72rpx;
        margin-bottom: 5px;
      }
    }
  }
</style>
