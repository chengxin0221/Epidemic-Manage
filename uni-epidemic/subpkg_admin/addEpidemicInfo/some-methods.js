// 导出一个 mixin 对象
export default {
  methods: {
    // 选中的菜单项
    format(e) {
      let {
        name,
        value
      } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      this.editorCtx.format(name, value)
    },
    // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
    onStatusChange(e) {
      const formats = e.detail
      this.formats = formats
    },
    // 撤销
    undo() {
      this.editorCtx.undo()
    },
    // 恢复
    redo() {
      this.editorCtx.redo()
    },
    // 分割线
    insertDivider() {
      this.editorCtx.insertDivider();
    },
    // 移除样式
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    // 清空编辑器
    clear() {
      var that = this
      uni.showModal({
        title: '清空编辑器',
        content: '确定清空编辑器全部内容吗？',
        cancelText: "取消", // 取消按钮的文字  
        confirmText: "确认", // 确认按钮文字 
        confirmColor: '#F54E40', //确认字体的颜色
        cancelColor: '#000', //取消字体的颜色
        success: function(res) {
          if (res.confirm) {
            that.editorCtx.clear()
          }
        }
      });
    },
  },
}