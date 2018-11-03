// pages/drivers/drivers.js
Page({

  /**
   * Page initial data
   */
  data: {
    drivers:'drivers'
  },

  driverDetail: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  imageError: function (e) {
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  }
})