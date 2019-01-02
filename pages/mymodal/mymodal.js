// pages/mymodal/mymodal.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUserModal: true,
    showPromptModal: false,
    title: '提示',
    content: '为了更好的用户体验，需要您授权允许小程序使用您的基本信息，授权仅获取您的头像和昵称，不会涉及任何信息泄露，您可以放心使用本小程序。',
    confirmText: '我知道了',
    items: [{ label: '请输入姓名', name: 'name' }],
    tips: '由于用户授权必须绑定在button上，所有小程序原生modal不能用来进行授权，自定义Modal组件可以在用户点击确定时进行用户授权，这里也扩展了modal提交表单功能。'
  },

  /**
   * 打开可提交表单的modal
   */
  openNormalModal: function () {
    this.setData({
      showPromptModal: true
    })
  },

  /**
   * 提交表单的点击结果
   */
  onPromptComplete: function (e) {
    // 关闭模态框 
    this.setData({
      showPromptModal: false,
    })

    if (e.detail.confirm)  {
      // 用户点击确定
      console.log('用户点击确定')
      // 如果type=prompt 表单携带数据如下
      const formData = e.detail.formData
      console.log(formData)
    } else {
      // 用户点击取消
      console.log('用户点击取消')
    }
  },

  /**
   * 授权确定的响应事件
   */
  onUserInfoComplete: function (e) {
    // 关闭模态框
    this.setData({
      showUserModal: false
    })
    // 如果没设置取消按钮可以不判断用户是否点击确定 即if(e.detail.confirm)
    if (e.detail.hasUserInfo) {
      // 已经授权
      this.setData({
        hasUserInfo: true,
        userInfo: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo
    } else {
      // 拒绝
      wx.showToast({
        title: '拒绝授权',
        icon: 'none'
      })
    }
  }

})