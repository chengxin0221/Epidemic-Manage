<template>
  <view class="my-search-container">
    <!-- 使用 view 组件模拟 input 输入框的样式 -->
    <input class="inp-search" type="text" placeholder="Search" v-model="searchTitle">
    <view class="btn-search" @click="searchBoxHandler">
      <uni-icons type="search" color="white" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    data() {
      return {
        // 查询的标题
        searchTitle: ''
      };
    },
    methods: {
      // 点击搜索按钮
      searchBoxHandler() {
        var title = this.searchTitle
        // 触发外界通过 @click 绑定的 click 事件处理函数
        this.$emit('click',{title})
        this.searchTitle = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-search-container {
    background-color: #87a2d4;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .inp-search {
      width: 74%;
      height: 36px;
      padding-left: 8px;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius: 15px;
    }
    .btn-search {
      width: 19%;
      height: 36px;
      line-height: 36px;
      padding: 0 5px;
      color: white;
      background-color: #4365a4;
      border-radius: 15px;
      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
</style>
