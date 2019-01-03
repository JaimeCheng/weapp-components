// pages/mysheet/mysheet.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionStatus: false
  },

  // 打开ActionSheet组件
  openMysheet: function () {
    this.setData({
      actionStatus: true
    })
  },

  handleBtn: function () {
    wx.showToast({
      title: '我是普通按钮',
      icon: 'none'
    })
  },

  onActionHide: function () {
    console.log('ActionSheet关闭了')
  }
})