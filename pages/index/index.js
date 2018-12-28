//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },

  modal: function () {
    wx.navigateTo({
      url: '../mymodal/mymodal',
    })
  },

  sheet: function () {
    wx.navigateTo({
      url: '../mysheet/mysheet',
    })
  }

})
