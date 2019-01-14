// Components/bgmControl.js
// 生命周期最低 2.2.3 
// 其他最低1.9.90
var innerAudioContext
var init
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    // 音源
    src: {
      type: String,
      value:  '',
      observer: function (newVal, oldVal) {
        if (newVal && (innerAudioContext || this.innerAudioContext)) {
          if (this.properties.type === 'single') {
            this.innerAudioContext.src = newVal
            this.innerAudioContext.play()
          }
          if (this.properties.type === 'global') {
            innerAudioContext.src = newVal
            innerAudioContext.play()
          } 
        }
      }
    },

    // 暂停Icon
    pauseicon: {
      type: String,
      value: 'off.png',
      observer: function (newVal, oldVal) {}
    },

    // 播放Icon
    playicon: {
      type: String,
      value: 'on.png',
      observer: function (newVal, oldVal) { }
    },

    // 自动播放
    autoplay: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) { }
    },

    // 循环播放
    loop: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) { }
    },

    // 组件类型
    type: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bgmSrc: '',
    mypause: false
  },

  externalClasses: ['bgm-class'],

  lifetimes: {
    created () {
      // 在组件实例刚刚被创建时执行
      init = wx.createInnerAudioContext()
    },
    attached() {
      // 在组件实例进入页面节点树时执行
      init.onPlay(() => {
        console.log('play')
        this.setData({
          bgmSrc: this.properties.playicon
        })
      })
      init.onPause(() => {
        console.log('pause')
        this.setData({
          bgmSrc: this.properties.pauseicon
        })
      })
      init.onStop(() => {
        this.setData({
          bgmSrc: this.properties.pauseicon
        })
      })
      init.onEnded(() => {
        this.setData({
          bgmSrc: this.properties.pauseicon
        })
        this.triggerEvent('onEnded', myEventDetail)
      })

      if (!innerAudioContext) {
        if (this.properties.autoplay) {
          this.setData({
            bgmSrc: this.properties.playicon
          })
        } else {
          this.setData({
            bgmSrc: this.properties.pauseicon,
            mypause: true
          })
        }
      } else {
        if (innerAudioContext.paused) {
          this.setData({
            bgmSrc: this.properties.pauseicon
          })
        } else {
          this.setData({
            bgmSrc: this.properties.playicon
          })
        }
      }
      if (this.properties.type === 'single') {
        this.innerAudioContext = init
        this.innerAudioContext.src = this.properties.src
        this.innerAudioContext.autoplay = this.properties.autoplay
        this.innerAudioContext.loop = this.properties.loop
      }
      if (this.properties.type === 'global' && !innerAudioContext) {
        innerAudioContext = init
        innerAudioContext.src = this.properties.src
        innerAudioContext.autoplay = this.properties.autoplay
        innerAudioContext.loop = this.properties.loop
      } 
    },

    detached () {
      // 在组件实例被从页面节点树移除时执行
      if (this.properties.type === 'single') {
        this.innerAudioContext.destroy()
      }
    }
  },

  pageLifetimes: {
    show() {
      // 页面被展示
      if (this.properties.type === 'single') {
        if (!this.data.mypause) {
          this.innerAudioContext.play()
        }
      }
    },
    hide() {
      // 页面被隐藏
      if (this.properties.type === 'single') {
        if (!this.properties.hidePlay) {
          this.innerAudioContext.pause()
        }
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 音乐暂停播放的控制
    bgmControl: function () {
      if (this.properties.type === 'single') {
        if (this.innerAudioContext.paused) {
          this.innerAudioContext.play()
          this.setData({
            bgmSrc: this.properties.playicon,
            mypause: false
          })
        } else {
          this.innerAudioContext.pause()
          this.setData({
            bgmSrc: this.properties.pauseicon,
            mypause: true
          })
        }
      }
      if (this.properties.type === 'global') {
        if (innerAudioContext.paused) {
          innerAudioContext.play()
          this.setData({
            bgmSrc: this.properties.playicon
          })
        } else {
          innerAudioContext.pause()
          this.setData({
            bgmSrc: this.properties.pauseicon
          })
        }
      }    
    }
  }
})
