// pages/mymodal/mymodal.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: true,
    type: 'getUserInfo',
    showCancel: false,
    title: '提示',
    content: '为了更好的用户体验，需要您授权允许小程序使用您的基本信息，授权仅获取您的头像和昵称，不会涉及任何信息泄露，您可以放心使用本小程序。',
    confirmText: '好的',
    items: [{ label: '请输入姓名', name: 'name' }],
    datas: ''
  },

  /**
   * 打开可提交表单的modal
   */
  openPromptModal: function () {
    this.setData({
      showModal: true,
      type: 'prompt',
      content: '',
      confirmText: '提交',
      showCancel: true
    })
  },

  /**
   * 打开可转发的modal
   */
  openShareModal: function () {
    this.setData({
      showModal: true,
      confirmText: '转发',
      content: '我可以转发，微信开放能力 open-type="share"',
      type: 'share',
      showCancel: true
    })
  },

  /**
   * 打开可跳转至设置页的modal
   */
  openSettingModal: function () {
    this.setData({
      showModal: true,
      confirmText: '打开',
      type: 'openSetting',
      content: '我可以打开设置页，微信开放能力 open-type="openSetting"',
      showCancel: true
    })
  },

  /**
   * modal 完成操作的回调
   */
  onComplete: function (e) {
    // 关闭模态框 
    this.setData({
      showModal: false,
    })

    if (e.detail.confirm) {
      // 用户点击确定
      console.log('用户点击确定')
      
      // 携带数据
      console.log(e.detail)

      // 各个type的处理 这里为了方便写到一起了

      if (this.data.type === 'getUserInfo') {
        if (e.detail.hasUserInfo) {
          // 已经授权
          this.setData({
            hasUserInfo: true,
            userInfo: e.detail.userInfo
          })
          app.globalData.userInfo = e.detail.userInfo
        } else {
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'none'
          })
        }
      }

      if (this.data.type === 'prompt') {
        var formData = e.detail.formData
        this.setData({
          datas: `表单携带数据：${JSON.stringify(formData)}`
        })
      }

      if (this.data.type === 'openSetting') {
        var authSetting = e.detail.authSetting
        this.setData({
          datas: `授权数据：${JSON.stringify(authSetting)}`
        })
        // 这里 是假如用户在设置页关掉授权的业务处理 项目中按自己的需求来处理即可
        if (!authSetting['scope.userInfo']) {
          this.setData({
            hasUserInfo: false,
            userInfo: null
          })
          app.globalData.userInfo = null
        }
      }

    } else {
      // 用户点击取消
      console.log('用户点击取消')
    }
  },


  onShareAppMessage: function (res) {

    if (res.from === 'button') {

      // 因为自定义组件内不能使用转发回调 所以在这关闭模态框
      // 不写这个 模态框点击转发按钮将不会自动关闭 
      if (res.target.dataset.type === 'modalShare') {
        this.setData({
          showModal: false,
        })
      }
    }
    
    return {
      title: '自定义转发标题',
      path: '/page/index?id=123'
    }
  }

})