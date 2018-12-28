// pages/mysheet/mysheet.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    actionStatus: false
  },

  // 打开ActionSheet组件
  openMysheet: function () {
    this.setData({
      actionStatus: true
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // 获取用户信息授权
  getUserInfo: function (e) {
    // 同意授权
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      // 拒绝授权
      wx.showToast({
        title: '拒绝授权',
        icon: 'none'
      })
      console.log('拒绝授权')
    }
    
  },

  // 打开设置页 回调
  openSetting: function (e) {
    if (!e.detail.authSetting['scope.userInfo']) {
      app.globalData.userInfo = null
      this.setData({
        userInfo: {},
        hasUserInfo: false
      })
    }
  },

  handleBtn: function () {
    wx.showToast({
      title: '我是普通按钮',
      icon: 'none'
    })
  }
})