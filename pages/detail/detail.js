// pages/drivers/drivers.js
Page({

  /**
   * Page initial data
   */
  data: {
    drivers:'drivers',
    isDriver:false
  },

  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  formSubmit: function (e) {
    console.log(e.detail.formId)
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options.isDriver)
    this.setData({ isDriver: options.isDriver})
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
  onPay: function () {
    wx.requestPayment(
      {
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { console.log(res) },
        'fail': function (res) { console.log(res) },
        'complete': function (res) { console.log(res) }
      })
  },
  imageError: function (e) {
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  }
})