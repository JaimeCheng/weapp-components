// componentsl/modal.js
const app = getApp()
var animation = wx.createAnimation({
  duration: 200,
  timingFunction: "linear",
  delay: 0
})

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //组件的初始显隐状态
    showStatus: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.animation = animation
        animation.opacity(0).step()
        //显示
        if (newVal){
          this.setData({
            animationData: animation.export(),
            showModalStatus: newVal
          })
          setTimeout(function () {
            animation.opacity(1).step()
            this.setData({
              animationData: animation.export()
            })
          }.bind(this), 200)
        } 
        else{
          //取消的动画
          this.setData({
            animationData: animation.export(),
          })
          setTimeout(function () {
            this.setData({
              animationData: animation.export(),
              showModalStatus: false
            })
          }.bind(this), 200)
        } 

      }
    },
    //是否使用带表单提交的modal弹框
    prompt: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.setData({
          prompt: newVal
        })
      }
    },
    formItems: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        this.setData({
          items: newVal
        })
      }
    },
    //确定按钮(confirmButton)是否绑定用户授权事件
    userData: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) { 
        this.setData({
          userData:newVal
        })
      } 
    },
    //是否显示取消按钮(cancelButton)
    showCancel:{
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        this.setData({
          showCancel: newVal
        })
      }
    },
    //modal的标题 如果不设置或空则不显示title
    title:{
      type:String,
      value:'',
      observer: function (newVal, oldVal) {
        this.setData({
          title: newVal
        })
      }
    },
    //modal的内容
    content:{
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        this.setData({
          content: newVal
        })
      }
    },
    //取消按钮的文字
    cancelText:{
      type: String,
      value: '取消',
      observer: function (newVal, oldVal) {
        this.setData({
          cancelText: newVal
        })
      }
    },
    //确定按钮的文字
    confirmText: {
      type: String,
      value: '好的',
      observer: function (newVal, oldVal) {
        this.setData({
          confirmText: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData:{},
    items: []
  },
  /**
   * 组件的生命周期
   */
  attached: function () { 

  },
  ready:function(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {

    //取消按钮响应事件
    cancelFunc: function () {
      var myEventDetail = {
        confirm:false
      } 
      var myEventOption = {} 
      this.triggerEvent('complete', myEventDetail, myEventOption)
    },

    //确定按钮响应事件
    confirmFunc: function (e) {
      var myEventDetail = {
        confirm: true
      } 
      // detail对象，提供给事件监听函数
      if (this.data.prompt)  {
        myEventDetail.formData = e.detail.value  
      }
      // 触发事件的选项
      var myEventOption = {} 
      this.triggerEvent('complete', myEventDetail, myEventOption)
    },

    //用户授权事件
    getUserInfo: function (e) {
      var that = this
      //同意授权 
      if (e.detail.userInfo) {
        app.globalData.userInfo = e.detail.userInfo
        app.globalData.hasUserInfo = true
        var myEventDetail = {
          confirm: true,
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        } 
      } else {
        // 拒绝
        var myEventDetail = {
          confirm: true,
          hasUserInfo: false
        } 
      }
      this.triggerEvent('complete', myEventDetail)
    },
  }
})

